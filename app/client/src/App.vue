<script setup lang="ts">
import Home from "./pages/Home/Home.vue"
import Product from "./pages/Product/Product.vue"
import ProductCreate from "./pages/ProductCreate/ProductCreate.vue"
import User from "./pages/User/User.vue"
</script>

<template>
  <Product />
</template>

<style>
:root {
  --primary: hsl(89, 58%, 75%);
  --primary-blob: hsl(89, 58%, 82%);
  --secondary: hsl(207, 87%, 67%);
  --secondary-blob: hsl(207, 87%, 82%);
  --background-color: hsl(216, 20%, 95%);
  --font: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>