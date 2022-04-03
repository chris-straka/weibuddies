<script setup lang="ts">
import { NButton } from "naive-ui";
import WeibuddiesHeading from "@/components/WeibuddiesHeading/WeibuddiesHeading.vue";
</script>

<template>
  <div class="navbar">
    <WeibuddiesHeading class="heading" />
    <n-button secondary type="info">Post Ad</n-button>
    <n-button>Login</n-button>
    <n-button>Sign-Up</n-button>
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
