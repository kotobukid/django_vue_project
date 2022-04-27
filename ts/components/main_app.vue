<template lang="pug">
    .main_app
        label
            span 価格:&nbsp;
            input(type="number" v-model.number="price")
        br
        label
            span 税率:&nbsp;
            input(type="number" v-model.number="tax_rate")
            span %
        .actions
            a.button.reset_tax(href="#" @click.prevent="set_tax_rate(0)") リセット
            a.button.reset_tax(href="#" @click.prevent="set_tax_rate(8)") 8%
            a.button.reset_tax(href="#" @click.prevent="set_tax_rate(10)") 10%
        hr
        span.total
            span 計算結果:&nbsp;
            span(v-text="total")
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";

@Component({
    components: {}
})
class MainApp extends Vue {
    // @Prop({default: ''})
    // readonly message_from_parent!: string;

    price: number = 100;
    tax_rate: number = 10;

    get total(): number {
        return Math.round(this.price * ((100 + this.tax_rate) / 100));
    }

    set_tax_rate(rate: number): void {
        this.tax_rate = rate;
    }
}

export default MainApp;

</script>

<style scoped lang="less">
@import "../../less/button";

.main_app {
    font-size: 2rem;

    label {
        margin: 5px;
        display: inline-block;
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
}
</style>