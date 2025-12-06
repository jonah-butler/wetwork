<template>
  <div class="message">
    <pre class="banner light-alien-green">
░██╗░░░░░░░██╗███████╗████████╗░██╗░░░░░░░██╗░█████╗░██████╗░██╗░░██╗
░██║░░██╗░░██║██╔════╝╚══██╔══╝░██║░░██╗░░██║██╔══██╗██╔══██╗██║░██╔╝
░╚██╗████╗██╔╝█████╗░░░░░██║░░░░╚██╗████╗██╔╝██║░░██║██████╔╝█████═╝░
░░████╔═████║░██╔══╝░░░░░██║░░░░░████╔═████║░██║░░██║██╔══██╗██╔═██╗░
░░╚██╔╝░╚██╔╝░███████╗░░░██║░░░░░╚██╔╝░╚██╔╝░╚█████╔╝██║░░██║██║░╚██╗
░░░╚═╝░░░╚═╝░░╚══════╝░░░╚═╝░░░░░░╚═╝░░░╚═╝░░░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝ v1.0.0
    </pre>
    <p v-if="showSubText" class="light-alien-green">
      Type 'help' to see a full list of available commands
    </p>
  </div>
</template>

<script>
export default {
  name: 'BannerMessage',
  props: {
    showSubText: {
      default: true,
      required: false,
      type: Boolean,
    }
  }
}
</script>
<style scoped>
@media only screen and (max-width: 660px) {
  .banner {
    font-size: 7px;
  }
}
</style>