import { reactive } from "vue"
import { required, integer, minValue } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"

export default () => {
    const create  = reactive({
        'product_name': '',
        'description': '',
        'total': 0,
    })

    const rules = {
        product_name: {required},
        total: {required, integer, min: minValue(1)}
    }

    const $v = useVuelidate(rules, create);

    return {$v, rules, create};
}