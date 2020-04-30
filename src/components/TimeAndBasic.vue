<template>
  <el-card class="box-card timeAndBasic">
    <el-date-picker
      v-model="timeRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      size="mini"
      @change="onchange"
    ></el-date-picker>
    <h3>确诊人数:</h3>
    {{this.$store.state.basic_cn.all_confirmed}}
    <h3>治愈人数:</h3>
    <!-- {{this.$store.state.basic_cn.all_cure}} -->
    {{this.$store.getters.test}}
    <h3 @click="test">死亡人数:</h3>
    <!-- {{this.$store.state.basic_cn.all_death}} -->
    {{this.$store.state.testNum}}
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      timeRange: ""
    };
  },
  created() {
    // console.log(this);
    // console.log("line_origin", this.$store.getters.line_origin);
  },
  methods: {
    test() {
      this.$store.commit("testM");
    },
    onchange() {
      // vuex 改变全局状态
      this.$store.commit("timeChange", this.formatTime);
    }
  },
  computed: {
    // 将时间格式化成 2020/3/1
    formatTime: function() {
      let result = [];
      for (let i in this.timeRange) {
        let temp = this.timeRange[i].toLocaleDateString();
        result.push(temp);
      }
      return result;
    }
  }
};
</script>

<style scoped>
.timeAndBasic {
  width: 20%;
  height: 300px;
  /* overflow: hidden; */
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 250px;
}
p {
  text-align: center;
  line-height: 30px;
}
</style>