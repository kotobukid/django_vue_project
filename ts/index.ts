import Vue from 'vue';
import Vuex from 'vuex';
import axios, {AxiosResponse} from "axios";
import PriceProgression from "./components/price_progression.vue";
import FileChecker from "./components/file_checker.vue";

Vue.use(Vuex);
import root_store from './stores';

require('../less/common.less');
require('../less/index.less');

declare type AppName = 'price' | 'file';

window.onload = () => {
    axios.get('/fetch_prices.json').then((result: AxiosResponse<{ price_history: { pk: number, source: string }[] }>) => {

        if (result.data.price_history.length > 0) {
            root_store.commit('replace-price-history', JSON.parse(result.data.price_history[0].source));
        }

        const vm = new Vue({
            components: {
                'price-progression': PriceProgression,
                'file-checker': FileChecker
            },
            data() {
                return {
                    active_app: 'price'
                }
            },
            methods: {
                set_app(app_name: AppName): void {
                    this.active_app = app_name;
                }
            },
            store: root_store
        }).$mount('#root');
    });
}
