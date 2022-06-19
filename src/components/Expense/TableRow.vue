<template>
  <tr>
    <td>#{{ expense.id }}</td>
    <td>{{ expense.product_name }}</td>
    <td colspan="2">{{ expense.description }}</td>
    <td>{{ expense.created_at }}</td>
    <td>&#8369;{{ expense.total }}</td>
    <td>
      <v-menu>
        <template #activator="{ props }">
          <button v-bind="props"><v-icon>mdi-dots-horizontal</v-icon></button>
        </template>
        <v-card elevation="0" class="rounded-lg border">
          <v-list>
            <v-list-item @click="editDialog = true">Edit</v-list-item>
            <v-list-item @click="deleteDialog = true">Remove</v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </td>
  </tr>
  <v-dialog v-model="deleteDialog">
    <v-card width="550" class="pa-3">
      <v-card-title
        ><span>Remove</span><v-spacer></v-spacer><v-icon>mdi-delete</v-icon></v-card-title
      >
      <v-card-text>
        You're about to delete expense <b>ID no. {{ expense.id }}</b
        >, Are you sure about that?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="deleteDialog = false">Cancel</v-btn>
        <v-btn @click="deleteAction" color="error">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="editDialog">
    <v-card width="550" class="pa-3">
      <v-card-title>Edit Expense</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="edit.product_name"
          variant="outlined"
          label="Product Name"
        ></v-text-field>
        <v-text-field
          v-model="edit.description"
          variant="outlined"
          label="Description"
        ></v-text-field>
        <v-text-field
          v-model="edit.total"
          variant="outlined"
          label="Total"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="editDialog = false">Cancel</v-btn>
        <v-btn color="success" @click="updateAction">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import expenseStore, { Expense } from "../../store/expense";
import expenseEdit from "../../forms/expense/expense-edit";
const editDialog = ref(false);
const deleteDialog = ref(false);
const props = defineProps<{ expense: Expense }>();
const $expense = expenseStore();
const { edit, $v } = expenseEdit(props.expense);
const deleteAction = () =>
  $expense.destroy(props.expense.id).then(() => (deleteDialog.value = false));
const updateAction = () => {
  if ($v.value.$invalid) {
    $v.value.$touch();
    return;
  }
  $expense.update(edit, props.expense.id).then(() => {
    editDialog.value = false;
  });
};
</script>

<style lang="scss" scoped></style>
