import useVuelidate from "@vuelidate/core"
import { reactive } from "vue"
import { product } from "../../types/productTypes"
import productRules from "../rules/product-rules"


export default (product: product) => {  
    let edit = reactive({
        'name': product.name,
        'price': product.price
    })


    const $v = useVuelidate(productRules, edit)

    return {$v, edit}
}