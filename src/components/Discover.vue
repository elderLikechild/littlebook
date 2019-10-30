<template>
  <div class="discover">
    <Navbar @getHttp="getHttp"></Navbar>
    <Disblock :disInfo="disInfo"></Disblock>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Disblock from "./Disblock";

export default {
  components: {
    Navbar,
    Disblock
  },
  data() {
    return {
      disInfo: {}
    };
  },
  mounted() {
    this.$http("/dis").then(res => {
      let { data } = res.data;
      this.disInfo = data.data;
    });
  },
  methods: {
    getHttp(keyWord) {


      this.axios(
        "/api?kw=" +
          keyWord +
          "&apikey=a7rk0FAi7cEAi979zZqpypIwbR8dc9PZZRgULQZyZZbiZcr3ChijEISIgayYcf9Q"
      )
        .then(res => {
          this.
          window.console.log(res.data.data);
          this.disInfo = res.data.data
        })
        .catch(error => {
        window.console.log(error.request)
          if (error) {
            this.axios(
              "/api?kw=" +
                keyWord +
                "&apikey=a7rk0FAi7cEAi979zZqpypIwbR8dc9PZZRgULQZyZZbiZcr3ChijEISIgayYcf9Q"
            ).then(res => {
              window.console.log(res.data.data);
              this.disInfo = res.data.data
            });
          }
        });
    }
  }
};
</script>

<style></style>
