import Vue from 'vue';
import Vuex from 'vuex';
import PriceProgression from "./components/price_progression.vue";
import FileChecker from "./components/file_checker.vue";

Vue.use(Vuex);
import root_store from './stores';

require('../less/common.less');

declare type AppName = 'price' | 'file';

window.onload = () => {
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
}
