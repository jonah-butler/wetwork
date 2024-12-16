<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, defineExpose } from "vue";
import { type SendEmailPayload, sendEmail } from "@/services/aws/lambda";

const step = ref(0);
const completedForm = ref(false);
const input0 = ref<HTMLInputElement>();
const closed = ref(false);

const data = reactive<SendEmailPayload>({
  subject: "",
  message: "",
  returnAddress: "",
  from: "",
});

onMounted((): void => {
  input0.value?.focus();
});

const progress = (): void => {
  if (closed.value) return;

  if (completedForm.value) {
    step.value = 4;
    return;
  }

  step.value++;

  if (step.value === 4) {
    completedForm.value = true;
  }

  nextTick((): void => {
    if (step.value <= 3) {
      (document.querySelector(".secondary-input") as HTMLInputElement).focus();
    }
  })
};

const submit = async (): Promise<void> => {
  console.log("sending email");
};

const update = (stepToUpdate: number): void => {
  if (closed.value) return;
  step.value = stepToUpdate;
};

const closeForm = (): void => {
  closed.value = true;
};

defineExpose({
  closeForm,
});
</script>

<template>
  <div class="d__flex white ml-4">
    <!-- subject capture -->
    <section class="message" v-if="step === 0">
      <div>---- Subject</div>
      <div class="mt-3 d__flex">
        <span class="caret mr-2"> > </span>
        <input :disabled="closed" v-model="data.subject" @keypress.enter="progress" ref="input0" placeholder="enter subject" class="secondary-input" type="text">
      </div>

      <div class="ml-4 mt-2">
        <button v-if="!closed" @click="progress" class="btn-primary">next -></button>
      </div>
    </section>

    <!-- message capture -->
    <section class="message" v-if="step === 1">
      <div>---- Message</div>
      <div class="mt-3 d__flex">
        <span class="caret mr-2"> > </span>
        <textarea :disabled="closed" v-model="data.message" ref="input1" class="secondary-input text-area" placeholder="enter message"></textarea>
      </div>

      <div class="ml-4 mt-2">
        <button v-if="!closed" @click="progress" class="btn-primary">next -></button>
      </div>
    </section>

    <!-- return address capture -->
    <section class="message" v-if="step === 2">
      <div>---- Return Address</div>
      <div class="mt-3 d__flex">
        <span class="caret mr-2"> > </span>
        <input :disabled="closed" v-model="data.returnAddress" @keypress.enter="progress" ref="input2" placeholder="enter email" class="secondary-input" type="text">
      </div>

      <div class="ml-4 mt-2">
        <button v-if="!closed" @click="progress" class="btn-primary">next -></button>
      </div>
    </section>

    <!-- from capture -->
    <section class="message" v-if="step === 3">
      <div>---- From</div>
      <div class="mt-3 d__flex">
        <span class="caret mr-2"> > </span>
        <input :disabled="closed" v-model="data.from" @keypress.enter="progress" ref="input3" placeholder="enter name" class="secondary-input" type="text">
      </div>

      <div class="ml-4 mt-2">
        <button v-if="!closed" @click="progress" class="btn-primary">next -></button>
      </div>
    </section>

    <!-- verify -->
    <section class="message" v-if="step === 4">
      <div>---- Review</div>

      <div @click="update(0)" class="mt-2 mb-4">
        <div class="header-container light-alien-green font-size-15 d__flex">
          <div class="caret-container mr-2">
            <span class="c-1"> > </span>
            <span class="c-2"> > </span>
            <span class="c-3"> > </span>
          </div>
          Subject
        </div>
        <div class="ml-3 mt-3 font-size-14">
          <em>{{ data.subject }}</em>
        </div>
      </div>

      <div @click="update(1)" class="mt-2 mb-4">
        <div class="header-container light-alien-green font-size-15 d__flex">
          <div class="caret-container mr-2">
            <span class="c-1"> > </span>
            <span class="c-2"> > </span>
            <span class="c-3"> > </span>
          </div>
          Message
        </div>
        <div class="ml-3 mt-3 font-size-14">
          <em>{{ data.message }}</em>
        </div>
      </div>

      <div @click="update(2)" class="mt-2 mb-4">
        <div class="header-container light-alien-green font-size-15 d__flex">
          <div class="caret-container mr-2">
            <span class="c-1"> > </span>
            <span class="c-2"> > </span>
            <span class="c-3"> > </span>
          </div>
          Return Address
        </div>
        <div class="ml-3 mt-3 font-size-14">
          <em>{{ data.returnAddress }}</em>
        </div>
      </div>

      <div @click="update(3)" class="mt-2 mb-4">
        <div class="header-container light-alien-green font-size-15 d__flex">
          <div class="caret-container mr-2">
            <span class="c-1"> > </span>
            <span class="c-2"> > </span>
            <span class="c-3"> > </span>
          </div>
          From
        </div>
        <div class="ml-3 mt-3 font-size-14">
          <em>{{ data.from }}</em>
        </div>
      </div>

      <div class="ml-4 mt-2">
        <button v-if="!closed" @click="submit" class="btn-primary">submit -></button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.secondary-input {
  caret-color: white;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-family: "DinaRemaster";
  font-size: .9rem;
  width: 300px;
  padding: 5px;
}
.secondary-input:focus-visible {
  outline: none;
}
.secondary-input::placeholder {
  font-size: 13px;
}
.caret {
  position: relative;
  top: 0;
}
.text-area {
  height: 150px;
}
/* move into global */
.btn-primary {
  border: 1px solid #76e582;
  color: #76e582;
  font-family: "DinaRemaster";
  font-size: .9rem;
  background: transparent;
  cursor: pointer;
  transition: all .3s ease;
}
.btn-primary:hover {
  color: white;
  border: 1px solid white;
}
.btn-primary:active {
  translate: 1px 1px;
}
.caret-container {
  position: relative;
  width: fit-content;
  cursor: pointer;
}
.caret-container:hover .c-2,
.caret-container:hover .c-3 {
  animation-play-state: running;
}
.c-1 {
  opacity: 1;
}
.c-2, .c-3 {
  position: absolute;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.c-2 {
  left: 4px;
}
.header-container {
  cursor: pointer;
}
.header-container:hover {
  color: white;
}
.header-container:hover .c-2 {
  animation: fadeInOut 1s infinite;
}
.c-3 {
  left: 8px;
}
.header-container:hover .c-3 {
  animation: fadeInOut 1s infinite;
  animation-delay: 0.25s;
}
@keyframes fadeInOut {
  0%, 20% {
    opacity: 0;
  }
  30%, 50% {
    opacity: 1;
  }
  60%, 100% {
    opacity: 0;
  }
}
</style>