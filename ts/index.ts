import Vue from 'vue';
import PriceProgression from "./components/price_progression.vue";

require('../less/common.less');

window.onload = () => {
    const vm = new Vue({
        components: {
            'price-progression': PriceProgression
        },
    }).$mount('#root');
}
