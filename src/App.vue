<template>
  <div id="app">
    <el-container class="home-container">
      <!-- 头部 -->
      <el-header class="nav" height="7vh">
        <div class="title">Covid-19可视分析系统</div>
        <div class="change">
          <router-link to="/">中国板块 |</router-link>
          <router-link to="/world">| 世界板块</router-link>
        </div>
        <div class="setting">设置</div>
      </el-header>
      <!-- 主要区域 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  // 集中监控
  watch: {
    // 监听vuex里 时间是否有变化
    "$store.state.timeSignal"() {
      // 全国模式
      if (this.$store.state.mode === 0) {
        // 更新全国新闻
        this.$store.dispatch("getCountryNewsCN");
        // 更新全国每日数据
        this.$store.dispatch("getCountryBasic");
        // 更新全国男女确诊
        this.$store.dispatch("getCountryGender");
      }
      // 省模式
      else {
        // 更新某个省的新闻
        this.$store.dispatch("getProvinceNewsCN");
        // 更新省的具体数据
        this.$store.dispatch("getAllProvinceBasic");
      }
      console.log("时间改变");
      console.log("起始时间:", this.$store.state.startTime);
      console.log("截至时间:", this.$store.state.endTime);
    },
    // 监听vuex里 省地区是否有变化
    "$store.state.provinceSingal"() {
      // 点了某个省 会修改为省的数据
      // 改为省模式
      console.log("省改变为", this.$store.state.provinceName);
      this.$store.state.mode = 1;
      this.$store.dispatch("getProvinceNewsCN");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
.home-container {
  height: 100%;
}
.el-header {
  line-height: 7vh;
}
.el-main {
  background-color: #e9eef3;
  height: 93vh;
  overflow: hidden;
}

.nav {
  width: 100%;
  background: #333333;
  color: white;
  text-align: center;
  display: flex;
}
.nav a {
  color: white;
  text-decoration: none;
}
.nav .title {
  width: 25%;
  font-size: 26px;
}
.nav .change {
  text-align: center;
  width: 50%;
}
.nav .setting {
  width: 25%;
}
.content {
  /* height: 94vh; */
  /* background: red; */
}
</style>
