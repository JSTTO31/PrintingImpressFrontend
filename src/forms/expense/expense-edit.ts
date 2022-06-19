import useVuelidate from "@vuelidate/core"
import { integer, minValue, required } from "@vuelidate/validators"
import { reactive } from "vue"
import { ExpenseForm } from "../../store/expense"


export default (expense: ExpenseForm) => {
    const edit = reactive({
        'product_name': expense.product_name,
        'description': expense.description,
        'total': expense.total,
    })

    const rules = {
        product_name: {required},
        total: {required, integer: integer, min: minValue(1)}
    }

    const $v = useVuelidate(rules, edit);

    return {edit, $v};
}