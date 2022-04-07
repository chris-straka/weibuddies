<script setup lang="ts">
import DecorativeBlobs from "@/components/DecorativeBlobs/DecorativeBlobs.vue";
import ProductList from "./ProductList/ProductList.vue";
import ProductListEmpty from "./ProductList/ProductListEmpty.vue";
import { useFetch } from "@/composables/useFetch";
import type { Product } from "@/types/types";

const { data, error } = useFetch<Product[], Error>("api/product", "GET");
</script>

<template>
  <div class="home">
    <h1 v-if="error">{{ error }}</h1>
    <Suspense v-else>
      <template #default>
        <ProductList :products="data" />
      </template>
      <template #fallback>
        <ProductListEmpty :number-of-empty-products="12" />
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
