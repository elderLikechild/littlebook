<template>
  <div class="newdetail">
    <div class="detailtitle"><i class="iconfont icon-back"></i><span class="newstitle">即刻新闻</span></div>
    <div class="articaltitle">
      <div class="title">
        {{detaildata.title}}
      </div>
      <div class="newinfo">
        <div class="date">{{detaildata.publishDateStr}}</div>
        <div class="source">来源：央视新闻</div>
      </div>
    </div>
    <div class="content">
      {{detaildata.content}}
    </div>
    <div class="buttonGroup">
      <div class="share"></div>
      <div class=""></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewDetail",
  data() {
    return {
      detaildata: this.$route.params.detaildata
    };
  },
  mounted() {
    window.console.log(this.detaildata)
  }
};
</script>

<style lang="scss">
.detailtitle {
  height: 60px;
  border-bottom: 1px solid #c2c2c2;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;

  .newstitle{
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
  }

  i {
    float: left;
    height: 60px;
    width: 60px;
    font-size: 18px;
    color: #333333;
  }
}

.articaltitle {
  font-size: 22px;
  font-weight: 600;
  text-align: left;
  width: calc(100% - 20px);
  padding: 10px;


  .title {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 10px;
  }

  .newinfo {
    padding-top: 10px;
    font-size: 10px;
    color: #626262;
    text-align: left;
  }
}

.content {
  padding: 10px;
  width: calc(100% - 20px);
  color: #000000;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
}
</style>
