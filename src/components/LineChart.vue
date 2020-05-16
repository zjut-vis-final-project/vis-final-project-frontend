<template>
  <el-card class="box-card line" body-style="height:80%">
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
  async mounted() {
    // this.$store.dispatch("getAllProvinceBasic");
    // await this.$store.dispatch("getCountryBasic");
    // this.drawLine();
  },
  methods: {
    drawLine() {
      let mychart = this.$echarts.init(
        document.getElementById("line")
        // "light"
      );
      mychart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
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
            smooth: true,
            color: "rgb(245,108,108)",
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
          x: 50,
          y: 50
        }
      });
      window.addEventListener("resize", () => {
        mychart.resize();
      });
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
    "$store.state.basic_pro"() {
      console.log(this.$store.getters.line_origin);
      this.drawLine();
    },
    "$store.state.basic_cn"() {
      this.drawLine();
    }
  }
};
</script>

<style scoped>
#line {
  /* width: 100%; */
  /* height: 220px; */
  height: 100%;
}

.line {
  width: 30%;
  margin: 0 auto;
  height: 90%;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>>

