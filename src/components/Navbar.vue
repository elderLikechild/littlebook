<template>
  <div class="navbar">
    <div class="tab-content">
      <router-link tag="div" to="/news" class="tabs sub">时事新闻</router-link>
      <router-link tag="div" to="/" class="tabs disc" exact
        >生活种草</router-link
      >
      <router-link tag="div" to="/near" class="tabs near">附近</router-link>
    </div>
    <div class="search" v-if="isShowSearch">
      <input type="text" placeholder="🔍北京" class="inp" v-model="inputStr" @keyup.enter="keyWord"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: this.$route,
      inputStr: ""
    };
  },
  computed: {
    isShowSearch() {
      if (this.$route.path != "/") {
        return false;
      }
      return true;
    }
  },
  methods:{
    keyWord() {
      if(!this.inputStr){
        this.$emit('getHttp',"北京")
      }
      if (timer) {
        clearInterval(timer);
      }
      let timer = setTimeout(() => {
        this.$emit('getHttp',this.inputStr)
      }, 100);
    }
  }
};
</script>

<style lang="scss">
.navbar {
  width: 100%;
  background: #fff;
  overflow:hidden;
}

.tab-content {
  height: 43.5px;
  display: flex;
  margin: 0 auto;

  .tabs {
    height: 28px;
    padding: 8.5px 18px 7px 18px;
    line-height: 42px;
    flex: 1;
    color: #999999;
  }

  .router-link-active {
    color: #333333;
    position: relative;
  }

  .router-link-active:after {
    content: "  ";
    position: absolute;
    bottom: -1px;
    left: 37px;
    width: 50px;
    height: 0;
    border-bottom: 2px solid red;
  }
}

.search {
  height: 60.5px;
  width: 100%;
  position: relative;

  .inp {
    text-align: center;
    margin: 9px 14px;
    border: 0;
    background-color: #f5f5f5;
    width: calc(100% - 28px);
    height: calc(100% - 18px);
    border-radius: 40px;
    outline: none;
    font-size: 16px;
  }

  .icon {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
