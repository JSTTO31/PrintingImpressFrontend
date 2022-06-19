import { defineStore } from "pinia";
import { ref, watch, watchEffect } from "vue";
import productService from "../services/product-service";
import { Order } from "./order";

export interface ProductForm{
    name: string;
    price: number;
}

export interface Product{
    id: number;
    name: string;
    price: number;
    orders: Order[],
    created_at: string;
    updated_at: string;
}

export interface ProductState{
    products: Product[];
    product: Product;
}

const productStore = defineStore('product', {
    state: (): ProductState => ({
        products: [],
        product: {} as Product
    }),
    actions: {
        store(form: ProductForm){
            return productService.store(form).then(({data}) => {
                return this.products.unshift(data);
            })
        },
        getAll(){
            return productService.all().then(({data}) => {
                this.products = data;
            })
        },
        destroy(productId: string | number){
            return productService.destroy(productId).then(() => {
                this.products = this.products.filter(item => item.id != productId)
            })
        },
        update(product: ProductForm, productId: string | number){
            return productService.update(product, productId).then(({data}) => {
                this.products = this.products.map(item => {
                    return item.id == data.id ? data : item
                })
            })
        },
        pagination(){
            let limit = 5;
            let paginate_length = ref(Math.ceil(this.products_count / limit))
            let before = ref(0)
            let after = ref(limit)
            let page = ref(1)
            let products = ref(this.products.slice(before.value, after.value))
        

            watchEffect(() => {
                before.value = limit * (page.value - 1)
                after.value = limit * page.value
                products.value = this.products.slice(before.value, after.value)

                if(paginate_length.value < 1){
                    paginate_length.value = Math.ceil(this.products_count / limit)
                }
            })

            return {products, paginate_length, page}
        }
    },
    getters: {
        getProductById: (state) => (id: string | number) : Product => state.products.filter(item => item.id == id)[0],
        products_count: state => state.products.length,
        getMostBought: state  => state.products.sort((a, b) => a.orders.length - b.orders.length).reverse().slice(0, 5),
        mostBoughtName: state => state.products.sort((a, b) => a.orders.length - b.orders.length).reverse().slice(0, 5).map(item => item.name),
        mostBoughtOrderCount: state => state.products.sort((a, b) => a.orders.length - b.orders.length).reverse().slice(0, 5).map(item => item.orders.length),
        mostBoughtOrderTotal: state => state.products.sort((a, b) => a.orders.length - b.orders.length).reverse().slice(0, 5).map(item => item.orders.reduce((sum, order) => sum += order.total, 0)),
    }
})

export default productStore; 