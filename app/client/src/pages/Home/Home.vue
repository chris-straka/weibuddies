<script setup lang="ts">
import BlobsVue from "@/components/Blobs/Blobs.vue";
import { Suspense } from "vue";
</script>

<template>
  <div class="home">
    <Suspense>
      <Products />
      <template #fallback>Loading...</template>
    </Suspense>
    <BlobsVue class="blobs" />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  grid:
    "title title"
    "items blobs";
}
.blobs {
  grid-area: "blobs";
}
</style>
