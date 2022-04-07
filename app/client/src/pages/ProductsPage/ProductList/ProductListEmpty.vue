<script setup lang="ts">
import { NCard, NSkeleton } from "naive-ui";

defineProps<{
  numberOfEmptyProducts: number;
}>();
</script>

<template>
  <template v-for="product of numberOfEmptyProducts" :key="product.id">
    <n-card>
      <template #cover>
        <n-skeleton />
      </template>
      <template>
        <n-skeleton />
      </template>
    </n-card>
  </template>
</template>
