<template>
  <tr style="user-select: none">
    <td>#{{ product.id }}</td>
    <td colspan="2" v-text="product.name"></td>
    <td>&#8369;{{ product.price }}</td>
    <td v-text="product.created_at"></td>
    <td v-text="product.updated_at"></td>
    <td>
      <v-menu>
        <template #activator="{ props }">
          <button v-bind="props"><v-icon>mdi-dots-horizontal</v-icon></button>
        </template>
        <v-card elevation="0" class="rounded border">
          <v-list>
            <v-list-item @click="editDialog = true" title="Edit"></v-list-item>
            <v-list-item @click="destroyDialog = true" title="Remove"></v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </td>
  </tr>
  <v-dialog v-model="destroyDialog">
    <v-card width="450">
      <v-card-title><v-icon>mdi-delete-outline</v-icon>Remove Product</v-card-title>
      <v-card-text
        >Are you sure you want to delete this
        <span class="text-error">{{ product.name }}</span
        >?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="" @click="destroyDialog = false">Cancel</v-btn>
        <v-btn color="error" @click="removeProduct">Remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="editDialog">
    <v-card width="450">
      <v-card-title>Edit Product</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="">
          <v-text-field
            @blur="$v.name.$touch()"
            :error-messages="error_message($v.name)"
            v-model="edit.name"
            variant="outlined"
            label="Name"
          ></v-text-field>
          <v-text-field
            @blur="$v.price.$touch()"
            :error-messages="error_message($v.price)"
            v-model="edit.price"
            variant="outlined"
            label="Price"
          ></v-text-field>
          <v-btn type="submit" block color="success" @click="updateProduct">Update</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import productStore, { Product } from "../../store/product";
import productEdit from "../../forms/product/product-edit";

const props = defineProps<{ product: Product }>();
const $product = productStore();
const destroyDialog = ref(false);
const editDialog = ref(false);
const { edit, $v } = productEdit(props.product);
// method
const removeProduct = () => {
  $product.destroy(props.product.id).then(() => {
    destroyDialog.value = false;
  });
};
const updateProduct = () => {
  $product.update(edit, props.product.id);
};
const error_message = (val: any) => {
  if (val.$invalid && val.$dirty) {
    return val.$errors[0].$message || "There is an error";
  }

  return "";
};
</script>

<style lang="scss" scoped></style>
