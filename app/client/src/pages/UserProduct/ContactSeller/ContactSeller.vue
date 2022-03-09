<template>
    <el-card>
        Contact Seller
        <el-input type="textarea"></el-input>
        <el-checkbox v-model="checked">Send me a copy of the email</el-checkbox>
    </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
