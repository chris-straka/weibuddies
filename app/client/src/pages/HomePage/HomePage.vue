<script setup lang="ts">
import DecorativeBlobs from "@/components/DecorativeBlobs/DecorativeBlobs.vue";
import ProductList from "@/components/ProductList/ProductList.vue";
import LoadingStuff from "@/components/LoadingStuff/LoadingStuff.vue";
import { useFetch } from "@/composables/useFetch";
import { type Product, HttpMethod } from "@/types/types";

const { data, error } = useFetch<Product[]>("TODO", HttpMethod.GET);
</script>

<template>
  <div class="home">
    <h1 v-if="error">{{ error }}</h1>
    <Suspense v-else>
      <template #default>
        <ProductList :products="data" />
      </template>
      <template #fallback>
        <LoadingStuff />
      </template>
    </Suspense>
    <DecorativeBlobs class="blobs" />
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
