<template>
  <v-container>
    <v-form @submit.prevent="submitForm" ref="formRef">
      <v-row>
        <v-col cols="12" md="3" align-self="auto">
          <v-text-field
            v-model="tag"
            :counter="50"
            label="Метки"
            :required="false"
            density="compact"
            @blur="onBlur(user.id)"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2">
          <v-select
            v-model="userType"
            :rules="[rules.required]"
            :items="items"
            item-title="value"
            item-value="title"
            label="Тип записи"
            required
            density="compact"
            @update:modelValue="typeSelect(user.id)"
          ></v-select>
        </v-col>

        <v-col cols="12" :md="isLocalUser ? 3 : 6">
          <v-text-field
            v-model="login"
            :counter="100"
            :rules="[rules.required, (val: string) => rules.maxLen(val, 100)]"
            label="Логин"
            required
            density="compact"
            @blur="onBlur(user.id)"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" v-if="isLocalUser">
          <v-text-field
            :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPass = !showPass"
            v-model="password"
            :type="showPass ? 'text' : 'password'"
            :counter="100"
            :rules="[rules.required, (val: string) => rules.maxLen(val, 100)]"
            label="Пароль"
            required
            density="compact"
            @blur="onBlur(user.id)"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="1" class="delete-btn">
          <v-btn
            @click="deleteUserItem(user.id)"
            size="x-small"
            icon="mdi-trash-can-outline"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { ITag, IUser } from "../stores/usersForm";
import { EUserTypes, EUserTypesNames } from "../stores/usersForm";
import type { VForm } from "vuetify/components";

interface Props {
  user: IUser;
  updateUser: (data: IUser) => void;
  deleteUser: (id: number) => void;
}

const { user, updateUser, deleteUser } = defineProps<Props>();

const userId = ref<number>(user.id);
const showPass = ref(false);
const tag = ref(user.tag.map((tag: ITag) => tag.text).join(";"));
const userType = ref<keyof typeof EUserTypes>(user.userType);
const login = ref(user.login);
const password = ref(user.password);
const formRef = ref<InstanceType<typeof VForm> | null>(null);
const currentUser = ref<IUser>(user);

const items = [
  {
    title: EUserTypes.local,
    value: EUserTypesNames[EUserTypes.local],
  },
  { title: EUserTypes.LDAP, value: EUserTypes.LDAP },
];

const isLocalUser = computed(() => userType.value === EUserTypes.local);

const rules = {
  required: (value: string) => !!value || "Заполните поле",
  maxLen: (value: string, maxLen: number) =>
    value.length <= maxLen || `Максимум ${maxLen} символов`,
};

const formatTags = () => {
  return tag.value.split(";").map((item) => ({ text: item }));
};

const onBlur = async (id: number) => {
  userId.value = id;

  if (formRef?.value) {
    const isValid = await formRef.value.validate();
    if (isValid.valid && userId.value !== undefined) {
      const user = {
        id: userId.value,
        login: login.value,
        password: password.value,
        userType: userType.value,
        tag: formatTags(),
      };
      currentUser.value = user;
      submitForm();
    }
  }
};

const typeSelect = async (id: number) => {
  userId.value = id;

  if (!isLocalUser.value) {
    password.value = "";
  }
  if (formRef?.value) {
    const isValid = await formRef.value.validate();
    
    if (isValid.valid && userId.value !== undefined) {
      const user = {
        id: userId.value,
        login: login.value,
        password: password.value,
        userType: userType.value,
        tag: formatTags(),
      };
      currentUser.value = user;
      submitForm();
    }
  }
};

const submitForm = () => {
  if (currentUser.value) {
    updateUser(currentUser.value);
  }
};

const deleteUserItem = (id: number) => {
  userId.value = id;
  if (userId.value !== undefined) {
    deleteUser(userId.value);
  }
};
</script>

<style scoped>
.delete-btn {
  margin-top: 5px;
}
</style>
