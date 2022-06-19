<template>
  <v-card flat class="d-flex flex-column h-100 py-15">
    <v-avatar size="150" class="rounded-0 mx-auto">
      <v-img src="/src/assets/expenses.png" alt="alt" />
    </v-avatar>
    <v-card-title class="pa-8 text-grey-darken-3 text-center">
      <v-spacer></v-spacer>
      <span class="text-h3 font-weight-medium ml-2 mt-3">Add Expense</span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-text-field
        @blur="$v.product_name.$touch()"
        :error-messages="error_message($v.product_name)"
        v-model="create.product_name"
        variant="outlined"
        label="Product Name"
      ></v-text-field>
      <v-textarea
        v-model="create.description"
        variant="outlined"
        label="Description"
      ></v-textarea>
      <v-text-field
        @blur="$v.total.$touch()"
        :error-messages="error_message($v.total)"
        type="number"
        v-model="create.total"
        variant="outlined"
        label="Total"
      ></v-text-field>
    </v-card-text>
    <div class="d-flex flex-column px-5 py-5">
      <v-btn
        block
        size="large"
        variant="contained"
        class="w-50 my-1 text-white"
        color="green-darken-2"
        @click="submit"
        >Add Expense</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import expenseCreate from "../forms/expense/expense-create";
import expenseStore from "../store/expense";
const $expense = expenseStore();
const { $v, create } = expenseCreate();
const error_message = (val: any) => {
  if (val.$invalid && val.$dirty) {
    return val.$errors[0].$message || "There is an error";
  }

  return "";
};
const submit = () => {
  if ($v.value.$invalid) {
    $v.value.$touch();
    return;
  }

  $expense.store(create).then(() => {
    $v.value.$reset();
    create.product_name = "";
    create.description = "";
    create.total = 0;
  });
};
</script>

<style scoped></style>
