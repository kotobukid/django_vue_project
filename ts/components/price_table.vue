<template lang="pug">
    table
        colgroup
            col(style="width: 100px;")
            col(style="width: 100px;")
            col(style="width: 100px;")
        thead
            tr
                th 価格
                th 税率
                th 計算結果
        tbody
            tr(v-for="h in price_history")
                td(v-text="h.price")
                td(v-text="h.tax_rate")
                td(v-text="price_computed(h)")

</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import _ from 'lodash';
import {calc_tax} from "../lib/sub";
import PriceCircle from "./price_circle.vue";
import {PriceAndTax} from "../types";

@Component({
    components: {
        'price-circle': PriceCircle
    }
})
class PriceTable extends Vue {
    @Prop({default: []})
    readonly price_history!: PriceAndTax[];

    get price_computed(): Function {
        return (p: PriceAndTax) => {
            return calc_tax(p.price, p.tax_rate);
        };
    }
}

export default PriceTable;

</script>

<style scoped lang="less">
</style>