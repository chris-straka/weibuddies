<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules, FormInst, FormValidationError } from "naive-ui";
import { NCard, NForm, NFormItem, NInput, NButton, useLoadingBar, NA, NSpace } from "naive-ui";
import { authStore } from "@/store";

const user = authStore()
const loadingBar = useLoadingBar()

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
      trigger: 'input'
    },
    password: {
      required: true,
      message: "Password is required",
      trigger: 'input'
    },
  }
};

const submit = ({ newUser }: { [newUser: string]: boolean }) => {
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (errors) {
      loadingBar.error()
      return
    } else {
      loadingBar.start()
    }
  });

  newUser ?
    user.signup() :
    user.login()
};
</script>

<template>
  <div class="loginFormComponent">
    <n-card size="medium" :segmented="{ content: true, footer: 'soft' }">
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
          <n-input type="password" placeholder="Password" v-model:value="formValue.user.password" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="space-around">
          <n-button @click.prevent="submit({ newUser: false })">Login</n-button>
          <n-button @click.prevent="submit({ newUser: true })">Create new account</n-button>
        </n-space>
      </template>
    </n-card>
    <n-a href class="forgetPasswordLink">Forgot your password?</n-a>
  </div>
</template>

<style scoped lang="scss">
.loginFormComponent {
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
