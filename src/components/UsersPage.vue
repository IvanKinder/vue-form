<template>
  <div class="page">
    <PageHeader />
    <ToolTipBlock />
    <UsersForm />
  </div>
</template>

<script setup lang="ts">
import PageHeader from "./PageHeader.vue";
import ToolTipBlock from "./ToolTipBlock.vue";
import UsersForm from "./UsersForm.vue";
</script>

<style scoped>
.page {
  display: grid;
  gap: 10px;
}
</style>
