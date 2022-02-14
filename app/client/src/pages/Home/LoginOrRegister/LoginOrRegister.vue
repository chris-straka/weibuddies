<template>
  <var-form @submit.prevent="submitForm">
    <var-input type="email" placeholder="Email"></var-input>
    <var-input type="password" placeholder="Password"></var-input>
  </var-form>
</template>

<style lang="css">
</style>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  data() {
    return {
      formIsValid: true
    }
  },
  methods: {
    validateForm() {
      this.formIsValid = true
    },
    submitForm() {
      this.validateForm()
    }
  }
})
</script>
