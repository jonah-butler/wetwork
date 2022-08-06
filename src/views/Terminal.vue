<template>
  <div class="home">
    <Terminal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Terminal from '@/components/Landing.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    Terminal,
  },
});
</script>
