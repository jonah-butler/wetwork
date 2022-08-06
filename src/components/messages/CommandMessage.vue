<template>
  <div class="message">
    <p class="light-alien-green">
      <strong>Useage</strong> help [command]
      <br>
      <br>
      <pre class="ff__dina">
  <strong>Commands</strong>
  ______________________
      </pre>
      <pre class="ff__dina" v-for="command in commands" :key="command">
  {{ command }}
      </pre>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import routeData from '@/data';

export default defineComponent({
  name: 'CommandMessage',
  setup() {
    const commands = Object.keys(routeData);

    return {
      commands
    };
  }
});
</script>

<style>

</style>