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
    {{this.$store.state.basic_cn.all_cure}}
    <h3>死亡人数:</h3>
    {{this.$store.state.basic_cn.all_death}}
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
    this.$store.dispatch("getAllProvinceBasic");
  },
  methods: {
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