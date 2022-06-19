<template>
  <tr>
    <td>#{{ order.id }}</td>
    <td>{{ order.customer_name }}</td>
    <td>{{ order.product.name }}</td>
    <td>&#8369;{{ order.product.price }}</td>
    <td>{{ order.created_at }}</td>
    <td>{{ order.quantity }}</td>
    <td>&#8369;{{ order.total }}</td>
    <td>
      <v-menu>
        <template #activator="{ props }">
          <button v-bind="props">
            <v-icon size="small">mdi-dots-horizontal</v-icon>
          </button>
        </template>
        <v-card>
          <v-list>
            <v-list-item @click="deleteDialog = true">Remove</v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </td>
  </tr>
  <v-dialog v-model="deleteDialog">
    <v-card width="550" class="pa-3">
      <v-card-title>
        <span>Remove Order</span>
        <v-spacer></v-spacer>
        <v-icon color="grey-darken-2">mdi-delete</v-icon>
      </v-card-title>
      <v-card-text>
        <p>
          You're about to delete order <b class="text-error">ID No {{ order.id }}</b
          >, Are you sure about that?
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="error" @click="deleteOrder">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import orderStore, { Order } from "../../store/order";
import productStore from "../../store/product";
const $order = orderStore();
const deleteDialog = ref(false);
const props = defineProps<{ order: Order }>();
const $product = productStore();
const { products } = storeToRefs(productStore());
const deleteOrder = () =>
  $order.destroy(props.order.id).then(() => (deleteDialog.value = false));
</script>

<style scoped></style>
