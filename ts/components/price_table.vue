<template lang="pug">
    .outer_frame(style="max-height: 400px;")
        span {{ message }}
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
            tbody(v-if="price_history.length > 0")
                tr(
                    v-for="(h, $index) in price_history"
                    @pointerenter="make_active($index)"
                    :class="active === $index ? 'active': ''"
                )
                    td(v-text="h.price")
                    td(v-text="h.tax_rate")
                    td(v-text="price_computed(h)")
            tbody(v-else)
                tr
                    td(colspan="3") 価格履歴がありません

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

    @Prop({default: -1})
    readonly active!: number;

    get price_computed(): Function {
        return (p: PriceAndTax) => {
            return calc_tax(p.price, p.tax_rate);
        };
    }

    make_active(index: number): void {
        this.$store.commit('set-active-index', index);
    }

    get message(): string {
        return this.$store.getters['message'];
    }
}

export default PriceTable;

</script>

<style scoped lang="less">
.outer_frame {
    overflow-y: scroll;
}

tr.active {
    td {
        background-color: pink;
    }
}
</style>