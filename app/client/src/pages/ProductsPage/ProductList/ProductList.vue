<script setup lang="ts">
import type { Product } from "@/types/types";
import { NCard } from "naive-ui";

defineProps<{
  products: Product[];
}>();
</script>

<template>
  <template v-for="product of products" :key="product.id">
    <n-card title="product?.title">
      <template #cover>
        <img src="product?.imageUrl" />
      </template>
      {{ product }}
    </n-card>
  </template>
</template>

<style></style>
