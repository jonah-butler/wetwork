import { Component } from "vue";
import BannerMessage from '@/components/messages/Banner.vue';
import CommandMessage from '@/components/messages/CommandMessage.vue';
import AudioMessage from '@/components/messages/Audio.vue';

interface RouteComponent {
  component: Component;
  // props?: Array<string>;
}

interface Routes {
  [key: string]: RouteComponent;
}


const routes: Routes  = {
  'banner': {
    component: BannerMessage,
  },
  'help': {
    component: CommandMessage,
  },
  'music': {
    component: AudioMessage,
  }
};

export default routes;