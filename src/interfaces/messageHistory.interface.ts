import { Component } from "vue";

export default interface MessageHistory {
  cachedInput: Component;
  component: Component;
  input: string;
  options?: string;
}