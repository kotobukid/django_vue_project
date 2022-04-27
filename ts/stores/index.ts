import Vuex from 'vuex';
import {PriceAndTax} from "../types";

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