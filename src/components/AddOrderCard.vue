<template>
  <v-card flat class="d-flex flex-column h-100 py-15">
    <v-avatar size="150" class="rounded-0 mx-auto">
      <v-img src="/src/assets/add-order.png" alt="alt" />
    </v-avatar>
    <v-card-title class="pa-8 text-grey-darken-3 text-center">
      <v-spacer></v-spacer>
      <span class="text-h3 font-weight-medium ml-2 mt-3">Create Order</span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="create.customer_name"
        label="Customer Name"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="create.quantity"
        label="Quantity"
        type="number"
        variant="outlined"
        :error-messages="error_message($v.quantity)"
      ></v-text-field>
      <v-select
        v-model="create.product_id"
        label="Select Product"
        variant="outlined"
        item-title="name"
        item-value="id"
        :items="products"
        :error-messages="error_message($v.product_id)"
      >
      </v-select>
      <v-text-field
        v-model="create.total"
        label="Total"
        variant="outlined"
        readonly
      ></v-text-field>
    </v-card-text>
    <div class="d-flex flex-column px-5 py-5">
      <v-btn
        @click="createAction"
        block
        size="large"
        variant="contained"
        class="w-50 my-1"
        color="purple"
        >Create</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import orderCreate from "../forms/order/order-create";
import orderStore from "../store/order";
import productStore from "../store/product";
const $product = productStore();
const $order = orderStore();
const { products } = storeToRefs($product);
const { create, $v } = orderCreate();
const createAction = () => {
  if ($v.value.$invalid) {
    $v.value.$touch();
    return;
  }

  $order.store(create).then(() => {
    $v.value.$reset();
    create.customer_name = "Unknown Customer";
    create.product_id = "";
    create.quantity = 0;
    create.total = 0;
  });
};
const error_message = (val: any) => {
  if (val.$invalid && val.$dirty) {
    return val.$errors[0].$message || "There is an error";
  }

  return "";
};

$product.getAll();
</script>

<style scoped></style>
