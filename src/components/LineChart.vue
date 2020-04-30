<template>
  <el-card class="box-card line">
    <div id="line"></div>
    <div class="btn">
      <el-button size="mini" type="primary" @click="clickConfirmed">确诊</el-button>
      <el-button size="mini" type="danger" @click="clickDeath">死亡</el-button>
      <el-button size="mini" type="warning" @click="clickCure">治愈</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 切换 模式 部分标题 颜色
      mode: {
        typeCN: "确诊",
        type: "confirmed",
        color: "rgb(102,177,255)"
      }
    };
  },
  mounted() {
    this.$store.dispatch("getAllProvinceBasic");
    this.drawLine();
  },
  methods: {
    drawLine() {
      let mychart = this.$echarts.init(
        document.getElementById("line")
        // "light"
      );
      mychart.setOption({
        lineStyle: {
          color: this.mode.color
        },
        itemStyle: {
          color: this.mode.color
        },
        dataset: {
          // 数据源
          source: this.$store.getters.line_origin
        },
        title: {
          text: `${this.$store.getters.line_name}${this.mode.typeCN}人数随时间变化`,
          left: "center"
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        dataZoom: [
          {
            // 这个dataZoom组件，默认控制x轴。
            type: "inside" // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            // start: 0, // 左边在 0% 的位置。
            // end: 100 // 右边在 100% 的位置。
          }
        ],
        series: [
          {
            type: "line",
            // 显示面积
            // areaStyle: {},
            // 指定x轴为time
            encode: {
              x: "time",
              y: this.mode.type
            }
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
    },
    clickConfirmed() {
      this.mode.typeCN = `确诊`;
      this.mode.type =
        this.$store.state.mode === 1 ? "pro_confirmed" : "confirmed";
      this.mode.color = "rgb(102,177,255)";
      this.drawLine();
    },
    clickDeath() {
      this.mode.typeCN = `死亡`;
      this.mode.type = this.$store.state.mode === 1 ? "pro_death" : "death";
      this.mode.color = "rgb(245,108,108)";
      this.drawLine();
    },
    clickCure() {
      this.mode.typeCN = `治愈`;
      this.mode.type = this.$store.state.mode === 1 ? "pro_cure" : "cure";
      this.mode.color = "rgb(230,162,60)";
      this.drawLine();
    }
  },
  watch: {
    // 监听vuex里 是否选择了地区
    async "$store.state.provinceSingal"() {
      await this.$store.dispatch("getAllProvinceBasic");
      this.drawLine();
    },
    // 监听时间变化
    async "$store.state.timeSignal"() {
      await this.$store.dispatch("getAllProvinceBasic");
      this.drawLine();
    }
  }
};
</script>

<style scoped>
#line {
  /* width: 100%; */
  height: 220px;
}

.line {
  width: 30%;
  margin: 0 auto;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>>

