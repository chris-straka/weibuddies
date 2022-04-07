<script setup lang="ts">
import { ref } from "vue";
import { NButton } from "naive-ui";
import WeibuddiesHeading from "@/components/WeibuddiesHeading/WeibuddiesHeading.vue";
import LoginFormModal from "@/components/Navbar/LoginFormModal/LoginFormModal.vue";
import SignUpModal from "@/components/Navbar/SignUpModal/SignUpModal.vue";
// import { useAuthStore } from "@/store";

// const authStore = useAuthStore();

const showLoginModal = ref(false);
const showSignupModal = ref(false);
</script>

<template>
  <div class="navbar">
    <WeibuddiesHeading class="heading" />
    <n-button secondary type="info">Post Ad</n-button>
    <n-button @click="showLoginModal = true">Login</n-button>
    <n-button @click="showSignupModal = true">Sign-Up</n-button>
    <LoginFormModal :show-modal="showLoginModal" />
    <SignUpModal :show-modal="showSignupModal" />
  </div>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
}
.blobs {
  width: 60px;
}
</style>
