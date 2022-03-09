<template>
    <li v-for="i in 10" :key="i" class="infinite-list-item">{{ i }}</li>
    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
    ></el-pagination>
</template>
