<template>
  <v-container class="w-100" style="height: 100%">
    <v-card
      elevation="0"
      class="rounded-lg pa-3 overflow-hidden h-100 d-flex flex-column"
    >
      <v-table>
        <thead>
          <tr>
            <th colspan="4" class="py-3">
              <span class="text-h6 font-weight-medium text-grey-darken-4"
                >Order Data</span
              >
            </th>
          </tr>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Product</th>
            <th>Price</th>
            <th>Ordered At</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableRowVue v-for="order in orders" :order="order"></TableRowVue>
        </tbody>
      </v-table>
      <v-spacer></v-spacer>
      <v-card-actions> <v-pagination></v-pagination> </v-card-actions>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import TableRowVue from "../components/Order/TableRow.vue";
import orderStore from "../store/order";

const $order = orderStore();
const { orders } = storeToRefs($order);
</script>

<style scoped></style>
