<script setup lang="ts">
import Home from "@/pages/Home/Home.vue";
</script>

<template>
  <Home />
</template>

<style lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit; // allows plugins to keep their own box sizing
}

:root {
  --primary: hsl(89, 58%, 75%);
  --primary-blob: hsl(89, 58%, 82%);
  --secondary: hsl(207, 87%, 67%);
  --secondary-blob: hsl(207, 87%, 82%);
  --background-color: hsl(216, 20%, 95%);
  --font: Avenir, Helvetica, Arial, sans-serif;

  background-color: var(--background-color);
  color: var(--font-color);
  height: 100%;
}

body {
  min-height: 100%;
  box-sizing: border-box;
  font-family: var(--font);
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box; // sets the padding/margin to what we expect
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: hsl(200, 6%, 10%);
    --font-color: hsl(36, 10%, 90%);
    --form-color: hsl(202, 7%, 24%);
    --form-font-color: hsl(37, 9%, 63%);
  }
}
</style>
