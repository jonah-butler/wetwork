<template>
  <div class="message">
    <span class="light-alien-green">
      Upcoming Performances:
      <br />
      ______________________
      <div
        class="ff__dina mt-2 mb-2"
        v-for="show in upcomingShows"
        :key="show.date"
      >
        <strong>{{ show.date }}</strong>
        <p v-for="key in Object.keys(show)" :key="key">
          --> {{ key.toUpperCase() }} <br />
          ----> {{ show[key] }}
        </p>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const upcomingShows = [
      {
        date: "May 11, 2023",
        location: "Richmond, Virginia",
        venue: "Banditos",
        cost: "$10",
        time: "8pm",
        bands: "Wetwork // Krode // Blame-Game",
      },
      {
        date: "August 12, 2023",
        location: "Richmond, Virginia",
        venue: "Another Round",
        cost: "$15",
        time: "5pm",
        bands:
          "Prisoner // Listless // Suppression // Copperhead // Cimitir // Wetwork // Hellion Child // Thunderchief",
      },
    ];
    return { upcomingShows };
  },
});
</script>

<style scoped></style>
