<script setup lang="ts">
import LoginForm from "./LoginForm/LoginForm.vue";
import BlobsVue from "@/components/Blobs/Blobs.vue";
</script>

<template>
  <div class="home">
    <h1 class="title">Wei Buddies</h1>
    <BlobsVue class="blobs" />
    <LoginForm class="loginForm" />
  </div>
</template>

<style scoped lang="scss">
.home {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid:
    ". WeiBuddies Login"
    ". Blobs Login";
}
.title {
  grid-area: WeiBuddies;
  font-size: clamp(30px, 4vw, 50px);
  align-self: end;
  margin-bottom: 40px;
  margin-top: -20px;
}
.blobs {
  grid-area: Blobs;
  align-self: start;
}
.loginForm {
  grid-area: Login;
  width: 300px;
  height: fit-content;
  align-self: center;
}

@media (max-width: 820px) {
  .home {
    grid:
      "WeiBuddies"
      "Login"
      "Blobs";
    justify-content: center;
  }
  .title {
    text-align: center;
  }
  .loginForm {
    align-self: start;
  }
  .blobs {
    justify-self: center;
    width: 300px;
  }
}
</style>
