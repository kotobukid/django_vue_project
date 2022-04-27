import Vuex from 'vuex';

const root_store = new Vuex.Store({
    state: {
        message: 'message_from Vuex store'
    },
    mutations: {
        'set-message'(state, message: string): void {
            state.message = message;
        }
    },
    getters: {
        message(state): string {
            return state.message
        }
    },
});


export default root_store;