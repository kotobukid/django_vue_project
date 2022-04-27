<template lang="pug">
    .tax_calc
        label.sequential
            span 価格:&nbsp;
            input(type="number" v-model.number="price")
        label.sequential
            span 税率:&nbsp;
            input(type="number" v-model.number="tax_rate")
            span %
        .actions
            a.button.reset_tax(href="#" v-for="tr in tax_rates" @click.prevent="set_tax_rate(tr.value)" v-text="tr.label")
        span.total
            span 計算結果:&nbsp;
            span(v-text="total")
        .actions
            a.button.register_snapshot(href="#" @click.prevent="register_snapshot") 登録
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import {calc_tax} from "../lib/sub";
import {PriceAndTax} from "../types";

@Component({
    components: {}
})
class TaxCalc extends Vue {
    price: number = 100;
    tax_rate: number = 10;

    tax_rates: { label: string, value: number }[] = [
        {label: 'リセット(0%)', value: 0},
        {label: '8%', value: 8},
        {label: '10%', value: 10},
        {label: '50%', value: 50},
    ];

    get total(): number {
        return calc_tax(this.price, this.tax_rate);
    }

    set_tax_rate(rate: number): void {
        this.tax_rate = rate;
    }

    register_snapshot(): void {
        const info: PriceAndTax = {
            tax_rate: this.tax_rate,
            price: this.price
        };

        this.$emit('register-snapshot', info);
    }
}

export default TaxCalc;

</script>

<style scoped lang="less">
@import "../../less/button";

.tax_calc {
    font-size: 2rem;
    background-color: #e5ffe9;
    padding: 10px;

    label.sequential {
        margin: 5px 15px 5px 5px;
        display: inline-block;
        &:last-child {
            margin-right: 0;
        }
    }

    .total {
        display: block;
        width: 300px;
        text-align: center;
        border: 1px solid grey;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
    }

    .actions {
        margin: 5px;
    }

    input[type="number"] {
        font-size: 2.5rem;
        width: 120px;
    }

    span.total {
        color: blue;
    }

    .reset_tax {
        .button();
        background-color: pink;
        border-color: red;
        color: red;
    }

    .register_snapshot {
        .button();
        background-color: lightgreen;
        border-color: green;
        color: green;
    }
}
</style>