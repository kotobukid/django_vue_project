<template lang="pug">
    .price_progression
        tax-calc(@register-snapshot="register_snapshot")
        svg-graph(:price_history="price_history")
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import TaxCalc from "./tax_calc.vue";
import SvgGraph from "./svg_graph.vue";

@Component({
    components: {
        'svg-graph': SvgGraph,
        'tax-calc': TaxCalc
    }
})
class PriceProgression extends Vue {

    price_history: { tax_rate: number, price: number }[] = [];

    register_snapshot(info: { tax_rate: number, price: number }): void {
        this.price_history.push(info);
    }
}

export default PriceProgression;

</script>

<style scoped lang="less">
</style>