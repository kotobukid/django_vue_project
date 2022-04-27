import Vue from 'vue';
import hoge from './lib/sub';


const vm = new Vue({
    data: () => {
        return {message: 'Vueからこんにちは'}
    }
}).$mount('#root')
