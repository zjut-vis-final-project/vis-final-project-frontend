<template>
  <div class="father">
    <!-- 左半部分的图标表 -->
    <div class="partLeft">
      <div class="up">123</div>
      <div class="down">456</div>
    </div>
    <!-- 解决坍塌 -->
    <div class="token"></div>

    <!-- 右半部分的时间线 -->
    <div class="partRight">
      <div class="container">
        <div class="pivot" v-for="(item,index) in arr" :key="index">
          <div :class="{'boxRight':index%2===0,'boxLeft':index%2!==0}">
            <div :class="(index%2===0?'virtualBoxRight':'virtualBoxLeft')+colorClass(index) ">
              <div :class="{'circleRight':index%2===0,'circleLeft':index%2!==0}"></div>
            </div>
            <div :class="{'mainBoxRight':index%2===0,'mainBoxLeft':index%2!==0}">
              <div class="title">
                <a :href="item.news_link" target="blank">{{item.news_title}}</a>
              </div>
              <div class="time">{{(new Date(item.news_time)).toLocaleDateString()}}</div>
              <div class="tags">
                <div class="tag" v-for="(item,index2) in item.news_words" :key="index2">{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: "2020/3/15",
      endTime: "2020/3/16",
      arr: [],
      signal: 1,
      tagHash: []
    };
  },
  mounted() {
    this.getWordList();
    let that = this;
    document
      .getElementsByClassName("partRight")[0]
      .addEventListener("scroll", function(e) {
        // console.log(document.getElementsByClassName("partRight")[0].scrollTop);
        let st = document.getElementsByClassName("partRight")[0].scrollTop;
        // console.log("that.arr.length * 90", that.arr.length * 110 - 880);
        if (st > that.arr.length * 110 - 880) {
          let nextDay = Date.parse(that.endTime) + 86400000;
          let newD = new Date(nextDay).toLocaleString();
          that.endTime = newD.split(" ")[0];
          that.getWordList();
          that.signal++;
        }
      });
  },
  methods: {
    async getWordList() {
      const { data: data } = await this.$http.get(
        "http://127.0.0.1:3000/getWordlist",
        {
          params: {
            start: this.startTime,
            end: this.endTime
          }
        }
      );
      this.arr = data.news_pro;
      console.log(this.arr);
    },
    colorClass(index) {
      if (index % 2 !== 0) {
        return ` color${(index % 7) + 1}`;
      } else {
        return ` color${(index % 7) + 1}R`;
      }
    }
  },
  watch: {
    signal() {
      console.log("aaa");
    }
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: inherit;
  background-color: rgba(144, 147, 153, 0.5);
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}

.father {
  height: 100%;
  width: 100%;
  display: flex;
}
.partLeft {
  /* width: 40%; */
  width: calc((100% - 40px) * 0.4);
  /* height: 88%; */
  height: calc(100% - 7vh - 40px);

  position: fixed;
  display: flex;
  flex-direction: column;
}
.up {
  flex: 1;
  background-color: red;
  border: 1px solid rgba(104, 133, 104, 0.5);
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(179, 179, 179);
  background-color: #fff;
  overflow-y: scroll;
}
.down {
  margin-top: 20px;
  flex: 1;
  background-color: yellow;
  border: 1px solid rgba(104, 133, 104, 0.5);
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(179, 179, 179);
  background-color: #fff;
  overflow-y: scroll;
}

.token {
  width: 40%;
  z-index: 999;
}
.partRight {
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.pivot {
  width: 300px;
  height: 100px;
  /* background-color: purple; */
  position: relative;
  margin-top: 10px;
}

.boxRight {
  width: 400px;
  height: 150px;
  /* background-color: yellow; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: -1px;
}

.virtualBoxRight {
  width: 100px;
  height: 110px;
  border-top: 1px solid rgb(131, 131, 131);
  border-left: 1px solid rgb(131, 131, 131);
  /* background-color: red; */
  position: absolute;
  left: 0;
  /* bottom: -75px; */
  top: 75px;
}

.mainBoxRight {
  width: 300px;
  height: 150px;
  /* background-color: green; */
  border: 1px solid rgba(104, 133, 104, 0.5);
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(179, 179, 179);
  position: absolute;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.circleRight {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  top: -5px;
  left: -6px;
  /* background-color: rgb(131, 131, 131); */
  background-color: #fff;
  border: 1px solid black;
}

.boxLeft {
  width: 400px;
  height: 150px;
  /* background-color: yellow; */
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.virtualBoxLeft {
  width: 100px;
  height: 110px;
  /* background-color: rgb(131, 131, 131); */
  border-top: 1px solid rgb(131, 131, 131);
  border-right: 1px solid rgb(131, 131, 131);
  position: absolute;
  right: 0;
  top: 75px;
}

.mainBoxLeft {
  width: 300px;
  height: 150px;
  /* background-color: green; */
  border: 1px solid rgba(104, 133, 104, 0.5);
  border-radius: 10px;
  position: absolute;
  box-shadow: 5px 5px 5px rgb(179, 179, 179);
  right: 0;
  left: 0;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.circleLeft {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  top: -5px;
  right: -6px;
  /* background-color: rgb(131, 131, 131); */
  background-color: #fff;
  border: 1px solid black;
}

.title {
  text-align: center;
  font-weight: 800;
  border-bottom: 1px solid rgba(104, 133, 104, 0.5);
  width: 80%;
  margin: 0 auto;
  margin-top: 10px;
  /* height: 46px; */
  /* line-height: 46px; */
}

.tags {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  /* margin-top: 30px; */
  flex-wrap: wrap;
  flex: 1;
}

.time {
  margin-top: 5px;
  text-align: center;
  color: rgb(131, 131, 131);
  font-size: 14px;
}
.tag {
  margin: 2px;
  padding: 2px;
  display: inline-block;
  white-space: nowrap;
  font-size: 12px;
  line-height: 20px;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  background-color: #ecf5ff;
}
.title a {
  text-decoration: none;
  color: black;
}
.color1 {
  border-top: 2px solid #f94144;
  border-right: 2px solid #f94144;
}
.color2 {
  border-top: 2px solid #f94144;
  border-right: 2px solid #f94144;
}
.color3 {
  border-top: 2px solid #f8961e;
  border-right: 2px solid #f8961e;
}
.color4 {
  border-top: 2px solid #f9c74f;
  border-right: 2px solid #f9c74f;
}
.color5 {
  border-top: 2px solid #90be6d;
  border-right: 2px solid #90be6d;
}
.color6 {
  border-top: 2px solid #43aa8b;
  border-right: 2px solid #43aa8b;
}
.color7 {
  border-top: 2px solid #577590;
  border-right: 2px solid #577590;
}
.color1R {
  border-top: 2px solid #f94144;
  border-left: 2px solid #f94144;
}
.color2R {
  border-top: 2px solid #f94144;
  border-left: 2px solid #f94144;
}
.color3R {
  border-top: 2px solid #f8961e;
  border-left: 2px solid #f8961e;
}
.color4R {
  border-top: 2px solid #f9c74f;
  border-left: 2px solid #f9c74f;
}
.color5R {
  border-top: 2px solid #90be6d;
  border-left: 2px solid #90be6d;
}
.color6R {
  border-top: 2px solid #43aa8b;
  border-left: 2px solid #43aa8b;
}
.color7R {
  border-top: 2px solid #577590;
  border-left: 2px solid #577590;
}
</style>
    
