<template>
  <div id="audio-player-container" class="mb-3 mr-3">
    <audio @timeupdate="updateSlider" preload="none" ref="audio" loop>
      <source :src="source.source" />
    </audio>
    <p class="container-title">{{ extension.toUpperCase() }}</p>
    <div ref="titleContainer" class="title-container">
      <p ref="songTitle" class="song-title">{{ source.title }}</p>
    </div>
    <div class="d__flex">
      <div v-if="loading" id="loader">
        <div class="loader-bar"></div>
      </div>
      <svg
        v-if="isPaused && !loading"
        @click="togglePlayback"
        id="play-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26 26"
      >
        <polygon
          class="play-btn__svg"
          points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"
        />
      </svg>
      <svg
        v-if="isPlaying && !loading"
        @click="togglePlayback"
        id="pause-icon"
        width="100"
        viewBox="0 0 108 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="64" y="25" width="20" height="50" />
        <rect x="24" y="25" width="20" height="50" />
      </svg>
      <input :disabled="!hasData" @input="updateAudioTimeStamp" type="range" id="seek-slider" min="0" max="100" v-model="rangeData" step="1">
    </div>
  </div>
</template>

<script lang="ts">
import type { AudioSource } from "@/components/messages/Audio.vue";
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "AudioPlayer",
  props: {
    currentlyPlaying: {
      type: String,
      required: true,
    },
    source: {
      type: Object as () => AudioSource,
      required: true,
    },
  },
  setup(props) {
    const isPlaying = ref(false);
    const isPaused = ref(true);
    const audio = ref<HTMLAudioElement>();
    const rangeData = ref(0);
    const songTitle = ref<HTMLParagraphElement | null>(null);
    const titleContainer = ref<HTMLDivElement | null>(null);
    const marqueeStyle = ref<{
      animationDuration: string;
      animationName: string;
    } | null>(null);
    const loading = ref(false);
    const hasData = ref(false);

    const extension = computed(() => {
      return props.source.title.split(".").pop()?.toUpperCase() || "";
    });

    const updateSlider = () => {
      rangeData.value = Math.round(
        (audio.value!.currentTime / audio.value!.duration) * 100
      );
    };

    const updateAudioTimeStamp = () => {
      if (!audio.value) return;

      const newTime = audio.value.duration * (rangeData.value / 100);
      const roundedTime = Math.round(newTime * 10) / 10;

      const onCanPlay = () => {
        audio.value?.removeEventListener("canplay", onCanPlay);
      };

      audio.value.currentTime = roundedTime;
      audio.value.addEventListener("canplay", onCanPlay);
    };

    const togglePlayback = (): void => {
      if (!audio.value) return;

      if (isPaused.value) {
        if (audio.value.readyState === 0) {
          loading.value = true;
          audio.value.load();

          audio.value.addEventListener(
            "canplay",
            (): void => {
              loading.value = false;
              audio.value!.play();
              hasData.value = true;
            },
            { once: true }
          );
        } else {
          audio.value.play();
        }
      } else {
        audio.value.pause();
      }

      isPlaying.value = !isPlaying.value;
      isPaused.value = !isPaused.value;
    };


    watch(
      () => props.currentlyPlaying,
      (newVal) => {
        if (newVal !== props.source.source) {
          audio.value?.pause();
          isPlaying.value = false;
          isPaused.value = true;
        }
      }
    );

    return {
      audio,
      loading,
      extension,
      isPlaying,
      isPaused,
      togglePlayback,
      updateSlider,
      rangeData,
      updateAudioTimeStamp,
      marqueeStyle,
      songTitle,
      titleContainer,
      hasData,
    };
  },
});
</script>

<style>
#loader {
  width: 40px;
  height: 40px;
  fill: #76e582;
  position: relative;
  top: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader-bar {
  width: 7px;
  height: 7px;
  background: #76e582;
  animation: 1s infinite back-and-forth;
  position: relative;
  top: -2px;
}
@keyframes back-and-forth {
  0% {
    translate: 0 0;
  }

  25% {
    translate: 4px 0;
  }

  50% {
    translate: 0 0;
  }

  75% {
    translate: -4px 0;
  }

  100% {
    translate: 0 0;
  }
}
.title-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 20px;
  white-space: nowrap;
}
.song-title {
  white-space: nowrap;
  margin: 0;
  font-size: 14px;
}
#audio-player-container {
  --seek-before-width: 0%;
  --volume-before-width: 100%;
  --buffered-width: 0%;
  position: relative;
  width: 95%;
  max-width: 280px;
  height: 40px;
  background: transparent;
  color: #76e582;
  border: 1px solid #6a7729;
  padding: 15px;
  margin-bottom: 15px;
}
#audio-player-container::before {
  position: absolute;
  content: "";
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  left: -2px;
  top: -2px;
  background: linear-gradient(to left, #007db5, #ff8a00);
  z-index: -1;
}

#play-icon,
#pause-icon {
  width: 40px;
  fill: #76e582;
  position: relative;
  top: -8px;
  cursor: pointer;
}
output {
  display: inline-block;
  width: 32px;
  text-align: center;
  font-size: 20px;
  margin: 10px 2.5% 0 5%;
  clear: left;
}
input[type="range"] {
  position: relative;
  -webkit-appearance: none;
  width: 63%;
  padding: 0;
  height: 19px;
  outline: none;
  background: transparent;
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 3px;
  cursor: pointer;
  background: #76e582;
}
input[type="range"]::-webkit-slider-thumb {
  position: relative;
  -webkit-appearance: none;
  box-sizing: content-box;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: #76e582;
  cursor: pointer;
  margin: -7px 0 0 0;
}
input[type="range"]:active::-webkit-slider-thumb {
  transform: scale(1.2);
}
input[type="range"]::-moz-range-track {
  height: 3px;
  cursor: pointer;
  background: #76e582;
}
input[type="range"]::-moz-focus-outer {
  border: 0;
}
input[type="range"]::-moz-range-thumb {
  position: relative;
  -webkit-appearance: none;
  box-sizing: content-box;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: #76e582;
  cursor: pointer;
  margin: -7px 0 0 0;
}
input[type="range"]:active::-moz-range-thumb {
  transform: scale(1.3);
  background: #76e582;
}
input[type="range"]::-ms-track {
  height: 3px;
  cursor: pointer;
  background: #76e582;
}
input[type="range"]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
input[type="range"]:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}
.title-container {
  overflow: hidden;
}
.container-title {
  background: #161717;
  position: absolute;
  top: -33px;
  right: 41px;
  font-size: 22px;
}
</style>
