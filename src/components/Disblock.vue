<template>
  <div class="disblockcontent">
    <div class="bgc" ref="content">
      <div
        class="disblock"
        v-for="item in disInfo"
        :key="item.coverUrl"
        ref="blocks"
      >
        <div class="block-img" @click="goToPostDetail(item.id)">
          <img :src="item.coverUrl" alt="" class="image" />
        </div>
        <div class="block-under">
          <div class="under-title">
            {{ item.title?item.title:item.description }}
          </div>
          <div class="block-user" v-show="isShow()">
            <div class="user-info">
              <div class="user-icon" @click="getUserDetail(item.uid)">
                <img :src="item.avatarUrl" alt="" class="usericon" />
              </div>
              <div class="user-name" @click="getUserDetail(item.uid)">
                {{ item.screenName }}
              </div>
              <div class="user-like">
                <i class="iconfont icon-like " @click="like" ref="likeimg"></i>
                <span class="likenum">{{ item.likeCount }}</span>
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
  props: ["disInfo"],
  data() {
    return {
      leftHeight: 0,
      rightHeight: 0
    };
  },
  methods: {
    waterFall() {
      let blockList = this.$refs.blocks; //获取所有的视频块
      for (let i = 0; i < blockList.length; i++) {
        setTimeout(() => {
          if (this.leftHeight <= this.rightHeight) {
            blockList[i].style.top = this.leftHeight + "px";
            blockList[i].style.left = 7 + "px";
            blockList[i].className = "disblock mr-4";
            this.leftHeight = this.leftHeight + blockList[i].offsetHeight + 10;
          } else {
            blockList[i].style.top = this.rightHeight + "px";
            blockList[i].style.right = 7 + "px";
            this.rightHeight =
              this.rightHeight + blockList[i].offsetHeight + 10;
          }
          this.getHeight();
        }, 500);
      }
      this.isShow();
    },
    getHeight() {
      if (this.leftHeight >= this.rightHeight) {
        this.$refs.content.style.height =
          this.leftHeight - this.$refs.content.offsetTop + "px";
      } else {
        this.$refs.content.style.height =
          this.rightHeight - this.$refs.content.offsetTop + "px";
      }
    },
    like(event) {
      if (event.target.className.indexOf("fill") == -1) {
        event.target.className = "iconfont icon-like_fill";
        event.target.style.color = "red";
        event.target.nextSibling.innerText =
          parseInt(event.target.nextSibling.innerText) + 1;
      } else {
        event.target.className = "iconfont icon-like";
        event.target.style.color = "#2c3e50";
        event.target.nextSibling.innerText =
          parseInt(event.target.nextSibling.innerText) - 1;
      }
    },
    getUserDetail(uid) {
      this.axios("/user").then(res => {
        let { data } = res;
        data = data.userdata.userdata;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == uid) {
            this.$router.push({
              name: "username",
              params: { curUser: data[i] }
            });
          }
        }
      });
    },
    isShow() {
      if (!this.$props.disInfo[0].likeCount) {
        return false;
      }
      return true;
    },
    goToPostDetail(pid) {
      if (this.$route.fullPath == "/postdetail") {
        this.$emit("reload", pid);
      } else {
        this.$router.push({ name: "postdetail", params: { pid } });
      }
    }
  },
  updated() {
    this.leftHeight = this.$refs.content.offsetTop;
    this.rightHeight = this.$refs.content.offsetTop;
    this.waterFall();
  }
};
</script>

<style lang="scss">
.mr-4 {
  margin-right: 7px;
}

.disblockcontent {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bgc {
  width: 100%;
  background-color: #f6f9fb;
  height: 1px;
  overflow-y: scroll;
}

.disblock {
  width: 178px;
  background-color: #fff;
  margin-bottom: 7px;
  border-radius: 5px;
  position: absolute;
  overflow: hidden;

  .block-img {
    .image {
      width: 178px;
      height: auto;
    }
  }

  .block-under {
    overflow: hidden;
    width: 100%;
    padding-bottom: 10px;

    .under-title {
      height: 33px;
      width: 149px;
      margin: 8px auto 0 auto;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 14px;
      line-height: 17px;
    }

    .block-user {
      overflow: hidden;
      width: 100%;
    }
    .user-info {
      height: 25px;
      margin-top: 7px;
      margin-left: 15px;
    }

    .user-like {
      font-size: 12px;
      line-height: 20px;
      float: right;
      vertical-align: top;
      margin-right: 5px;
    }

    .likenum {
      vertical-align: top;
      margin-left: 3px;
    }

    .usericon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 4px;
      float: left;
      border: 1px solid #e0e0e0;
    }
    .user-name {
      font-size: 12px;
      float: left;
      line-height: 20px;
      width: 70px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: left;
    }
  }
}
</style>
