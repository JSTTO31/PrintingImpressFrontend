import { defineStore } from "pinia";
import axios from "axios";
import { Product } from "./product";

const orderService = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
})

export interface OrderForm{
    customer_name: string;
    quantity: number;
    total: number;
    product_id: number | string
}

export interface Order{
    id: number;
    customer_name: string;
    quantity: number;
    total: number;
    product: Product,
    created_at: string;
    updated_at: string;
}

export interface OrderState{
    orders: Order[],
    order: Order
}

let orderStore = defineStore('order', {
    state: () : OrderState => ({
        orders: [],
        order: {} as Order
    }),
    actions: {
        getAll(){
            return orderService.get('/orders').then(res => this.orders = res.data);
        },
        get(orderId: string | number){
            if(!this.orderExist(orderId)){
                return orderService.get('/orders/' + orderId).then(res => this.order = res.data);
            }
            
            this.order = this.getOrderById(orderId)
        },
        store(form: OrderForm){
            return orderService.post('/orders', {
                customer_name: form.customer_name ,
                product_id: form.product_id,
                quantity: form.quantity,
                total: form.total,
            }).then(res => {
                this.orders.unshift(res.data)
            })
        },
        update(form: OrderForm, orderId: string  | number){
            return orderService.put('/orders/' + orderId, {
                customer_name: form.customer_name,
                product_id: form.product_id,
                quantity: form.quantity,
                total: form.total,
            }).then(({data}) => this.orders = this.orders.map(item => item.id == orderId ? data : item));
        },
        destroy(orderId: string | number) {
            return orderService.delete('/orders/' + orderId).then(() => this.orders = this.orders.filter(item => item.id != orderId));
        },
    },
    getters: {
        orderExist: state => (id: string | number) => state.orders.some(item => item.id == id),
        getOrderById: state => (id: string | number) => state.orders.filter(item => item.id == id)[0],
        orders_count: state => state.orders.length,
        getMonthlyTotal: state => {
            let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            state.orders.forEach(element => {
                let month = new Date(element.created_at).getMonth() + 1
                sum[month - 1] += element.total
            });

            return sum
        },
        totalOfOrder: state => state.orders.reduce((sum, order) => sum += order.total, 0)
    }
})

export default orderStore