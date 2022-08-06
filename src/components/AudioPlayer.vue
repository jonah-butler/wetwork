<template>
  <div id="audio-player-container">
    <audio @timeupdate="updateSlider" ref="audio" preload="metadata" loop>
      <source :src="src">
    </audio>
    <p class="container-title">.MP3</p>
    <div class="title-container">
      <p class="song-title">{{ title }}</p>
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
import { defineComponent, ref, SetupContext, watch } from 'vue';

export default defineComponent({
  name: 'AudioPlayer',
  props: {
    currentlyPlaying: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup(props, context: SetupContext) {
    const isPlaying = ref(false);
    const isPaused = ref(true);
    const audio = ref<HTMLAudioElement>();
    const rangeData = ref(0);

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
        context.emit('isPlaying', props.src);

      } else {

        audio.value!.pause();

      }

      isPlaying.value = !isPlaying.value;
      isPaused.value = !isPaused.value;
    }

    watch(() => props.currentlyPlaying, (n) => {
      if(n !== props.src) {
        audio.value!.pause();
        isPlaying.value = false;
        isPaused.value = true;
      }
    });

    return {
      audio,
      isPlaying,
      isPaused,
      togglePlayback,
      updateSlider,
      rangeData,
      updateAudioTimeStamp
    };
  }
});
</script>

<style>
.song-title {
   animation: scroll-left 8s linear infinite;
   margin: 0px;
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
    float: left;
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
/* input[type="range"]::-ms-fill-lower {
    background-color: #007db5;
} */
/* input[type="range"]::-ms-fill-upper {
    background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
} */
/* input[type="range"]::-ms-thumb {
    box-sizing: content-box;
    border: 1px solid #007db5;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
}
input[type="range"]:active::-ms-thumb {
    transform: scale(1.2);
    background: #007db5;
} */
.title-container {
  overflow: hidden;
}
.container-title {
    background: #132616;
    position: absolute;
    top: -33px;
    right: 41px;
    font-size: 22px;
}
</style>