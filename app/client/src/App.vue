<script setup lang="ts">
// import NavbarVue from "@/components/Navbar/Navbar.vue";
import ProductsPage from "@/pages/ProductsPage/ProductsPage.vue";
import {
  darkTheme,
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
} from "naive-ui";

let colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? darkTheme
  : null;
</script>

<template>
  <n-config-provider :theme="colorScheme">
    <n-loading-bar-provider>
      <n-message-provider>
        <!-- <NavbarVue /> -->
        <ProductsPage />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
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
  --primary: hsl(160, 69%, 64%);
  --primary-blob: hsl(89, 58%, 75%);
  --secondary: hsl(200, 72%, 67%);
  --secondary-blob: hsl(207, 87%, 67%);
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
