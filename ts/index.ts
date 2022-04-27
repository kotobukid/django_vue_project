import Vue from 'vue';
import Vuex from 'vuex';
import PriceProgression from "./components/price_progression.vue";

Vue.use(Vuex);
import root_store from './stores';


require('../less/common.less');

window.onload = () => {
    const vm = new Vue({
        components: {
            'price-progression': PriceProgression
        },
        store: root_store
    }).$mount('#root');
}
