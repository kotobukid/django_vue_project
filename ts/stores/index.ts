import Vuex from 'vuex';
import {PriceAndTax} from "../types";
import axios, {AxiosResponse} from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const root_store = new Vuex.Store({
    state: {
        price_history: [] as PriceAndTax[],
        active_index: -1
    },
    mutations: {
        'replace-price-history'(state, history: PriceAndTax[]): void {
            state.price_history = history;
        },
        'append-price-history'(state, info: PriceAndTax): void {
            state.price_history = [...state.price_history, info];
        },
        'set-active-index'(state, index: number): void {
            state.active_index = index;
        }
    },
    actions: {
        save(store): void {
            axios.post('/save_prices.json', {prices: JSON.stringify(store.state.price_history)}).then((result: AxiosResponse<{ success: boolean, reason: string }>) => {
                console.log(result.data.success);
                if (result.data.success) {
                    alert('保存しました');
                } else {
                    alert('保存に失敗しました\n' + result.data.reason);
                }
            });
        },
        discard(store): void {
            axios.post('/discard_prices.json').then((result: AxiosResponse<{success: boolean, price_history: {pk: number, source: string}[]}>) => {
                if (result.data.success) {
                    alert('破棄しました');
                    if (result.data.price_history.length > 0) {
                        store.commit('replace-price-history', JSON.parse(result.data.price_history[0].source));
                    } else {
                        store.commit('replace-price-history', []);
                    }
                } else {
                    alert('破棄に失敗しました');
                }
            })
        }
    },
    getters: {
        price_history(state): PriceAndTax[] {
            return state.price_history;
        },
        active_index(state): number {
            return state.active_index;
        }
    },
});


export default root_store;