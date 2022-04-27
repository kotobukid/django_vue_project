<template lang="pug">
    .price_progression
        tax-calc(@register-snapshot="register_snapshot")
        svg.chart(width="1600" height="400" viewBox="0 0 1600 400")
            g(transform="scale(1, -1)")
                g(transform="translate(20, -390)")
                    line.horizon(x1="-20" y1="0" x2="1600" y2="0")
                    circle.snap(v-for="(h, $index) in price_history" :cx="$index * 10" :cy="Math.round(h.price * ((100 + h.tax_rate) / 100))" r="3")
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

    price_history: { tax_rate: number, price: number }[] = []

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
}
</style>