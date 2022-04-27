<template lang="pug">
    .price_progression
        tax-calc
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
}

export default PriceProgression;

</script>

<style scoped lang="less">

</style>