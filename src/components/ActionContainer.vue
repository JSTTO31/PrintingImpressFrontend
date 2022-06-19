<template>
  <v-navigation-drawer
    style="user-select: none"
    position="right"
    border="0"
    flat
    width="450"
    color="transparent"
  >
    <v-card
      style="height: 100%"
      class="border-left-lg d-flex flex-column overflow-hidden"
    >
      <div class="d-flex px-5 pt-5">
        <v-btn icon="mdi-menu" flat class="rounded-0"></v-btn><v-spacer></v-spacer>
        <v-btn-toggle v-model="tab">
          <v-btn
            v-for="action in actions"
            :key="action.name"
            :icon="action.icon"
            :value="action.name"
          ></v-btn>
        </v-btn-toggle>
      </div>
      <keep-alive>
        <transition name="route" mode="out-in">
          <component :is="currentComponent"></component>
        </transition>
      </keep-alive>
    </v-card>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import AddProductCardVue from "./AddProductCard.vue";
import AddOrderCardVue from "./AddOrderCard.vue";
import AddExpenseCardVue from "./AddExpenseCard.vue";
import { ref, shallowRef, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
const tab = ref("order");
const currentComponent = shallowRef(AddOrderCardVue);
const actions = [
  { name: "order", icon: "mdi-store" },
  {
    name: "product",
    icon: "mdi-package-variant-closed",
  },
  {
    name: "expenses",
    icon: "mdi-cash-minus",
  },
  {
    name: "debt",
    icon: "mdi-cash-refund",
  },
];
const route = useRoute();

watchEffect(() => {
  tab.value = route.name?.toLowerCase();
});

watch(
  () => tab.value,
  () => {
    if (tab.value == "product") {
      currentComponent.value = AddProductCardVue;
    } else if (tab.value == "expense" || tab.value == "expenses") {
      currentComponent.value = AddExpenseCardVue;
    } else {
      currentComponent.value = AddOrderCardVue;
    }
  }
);
</script>

<style scoped>
.border-left-lg {
  border-radius: 20px 0 0 20px;
  border-left: 1px solid rgba(211, 207, 207, 0.877);
}

.route-enter-from {
  opacity: 0;
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
}
</style>
