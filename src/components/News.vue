<template>
  <div class="news">
    <Navbar></Navbar>
    <div class="newstitle">
      实时新闻
    </div>
    <Newblocks :newsInfo="news"></Newblocks>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Newblocks from "./Newblocks";
export default {
  data() {
    return {
      pageToken: 1,
      news: []
    };
  },
  components: {
    Navbar,
    Newblocks
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.axios(
        "/news"
        // "/newsapi?catid=10003&pageToken=" +
        //   vm.pageToken +
        //   "&apikey=a7rk0FAi7cEAi979zZqpypIwbR8dc9PZZRgULQZyZZbiZcr3ChijEISIgayYcf9Q"
      ).then(res => {
        let data = res.data.news.data;
        vm.news = data;
        window.console.log(vm.news);
      });
    });
  }
};
</script>

<style>
.newstitle {
  height: 54px;
  border-bottom: 1px solid #c2c2c4;
  line-height: 54px;
  text-indent: 9px;
  font-size: 18px;
  font-weight: 800;
}
</style>
