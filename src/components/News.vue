<template>
  <el-card class="box-card news">
    <h3>重大新闻</h3>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="item in mynews"
        :key="item.news_id"
        :timestamp="item.news_time+item.news_owner"
      >
        <a href="#">{{item.news_title}}</a>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      reverse: false,
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
      this.mynews = newsData;
    }
  },
  watch: {
    // 监听vuex里是否又变化
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