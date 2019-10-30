<template>
  <div class="newblock">
    <div class="new" v-for="item in this.newsInfo" :key="item.id" @click="goNewDetail(item.id)">
      <div class="newsimg">
        <img :src="item.imageUrls[0]" alt="" />
      </div>
      <div class="title">{{item.title}}</div>
      <div class="tags">
        <div class="bluetag">{{item.catPathKey}}</div>
        <div class="bluetag">{{item.location}}</div>
        <div class="bluetag">{{item.publishDateStr}}</div>
        <div class="viewcount"><i class="iconfont icon-view"></i>{{item.viewCount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Newblocks",
  props: {
    newsInfo: Array
  },
  watch: {
    newsInfo() {
      window.console.log(this.newsInfo);
    }
  },
  methods:{
    goNewDetail(id){
      for(let i = 0;i<this.newsInfo.length;i++){
        if(id == this.newsInfo[i].id){
          window.console.log(this.newsInfo[i])
          this.$router.push({name:"newdetail",params:{detaildata:this.newsInfo[i]}})
        }
      }
    }
  }
};
</script>

<style lang="scss">
.newblock{
  overflow-y: auto;
  height: calc(100% - 98.5px);
  width: 100%;
}
.new {
  border-bottom: 1px solid #ededed;
  padding: 10px;

  .newsimg {
    height: 156px;
    width: 100%;

    img {
      height: 100% ;
      width: auto;
    }
  }

  .title {
    padding-top: 10px;
    width: 300px;
    margin: 0 auto;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: #2e2e30;
    line-height: 25px;
    word-break: break-all;
  }

  .tags {
    margin-top: 5px;
    color: #b7b2b8;
    font-size: 12px;
    width: 100%;
    height: 14px;
    width: 100%;

    .bluetag {
      padding: 2px;
      color: #97c5d5;
      float: left;
      margin-right: 10px;
      height: 13px;
      border: 1px solid #97c5d5;
      border-radius: 3px;
    }

    .viewcount {
      float: left;
    }
  }
}
</style>
