<template>
  <div class="d__flex flex-dir__row terminal-input__cached">
    <span class="user dirty-alien-yellow">{{ user }}</span>
    <span class="location light-alien-blue"><span class="light-alien-gray">@</span>{{ location }}</span>
    <span class="light-alien-gray">{{ preInput }}</span>
    <span>&nbsp;</span>
    <span class="light-alien-green">
      <form @keydown.enter.prevent="showMessage" data-netlify="true">
        <input
          autocapitalize="off"
          autocomplete="off"
          v-model="command"
          :class="{'valid': doesCommandExist }"
          ref="terminalInput"
          type="text"
          id="terminalInput"
        >
      </form>
    </span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  SetupContext
} from 'vue';
import routeData from '@/data';

export default defineComponent({
  props: [],
  setup(props, context: SetupContext) {
    console.log(context);
    const user = ref('client');
    const location = ref('wet.work:');
    const preInput = ref('$~');
    const terminalInput = ref<HTMLInputElement>();
    const command = ref('');

    onMounted(() => {
      terminalInput.value!.focus();
    });

    const doesCommandExist = computed(() => {
      return Object.prototype
        .hasOwnProperty
        .call(routeData, command.value);
    });

    const showMessage = () => {
      if(!doesCommandExist.value) {
        context.emit('error', command.value);
      } else {
        context.emit('sendCommand', command.value);
      }
      command.value = '';
    }
    

    return {
      user,
      command,
      location,
      preInput,
      showMessage,
      terminalInput,
      doesCommandExist
    };
  }
})
</script>

<style>
#terminalInput {
  caret-color: white;
  background: transparent;
  border: none;
  color: #ac564e;
  font-family: 'DinaRemaster';
  font-size: 1.2rem;
  width: 100%;
}
#terminalInput:focus-visible {
  outline: none;
}
#terminalInput.valid {
  color: #76e582;
}

</style>