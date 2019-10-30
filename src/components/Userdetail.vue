<template>
  <div class="userdetail">
    <div class="detail-title">
      <div class="backbtn" @click="back">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="user-title">
        <span class="username">{{ curUser.screenName }}</span
        ><br />
        <span class="userid">小红书号：{{ curUser.userName }}</span>
      </div>
      <div class="share"><i class="iconfont icon-iconfontfenxiang"></i></div>
    </div>
    <div class="Infodetail">
      <div class="userImg"><img :src="curUser.avatarUrl" alt="" /></div>
      <div class="fans-follow">
        <div class="top">
          <div class="f-subscribe">
            <span class="count">{{ subscribeCount }}</span
            ><br />
            <span class="explain">关注</span>
          </div>
          <div class="fanscount">
            <span class="count">{{ fansCount }}</span
            ><br />
            <span class="explain">粉丝</span>
          </div>
          <div class="likeCount">
            <span class="count">{{ likeCount }}</span
            ><br />
            <span class="explain">获赞与收藏</span>
          </div>
        </div>
        <div class="bottom">
          <div class="subscribebtn">
            <button class="btn">关注</button>
          </div>
          <div class="lmessage">
            <i class="iconfont icon-message"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="user-lever">
      <span class="gender"><i :class="gender"></i></span>
      <span class="country">{{ curUser.location }}</span>
      <span class="lever"
        ><i class="iconfont icon-medal"></i>{{ curUser.idGrade }}</span
      >
    </div>
    <div class="leave-message">
      {{ curUser.biography }}
    </div>
    <div class="postcount">
      <div class="tagnumber">所有笔记 · {{ curUser.postCount }}</div>
    </div>
    <div class="user-video">
      <Disblock :disInfo="userVideos"></Disblock>
    </div>
  </div>
</template>

<script>
import fontmap from "../assets/fontnumber";
import Disblock from "./Disblock";

export default {
  name: "Userdetail",
  data() {
    return {
      likeCount: fontmap(this.$route.params.curUser.likeCount),
      subscribeCount: fontmap(this.$route.params.curUser.followCount),
      fansCount: fontmap(this.$route.params.curUser.fansCount),
      curUser: this.$route.params.curUser,
      userVideos: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    let uid = to.params.curUser.id;
    window.console.log(uid);
    next(vm => {
      vm.getHttp(vm,uid)
    });
  },
  computed: {
    gender() {
      if (this.curUser.gender == null) {
        return "";
      } else if (this.curUser.gender == "男") {
        return "icon-nanxing iconfont blue";
      }
      return "icon-nvxing iconfont pink";
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getHttp(vm,uid) {
       vm.axios(
        "/api?apikey=jobTmGiqwv6167p0uBJHg596c6rUAsAa8it1dvHj3WGcQ9s1C6c5TiJYA1Q6778c&uid=" +
          uid
      )
        .then(res => {
          let { data } = res;
          vm.userVideos = data.data;
        })
        .catch(error => {
          if (error) {
            vm.getHttp(vm)
          }
        });
    }
  },
  components: {
    Disblock
  }
};
</script>

<style lang="scss">
.detail-title {
  height: 61px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e6e6e6;

  .backbtn,
  .share {
    height: 100%;
    width: 61px;
    float: left;
    color: #999999;
    line-height: 61px;
    text-align: center;
    flex: 1;
  }

  .share {
    float: right;
  }

  .iconfont {
    font-size: 22px;
  }

  .user-title {
    flex: 3;

    .username {
      font-size: 16px;
      color: #000000;
      font-weight: 500;
      display: inline-block;
      margin-top: 12px;
      margin-bottom: 3px;
    }
    .userid {
      font-size: 14px;
      color: #999999;
    }
  }
}

.Infodetail {
  width: 100%;
  height: 140px;
  display: flex;

  .userImg {
    margin: 25px 20px 25px 20px;
    width: 92px;
    height: 92px;
    border: 1px solid #bfbfbe;
    border-radius: 50%;
    float: left;
    flex: 0 0 92px;

    img {
      height: 100%;
      width: auto;
      border-radius: 50%;
    }
  }

  .fans-follow {
    flex: 1;
    margin-right: 10px;

    .top {
      height: 73px;
      width: 100%;
      display: flex;
    }

    .count {
      color: #333333;
      font-size: 18px;
    }

    .explain {
      color: #666666;
      font-size: 14px;
      font-weight: 600;
    }

    .f-subscribe {
      flex: 1;
      height: 36px;
      text-align: center;
      padding-top: 36px;
    }

    .fanscount {
      text-align: center;
      padding-top: 36px;
      flex: 1;
      height: 36px;
    }

    .likeCount {
      text-align: center;
      padding-top: 36px;
      flex: 1;
      height: 36px;
    }

    .bottom {
      margin-top: 15px;
    }

    .subscribebtn {
      width: 170px;
      height: 34px;
      float: left;
    }

    .btn {
      width: 100%;
      height: 100%;
      border: 0;
      background-color: #ff2741;
      text-align: center;
      line-height: 38px;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      border-radius: 15px;
      outline: none;
    }

    .lmessage {
      width: 50px;
      height: 32px;
      border: 2px solid #e6e6e6;
      border-radius: 15px;
      text-align: center;
      line-height: 32px;
      color: #333333;
      float: right;
      font-size: 20px;
    }
  }
}

.user-lever {
  text-align: left;
  margin-left: 10px;

  .gender,
  .country {
    border-right: 1px solid #e6e6e6;
  }
}

.user-lever > span {
  padding: 0 12px;
  font-size: 14px;
  height: 16px;
  line-height: 16px;
}

.blue {
  color: #5bc5ff;
}

.pink {
  color: #dea3a5;
}

.leave-message {
  padding: 20px 12px 12px 22px;
  font-size: 14px;
  color: #4a4a4a;
  width: calc(100% - 34px);
  height: 46px;
  text-align: left;
  text-indent: 2em;
  border-bottom: 1px solid #eeeeee;
}

.postcount {
  padding: 10px 5px 10px 10px;
  overflow: hidden;
  border-bottom: 1px solid #eeeeee;

  .tagnumber {
    float: left;
    padding: 8px 15px;
    color: #333333;
    font-size: 14px;
    font-weight: 600;
    background-color: #f0f0f0;
    border-radius: 20px;
  }
}

.user-video {
  padding: 9px 7px;
  background-color: #f5f8fa;
  width: calc(100% - 14px);
  overflow: hidden;
}
</style>
