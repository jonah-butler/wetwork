<template>
  <div class="message d__flex flex-wrap" v-if="audioSources">
    <AudioPlayer
      v-for="(source, i) in audioSources"
      :key="i"
      :source="source"
      :currentlyPlaying="currentlyPlaying"
      @isPlaying="togglePlayback"
    />
  </div>
</template>

<script lang="ts">
import AudioPlayer from "@/components/AudioPlayer.vue";
import { defineComponent, onMounted, ref } from "vue";
import { trackListings } from "./Audio.data";
// import { listAllObjects, WW_ARN, WW_BUCKET } from "@/services/aws/s3";

export interface AudioSource {
  source: string;
  title: string;
}

export default defineComponent({
  name: "AudioMessage",
  components: {
    AudioPlayer,
  },
  setup() {
    onMounted((): void => {
      getAllSongs();
    });

    const ARN = "https://wetwork.s3.us-east-1.amazonaws.com/";

    const currentlyPlaying = ref("");
    const audioSources = ref<AudioSource[]>([]);

    const togglePlayback = (source: string) => {
      currentlyPlaying.value = source;
    };

    const getAllSongs = (): void => {
      for (const data of trackListings) {
        audioSources.value.push({
          source: `${ARN}${data.path}${data.file}`,
          title: data.file,
        });
      }
    };

    // const getSongKeys = async (): Promise<void> => {
    //   try {
    //     const objects = await listAllObjects(WW_BUCKET);
    //     audioSources.value = objects.map((o) => {
    //       const key = o.Key || "";

    //       return {
    //         title: key,
    //         source: WW_ARN + key,
    //       };
    //     });
    //   } catch (err) {
    //     // handle this
    //     console.log(err);
    //   }
    // };

    return {
      audioSources,
      currentlyPlaying,
      togglePlayback,
    };
  },
});
</script>
