<template>
  <div class="form-header">
    <h2>Учетные записи</h2>
    <v-btn icon="mdi-plus" @click="addUser" />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "../stores/usersForm";

const { addUser } = useUsersStore();
</script>

<style scoped>
.form-header {
  display: flex;
  align-items: center;
  gap: 25px;
}
</style>
