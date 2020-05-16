<template>
  <div class="home" id="world">
    <div class="map" id="map"></div>
    <button class="bt" @click="fly()">飞</button>
  </div>
</template>

<script>
import * as L from "leaflet";
export default {
  name: "Home",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.loadmap();
  },
  methods: {
    loadmap() {
      this.map = L.map("map", {
        minZoom: 2,
        maxZoom: 6,
        // center: [38.240018034923, 110.13066322374],
        center: [34, 110.13066322374],
        zoom: 3,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.EPSG3857
      });

      L.tileLayer(
        "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
        {
          subdomains: ["1", "2", "3", "4"],
          attribution: "高德"
        }
      ).addTo(this.map);
    },
    fly() {
      this.map.flyTo(L.latLng(51.5, 0 + 20), 4);
    }
  }
};
</script>
<style scoped>
#world {
  height: 100%;
  position: relative;
}
.map {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 2;
}
.bt {
  position: absolute;
  z-index: 5;
  top: 30%;
  z-index: 999;
}
</style>
