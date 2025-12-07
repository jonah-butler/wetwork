<script setup lang="ts">
import AudioPlayer from "@/components/AudioPlayer.vue";
import { trackListings } from "@/components/messages/Audio.data";
import Banner from "@/components/messages/Banner.vue";

const images = [
  "https://wetwork.s3.us-east-1.amazonaws.com/images/ww-3.png",
  "https://wetwork.s3.us-east-1.amazonaws.com/images/ww-4.png",
  "https://wetwork.s3.us-east-1.amazonaws.com/images/ww-5.png",
];

const me = "https://wetwork.s3.us-east-1.amazonaws.com/images/ww-8.png";

const ARN = "https://wetwork.s3.us-east-1.amazonaws.com/";

const audioSource = `${ARN}${trackListings[4].path}${trackListings[4].file}`;
const audioTitle = trackListings[4].file;

</script>

<template>
  <div class="epk margin-auto text-center d-flex justify-center">
    <!-- LOGO -->
    <section class="epk__inner_container container">
      <section class="epk__logo_container container">
        <img class="full-width max-width-md" src="../../public/wetwork-font-logo-green.png">
      </section>

      <!-- BIO -->
      <section class="epk__bio mt-8 container">
        <div class="epk__inner_container max-width-sm margin-auto">
          <p class="ff__monospace text-left">
            Wetwork is a heavy 4 piece punk outfit from Richmond va.
            The band uses elements of noise, psychedelic atmosphere,
            driving riffs, low tuned instruments, and a consistent
            feeling of paranoia and dread to shape the sound. Wetwork
            has past/current members of Meth Lab, Helgamite, Sinister
            Purpose, and Satan's Satyrs. They've played a wide variety
            of shows with bands such as Windhand, Hotline TNT, Toner,
            Loud Night, True Body, etc.
          </p>
          <p class="ff__monospace text-left">FFO: Black Flag, Wipers, Poison Idea, The Spits, Melvins</p>
          <div class="mt-8">
            <img class="eye-logo" src="../../public/eye_logo_full.png" />
          </div>
        </div>
      </section>

      <!-- Images -->
      <section class="epk__images container d-flex flex-wrap justify-center mt-8">
        <div class="ml-2 mt-2 mb-2 mr-2" v-for="(image, i) in images" :key="i">
          <img class="max-width-xs btn-primary" :src="image" alt="">
        </div>

        <div class="ml-2 mt-2 mb-2 mr-2 flex-break">
          <img class="max-width-xs btn-primary" :src="me" alt="">
        </div>

        <div class="ff__monospace">
          photos by <a class="ww-green" href="https://www.instagram.com/gutterdrone/" target="_blank">gutterdrone</a>
        </div>
      </section>

      <!-- Latest Release -->
      <section class="epk__release container mt-8 p-8">
        <div class="width-full row mt-8">
          <div class="col–small-12 col-md-6 ff__monospace p-1 dir-col justify-center">
            <div class="green-block"></div>
            <h2>Latest Release</h2>
            <strong class="mt-2 font-size-15">
              [ Wetwork by Wetwork ]
            </strong>
            <p>1. You Can't Win/Too Young To Die</p>
            <p>2. Waste of Time</p>
            <p>3. Magazines/B.S.</p>
            <p>4. Not Another Day</p>
            <p>5. The Ledge</p>
            <p>6. Surveillance</p>
            <p>7. Grift</p>
            <p>8. Inside My Mind</p>
            <p>9. What Now?</p>
            <p>10. Out of Tune</p>
            <p>11. Bite My Tongue</p>
            ------------
            <div class="margin-auto pt-4">
              <AudioPlayer
                :currently-playing="''"
                :source="{
                  source: audioSource,
                  title: audioTitle,
                }"
                container-background-color="black"
              />
            </div>
            <div class="green-block"></div>
          </div>
          <div class="col–small-12 col-md-6">
            <img class="max-width-lg full-width" src="https://wetwork.s3.us-east-1.amazonaws.com/images/ww-poster.png" alt="" />
          </div>
        </div>
      </section>

      <!-- Links & Footer -->
      <section class="epk__links container ff__monospace mt-8 d-flex align-center dir-col justify-center">
        <div class="epk__links_container">
          <p><span><a href="https://wetworkva.bandcamp.com/album/wetwork">Buy the LP</a></span></p>
          <p><span><a href="https://wetworkva.bandcamp.com/">Bandcamp</a></span></p>
          <p><span><a href="https://www.instagram.com/wetworkva/">Instagram</a></span></p>
          <p><span><a href="/">Home</a></span></p>
          <div>
            <a class="text-decoration-none" href="/">
              <Banner :show-sub-text="false"/>
            </a>
          </div>
        </div>
      </section>

      <!-- background lines -->
      <!-- top -->
      <div class="laser l1"></div>
      <div class="laser l2"></div>
      <div class="laser l3"></div>
      <div class="laser l4"></div>
      <div class="laser l5"></div>
      
      <!-- bottom -->
      <div class="laser l6"></div>
      <div class="laser l7"></div>
      <div class="laser l8"></div>
      <div class="laser l9"></div>
      <div class="laser l10"></div>
      <div class="laser l11"></div>
    </section>

  </div>
</template>

<style>
  .epk {
    position: relative;
    background: black;
    color: white;
    font-family: 'Helvetica';

    .epk__inner_container {
      position: relative;
      overflow: hidden;
      z-index: 1;
    }

    .epk__bio {
      .epk__inner_container {
        background: black;
      }
      .eye-logo {
        max-width: 50px;
      }
    }

    .epk__release {
      position: relative;
      overflow: hidden;
      z-index: 1;

      .green-block {
        height: 10px;
        width: 100%;
        background: #3ffd0e;
      }
    }

    .epk__links {
      min-height: 400px;

      .epk__links_container {
        background-color: black;
      }
    }

    .laser {
      position: absolute;
      background-color: #3ffd0e;
      height: 5px;
      z-index: -1;
    }

    .l1 {
      width: 900px;
      top: 77px;
      transform: rotate(349deg);
      left: -100px;
    }

    .l2 {
      width: 900px;
      top: 56px;
      transform: rotate(320deg);
      left: -127px;
    }

    .l3 {
      width: 400px;
      top: 88px;
      transform: rotate(34deg);
      right: -69px;
    }

    .l4 {
      width: 600px;
      top: 205px;
      transform: rotate(254deg);
      right: -223px;
    }

    .l5 {
      width: 700px;
      top: 123px;
      transform: rotate(243deg);
      right: -297px;
    }

    .l6 {
      width: 900px;
      bottom: 150px;
      left: -243px;
      transform: rotate(216deg);
    }
    .l7 {
      width: 700px;
      bottom: 100px;
      left: -235px;
      transform: rotate(243deg);
    }
    .l8 {
      width: 700px;
      bottom: 100px;
      left: -155px;
      transform: rotate(23deg);
    }
    .l9 {
      width: 900px;
      bottom: 100px;
      right: -225px;
      transform: rotate(343deg);
    }
    .l10 {
      width: 700px;
      bottom: 100px;
      right: -225px;
      transform: rotate(143deg);
    }

    .l11 {
      width: 700px;
      bottom: 100px;
      right: -110px;
      transform: rotate(137deg);
    }
  }
</style>