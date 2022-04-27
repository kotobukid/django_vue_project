<template lang="pug">
    .price_progression
        tax-calc(@register-snapshot="register_snapshot")
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import TaxCalc from "./tax_calc.vue";

@Component({
    components: {
        'tax-calc': TaxCalc
    }
})
class PriceProgression extends Vue {

    register_snapshot(info: { tax_rate: number, price: number }): void {
        console.log(info);

    }
}

export default PriceProgression;

</script>

<style scoped lang="less">

</style>