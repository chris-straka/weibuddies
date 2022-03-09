<script setup lang="ts">
import Blobs from "./Blobs/Blobs.vue"
import LoginAndRegister from "./LoginAndRegister/LoginAndRegister.vue";
</script>

<template>
  <div class="home">
    <div>
      <h1 class="title">Wei Buddies</h1>
      <Blobs />
    </div>
    <LoginAndRegister class="login" />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: space-evenly;
}
.title {
  font-size: clamp(2rem, 10vw, 3rem);
  margin-bottom: 30%;
}
.login {
  margin-right: 15%;
}
</style>