<script setup lang="ts">
import { ref } from "vue";
import type { FormRules, FormInst, FormValidationError } from "naive-ui";
import { NCard, NDivider, NForm, NFormItem, NInput, NButton } from "naive-ui";

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  user: {
    email: "",
    password: "",
  },
});

const rules: FormRules = {
  email: {
    required: true,
    message: "Email is required",
  },
  password: {
    required: true,
    message: "Password is required",
  },
};

const submit = () => {
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      console.log("yes");
    } else {
      console.log(errors);
    }
  });
};
</script>

<template>
  <n-card>
    <n-form
      ref="formRef"
      label-placement="left"
      label-width="auto"
      :model="formValue"
      :rules="rules"
    >
      <n-form-item label="Email">
        <n-input placeholder="Email" v-model:value="formValue.user.email" />
      </n-form-item>
      <n-form-item label="Password">
        <n-input
          type="password"
          placeholder="Password"
          v-model:value="formValue.user.password"
        />
      </n-form-item>
      <n-divider />
      <div class="buttonContainer">
        <n-button @click.prevent="submit">Login</n-button>
        <n-button @click.prevent>Create new account</n-button>
      </div>
    </n-form>
  </n-card>
</template>

<style scoped lang="scss">
.buttonContainer {
  display: flex;
  justify-content: space-around;
}
</style>
