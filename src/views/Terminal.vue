<template>
  <div class="home">
    <Terminal />
  </div>
</template>

<script lang="ts">
import Terminal from '@/components/Landing.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Terminal,
  },
});
</script>
