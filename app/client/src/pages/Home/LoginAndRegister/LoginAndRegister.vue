<template>
  <el-card class="login">
    <el-form label-width="80px">
      <el-form-item prop="email" label="Email">
        <el-input type="email" v-model.trim="email.value"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input type="password" v-model.trim="password.value"></el-input>
      </el-form-item>
      <el-divider />
      <el-button type="primary" @click="submitForm({ isNewUser: false })">Log In</el-button>
      <el-button type="success" @click="submitForm({ isNewUser: true })">Create an account</el-button>
    </el-form>
  </el-card>
</template>

<style lang="scss">
.login {
  height: 204px;
}
</style>

<script lang="ts">
// I'm going to use the options API for practice 
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
    submitForm(user: { [isNewUser: string]: boolean }) {

      const actionPayload = {
        email: this.email.value,
        password: this.password.value
      }

    }
  }
})
</script>
