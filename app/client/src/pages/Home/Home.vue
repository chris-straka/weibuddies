<script setup lang="ts">
import Blobs from "./Blobs/Blobs.vue"
import Login from "./LoginAndRegister/Login.vue";
</script>

<template>
  <div class="home">
    <Blobs />
    <Login />
  </div>
</template>

<style scoped>
  .home {
    display: flex;
  }
</style>