<template>
  <div class="postdetail">
    <div class="tab">
      <i class="iconfont icon-back" @click="goBack"></i>
      <div class="articletitle">{{ postdata.title }}</div>
    </div>
    <div class="carousel">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="item in postdata.imageUrls"
            :key="item"
          >
            <img :src="item" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="address">
      <i class="iconfont icon-zhixiang"></i>
      <a :href="postdata.url">原帖地址</a>
    </div>
    <pre class="article" v-html="postdata.content"></pre>
    <div class="share">
      <span class="like"
        ><i class="iconfont icon-like"></i>{{ postdata.likeCount }}</span
      >
      <span class="commend"
        ><i class="iconfont icon-message"></i>{{ postdata.shareCount }}</span
      >
      <span class="collect"
        ><i class="iconfont icon-shoucang"></i
        >{{ postdata.favoriteCount }}</span
      >
    </div>
    <div class="borderbar"></div>
    <div class="related">
      <div class="related-title">相关笔记📜</div>
      <div class="related-content">
        <Disblock :disInfo="relateddata" @reload="reload"></Disblock>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import Disblock from "../components/Disblock";

export default {
  name: "Postdetail",
  data() {
    return {
      postdata: {},
      relateddata: {},
      fontContent: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.axios(
        "/articalapi?apikey=a7rk0FAi7cEAi979zZqpypIwbR8dc9PZZRgULQZyZZbiZcr3ChijEISIgayYcf9Q&id=" +
          to.params.pid
      )
        .then(res => {
          vm.postdata = res.data.data[0];
        })
        .catch(error => {
          window.console.log(error);
          if (error) {
            vm.axios(
              "/articalapi?apikey=a7rk0FAi7cEAi979zZqpypIwbR8dc9PZZRgULQZyZZbiZcr3ChijEISIgayYcf9Q&id=" +
                to.params.pid
            ).then(res => {
              vm.postdata = res.data.data[0];
            });
          }
        });
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    reload(pid) {
      window.console.log(1213);
      this.axios(
        "/articalapi?apikey=a7rk0FAi7cEAi979zZqpypIwbR8dc9PZZRgULQZyZZbiZcr3ChijEISIgayYcf9Q&id=" +
          pid
      ).then(res => {
        this.postdata = res.data.data[0];
      });
    }
  },
  watch: {
    postdata() {
      setTimeout(() => {
        this.axios("/dis").then(res => {
          this.relateddata = res.data.data.data;
          this.relateddata = this.relateddata.slice(10, 30);
        });
      }, 500);
    }
  },
  updated() {
    new Swiper(".swiper-container", {
      freeMode: false,
      autoplay:{
        delay:1000
      }
    });
  },
  components: {
    Disblock
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  --swiper-theme-color: #ff6600;
}

.tab {
  width: 100%;
  height: 60px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.4);
  display: flex;

  i {
    width: 60px;
    height: 60px;
    color: #999999;
    font-size: 18px;
    line-height: 60px;
    text-align: center;
    float: left;
    flex: 0 0 60px;
  }

  .articletitle {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    font-weight: 600;
    flex: 1;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
}

.carousel {
  width: 282px;
  margin: 8px auto 0 auto;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
}

.address {
  padding: 10px;
  font-size: 16px;
  margin-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  a {
    text-decoration: none;
    color: #b20955;
  }
}

.share {
  margin-top: 40px;
  text-align: left;
  text-indent: 15px;
  margin-bottom: 10px;

  & > span {
    padding-right: 9px;
  }
}

.borderbar {
  height: 20px;
  width: 100%;
  background-color: #e0e0e0;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3) inset;
}

.related-title {
  padding: 18px;
  text-align: left;
  font-size: 16px;
  color: #333333;
  font-weight: 500;
  text-indent: 2em;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 8px;
}
</style>

<style>
.article {
  margin-top: 10px;
  text-align: left;
  line-height: 28px;
  padding-left: 8px;
  max-width: 100%;
  display: inline-block;
  white-space: pre-wrap !important;
  word-wrap: break-word !important;
  *white-space: normal !important;
  background-color: #eaeaef;
}
</style>
