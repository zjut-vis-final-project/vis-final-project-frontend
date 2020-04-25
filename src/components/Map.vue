
<template>
  <el-card class="box-card map">
    <div id="map"></div>
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
    async drawLine() {
      //   const data = await this.$http.get(
      //     "http://echarts.baidu.com/data/asset/data/hangzhou-tracks.json"
      //   );
      let lines = data.map(function(track) {
        return {
          coords: track.map(function(seg, idx) {
            return seg.coord;
          })
        };
      });
      let mychart = this.$echarts.init(document.getElementById("map"));
      mychart.setOption(
        (option = {
          bmap: {
            center: [120.13066322374, 30.240018034923],
            zoom: 14,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1"
                  }
                },
                {
                  featureType: "land",
                  elementType: "all",
                  stylers: {
                    color: "#f3f3f3"
                  }
                },
                {
                  featureType: "railway",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "highway",
                  elementType: "all",
                  stylers: {
                    color: "#fdfdfd"
                  }
                },
                {
                  featureType: "highway",
                  elementType: "labels",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "arterial",
                  elementType: "geometry",
                  stylers: {
                    color: "#fefefe"
                  }
                },
                {
                  featureType: "arterial",
                  elementType: "geometry.fill",
                  stylers: {
                    color: "#fefefe"
                  }
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "green",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "subway",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "manmade",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1"
                  }
                },
                {
                  featureType: "local",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1"
                  }
                },
                {
                  featureType: "arterial",
                  elementType: "labels",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "boundary",
                  elementType: "all",
                  stylers: {
                    color: "#fefefe"
                  }
                },
                {
                  featureType: "building",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1"
                  }
                },
                {
                  featureType: "label",
                  elementType: "labels.text.fill",
                  stylers: {
                    color: "#999999"
                  }
                }
              ]
            }
          },
          series: [
            {
              type: "lines",
              coordinateSystem: "bmap",
              data: lines,
              polyline: true,
              lineStyle: {
                color: "purple",
                opacity: 0.6,
                width: 1
              }
            }
          ]
        })
      );
    }
  }
};
</script>

<style scoped>
#map {
  /* width: 300px; */
  height: 300px;
}
.map {
  width: 60%;
  height: 300px;
}
</style>