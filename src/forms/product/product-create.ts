import useVuelidate from "@vuelidate/core"
import { reactive } from "vue"
import rules from '../rules/product-rules'


export default () => {
    const product = reactive({
        name: '',
        price: 0
    })

    

    const $v = useVuelidate(rules, product)

    return { product, $v }
}