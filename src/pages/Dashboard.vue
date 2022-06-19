<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card
          class="px-10 pt-10 h-100 rounded-lg d-flex flex-column align-center"
          elevation="0"
        >
          <v-avatar size="80" class="rounded-0">
            <v-img src="/src/assets/profits.png"></v-img>
          </v-avatar>
          <v-card-text>
            <h1
              class="text-h5 text-center font-weight-medium uppercase text-grey-darken-3"
            >
              PROFIT
            </h1>
            <span class="text-h4 text-center">&#8369;{{ profit_total }}</span>
            <div class="d-flex text-caption flex-column text-grey-darken-2">
              <span
                >Orders = &#8369;{{ totalOfOrder }}<br />
                Expenses = &#8369;{{ totalOfExpenses }}<br />Profit = Orders - Expenses<br />
                =&#8369;{{ profit_total }}</span
              ><br />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="6" v-for="d in data" :key="d.label">
            <v-card
              elevation="0"
              style="user-select: none"
              class="rounded-lg"
              @click.stop=""
            >
              <v-container>
                <v-row>
                  <v-col>
                    <v-card-title class="text-h6">
                      <span style="border-left: 5px solid #371b58" class="pl-2 py-0">{{
                        d.title
                      }}</span>
                    </v-card-title>
                    <v-card-subtitle class="text-subtitle-2">{{
                      d.subtitle
                    }}</v-card-subtitle>
                    <v-card-text class="text-h3 font-weight-regular">{{
                      d.count
                    }}</v-card-text>
                  </v-col>
                  <v-col>
                    <v-avatar size="120" class="rounded-0">
                      <v-img :src="d.src" alt="" />
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mb-5">
      <v-col>
        <v-card elevation="0" class="rounded-lg pa-5">
          <v-card-title
            ><span style="user-select: none">Monthly Statistics</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <LineChart
            :labels="[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]"
            :datasets="datasets"
          ></LineChart>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import Doughnut from "../components/Doughnut";
import LineChart from "../components/LineChart";
import expenseStore from "../store/expense";
import orderStore from "../store/order";
import productStore from "../store/product";
const { products_count } = storeToRefs(productStore());
const { orders_count, getMonthlyTotal, totalOfOrder } = storeToRefs(orderStore());
const {
  countOfExpenses,
  getMonthlyTotal: expensesMonthlyTotal,
  totalOfExpenses,
} = storeToRefs(expenseStore());
const profit_total = ref(0);
const profitTotalMonthly = ref<number[]>([]);

watchEffect(() => {
  let orders = getMonthlyTotal.value.slice();
  let expenses = expensesMonthlyTotal.value.slice();
  orders[5] += 4000;
  profit_total.value = totalOfOrder.value + 4000 - totalOfExpenses.value;
  profitTotalMonthly.value = orders.map((item, index) => (item -= expenses[index]));
});
const data = ref();
const datasets = ref([
  {
    label: "Profit",
    backgroundColor: "green",
    data: profitTotalMonthly,
  },
  {
    label: "Orders",
    backgroundColor: "#371B58",
    data: getMonthlyTotal,
  },
  {
    label: "Expenses",
    backgroundColor: "red",
    data: expensesMonthlyTotal,
  },
]);
watchEffect(() => {
  data.value = [
    {
      title: "Products",
      subtitle: "products #",
      src: "/src/assets/box.png",
      count: products_count.value,
    },
    {
      title: "Orders",
      subtitle: "Customer bought",
      src: "/src/assets/delivery-box.png",
      count: orders_count.value,
    },
    {
      title: "Expenses",
      subtitle: "Our expenses",
      src: "/src/assets/expenses.png",
      count: countOfExpenses.value,
    },
    {
      title: "Debts",
      subtitle: "People debts",
      src: "/src/assets/debt.png",
      count: 28,
    },
  ];
});
</script>

<style scoped></style>
