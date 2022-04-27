import Vuex from 'vuex';
import {PriceAndTax} from "../types";

const root_store = new Vuex.Store({
    state: {
        message: 'message_from Vuex store',
        price_history: [] as PriceAndTax[],
        active_index: -1
    },
    mutations: {
        'set-message'(state, message: string): void {
            state.message = message;
        },
        'append-price-history'(state, info: PriceAndTax): void {
            state.price_history = [...state.price_history, info];
        },
        'set-active-index'(state, index: number): void {
            state.active_index = index;
        }
    },
    getters: {
        message(state): string {
            return state.message
        },
        price_history(state): PriceAndTax[] {
            return state.price_history;
        },
        active_index(state): number {
            return state.active_index;
        }
    },
});


export default root_store;