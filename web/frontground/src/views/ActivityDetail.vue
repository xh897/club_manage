<template>
  <div>
    <el-button
      v-if="item.activityObj == '活动对象'"
      @click="handleJoin"
      class="btn"
      >参加活动</el-button
    >
    <el-card class="content">
      <div class="name">
        {{ item.title }}
      </div>
      <div class="time">
        发布时间:{{ $moment(item.create_time).format("yyyy-MM-DD HH:mm:ss") }}
      </div>
      <div class="detail">
        <div class="detail_box">活动时间</div>
        <div class="detail_con">
          {{ $moment(item.timeStart).format("yyyy-MM-DD HH:mm:ss") }}
          -
          {{ $moment(item.timeEnd).format("yyyy-MM-DD HH:mm:ss") }}
        </div>
      </div>
      <div class="detail">
        <div class="detail_box">活动对象</div>
        <div class="detail_con">
          {{ item.activityObjtext }}
        </div>
      </div>
      <div class="detail">
        <div class="detail_box">举办方</div>
        <div class="detail_con">{{ item.host }}</div>
      </div>
      <div class="detail">
        <div class="detail_box">社团名称</div>
        <div class="detail_con">
          {{ item.organization_name }}
        </div>
      </div>
      <div class="detail">
        <div class="detail_box">地点</div>
        <div class="detail_con">
          {{ item.activityPlace }}
        </div>
      </div>
      <div class="detail">
        <div class="detail_box">活动内容</div>
        <div class="logo">
          <img :src="imgUrl + item.icon" alt="" />
          <div
            v-html="item.content"
            class="content"
          ></div>
        </div>
      </div>
    </el-card>
  </div>
</template>
  
  <script>
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      //活动详细信息
      item: {},
      imgUrl: process.env.VUE_APP_IMG_URL,
      //当前用户信息
      userInfo: {
        user_id: "",
      },
    };
  },
  async mounted() {
    //获取活动信息初始化
    this.fetch();
  },
  methods: {
    // 参加该活动提交函数和判断用户是否已登录
    async handleJoin2() {
      //判断用户是否已登录
      const { data } = await this.$http.getUserInfo();
      if (data.code == 401) {
        this.$message.error("您未登录，请登录后查看");
        this.$router.push(`/login`);
        return;
      }
      if (data.code !== 200) {
        return;
      }
      //存储用户信息
      this.userInfo = data.data;
      //提交参与活动接口
      const { data: res } = await this.$http.userJoinActivity({
        id: this.userInfo.user_id,
        aid: this.item.id,
      });
      if (res.code == 200) {
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },
    //声明参加活动的异步函数
    async handleJoin() {
      this.$confirm("是否参加该活动", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //用户手动确认后提交参与活动接口
          this.handleJoin2();
        })

        .catch(() => {});

      if (res.data.code === 400) {
        this.$message.success(res.message);
      }
      if (res.data.code === 200) {
        this.$message.success(res.message);
      }
    },
    //获取用户信息接口
    async getUserInfo() {
      const { data } = await this.$http.getUserInfo();
      this.userInfo = data.data;
    },
    //活动初始化函数
    async fetch() {
      //获取当前活动接口
      const { data } = await this.$http.getActivityById({
        id: this.$route.params.id,
      });
      this.item = data.data[0];
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.btn {
  margin-top: 30px;
  margin-left: 10px;
  background-color: rgb(79, 79, 192);
  color: #fff;
  font-size: 20px;
}
.content {
  position: relative;
  width: 95%;
  margin: 10px;
  margin-bottom: 50px;
  .name {
    margin: 30px 0 10px 0;
    text-align: center;
    font-size: 40px;
  }
  .time {
    text-align: center;
    margin: 10px 0 40px 0;
    color: #575757;
    font-size: 14px;
  }
  .detail {
    text-align: left;
    margin: 20px;
    .detail_box {
      font-size: 1.5rem;
    }
    .detail_con {
      font-size: 1.2rem;
      margin: 1rem;
      color: #333;
      text-indent: 2em;
    }
  }
  .logo {
    font-size: 20px;
    padding: 40px;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
  