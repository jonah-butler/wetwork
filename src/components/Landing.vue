<template>
  <section class="bg__dark-alien-black w-100vw h-100 terminal">
    <div ref="terminalInner" class="terminal-inner">
      <keep-alive>
        <component
          v-for="(message, i) in messages"
          :key="i"
          :is="message.cachedInput"
          :inputMessage="message.input"
        >
          <component :is="message.component" :ref="setComponentRef" />
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
import BannerMessage from "@/components/messages/Banner.vue";
import CachedInput from "@/components/messages/CachedInput.vue";
import ErrorMessage from "@/components/messages/Error.vue";
import TerminalInput from "@/components/TerminalInput.vue";
import { messages } from "@/composables/messages";
import routeData from "@/data";
import MessageHistory from "@/interfaces/messageHistory.interface";
import {
  defineComponent,
  onUpdated,
  ref,
  triggerRef,
  type ComponentPublicInstance,
} from "vue";

export default defineComponent({
  name: "TerminalLanding",
  components: {
    BannerMessage,
    CachedInput,
    TerminalInput,
  },
  setup() {
    const terminalInner = ref<HTMLDivElement>();

    onUpdated(() => {
      scrollToBottom();
    });

    const buildComponentInstructions = (command: string): MessageHistory => {
      return {
        cachedInput: CachedInput,
        component: routeData[command].component,
        input: command,
      };
    };

    const buildErrorComponentInstructions = (
      command: string
    ): MessageHistory => {
      return {
        cachedInput: CachedInput,
        component: ErrorMessage,
        input: command,
      };
    };

    type CloseableComponent = ComponentPublicInstance & {
      closeForm: () => void;
    }    

    let lastContactIndex = -1;
    let componentsRendered = 0;

    let contactIndexes: CloseableComponent[] = [];

    const setComponentRef = (el: CloseableComponent): void => {
      componentsRendered++;

      if (el && "closeForm" in el && lastContactIndex <= componentsRendered) {
        contactIndexes.push(el);
        lastContactIndex = componentsRendered;
      }

      if(componentsRendered >= messages.value.length) {
        componentsRendered = 0;

        if(contactIndexes.length === 2) {
          contactIndexes[0].closeForm();
        }

        contactIndexes = [];
      }

      // reset index when clearing
      if (messages.value.length === 1) {
        lastContactIndex = -1;
      }
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
      terminalInner.value!.scrollTop = terminalInner.value!.scrollHeight;
    };

    return {
      messages,
      CachedInput,
      terminalInner,
      loadComponent,
      setComponentRef,
      loadDefaultErrComponent,
    };
  },
});
</script>

<style scoped>
.terminal {
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  padding: 20px;
}

.terminal-inner {
  border: 3px solid #76e582;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  border-radius: 6px;
  overflow-y: scroll;
  overflow-x: hidden;
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

.message {
  text-align: left;
  margin: 15px 0;
  width: 100%;
}
</style>
