<template>
  <section class="bg__dark-alien-green w-100vw h-100 terminal">
    <div ref="terminalInner" class="terminal-inner">
      <keep-alive>
        <component
          v-for="message in messages"
          :key="message.message"
          :is="message.cachedInput"
          :inputMessage="message.input"
          >
            <component :is="message.component" />
        </component>
      </keep-alive>
      <TerminalInput 
        @sendCommand="loadComponent"
        @error="loadDefaultErrComponent"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, shallowRef, watch, triggerRef, ref, onUpdated } from 'vue';
import BannerMessage from '@/components/messages/Banner.vue';
import CachedInput from '@/components/messages/CachedInput.vue';
import MessageHistory from '@/interfaces/messageHistory.interface';
import TerminalInput from '@/components/TerminalInput.vue';
import routeData from '@/data';
import ErrorMessage from '@/components/messages/Error.vue';

export default defineComponent({
  name: 'TerminalLanding',
  components: {
    BannerMessage,
    CachedInput,
    TerminalInput
  },
  setup() {
    const terminalInner = ref<HTMLDivElement>();
    const messages = shallowRef<Array<MessageHistory>>([
      {
        cachedInput: CachedInput,
        component: BannerMessage,
        input: 'banner',
      },
    ]);

    watch(messages, () => {
      console.log()
    });

    onUpdated(() => {
      scrollToBottom();
    })

    const buildComponentInstructions = (command: string): MessageHistory => {
      console.log(command);
      return {
        cachedInput: CachedInput,
        component: routeData[command].component,
        input: command
      };
    };

    const buildErrorComponentInstructions = (command: string): MessageHistory => {
      return {
        cachedInput: CachedInput,
        component: ErrorMessage,
        input: command
      };
    };

    const loadComponent = (input: string) => {
      const message = buildComponentInstructions(input);
      messages.value.push(message);
      triggerRef(messages);
    };

    const loadDefaultErrComponent = (input: string) => {
      const message = buildErrorComponentInstructions(input);
      messages.value.push(message);
      triggerRef(messages);
    };

    const scrollToBottom = () => {
      terminalInner.value!.scrollTop = terminalInner.value!.clientHeight;
    };

    return {
      messages,
      CachedInput,
      terminalInner,
      loadComponent,
      loadDefaultErrComponent
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.terminal {
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  padding: 20px;
}

.terminal-inner {
  border: 3px solid #6a7729;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  border-radius: 6px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.message {
  text-align: left;
  margin: 15px 0;
  width: 100%;
}
</style>
