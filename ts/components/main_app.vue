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
}

export default MainApp;

</script>

<style scoped lang="less">
.main_app {
    font-size: 2rem;

    input[type="number"] {
        font-size: 2.5rem;
        width: 120px;
    }

    span.total {
        color: blue;
    }
}
</style>