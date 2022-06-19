import axios from 'axios'
import { ProductForm } from '../store/product'

const productApi = axios.create({
    baseURL: 'http://localhost:8000/api',  
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    store(product: ProductForm){
        return productApi.post('/products', {
            name: product.name,
            price: product.price
        })
    },
    all(){
        return productApi.get('/products')
    },
    show(productId: string | number){
        return productApi.get('/products/' + productId);
    },
    destroy(productId: string | number){
        return productApi.delete('/products/' + productId);
    },
    update(product: ProductForm, productId: string | number){
        return productApi.put('/products/' + productId, {
            name: product.name,
            price: product.price,
        })
    }
}