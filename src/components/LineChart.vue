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
      // 数据源
      originData: this.$store.state.basic_cn.country_data,
      // 模式切换
      province: false,
      // 切换 确诊人数、死亡人数、治愈人数
      mode: {
        area: "全国",
        typeCN: "确诊",
        type: "confirmed",
        color: "rgb(102,177,255)"
      }
    };
  },
  mounted() {
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
          source: this.originData
        },
        title: {
          text: `${this.mode.area}${this.mode.typeCN}人数随时间变化`,
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
      this.mode.type = this.province ? "pro_confirmed" : "confirmed";
      this.mode.color = "rgb(102,177,255)";
      this.drawLine();
    },
    clickDeath() {
      this.mode.typeCN = `死亡`;
      this.mode.type = this.province ? "pro_death" : "death";
      this.mode.color = "rgb(245,108,108)";
      this.drawLine();
    },
    clickCure() {
      this.mode.typeCN = `治愈`;
      this.mode.type = this.province ? "pro_cure" : "cure";
      this.mode.color = "rgb(230,162,60)";
      this.drawLine();
    },
    timeFormat(str) {
      let t = new Date(str);
      let s = t
        .toLocaleString()
        .split(" ")[0]
        .substring(5)
        .replace("/", "月");
      s = s + "日";
      return s;
    }
  },
  watch: {
    // 监听vuex里 是否选择了地区
    "$store.state.provinceSingal"() {
      for (let i in this.$store.state.basic_pro) {
        // 首先查找地区名
        if (
          this.$store.state.basic_pro[i].pro_name ===
          this.$store.state.provinceName
        ) {
          // 切换到省模式
          this.province = true;
          // 更改数据源
          this.originData = this.$store.state.basic_pro[i].pro_data;
          // 更改地区
          this.mode.area = this.$store.state.basic_pro[i].pro_name;
          break;
        }
      }
      // 对日期格式进行修改
      for (let i in this.originData) {
        this.originData[i].time = this.timeFormat(this.originData[i].time);
      }
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

