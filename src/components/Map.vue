
<template>
  <el-card class="box-card map">
    <div id="map"></div>
  </el-card>
</template>

<script>
import * as L from "leaflet";
import ChinaCoordinates from "../assets/data/ChinaCoordinates.json";
export default {
  data() {
    return {
      msg: "welcome to ",
      map: ""
    };
  },
  mounted() {
    this.loadmap();
    this.drawProvinces();
  },
  methods: {
    loadmap() {
      this.map = L.map("map", {
        minZoom: 3,
        maxZoom: 14,
        center: [38.240018034923, 110.13066322374],
        zoom: 3,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.EPSG3857
      });

      L.tileLayer(
        "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        {
          subdomains: ["1", "2", "3", "4"],
          attribution: "高德"
        }
      ).addTo(this.map);
    },
    drawProvinces() {
      var that = this;
      Object.keys(ChinaCoordinates).forEach(function(d) {
        var lg = L.polygon(ChinaCoordinates[d].coordinates, {
          color: "gray",
          fillColor: "black",
          fillOpacity: 0.1
        }).addTo(that.map);
        lg.on("click", function(e) {
          console.log(d);
          that.map.flyTo(e.latlng);
        });
      });
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 300px;
}
.map {
  width: 60%;
  height: 300px;
}
.leaflet-container {
  overflow: visible;
}
</style>