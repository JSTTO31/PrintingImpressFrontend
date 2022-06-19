import axios from "axios";
import { defineStore } from "pinia";

const expenseService = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    }
})

export interface ExpenseForm{
    product_name: string;
    description: string;
    total: number;
}

export interface Expense{
    id: number;
    product_name: string;
    description: string;
    total: number;
    created_at:string;
    updated_at:string;
}

export interface ExpenseState{
    expenses: Expense[],
    expense: Expense
}

const expenseStore = defineStore('expense', {
    state: () : ExpenseState  => ({
        expenses: [],
        expense: {} as Expense,
    }),
    actions: {
        getAll(){
            return expenseService.get('/expenses').then(res => this.expenses = res.data);
        },
        store(form: ExpenseForm){
            return expenseService.post('/expenses', {
                product_name: form.product_name,
                description: form.description,
                total: form.total,
            }).then(res => this.expenses.unshift(res.data))
        },
        update(form: ExpenseForm, expenseId: string | number){
            return expenseService.put('/expenses/' + expenseId, {
                product_name: form.product_name,
                description: form.description,
                total: form.total,
            }).then(res => this.expenses = this.expenses.map(item => item.id == expenseId ? res.data : item))
        },
        destroy(expenseId: string | number){
            return expenseService.delete('/expenses/' + expenseId).then(() => this.expenses = this.expenses.filter(item => item.id != expenseId));
        }
    },
    getters: {
        totalOfExpenses: state => state.expenses.reduce((sum, expense) => sum += expense.total, 0),
        countOfExpenses: state => state.expenses.length,
        getMonthlyTotal: state => {
            let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            state.expenses.forEach(item => {
                let month = new Date(item.created_at).getMonth() + 1;
                months[month - 1] += item.total
            })

            return months
        } 
    }
})


export default expenseStore;