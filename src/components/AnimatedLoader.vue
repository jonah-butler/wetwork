<template>
  <div class="loader">
    <div class="loader-bar"></div>
  </div>
</template>

<style scoped>
.loader {
  width: 40px;
  height: 40px;
  fill: #76e582;
  position: relative;
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

  12.5% {
    translate: 0 4px;
  }

  25% {
    translate: 0 0;
  }

  37.5% {
    translate: 4px 0;
  }

  50% {
    translate: 0 0;
  }

  62.5% {
    translate: 0 -4px;
  }

  75% {
    translate: 0 0;
  }

  87.5% {
    translate: -4px 0;
  }

  100% {
    translate: 0 0;
  }
}
</style>
