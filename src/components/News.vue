<template>
  <el-card class="box-card news">
    <h3>重大新闻</h3>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >{{activity.content}}</el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        },
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ]
    };
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
</style>