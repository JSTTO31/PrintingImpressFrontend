<template>
  <v-navigation-drawer width="325" class="bg-white" style="user-select: none">
    <v-list class="mb-8">
      <v-list-item>
        <div class="d-flex pa-5">
          <v-avatar rounded="0" class="rounded-lg" size="60">
            <img src="/src/assets/logo.png" class="w-100 h-100" alt="logo" />
          </v-avatar>
          <div class="px-2 py-3">
            <h1 class="text-h6 font-weight-bold" color="#fff">Printing Impress</h1>
            <h2 class="text-caption">Print an high quality product</h2>
          </div>
        </div>
      </v-list-item>
    </v-list>
    <v-list nav>
      <v-list-item
        :prepend-icon="list.icon"
        class="px-8 rounded text-h6 text-grey-darken-1 my-2"
        active-class="text-primary"
        v-for="list in lists"
        @click="list.action"
        :active="router.currentRoute.value.name == list.title"
      >
        <v-list-item-title class="text-body-1 mt-1 ml-n5">{{
          list.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const lists = [
  {
    title: "Dashboard",
    icon: "mdi-home-outline",
    action() {
      return router.push({ name: "Dashboard" });
    },
  },
  {
    title: "Order",
    icon: "mdi-handshake-outline",
    action() {
      return router.push({ name: "Order" });
    },
  },
  {
    title: "Product",
    icon: "mdi-package-variant-closed",
    action() {
      return router.push({ name: "Product" });
    },
  },
  {
    title: "Expenses",
    icon: "mdi-cash-minus",
    action() {
      return router.push({ name: "Expenses" });
    },
  },
  {
    title: "Debts",
    icon: "mdi-bank",
    action() {
      return router.push({ name: "Order" });
    },
  },
];
</script>

<style scoped></style>
