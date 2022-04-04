<script setup lang="ts">
import type { Product } from "@/types/types";
import { NCard, NSkeleton } from "naive-ui";

defineProps<{
  products: (() => Promise<Product[]>) | null;
  loading: boolean;
}>();
</script>

<template>
  <template v-for="product of products" :key="product.id">
    <n-card title="product?.title">
      <template #cover>
        <n-skeleton></n-skeleton>
        <img src="product?.imageUrl" />
      </template>
      {{ product }}
    </n-card>
  </template>
</template>

<style></style>
