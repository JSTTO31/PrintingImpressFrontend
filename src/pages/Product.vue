<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="4">
        <v-card
          class="h-100 rounded-lg d-flex flex-column align-center pt-10"
          elevation="0"
        >
          <v-avatar size="180" class="rounded-0 mx-auto">
            <v-img src="/src/assets/box.png" alt="alt" />
          </v-avatar>
          <v-card-text class="text-center">
            <h1 class="text-h5 font-weight-medium text-grey-darken-4">
              Number of Products
            </h1>
            <h1 class="text-h1 text-center my-5 text-grey-darken-4">
              {{ products_count }}
            </h1>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card class="pa-5 rounded-lg" elevation="0">
          <BarChart :chartData="chartData"></BarChart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          elevation="0"
          class="rounded-lg h-100 pa-3 overflow-hidden d-flex flex-column"
        >
          <v-table>
            <thead>
              <tr>
                <th colspan="4" class="py-3">
                  <span class="text-h6 font-weight-medium text-grey-darken-4"
                    >Product Data</span
                  >
                </th>
              </tr>
              <tr>
                <th>ID</th>
                <th colspan="2">Name</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableRowVue v-for="product in products" :product="product"></TableRowVue>
            </tbody>
          </v-table>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-pagination
              v-if="paginate_length"
              :length="paginate_length"
              v-model="page"
              total-visible="5"
            ></v-pagination>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BarChart from "../components/BarChart";
import TableRowVue from "../components/Product/TableRow.vue";
import productStore from "../store/product";
import { storeToRefs } from "pinia";
import { computed, reactive, ref, watchEffect } from "vue";
const $product = productStore();
const {
  mostBoughtName,
  mostBoughtOrderCount,
  products_count,
  mostBoughtOrderTotal,
  products: all_products,
} = storeToRefs($product);
const chartData = computed(() => ({
  labels: all_products.value
    .sort((a, b) => a.orders.length - b.orders.length)
    .reverse()
    .slice(0, 5)
    .map((item) => item.name),
  datasets: [
    {
      label: "Most Bought Product",
      backgroundColor: "#FF7396",
      data: all_products.value
        .sort((a, b) => a.orders.length - b.orders.length)
        .reverse()
        .slice(0, 5)
        .map((item) => item.orders.length),
    },
    {
      label: "Total Of Amount Order",
      backgroundColor: "#F4E06D",
      data: all_products.value
        .sort((a, b) => a.orders.length - b.orders.length)
        .reverse()
        .slice(0, 5)
        .map((item) => item.orders.reduce((sum, order) => (sum += order.total), 0)),
    },
  ],
}));

const { page, paginate_length, products } = $product.pagination();
</script>

<style scoped></style>
