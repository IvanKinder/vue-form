import { defineStore } from "pinia";
import { ref } from "vue";

export const EUserTypes = {
  LDAP: "LDAP",
  local: "local",
} as const;

export const EUserTypesNames = {
  LDAP: "LDAP",
  local: "Локальная",
} as const;

export interface ITag {
  text: string;
}

export interface IUser {
  id: number;
  login: string;
  password: string;
  userType: keyof typeof EUserTypes;
  tag: ITag[];
}

const initialUserValue = {
  id: new Date().getTime(),
  login: "",
  password: "",
  userType: EUserTypes.LDAP,
  tag: [],
};

const savedData = localStorage.getItem("awesomeUsers");
const savedUsers = savedData ? JSON.parse(savedData) : null;

export const useUsersStore = defineStore("users", () => {
  const users = ref<IUser[]>(savedUsers || [initialUserValue]);
  const showSnackbar = ref(false);

  const toggleNotify = () => {
    showSnackbar.value = true;
  };

  const saveData = () => {
    localStorage.setItem("awesomeUsers", JSON.stringify(users.value));
    toggleNotify();
  };

  const addUser = () => {
    users.value.push({ ...initialUserValue, id: new Date().getTime() });
    saveData();
  };

  const updateUser = (data: IUser) => {
    users.value = users.value.map((user: IUser) =>
      user.id === data.id ? { ...data } : user
    );
    saveData();
  };

  const deleteUser = (id: number) => {
    users.value = users.value.filter((item) => item.id !== id);
    saveData();
  };
  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    showSnackbar,
  };
});
