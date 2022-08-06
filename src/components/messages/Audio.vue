<template>
  <div class="message">
      <AudioPlayer
        v-for="source in sources"
        :key="source.title"
        :src="source.src"
        :title="source.title"
        :currentlyPlaying="currentlyPlaying"
        @isPlaying="togglePlayback"
      />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AudioPlayer from '@/components/AudioPlayer.vue';

export default defineComponent({
  name: "AudioMessage",
  components: {
      AudioPlayer
  },
  setup() {
    const currentlyPlaying = ref('');
    const sources = [
        {
            src: 'https://wetwork.s3.amazonaws.com/inside_my_mind.mp3',
            title: 'inside_my_mind.mp3'
        },
        {
            src: 'https://wetwork.s3.amazonaws.com/secrets.mp3',
            title: 'secrets.mp3'
        },
        {
            src: 'https://wetwork.s3.amazonaws.com/the_herd.mp3',
            title: 'the_herd.mp3'
        }
    ];

    const togglePlayback = (source: string) => {
        currentlyPlaying.value = source;
    }

    return {
        sources,
        currentlyPlaying,
        togglePlayback
    }

  }
})
</script>