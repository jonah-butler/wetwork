<template>
  <div class="message">
    <div class="light-alien-green">
      
      <div>
        <strong>Useage</strong> [command]
      </div>

      <div class="ff__dina mt-3 ml-3">
        <strong>Commands</strong>
        <div>
          ______________________
        </div>

        <div class="d__flex">
          <div class="ff__dina mt-2">
            {{ commandsPretty }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import routeData from '@/data';

export default defineComponent({
  name: 'CommandMessage',
  setup() {
    const commands = Object.keys(routeData);

    const commandsPretty = computed((): string => {
      return commands.join(", ");
    })

    return {
      commandsPretty,
    };
  }
});
</script>

<style scoped>

</style>