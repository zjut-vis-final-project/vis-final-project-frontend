import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Message } from 'element-ui'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        startTime: '2020/1/23',
        endTime: '2020/4/1',
        // 0表示全国模式，1表示省模式
        mode: 0,
        timeSignal: 1,
        provinceSingal: 1,
        // 全国数据
        news_cn: [],
        // 省名
        provinceName: '',
        // 省新闻
        news_pro: [],
        // 各省的基本数据
        basic_pro: {},
        // 全国的每日数据
        basic_cn: {
            "all_confirmed": '该时间段的确诊总数',
            "all_death": '该时间段的死亡总数',
            "all_cure": '该时间段的治愈总数'
        },
        // 男女确诊人数
        gender: []
    },
    mutations: {
        timeChange(state, time) {
            state.startTime = time[0]
            state.endTime = time[1]
            state.timeSignal *= -1
        },
        provinceChange(state, name) {
            state.provinceName = name
            state.provinceSingal *= -1
        },
        // 中国全国新闻数据
        news_cnChange(state, data) {
            state.news_cn = data
        },
        // 某个省的新闻数据
        news_proChange(state, data) {
            state.news_pro = data
        },
        // 省的具体数据
        basic_proChange(state, data) {
            state.basic_pro = data
        },
        // 中国的每日数据
        basic_cnChange(state, data) {
            state.basic_cn = data
        },
        // 全国的男女确诊人数
        genderChange(state, data) {
            state.gender = data
        }
    },
    actions: {
        // 获取全国新闻数据
        async getCountryNewsCN() {
            const { data: newsData } = await axios.get(
                "http://127.0.0.1:3000/getCountryNewsCN",
                {
                    params: {
                        start: this.state.startTime,
                        end: this.state.endTime
                    }
                }
            );
            console.log('调用了getCountryNewsCN接口:', newsData);
            if (newsData.status !== 200) {
                // this.$message.error("出错了");
                Message.error('出错了')
            } else {
                this.commit('news_cnChange', newsData)
            }
        },
        // 获取某省的新闻数据
        async getProvinceNewsCN() {
            const { data: newsData } = await axios.get(
                "http://127.0.0.1:3000/getProvinceNewsCN",
                {
                    params: {
                        province: this.state.provinceName,
                        start: this.state.startTime,
                        end: this.state.endTime
                    }
                }
            )
            console.log('调用了getProvinceNewsCN接口:', newsData)
            if (newsData.status !== 200) {
                // this.$message.error("出错了");
                Message.error('出错了')
            } else {
                this.commit('news_proChange', newsData)
            }
        },
        // 获取省的具体数据
        async getAllProvinceBasic() {
            const { data: provinceData } = await axios.get(
                "http://127.0.0.1:3000/getProvinceNewsCN",
                {
                    params: {
                        start: this.state.startTime,
                        end: this.state.endTime
                    }
                }
            )
            console.log('调用了getAllProvinceBasic接口:', provinceData)
            if (provinceData.status !== 200) {
                // this.$message.error("出错了");
                Message.error('出错了')
            } else {
                this.commit('basic_proChange', provinceData)
            }
        },
        // 获取国家的具体数据
        async getCountryBasic() {
            const { data: countryData } = await axios.get(
                "http://127.0.0.1:3000/getCountryBasic",
                {
                    params: {
                        start: this.state.startTime,
                        end: this.state.endTime
                    }
                }
            )
            console.log('调用了getCountryBasic接口:', countryData)
            if (countryData.status !== 200) {
                // this.$message.error("出错了");
                Message.error('出错了')
            } else {
                this.commit('basic_cnChange', countryData)
            }
        },
        // 获取全国的确诊男女人数
        async getCountryGender() {
            const { data: gender } = await axios.get(
                "http://127.0.0.1:3000/getGender",
                {
                    params: {
                        start: this.state.startTime,
                        end: this.state.endTime
                    }
                }
            )
            console.log('调用了getGender接口:', gender)
            if (gender.status !== 200) {
                // this.$message.error("出错了");
                Message.error('出错了')
            } else {
                this.commit('genderChange', gender)
            }
        }
    }
})
export default store