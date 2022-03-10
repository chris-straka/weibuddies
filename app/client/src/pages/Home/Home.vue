<script setup lang="ts">
import HomeAccess from "./HomeAccess/HomeAccess.vue";
import HomeGreeting from "./HomeGreeting/HomeGreeting.vue";
</script>

<template>
  <div class="home">
    <HomeGreeting />
    <HomeAccess class="login" />
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
  width: 300px;
}
</style>
