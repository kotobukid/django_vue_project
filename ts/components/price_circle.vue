<template lang="pug">
    g.snap
        circle.snap(:cx="index * 10" :cy="tax_computed" r="3")

</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import {calc_tax} from "../lib/sub";

@Component({
    components: {}
})
class PriceCircle extends Vue {
    @Prop({default: 0})
    readonly index!: number;

    @Prop({default: 0})
    readonly price!: number;

    @Prop({default: 0})
    readonly tax_rate!: number;

    get tax_computed(): number {
        return calc_tax(this.price, this.tax_rate);
    }
}

export default PriceCircle;

</script>

<style scoped lang="less">

circle.snap {
    fill: lightblue;
    stroke: red;
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
}
</style>