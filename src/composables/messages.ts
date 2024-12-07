import MessageHistory from "@/interfaces/messageHistory.interface";
import BannerMessage from "@/components/messages/Banner.vue";
import CachedInput from "@/components/messages/CachedInput.vue";
import { shallowRef } from "vue";

const messages = shallowRef<Array<MessageHistory>>([
  {
    cachedInput: CachedInput,
    component: BannerMessage,
    input: "banner",
  },
]);

export {
  messages,
};