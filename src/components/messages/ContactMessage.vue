<script setup lang="ts">
import Loader from "@/components/AnimatedLoader.vue";
import {
  ref,
  reactive,
  onMounted,
  nextTick,
  defineExpose,
  computed,
} from "vue";
import { type SendEmailPayload, sendEmail } from "@/services/aws/lambda";

const step = ref(0);
const completedForm = ref(false);
const input0 = ref<HTMLInputElement>();
const closed = ref(false);
const loading = ref(false);

const data = reactive<SendEmailPayload>({
  subject: "",
  message: "",
  returnAddress: "",
  from: "",
});

const formErrors = reactive<Record<string, string>>({
  subject: "",
  message: "",
  returnAddress: "",
  from: "",
});

const submissionResponse = ref("");

onMounted((): void => {
  input0.value?.focus();
});

const isSubjectValid = computed((): boolean => data.subject !== "");
const isMessageValid = computed((): boolean => data.message !== "");
const isValidEmail = computed((): boolean => data.returnAddress.includes("@"));
const isValidFrom = computed((): boolean => data.from !== "");

const validateField = (field: string): void => {
  if (field === "subject" && !isSubjectValid.value) {
    formErrors[field] = "The subject field can not be empty";
  } else if (field === "message" && !isMessageValid.value) {
    formErrors[field] = "The message field can not be empty";
  } else if (field === "returnAddress" && !isValidEmail.value) {
    formErrors[field] = "The address field must be valid";
  } else if (field === "from" && !isValidFrom.value) {
    formErrors[field] = "The from field can not be empty";
  }
};

const progress = (key: string): void => {
  formErrors[key] = "";

  validateField(key);

  if (formErrors[key] !== "") return;

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
  });
};

const submit = async (): Promise<void> => {
  if (
    !isSubjectValid.value ||
    !isMessageValid.value ||
    !isValidEmail.value ||
    !isValidFrom.value
  )
    return;

  try {
    loading.value = true;
    submissionResponse.value = "";

    const response = await sendEmail(data);
    if (response.success) {
      submissionResponse.value = "message sent";
      closed.value = true;
    }
  } catch (err) {
    if (err instanceof Error) {
      submissionResponse.value = err.message;
      return;
    }

    submissionResponse.value = "Failed to send message";
  } finally {
    loading.value = false;
  }
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
        <span class="caret mr-2">></span>
        <input
          :disabled="closed"
          v-model="data.subject"
          @keypress.enter="progress('subject')"
          ref="input0"
          placeholder="enter subject"
          class="secondary-input"
          type="text"
        />
      </div>

      <div class="ml-4 mt-2 d__flex">
        <button v-if="!closed" @click="progress('subject')" class="btn-primary">
          next ->
        </button>
        <div class="font-size-13 ml-2">{{ formErrors.subject }}</div>
      </div>
    </section>

    <!-- message capture -->
    <section class="message" v-if="step === 1">
      <div>---- Message</div>
      <div class="mt-3 d__flex">
        <span class="caret mr-2">></span>
        <textarea
          :disabled="closed"
          v-model="data.message"
          ref="input1"
          class="secondary-input text-area"
          placeholder="enter message"
        ></textarea>
      </div>

      <div class="ml-4 mt-2 d__flex">
        <button v-if="!closed" @click="progress('message')" class="btn-primary">
          next ->
        </button>
        <div class="font-size-13 ml-2">{{ formErrors.message }}</div>
      </div>
    </section>

    <!-- return address capture -->
    <section class="message" v-if="step === 2">
      <div>---- Return Address</div>
      <div class="mt-3 d__flex">
        <span class="caret mr-2">></span>
        <input
          :disabled="closed"
          v-model="data.returnAddress"
          @keypress.enter="progress('returnAddress')"
          ref="input2"
          placeholder="enter email"
          class="secondary-input"
          type="text"
        />
      </div>

      <div class="ml-4 mt-2 d__flex">
        <button
          v-if="!closed"
          @click="progress('returnAddress')"
          class="btn-primary"
        >
          next ->
        </button>
        <div class="font-size-13 ml-2">{{ formErrors.returnAddress }}</div>
      </div>
    </section>

    <!-- from capture -->
    <section class="message" v-if="step === 3">
      <div>---- From</div>
      <div class="mt-3 d__flex">
        <span class="caret mr-2">></span>
        <input
          :disabled="closed"
          v-model="data.from"
          @keypress.enter="progress('from')"
          ref="input3"
          placeholder="enter name"
          class="secondary-input"
          type="text"
        />
      </div>

      <div class="ml-4 mt-2 d__flex">
        <button v-if="!closed" @click="progress('from')" class="btn-primary">
          next ->
        </button>
        <div class="font-size-13 ml-2">{{ formErrors.from }}</div>
      </div>
    </section>

    <!-- verify -->
    <section class="message" v-if="step === 4">
      <div>---- Review</div>

      <div @click="update(0)" class="mt-2 mb-4">
        <div class="header-container light-alien-green font-size-15 d__flex">
          <div class="caret-container mr-2">
            <span class="c-1">></span>
            <span class="c-2">></span>
            <span class="c-3">></span>
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
            <span class="c-1">></span>
            <span class="c-2">></span>
            <span class="c-3">></span>
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
            <span class="c-1">></span>
            <span class="c-2">></span>
            <span class="c-3">></span>
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
            <span class="c-1">></span>
            <span class="c-2">></span>
            <span class="c-3">></span>
          </div>
          From
        </div>
        <div class="ml-3 mt-3 font-size-14">
          <em>{{ data.from }}</em>
        </div>
      </div>

      <div class="ml-4 mt-2 d__flex" v-if="!closed">
        <button :disabled="loading" v-if="!closed" @click="submit" class="btn-primary">
          <span v-if="!loading">submit</span>
          <Loader v-else />
        </button>
        <span class="font-size-13 ml-2">{{ submissionResponse }}</span>
      </div>

      <div class="ml-4 mt-2" v-else>
        <p class="white font-size-14">{{ submissionResponse }}</p>
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
  font-size: 0.9rem;
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
  font-size: 0.9rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  color: white;
  border: 1px solid white;
}
.btn-primary:active {
  translate: 1px 1px;
}
.btn-primary:disabled {
  color: white;
  opacity: 0.7;
  border: 1px solid #732a27;
}
.btn-primary:disabled:active {
  translate: 0 0;
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
.c-2,
.c-3 {
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
  0%,
  20% {
    opacity: 0;
  }
  30%,
  50% {
    opacity: 1;
  }
  60%,
  100% {
    opacity: 0;
  }
}
</style>
