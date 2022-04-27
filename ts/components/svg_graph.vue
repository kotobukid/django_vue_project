<template lang="pug">
    svg.chart(width="1600" height="400" viewBox="0 0 1600 400")
        g(transform="scale(1, -1)")
            g(transform="translate(20, -390)")
                line.horizon_sub(x1="-20" y1="100" x2="1600" y2="100")
                line.horizon_sub(x1="-20" y1="200" x2="1600" y2="200")
                line.horizon_sub(x1="-20" y1="300" x2="1600" y2="300")
                g.data(v-if="price_history.length > 0")
                    path.sequence_fill(:d="price_sequence_fill")
                    path.sequence(:d="price_sequence")
                    price-circle(v-for="(h, $index) in price_history" :index="$index" :price="h.price" :tax_rate="h.tax_rate")
                line.horizon(x1="-20" y1="0" x2="1600" y2="0")
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import _ from 'lodash';
import {calc_tax} from "../lib/sub";
import PriceCircle from "./price_circle.vue";

@Component({
    components: {
        'price-circle': PriceCircle
    }
})
class SvgGraph extends Vue {
    @Prop({default: []})
    readonly price_history!: {price: number, tax_rate: number}[];

    get price_sequence(): string {
        return _.map(this.price_history, (h: { tax_rate: number, price: number }, index: number) => {
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

}

export default SvgGraph;

</script>

<style scoped lang="less">
svg.chart {
    border: 1px solid grey;
    background-color: white;

    line.horizon {
        stroke-width: 1px;
        stroke: black;
        fill: none;
        vector-effect: non-scaling-stroke;
    }

    line.horizon_sub {
        stroke-width: 1px;
        stroke: grey;
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
        opacity: 0.5;
    }
}
</style>