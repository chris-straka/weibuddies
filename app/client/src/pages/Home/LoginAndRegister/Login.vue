<!-- I'm going to use the options API for this form so I practice using both ways -->
<template>
  <el-card>
    <el-form @submit.prevent="submitForm" label-width="80px">
      <el-form-item prop="email" label="Email">
        <el-input type="email" v-model.trim="email.value"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input type="password" v-model.trim="password.value"></el-input>
      </el-form-item>
      <el-divider />
      <el-button type="primary">Log In</el-button>
      <el-button type="success">Create an account</el-button>
    </el-form>
  </el-card>
</template>

<style lang="css"></style>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  data() {
    return {
      email: {
        value: "",
        isValid: true
      },
      password: {
        value: "",
        isValid: true
      }
    }
  },
  methods: {
    submitForm() {

    }
  }
})
</script>
