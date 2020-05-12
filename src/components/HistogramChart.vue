<template>
  <el-card class="box-card histogram" body-style="height:80%">
    <div id="histogram"></div>
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
      let mychart = this.$echarts.init(document.getElementById("histogram"));
      mychart.setOption({
        title: {
          text: "某站点用户访问来源",

          left: "center"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        dataZoom: [
          {
            // 这个dataZoom组件，默认控制x轴。
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 0% 的位置。
            end: 100 // 右边在 100% 的位置。
          }
        ],
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
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
#histogram {
  /* width: 800px; */
  /* height: 250px; */
  height: 100%;
}
.histogram {
  width: 60%;
  height: 90%;
}
</style>>

