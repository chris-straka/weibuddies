<script setup lang="ts">
import { NCard, NDivider, NForm, NFormItem, NInput, NButton } from "naive-ui";
</script>

<template>
  <n-card>
    <n-form label-placement="left" label-width="auto">
      <n-form-item label="Email">
        <n-input placeholder="Email"></n-input>
      </n-form-item>
      <n-form-item label="Password">
        <n-input type="password" placeholder="Password"></n-input>
      </n-form-item>
      <n-divider />
      <div class="buttonContainer">
        <n-button>Login</n-button>
        <n-button>Create new account</n-button>
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
