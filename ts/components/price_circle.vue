<template lang="pug">
    g.snap(
        @pointerenter="p_enter"
        @pointerleave="p_leave"
    )
        circle.snap(:cx="index * 10" :cy="tax_computed" r="3")
        g.tip(:transform="tip_translate" v-if="show_tips")
            g(style="transform: scale(1, -1)")
                path(d="M 62.764 12.122 L 62.764 52.38 L 11.132 52.38 L 11.132 23.476 L 3.51 3.593 L 17.635 12.122 L 62.764 12.122 Z" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);")
                text.price(x="35.719" y="23.394" v-text="`￥${price}`")
                text.tax_rate(x="35.719" y="36.486" v-text="`+ ${tax_rate}%`")
                text.total(x="35.719" y="49.577" v-text="`￥${tax_computed}`")

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

    get tip_translate(): string {
        return `translate(${this.index * 10} ${this.tax_computed})`;
    }

    show_tips: boolean = false;

    p_enter() {
        this.show_tips = true;
    }

    p_leave() {
        this.show_tips = false;
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

g.tip {
    pointer-events: none;
    user-select: none;
}

text {
    &.tax_rate, &.price, &.total {
        white-space: pre;
        fill: rgb(51, 51, 51);
        font-family: Arial, sans-serif;
        font-size: 12.2px;
        text-anchor: middle;
    }
}
</style>