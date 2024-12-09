<template>
  <div id="audio-player-container" class="mb-3 mr-3">
    <audio @timeupdate="updateSlider" ref="audio" preload="metadata" loop>
      <source :src="source.source">
    </audio>
    <p class="container-title">{{ extension.toUpperCase() }}</p>
    <div ref="titleContainer" class="title-container">
      <p ref="songTitle" class="song-title">{{ source.title }}</p>
    </div>
    <svg v-if="isPaused" @click="togglePlayback" id="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
      <polygon class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
    </svg> 
    <svg v-if="isPlaying" @click="togglePlayback" id="pause-icon" width="100" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="64" y="25" width="20" height="50"/>
      <rect x="24" y="25" width="20" height="50"/>
    </svg>
    <input @input="updateAudioTimeStamp" type="range" id="seek-slider" min="0" max="100" v-model="rangeData" step="1">
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, SetupContext, watch, onMounted } from 'vue';
import type { AudioSource } from "@/components/messages/Audio.vue";

export default defineComponent({
  name: 'AudioPlayer',
  props: {
    currentlyPlaying: {
      type: String,
      required: true
    },
    source: {
      type: Object as () => AudioSource,
      required: true,
    }
  },
  setup(props, context: SetupContext) {
    const isPlaying = ref(false);
    const isPaused = ref(true);
    const audio = ref<HTMLAudioElement>();
    const rangeData = ref(0);
    const songTitle = ref<HTMLParagraphElement>();
    const titleContainer = ref<HTMLDivElement>();

    onMounted((): void => {
      if (!songTitle.value || !titleContainer.value) return;

      initMarquee();

    });

    const extension = computed((): string => {
      return props.source.title.split(".")[1];
    })

    const initMarquee = (): void => {
      const min = 0.5;
      const max = 1;

      if (!songTitle.value || !titleContainer.value) return;

      let speed = parseFloat((Math.random() * (max - min) + min).toFixed(2));

      let containerWidth = titleContainer.value.offsetWidth;
      let titleWidth = songTitle.value.offsetWidth;
      let position = containerWidth - titleWidth;

      function animate(): void {
        position -= speed;
        if (position < -titleWidth) {
          position = containerWidth;
        }

        if(songTitle.value) {
          songTitle.value.style.transform = `translateX(${position}px)`;
        }

        requestAnimationFrame(animate);
      }

      animate();
    };

    const updateSlider = () => {
      rangeData.value = Math.round((audio.value!.currentTime / audio.value!.duration) * 100);
    };

    const updateAudioTimeStamp = () => {
      const currentTime = audio.value!.duration * (rangeData.value / 100);
      const roundedFrame = Math.round(currentTime * 10) / 10;
      audio.value!.currentTime = roundedFrame;
    };

    const togglePlayback = () => {

      if(isPaused.value) {

        audio.value!.play();
        context.emit('isPlaying', props.source.source);

      } else {

        audio.value!.pause();

      }

      isPlaying.value = !isPlaying.value;
      isPaused.value = !isPaused.value;
    }

    watch(() => props.currentlyPlaying, (n) => {
      if(n !== props.source.source) {
        audio.value!.pause();
        isPlaying.value = false;
        isPaused.value = true;
      }
    });

    return {
      audio,
      extension,
      isPlaying,
      isPaused,
      togglePlayback,
      updateSlider,
      rangeData,
      updateAudioTimeStamp,
      songTitle,
      titleContainer,
    };
  }
});
</script>

<style>
.song-title {
   margin: 0px;
   width: fit-content;
}
@keyframes scroll-left {
 0%   {
 transform: translateX(100%); 		
 }
 100% {
 transform: translateX(-100%); 
 }
}
#audio-player-container {
  --seek-before-width: 0%;
  --volume-before-width: 100%;
  --buffered-width: 0%;
  position: relative;
  width: 95%;
  max-width: 250px;
  height: 40px;
  background: transparent;
  color: #76e582;
  border: 1px solid #6a7729;
  padding: 15px;
  margin-bottom: 15px;
}
#audio-player-container::before {
  position: absolute;
  content: '';
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  left: -2px;
  top: -2px;
  background: linear-gradient(to left, #007db5, #ff8a00);
  z-index: -1;
}

#play-icon, #pause-icon {
  width: 40px;
  fill: #76e582;
  position: relative;
  top: -8px;
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
    top: -18px;
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
    transform: scale(1.2);
    background: #76e582;
}
input[type="range"]::-ms-track {
    height: 3px;
    cursor: pointer;
    background: #76e582;
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