import { createRouter, createWebHistory } from "vue-router"
import Dashboard from '../pages/Dashboard.vue';
import Order from '../pages/Order.vue';
import Product from '../pages/Product.vue';
import Expense from '../pages/Expense.vue';


const routes = [
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard'
    },
    {
        path: '/order',
        component: Order,
        name: 'Order'
    },
    {
        path: '/product',
        component: Product,
        name: 'Product'
    },
    {
        path: '/expenses',
        component: Expense,
        name: 'Expenses'
    },
    {
        path: '',
        redirect: { name: 'Dashboard' }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router