<template>
  <el-card class="box-card line">
    <div id="line"></div>
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
    // this.adjust();
  },
  methods: {
    drawLine() {
      let mychart = this.$echarts.init(document.getElementById("line"));
      mychart.setOption({
        title: {
          text: "某站点用户访问来源",

          left: "center"
        },
        xAxis: {
          type: "category",

          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ],
        grid: {
          x: 30,
          y: 50
        }
      });
    },
    adjust() {
      // 参数container为图表盒子节点.charts为图表节点
      let charts = document.getElementById("line");
      let container = document.getElementsByClassName("line")[0];
      function getStyle(el, name) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null);
        } else {
          return el.currentStyle;
        }
      }
      var wi = getStyle(container, "width").width;
      var hi = getStyle(container, "height").height;
      charts.style.width = wi;
      // charts.style.height = hi;
      console.log(wi, hi);
    }
  }
};
</script>

<style scoped>
#line {
  /* width: 100%; */
  height: 250px;
}
.line {
  width: 20%;
  margin: 0 auto;
}
</style>>

