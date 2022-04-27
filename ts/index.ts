import Vue from 'vue';
import hoge from './lib/sub';

window.onload = () => {
    console.log(document.getElementById('root'))
    const vm = new Vue({
        data: () => {
            return {message: 'Vueからこんにちは'}
        }
    }).$mount('#root');
}
