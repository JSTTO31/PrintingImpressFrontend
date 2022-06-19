import { required, minValue } from "@vuelidate/validators"

export default {
    name: { required },
    price: { required, min: minValue(1) }
}