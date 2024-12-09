<template>
  <div class="message d__flex flex-wrap" v-if="audioSources">
      <AudioPlayer
        v-for="source in audioSources"
        :key="source.title"
        :source="source"
        :currentlyPlaying="currentlyPlaying"
        @isPlaying="togglePlayback"
      />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import AudioPlayer from '@/components/AudioPlayer.vue';
import { listAllObjects, WW_ARN, WW_BUCKET } from '@/services/aws/s3';

export interface AudioSource {
  source: string;
  title: string;
}

export default defineComponent({
  name: "AudioMessage",
  components: {
      AudioPlayer
  },
  setup() {

    onMounted((): void => {
      getSongKeys();
    });

    const currentlyPlaying = ref('');
    const audioSources = ref<AudioSource[]>([]);

    const togglePlayback = (source: string) => {
        currentlyPlaying.value = source;
    };

    const getSongKeys = async (): Promise<void> => {
      try {
        const objects = await listAllObjects(WW_BUCKET);
        audioSources.value = objects.map((o) => {
          const key = o.Key || "";

          return {
            title: key,
            source: WW_ARN + key,
          }
        });
      } catch(err) {
        // handle this
        console.log(err);
      }
    }

    return {
        audioSources,
        currentlyPlaying,
        togglePlayback
    }

  }
})
</script>