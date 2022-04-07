<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules, FormInst, FormValidationError } from "naive-ui";
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  useLoadingBar,
  NA,
  NSpace,
  useMessage,
} from "naive-ui";
import { useAuthStore } from "@/store";

defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: "showModal", value: boolean): string;
}>();

// const authStore = useAuthStore();
const loadingBar = useLoadingBar();
// const message = useMessage();

const formRef = ref<FormInst | null>(null);
const formValue = reactive({
  user: {
    email: "",
    password: "",
  },
});

const rules: FormRules = {
  user: {
    email: {
      required: true,
      message: "Email is required",
      trigger: "input",
    },
    password: {
      required: true,
      message: "Password is required",
      trigger: "input",
    },
  },
};

const submit = () => {
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (errors) {
      loadingBar.error();
      return;
    } else {
      loadingBar.start();
    }
  });

  // const payload = {
  //   email: formValue.user.email,
  //   password: formValue.user.password,
  // };

  // const { data, error } = authStore.signin(payload);

  // if (error) {
  //   loadingBar.error();
  //   message.error(`${error.value}`);
  //   emit("showModal", false);
  // }

  loadingBar.finish();
};
</script>

<template>
  <n-modal v-modal:show="showModal" preset="card" class="loginModal">
    <n-form
      ref="formRef"
      label-placement="left"
      label-width="auto"
      :model="formValue"
      :rules="rules"
    >
      <n-form-item label="Email" path="user.email" :show-require-mark="false">
        <n-input placeholder="Email" v-model:value="formValue.user.email" />
      </n-form-item>
      <n-form-item label="Password" path="user.password" :show-require-mark="false">
        <n-input
          type="password"
          placeholder="Password"
          v-model:value="formValue.user.password"
        />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-space justify="space-around">
        <n-button @click.prevent="submit()">Login</n-button>
        <n-button @click.prevent="submit()">Create an account</n-button>
      </n-space>
    </template>
    <n-a href class="forgetPasswordLink">Forgot your password?</n-a>
  </n-modal>
</template>

<style scoped lang="scss">
.loginModal {
  display: flex;
  flex-direction: column;
}
.buttonContainer {
  display: flex;
  justify-content: space-around;
}
.forgetPasswordLink {
  margin-top: 20px;
  text-align: end;
}
</style>
