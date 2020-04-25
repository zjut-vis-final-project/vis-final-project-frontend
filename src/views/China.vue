<template>
  <div class="partChina">
    <div class="up">
      <News></News>
      <Map></Map>
      <TimeAndBasic></TimeAndBasic>
    </div>
    <div class="down">
      <LineChart></LineChart>
      <HistogramChart></HistogramChart>
      <PieChart></PieChart>
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart.vue";
import HistogramChart from "../components/HistogramChart.vue";
import PieChart from "../components/PieChart.vue";
import News from "../components/News.vue";
import TimeAndBasic from "../components/TimeAndBasic.vue";
import Map from "../components/Map.vue";
export default {
  components: {
    LineChart,
    HistogramChart,
    PieChart,
    News,
    TimeAndBasic,
    Map
  },
  data() {
    return {
      msg: "welcome to "
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.partChina {
  height: 100%;
}
.partChina .up {
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
}
.partChina .down {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
}
.partChina .box-card {
  margin: 0 5px;
}
</style>>

