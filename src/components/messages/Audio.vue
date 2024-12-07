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
            src: 'https://wetwork.s3.us-east-1.amazonaws.com/bite_my_tongue.wav',
            title: 'bite_my_tongue.mp3'
        },
        {
            src: 'https://wetwork.s3.us-east-1.amazonaws.com/magazines_%26_bad_faith.wav',
            title: 'magazines_&_bad_faith.wav'
        },
        {
            src: 'https://wetwork.s3.us-east-1.amazonaws.com/not_another_day.wav',
            title: 'not_another_day.wav'
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