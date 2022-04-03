<script setup lang="ts">
import { NH1, NText } from "naive-ui";
</script>

<template>
  <n-h1 prefix="bar">
    <n-text class="weibuddies">Wei Buddies</n-text>
  </n-h1>
</template>

<style>
.weibuddies {
  position: relative;
  top: 6%;
  margin-left: 2px;
  color: linear-gradient(to top, red 0%, blue 100%);
  color: var(--primary);
}
</style>
