<template>
  <div class="home" id="world">
    <div :class="leftDrawer" @click="leftDrawerClick"></div>
    <div :class="rightDrawer" @click="rightDrawerClick"></div>

    <div class="map" id="map"></div>
    <!-- <button class="bt" @click="fly()">飞</button> -->
  </div>
</template>

<script>
import * as L from "leaflet";
import worldCountry from "../assets/data/world_countries.json";
export default {
  name: "Home",
  data() {
    return {
      map: null,
      rightDrawer: "short",
      leftDrawer: "leftDrawerShort"
    };
  },
  mounted() {
    this.loadmap();
    this.drawCountry();
  },
  methods: {
    loadmap() {
      this.map = L.map("map", {
        minZoom: 3,
        maxZoom: 4,
        // center: [38.240018034923, 110.13066322374],
        center: [34, 110.13066322374],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
        maxBounds: L.latLngBounds([90, -180], [-90, 180]),
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
    },

    drawCountry() {
      let that = this;
      var myStyle = {
        color: "#00f",
        weight: 3,
        opacity: 0.5
      };
      var layerGeo = L.geoJSON(worldCountry, {
        style: myStyle
      })
        .bindPopup(function(layer) {
          that.rightDrawerClick();
          that.leftDrawerClick();
          console.log(layer);
          return layer.feature.properties.name;
        })
        .addTo(this.map);
    },
    rightDrawerClick(e) {
      if (this.rightDrawer === "short") this.rightDrawer = "long";
      else this.rightDrawer = "short";
    },
    leftDrawerClick(e) {
      if (this.leftDrawer === "leftDrawerShort")
        this.leftDrawer = "leftDrawerLong";
      else this.leftDrawer = "leftDrawerShort";
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
  /* filter: blur(5px) contrast(0.8) brightness(0.8); */
}
.bt {
  position: absolute;
  z-index: 5;
  top: 30%;
  z-index: 999;
}

/* 右侧可拉伸的抽屉 */
.long {
  position: absolute;
  right: 0;
  top: 0;
  width: 30%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: #333333;
  z-index: 900;
  pointer-events: none; /* 关键点在这里，元素禁止响应鼠标事件 */
  transition: width 0.3s linear;
}
.long:after {
  content: ">>";
  text-align: center;
  line-height: 40px;
  color: white;
  position: absolute;
  top: 50%;
  left: -40px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: black;
  z-index: 999;
  pointer-events: auto; /* 关键点在这里，伪元素覆盖父元素的 pointer-events: none ，响应鼠标事件 */
}
.long:hover:after {
  cursor: pointer;
  left: -30px;
  transition: left 0.3s linear;
}
.short {
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background: #333333;
  z-index: 900;
  pointer-events: none; /* 关键点在这里，元素禁止响应鼠标事件 */
  transition: width 0.3s linear;
}
.short:after {
  content: "<<";
  text-align: center;
  line-height: 40px;
  color: white;
  position: absolute;
  top: 50%;
  left: -40px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: black;
  cursor: pointer;
  z-index: 999;
  pointer-events: auto; /* 关键点在这里，伪元素覆盖父元素的 pointer-events: none ，响应鼠标事件 */
}
.short:hover:after {
  cursor: pointer;
  left: -50px;
  transition: left 0.3s linear;
}
.leftDrawerLong {
  width: 20%;
  height: 100%;
  background-color: #333333;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 900;
  pointer-events: none; /* 关键点在这里，元素禁止响应鼠标事件 */
  transition: width 0.3s linear;
}
.leftDrawerLong:after {
  content: "<<";
  color: white;
  line-height: 40px;
  text-align: center;
  position: absolute;
  top: 50%;
  right: -40px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: black;

  cursor: pointer;
  z-index: 999;
  pointer-events: auto; /* 关键点在这里，元素禁止响应鼠标事件 */
}
.leftDrawerLong:hover:after {
  cursor: pointer;
  right: -30px;
  transition: right 0.3s linear;
}
.leftDrawerShort {
  width: 0;
  height: 100%;
  background-color: #333333;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 900;
  pointer-events: none; /* 关键点在这里，元素禁止响应鼠标事件 */
  transition: width 0.3s linear;
}
.leftDrawerShort::after {
  content: ">>";
  color: white;
  line-height: 40px;
  text-align: center;
  position: absolute;
  top: 50%;
  right: -40px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: black;
  pointer-events: auto; /* 关键点在这里，元素禁止响应鼠标事件 */
  z-index: 999;
}
.leftDrawerShort:hover:after {
  cursor: pointer;
  right: -50px;
  transition: right 0.3s linear;
}
</style>
