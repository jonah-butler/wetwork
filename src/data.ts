import { Component } from "vue";
import BannerMessage from "@/components/messages/Banner.vue";
import CommandMessage from "@/components/messages/CommandMessage.vue";
import AudioMessage from "@/components/messages/Audio.vue";
import ShowMessage from "@/components/messages/ShowMessage.vue";

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
};

export default routes;
