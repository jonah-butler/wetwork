<template>
  <div class="message">
    <span class="light-alien-green">
      <strong>
        Upcoming Performances:
      </strong>
      <br />
      ______________________
      <div v-if="futureShows.length">
        <div
          class="ff__dina mt-2 mb-2"
          v-for="show in futureShows"
          :key="show.date"
        >
          <strong>{{ show.date }}</strong>
          <p v-for="key in Object.keys(show)" :key="key">

            <!-- location fields -->
            <span v-if="key === 'location'">
              <span class="white">> {{ key.toUpperCase() }} <br /></span>

              <div>>> {{ show.location.venue }}</div>
              <div>>> {{ show.location.address }}</div>
            </span>

            <span v-else-if="key === 'tickets'">
              <span class="white">> {{ key.toUpperCase() }} <br /></span>
              <span>>> <a target="_blank" class="dark-alien-purple" :href="show.tickets?.link"> {{ show.tickets?.site }} </a></span>
            </span>

            <!-- bands field -->
            <span v-else-if="key === 'bands'">
              <div class="white">> {{ key.toUpperCase() }}</div>
              <span v-for="(band, i) in show[key]" :key="i">
                <div class="my-2">>> {{ band.band }}</div>
                <span class="" v-for="(link, i) in band['links']" :key="i">
                  <span class="ml-2">
                    <a class="dark-alien-purple" target="_blank" :href="link.link"> {{ link.social }} </a>
                  </span>
                </span>
                <br />
              </span>
            </span>

            <!-- flyer field -->
            <span v-else-if="key === 'flyer'">
              <span class="white">> {{ key.toUpperCase() }} <br /></span>
              <span>>> <img class="flyer" :src="show.flyer" alt=""></span>
            </span>

            <!-- start and end fields -->
            <span v-else-if="key === 'start' || key === 'end'">
              <span class="white">> {{ key.toUpperCase() }} <br /></span>
              <span>>> {{ prettyPrintTime(show[key], show.date) }}</span>            
            </span>

            <span v-else>
              <span class="white">> {{ key.toUpperCase() }} <br /></span>
              <span>>> {{ show[key as keyof Show] }}</span>
            </span>
          </p>

          <div>
            <button @click="saveToCalendar(show)" class="btn-primary">save to calendar</button>
          </div>
        </div>
      </div>
      <div class="mt-1" v-else>
        <em>No upcoming shows</em>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { createEvent, EventAttributes } from "ics";

interface Band {
  band: string;
  links: Array<{
    social: string;
    link: string;
  }>,
}

interface Time {
  hour: number;
  minute: number;
}

interface Location {
  venue: string;
  address: string;
}

interface Show {
  date: string;
  location: Location;
  cost: string;
  start: Time,
  end: Time,
  details?: string,
  endTime?: number,
  bands?: Array<Band>;
  tickets?: {
    site: string;
    link: string;
  },
  flyer?: string,
}

export default defineComponent({
  setup() {
    const upcomingShows: Show[] = [
      {
        date: "January 15, 2025",
        location: {
          venue: "The Camel",
          address: "1621 W Broad St, Richmond, VA 23220",
        },
        cost: "$12 ADV, $15 DOS",
        start: {
          hour: 20,
          minute: 0,
        },
        end: {
          hour: 23,
          minute: 0
        },
        details: "Doors @ 7pm - Music @ 8pm",
        bands:[
        {
            band: "Sun Years",
            links: [
              {
                social: "bandcamp",
                link: "https://sunyears.bandcamp.com/album/sun-years-demo",
              },
            ],
          },
          {
            band: "Wetwork",
            links: [
              {
                social: "bandcamp",
                link: "https://wetworkva.bandcamp.com/music",
              },
            ],
          },
          {
            band: "Dog Lips",
            links: [
              {
                social: "bandcamp",
                link: "https://doglipsband.bandcamp.com/album/dog-lips",
              },
           ]
          },
          {
            band: "Railgun",
            links: [
              {
                social: "bandcamp",
                link: "https://railgunrva.bandcamp.com/music",
              },
            ],
          },
        ],
        tickets: {
          site: "Open Date Tickets",
          link: "https://app.opendate.io/e/dog-lips-railgun-wetwork-sun-years-january-15-2025-554678",
        },
        flyer: "https://wetwork.s3.us-east-1.amazonaws.com/flyers/1-15-25WW.jpg",
      }
    ];

    const futureShows = computed((): Show[] => {
      return upcomingShows.filter((s: Show) => new Date(s.date) > new Date());
    });

    const prettyPrintTime = (time: Time, date: string): string => {
      const d = new Date(date);
      const dateTime = d.setHours(time.hour, time.minute);

      return new Intl.DateTimeFormat("en-us", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(dateTime);
    };

    const saveToCalendar = async (show: Show): Promise<void> => {
      const date = new Date(show.date);

      const event: EventAttributes = {
        start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), show.start.hour, show.start.minute],
        title: "Wetwork Show @ " + show.location.venue,
        duration: { hours:  show.end.hour - show.start.hour},
        location: show.location.address,
        url: show.tickets?.link ?? "https://wetwork.music",
        busyStatus: "BUSY",
        organizer: {
          name: "Wetwork",
          email: "wetworkva@gmail.com"
        },
        description: `Night of live music with: ${show.bands?.map((b) => b.band).join(", ")} @ ${show.location.venue}`
      };

      const file = await new Promise<File>((resolve) => {
        createEvent(event, (_err, val) => {
          resolve(new File([val], "wetwork.ics", { type: "text/calendar" }));
        });
      });

      const url = `data:text/calendar;charset=utf-8,${encodeURIComponent(
        await file.text()
      )}`;

      const a = document.createElement("a");
      a.href = url;
      a.download = "wetwork-" + Date.now() + ".ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    };

    return { upcomingShows, futureShows, saveToCalendar, prettyPrintTime };
  },
});
</script>

<style scoped>
.flyer {
  width: 100%;
  max-width: 600px;
}
</style>
