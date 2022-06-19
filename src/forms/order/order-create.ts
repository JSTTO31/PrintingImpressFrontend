import { reactive, watch, watchEffect } from "vue"
import { required, integer, alphaNum, minLength, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import productStore from "../../store/product";
export default () => {
    const create = reactive({
        customer_name: 'Unknown Customer',
        quantity: 0,
        product_id: '',
        total: 0,
    });

    const $product = productStore();


    let rules = {
        quantity: {required, integer, min: minValue(1)},
        product_id: {required}
    }

    watchEffect(() => {
         if(create.quantity && create.product_id){
            let product = $product.getProductById(create.product_id)
            create.total = product.price * create.quantity 
        }
    })

    let $v = useVuelidate(rules, create)


    return {create, $v}
}