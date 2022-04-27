<template lang="pug">
    .price_progression
        .wrapper
            tax-calc(@register-snapshot="register_snapshot")
        .wrapper(style="width: 1610px;")
            .left(style="width: 800px; margin-right: 10px;")
                svg-graph(
                    :price_history="price_history"
                    :active="active_index"
                )
            .left(style="width: 800px;")
                price-table(
                    :price_history="price_history"
                    :active="active_index"
                )
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import TaxCalc from "./tax_calc.vue";
import SvgGraph from "./svg_graph.vue";
import PriceTable from "./price_table.vue";
import {PriceAndTax} from "../types";

@Component({
    components: {
        'svg-graph': SvgGraph,
        'tax-calc': TaxCalc,
        'price-table': PriceTable
    }
})
class PriceProgression extends Vue {

    get price_history(): PriceAndTax[] {
        return this.$store.getters['price_history'];
    };

    register_snapshot(info: PriceAndTax): void {
        this.$store.commit('append-price-history', info);
    }

    get active_index(): number {
        return this.$store.getters['active_index'];
    };
}

export default PriceProgression;

</script>

<style scoped lang="less">
.price_progression {
    padding-top: 10px;
}

.wrapper {
    margin-left: 10px;
    margin-bottom: 10px;
}

.left {
    float: left;
}
</style>