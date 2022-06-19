<template>
  <v-app>
    <Navigator></Navigator>
    <ActionContainerVue></ActionContainerVue>
    <v-main class="bg-grey-lighten-5 h-full">
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navigator from "./components/Navigator.vue";
import ActionContainerVue from "./components/ActionContainer.vue";
import productStore from "./store/product";
import orderStore from "./store/order";
import expenseStore from "./store/expense";
const $product = productStore();
const $order = orderStore();
const $expense = expenseStore();
$product.getAll();
$order.getAll();
$expense.getAll();
</script>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
