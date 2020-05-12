<template>
  <el-card class="box-card pie" body-style="height:80%">
    <div id="pie"></div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      msg: "welcome to "
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let mychart = this.$echarts.init(document.getElementById("pie"));
      mychart.setOption({
        title: {
          text: "某站点用户访问来源",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "auto",
          top: "21",
          itemWidth: 5,
          itemGap: 2,
          // bottom: "bottom",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "40%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        mychart.resize();
      });
    }
  }
};
</script>

<style scoped>
#pie {
  /* width: 250px; */
  /* height: 250px; */
  height: 100%;
}
.pie {
  width: 30%;
  height: 90%;
}
</style>>

