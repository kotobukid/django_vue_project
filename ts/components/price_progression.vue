<template lang="pug">
    .price_progression
        tax-calc(@register-snapshot="register_snapshot")
        svg.chart(width="1600" height="400" viewBox="0 0 1600 400")
            g(transform="scale(1, -1)" v-if="price_history.length > 0")
                g(transform="translate(20, -390)")
                    path.sequence_fill(:d="price_sequence_fill")
                    path.sequence(:d="price_sequence")
                    circle.snap(v-for="(h, $index) in price_history" :cx="$index * 10" :cy="tax_computed(h.price, h.tax_rate)" r="3")
                    line.horizon(x1="-20" y1="0" x2="1600" y2="0")
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import TaxCalc from "./tax_calc.vue";
import _ from 'lodash';
import {calc_tax} from "../lib/sub";

@Component({
    components: {
        'tax-calc': TaxCalc
    }
})
class PriceProgression extends Vue {

    price_history: { tax_rate: number, price: number }[] = [];

    get price_sequence(): string {
        return _.map(this.price_history, (h: {tax_rate: number, price: number}, index: number) => {
            if (index === 0) {
                return `M ${10 * index},${calc_tax(h.price, h.tax_rate)}`;
            } else {
                return `L ${10 * index},${calc_tax(h.price, h.tax_rate)}`
            }
        }).join(' ');
    }

    get tax_computed(): Function {
        return calc_tax;
    }

    get price_sequence_fill(): string {
        return `${this.price_sequence}  V 0 H 0 Z`;
    }

    register_snapshot(info: { tax_rate: number, price: number }): void {
        this.price_history.push(info);
    }
}

export default PriceProgression;

</script>

<style scoped lang="less">
svg.chart {
    border: 1px solid grey;
    background-color: white;

    circle.snap {
        fill: lightblue;
        stroke: blue;
        stroke-width: 1px;
        vector-effect: non-scaling-stroke;
    }

    line.horizon {
        stroke-width: 1px;
        stroke: black;
        fill: none;
        vector-effect: non-scaling-stroke;
    }

    path.sequence {
        stroke-width: 1px;
        stroke: blue;
        fill: none;
        vector-effect: non-scaling-stroke;
    }

    path.sequence_fill {
        stroke-width: 0;
        stroke: none;
        fill: lightblue;
    }
}
</style>