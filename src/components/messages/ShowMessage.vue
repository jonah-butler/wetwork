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
            <span class="white">> {{ key.toUpperCase() }} <br /></span>

            <span>>> {{ show[key as keyof Show] }}</span>
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
  bands: string;
  bandsNew?: Array<Band>;
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
        bands: "Dog Lips // Wetwork // Sun Years // Railgun",
        // bandsNew:[
        //   {
        //     band: "Railgun",
        //     links: [
        //       {
        //         social: "bandcamp",
        //         link: "https://railgunrva.bandcamp.com/music",
        //       }
        //     ],
        //   },
        //   {
        //     band: "Dog Lips",
        //     links: [
        //       {
        //         social: "bandcamp",
        //         link: "https://doglipsband.bandcamp.com/album/dog-lips",
        //       },
        //    ]
        //   },
        //   {
        //     band: "Sun Years",
        //     links: [
        //       {
        //         social: "bandcamp",
        //         link: "https://sunyears.bandcamp.com/album/sun-years-demo",
        //       },
        //     ],
        //   },
        //   {
        //     band: "Wetwork",
        //     links: [
        //       {
        //         social: "bandcamp",
        //         link: "https://wetworkva.bandcamp.com/music",
        //       },
        //     ],
        //   },
        // ],
        // tickets: {
        //   site: "Open Date",
        //   link: "https://app.opendate.io/e/dog-lips-railgun-wetwork-sun-years-january-15-2025-554678",
        // },
      }
    ];

    const futureShows = computed((): Show[] => {
      return upcomingShows.filter((s: Show) => new Date(s.date) > new Date());
    });

    return { upcomingShows, futureShows };
  },
});
</script>

<style scoped></style>
