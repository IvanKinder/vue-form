<template>
  <v-container class="content">
    <v-row>
      <v-col cols="12" md="3">Метки</v-col>
      <v-col cols="12" md="2">Тип записи</v-col>
      <v-col cols="12" md="3">Логин</v-col>
      <v-col cols="12" md="3">Пароль</v-col>
      <v-col cols="12" md="1" />
    </v-row>
    <UserItem
      v-for="user in users"
      :user="user"
      :key="user.id"
      :updateUser="updateUser"
      :deleteUser="deleteUser"
    />
  </v-container>
</template>

<script setup lang="ts">
import UserItem from "./UserItem.vue";
import { useUsersStore } from "../stores/usersForm";
import { storeToRefs } from "pinia";

const userStore = useUsersStore();
const { updateUser, deleteUser } = userStore;
const { users } = storeToRefs(userStore);
</script>
<style scoped>
.content {
  height: 500px;
  overflow: auto;
}</style>