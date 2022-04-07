<script setup lang="ts">
import { NDataTable } from "naive-ui";
import { useFetch } from "@/composables/useFetch";
import type { Order } from "@/types/types";

const { data, error } = useFetch<Order[], Error>("/api/orders/", "GET");

const columns = [
  { title: "Order Id", key: "id" },
  { title: "Product", key: "title" },
  { title: "Price", key: "price" },
  { title: "Order Status", key: "status" },
  { title: "Created At", key: "userId" },
  { title: "Expires At", key: "expiresAt" },
];

const orderData = data.value.map((order, index) => {
  return {
    key: index,
    id: order.id,
    price: order.productPrice,
    status: order.status,
    expiresAt: order.expiresAt,
  };
});
</script>

<template>
  <template v-if="error">Error</template>
  <n-data-table :columns="columns" :data="orderData" virtual-scroll />
</template>
