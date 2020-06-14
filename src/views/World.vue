<template>
  <div class="home" id="world">
    <div class="rightDrawer" :class="cls" @click="drawer"></div>
    <div class="map" id="map"></div>
    <button class="bt" @click="fly()">飞</button>
  </div>
</template>

<script>
import * as L from "leaflet";
import worldCountry from "../assets/data/world_countries.json";
import world_results from "../assets/data/world_confirmed.json";
export default {
  name: "Home",
  data() {
    return {
      map: null,
      cls: "long"
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
      var color = d3
        .scaleThreshold()
        .domain([10, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000])
        .range([
          "rgb(255,255,204)",
          "rgb(255,237,160)",
          "rgb(254,217,118)",
          "rgb(254,178,76)",
          "rgb(253,141,60)",
          "rgb(252,78,42)",
          "rgb(227,26,28)",
          "rgb(189,0,38)",
          "rgb(128,0,38)"
        ]);
      var myStyle = {
        color: "#00f",
        weight: 3,
        opacity: 0.5
      };
      var layerGeo = L.geoJSON(worldCountry, {
        style: function(feature) {
          return {
            color: color(world_results[feature.properties.name]),
            weight: 3,

            fill: true,
            fillOpacity: 0.6,
            fillColor: color(world_results[feature.properties.name])
          };
        }
      })
        .bindPopup(function(layer) {
          return layer.feature.properties.name;
        })
        .on("click", function(e) {
          console.log(e.layer.feature.properties.name);
        })
        .addTo(this.map);
      layerGeo
        .on("mouseover", function(d) {
          d.sourceTarget.setStyle({
            color: "while",
            weight: 10
          });
        })
        .on("mouseout", function(d) {
          d.sourceTarget.setStyle({
            color: color(world_results[d.sourceTarget.feature.properties.name]),
            weight: 3
          });
        });
    },
    drawer(e) {
      if (this.cls === "short") this.cls = "long";
      else this.cls = "short";
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
.rightDrawer {
  position: absolute;
  right: 0;
  top: 0;
  width: 40%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
  pointer-events: none; /* 关键点在这里，元素禁止响应鼠标事件 */
}
.rightDrawer:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: -170px;
  /* width: 30px;
  height: 30px;
  border-radius: 15px; */
  width: 0px;
  height: 0px;
  border-top: 50px solid transparent;
  border-right: 85px solid red;
  border-bottom: 50px solid transparent;
  border-left: 85px solid transparent;
  transform: translate(0, -50%);
  z-index: 999;
  pointer-events: auto; /* 关键点在这里，伪元素覆盖父元素的 pointer-events: none ，响应鼠标事件 */
}
.rightDrawer:hover:after {
  cursor: pointer;
}
.short {
  width: 0;
  /* border-top: 50px solid transparent;
  border-right: 85px solid red;
  border-bottom: 50px solid transparent;
  border-left: 85px solid transparent;
  top: 50%;
  left: -170px; */
  transition: width 0.5s linear;
}
.long {
  width: 40%;
  transition: width 0.5s linear;
}
</style>
