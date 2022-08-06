<template>
  <div class="output d__flex flex-dir__col">
    <div class="d__flex flex-dir__row terminal-input__cached">
      <span class="user dirty-alien-yellow">{{ user }}</span>
      <span class="location light-alien-blue"><span class="light-alien-gray">@</span>{{ location }}</span>
      <span class="light-alien-gray">{{ preInput }}</span>
      <span>&nbsp;</span>
      <span class="light-alien-green">{{ inputMessage }}</span>
    </div>
    <div class="d__flex">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: ['inputMessage'],
  setup() {
    const user = ref('client');
    const location = ref('wet.work:');
    const preInput = ref('$ ~ ');

    return {
      user,
      location,
      preInput
    };
  }
})
</script>

<style>
.terminal-input__cached {
  font-weight: 500;
  font-size: 1.2rem;
}
</style>