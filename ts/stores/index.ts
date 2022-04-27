import Vuex from 'vuex';
import {PriceAndTax} from "../types";

const root_store = new Vuex.Store({
    state: {
        message: 'message_from Vuex store',
        price_history: [] as PriceAndTax[]
    },
    mutations: {
        'set-message'(state, message: string): void {
            state.message = message;
        },
        'append-price-history'(state, info: PriceAndTax): void {
            state.price_history = [...state.price_history, info];
        }
    },
    getters: {
        message(state): string {
            return state.message
        },
        price_history(state): PriceAndTax[] {
            return state.price_history;
        }
    },
});


export default root_store;