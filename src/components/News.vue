<template>
  <el-card class="box-card news">
    <h3>重大新闻</h3>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="item in mynews"
        :key="item.news_id"
        :timestamp="(new Date(item.news_time)).toLocaleString()+item.news_owner"
      >
        <a target="blank" :href="item.news_link">{{item.news_title}}</a>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      reverse: true,
      mynews: []
    };
  },
  mounted() {
    this.getCountryNewsCN();
  },
  methods: {
    async getCountryNewsCN() {
      const { data: newsData } = await this.$http.get(
        "http://127.0.0.1:3000/getCountryNewsCN",
        {
          params: {
            start: this.$store.state.startTime,
            end: this.$store.state.endTime
          }
        }
      );
      console.log(newsData);
      if (newsData.status !== 200) {
        this.$message.error("出错了");
      } else {
        this.mynews = newsData.news_cn;
      }
    }
  },
  watch: {
    // 监听vuex里是否有变化
    "$store.state.signal"() {
      this.getCountryNewsCN();
    }
  }
};
</script>

<style scoped>
.news {
  width: 20%;
  height: 300px;
  overflow-y: scroll;
}
h3 {
  margin-top: 0;
}
ul {
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
</style>