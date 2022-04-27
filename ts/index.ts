import Vue from 'vue';
import hoge from './lib/sub';
import MainApp from './components/main_app.vue';

require('../less/common.less');

window.onload = () => {
    const vm = new Vue({
        components: {
            'main-app': MainApp
        },
    }).$mount('#root');
}
