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
            <span v-if="key === 'tickets'">
              <span class="white">> {{ key.toUpperCase() }} <br /></span>
              <span>>> <a target="_blank" class="dark-alien-purple" :href="show.tickets?.link"> {{ show.tickets?.site }} </a></span>
            </span>
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
            <span v-else-if="key === 'flyer'">
              <span class="white">> {{ key.toUpperCase() }} <br /></span>
              <span>>> <img class="flyer" :src="show.flyer" alt=""></span>
            </span>
            <span v-else>
              <span class="white">> {{ key.toUpperCase() }} <br /></span>
              <span>>> {{ show[key as keyof Show] }}</span>
            </span>
            <!-- <div></div> -->
          </p>
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
import ics from "ics";

interface Band {
  band: string;
  links: Array<{
    social: string;
    link: string;
  }>,
}

interface Show {
  date: string;
  location: string;
  venue: string;
  cost: string;
  time: string;
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
        location: "Richmond, VA",
        venue: "The Camel",
        cost: "$12 ADV, $15 DOS",
        time: "Doors @ 7pm - Music @ 8pm",
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

    return { upcomingShows, futureShows };
  },
});
</script>

<style scoped>
.flyer {
  width: 100%;
  max-width: 600px;
}
</style>
