<template>
  <v-container class="h-100">
    <v-card
      elevation="0"
      class="rounded-lg pa-3 h-100 overflow-hidden d-flex flex-column"
    >
      <v-card-title><span>Expenses Data</span> </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th colspan="2">Description</th>
            <th>Date</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableRowVue v-for="expense in expenses" :expense="expense"></TableRowVue>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import TableRowVue from "../components/Expense/TableRow.vue";
import { storeToRefs } from "pinia";
import expenseStore from "../store/expense";

const { expenses } = storeToRefs(expenseStore());
const $expense = expenseStore();

$expense.getAll();
</script>

<style scoped></style>
