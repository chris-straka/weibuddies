<script setup lang="ts">
defineProps<{
  title: string;
  price: string;
  imageUrl: string;
  description: string;
  dateCreated: string;
}>();
</script>

<template>
  <div>
    <img src="imageUrl" alt="productDescription" />
    <h1>{{ title }}</h1>
    <p>{{ price }}</p>
    <p>{{ dateCreated }}</p>
    <p>{{ description }}</p>
    <button>Reserve</button>
    <button>Buy</button>
  </div>
</template>
