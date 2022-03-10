<script setup lang="ts">
import { NCard, NDivider, NForm, NFormItem, NInput, NButton } from "naive-ui"
</script>

<template>
  <n-card>
    <n-form label-placement="left">
      <n-form-item>
        <n-input></n-input>
      </n-form-item>
      <n-form-item>
        <n-input></n-input>
      </n-form-item>
    </n-form>
    <n-divider />
    <n-button>Login</n-button>
    <n-button>Create new account</n-button>
  </n-card>
</template>

<style scoped lang="scss"></style>