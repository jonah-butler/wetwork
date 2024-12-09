<template>
  <div class="message">
    <span class="light-alien-green">
      <strong>
        Upcoming Performances:
      </strong>
      <br />
      ______________________
      <div v-if="upcomingShows.length">
        <div
          class="ff__dina mt-2 mb-2"
          v-for="show in upcomingShows"
          :key="show.date"
        >
          <strong>{{ show.date }}</strong>
          <p v-for="key in Object.keys(show)" :key="key">
            > {{ key.toUpperCase() }} <br />
            >> {{ show[key as keyof Show] }}
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
import { defineComponent } from "vue";

interface Show {
  date: string;
  location: string;
  venue: string;
  cost: string;
  time: string;
  bands: string;
}

export default defineComponent({
  setup() {
    const upcomingShows: Show[] = [
      {
        date: "January 15, 2025",
        location: "Richmond, VA",
        venue: "The Camel",
        cost: "TBD",
        time: "TBD",
        bands: "Dog Lips // Wetwork // Sun Years // More TBD"
      }
    ];
    return { upcomingShows };
  },
});
</script>

<style scoped></style>
