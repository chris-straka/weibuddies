<script setup lang="ts">
import BlobA from "./BlobA.vue";
import BlobB from "./BlobB.vue";
</script>

<!-- https://blobs.app/ -->
<template>
  <div class="blobs">
    <BlobA />
    <BlobB />
  </div>
</template>

<style scoped>
.blobs {
  display: flex;
  justify-content: space-around;
}
</style>
