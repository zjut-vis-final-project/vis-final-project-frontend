import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        startTime: '',
        endTime: '',
        signal: 1
    },
    mutations: {
        timeChange(state, time) {
            state.startTime = time[0]
            state.endTime = time[1]
            state.signal *= -1
        }
    }
})
export default store