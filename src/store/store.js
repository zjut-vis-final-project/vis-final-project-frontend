import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        startTime: '2020/1/23',
        endTime: '2020/4/1',
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