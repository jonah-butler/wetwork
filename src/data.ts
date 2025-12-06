import AudioMessage from "@/components/messages/Audio.vue";
import BannerMessage from "@/components/messages/Banner.vue";
import CommandMessage from "@/components/messages/CommandMessage.vue";
import ShowMessage from "@/components/messages/ShowMessage.vue";
import { Component } from "vue";
import ClearMessage from "./components/messages/ClearMessage.vue";
import ContactMessage from "./components/messages/ContactMessage.vue";
import EPK from "./components/messages/EPK.vue";
import SocialMessage from "./components/messages/SocialMessage.vue";

interface RouteComponent {
  component: Component;
}

interface Routes {
  [key: string]: RouteComponent;
}

const routes: Routes = {
  banner: {
    component: BannerMessage,
  },
  help: {
    component: CommandMessage,
  },
  music: {
    component: AudioMessage,
  },
  shows: {
    component: ShowMessage,
  },
  clear: {
    component: ClearMessage,
  },
  socials: {
    component: SocialMessage,
  },
  contact: {
    component: ContactMessage,
  },
  epk: {
    component: EPK,
  }
};

export default routes;
