<template>
  <div class="block">
    <span class="demonstration">Default</span>
    <el-image :src="url"></el-image>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    url: String
  }
})
</script>