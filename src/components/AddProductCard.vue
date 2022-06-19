<template>
  <v-card flat class="d-flex flex-column h-100 py-15">
    <v-avatar size="150" class="rounded-0 mx-auto">
      <v-img src="/src/assets/add-to-basket.png" alt="alt" />
    </v-avatar>
    <v-card-title class="pa-8 text-grey-darken-3">
      <v-spacer></v-spacer>
      <span class="text-h3 font-weight-medium ml-2 mt-3">Add Product</span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-text-field
        :error-messages="error_message($v.name)"
        v-model="product.name"
        label="Name"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        :error-messages="error_message($v.price)"
        v-model="product.price"
        label="Price"
        type="number"
        variant="outlined"
      ></v-text-field>
    </v-card-text>
    <div class="d-flex flex-column px-5 py-5">
      <v-btn
        block
        size="large"
        variant="contained"
        class="w-50 my-1"
        color="success"
        @click="submit"
        >Add</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import productCreate from "../forms/product/product-create";
import productStore from "../store/product";
const $product = productStore();
const { $v, product } = productCreate();
const error_message = (val: any) => {
  if (val.$invalid && val.$dirty) {
    return val.$errors[0].$message || "There is an error";
  }

  return "";
};
const submit = () => {
  if ($v.value.$invalid) {
    $v.value.$touch();
  }

  $product.store(product).then(() => {
    product.name = "";
    product.price = 0;
    $v.value.$reset();
  });
};
</script>

<style scoped></style>
