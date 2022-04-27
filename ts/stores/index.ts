import Vuex from 'vuex';
import {PriceAndTax} from "../types";
import axios, {AxiosResponse} from 'axios';

const root_store = new Vuex.Store({
    state: {
        price_history: [] as PriceAndTax[],
        active_index: -1
    },
    mutations: {
        'append-price-history'(state, info: PriceAndTax): void {
            state.price_history = [...state.price_history, info];
        },
        'set-active-index'(state, index: number): void {
            state.active_index = index;
        }
    },
    actions: {
        save(store): void {
            axios.post('/save_prices.json', {prices: store.state.price_history}).then((result: AxiosResponse<{ success: boolean, reason: string }>) => {
                console.log(result.data.success);
                if (result.data.success) {
                    alert('保存しました');
                } else {
                    alert('保存に失敗しました\n' + result.data.reason);
                }
            });
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