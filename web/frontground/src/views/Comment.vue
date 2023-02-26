<template>
  <div style="width: 85%; margin: 0 auto; margin-bottom: 20px; min-height: 500px">
    <el-card style="margin-bottom: 5px">
        <el-form label-width="100px">
            <el-form-item label="留言内容">
                <Editor v-model="model.content"></Editor>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="success" @click="handleConfirm(2)">留言</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card>
      <div
        v-for="item in options3"
        style="display: flex; margin-bottom: 20px"
        :key="item.id">
        <img
          :src="baseImg + item.avatar"
          style="width: 50px; height: 50px; border-radius: 50%"
        />
        <div>
          <div style="margin-left: 8px">{{ item.nickname }}</div>
          <div style="margin-left: 25px" v-html="item.content"></div>
          <div>
            <span style="font-size: 14px; color: #575757">{{
              $moment(item.create_time).format("yyyy-MM-DD HH:mm:ss")
            }}</span>
            <el-button
              v-if="userInfo.user_id == item.user_id"
              @click="handleDelete(item.id)"
              style="
                font-size: 12px;
                text-align: center;
                padding: 2px;
                margin-left: 10px;"
                size="mini"
                type="danger"
              >删除</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue"
export default {
  components: {
    Editor
  },
  data() {
    return {
      editing: true,
      currentPage: 1,
      loading: false,
      pageSize: 15,
      total: 0,
      model: {
        nickname: "",
        sex: "",
        phone: "",
        avatar: "",
        content: "",
      },
      baseImg: process.env.VUE_APP_IMG_URL,
      options3: [],
      userInfo: {},
    };
  },
  async mounted() {
    //初始化留言列表和当前用户信息
    this.getUserInfo();
    this.bFetch3();
  },
  methods: {
    //更新留言列表
    async bFetch3() {
      const { data } = await this.$http.getCommentList({
        page: this.currentPage,
        limit: 10000,
      });
      this.options3 = data.data;
      // console.log(this.options3);
    },
    //当前用户信息
    async getUserInfo() {
      const { data } = await this.$http.getUserInfo();
      // console.log(data);
      if (this.$route.path == "/comment") {
        if (data.code == 401) {
          this.$message.error("您未登录，请登录后查看");
          this.$router.push(`/login`);
          return ;
        }
      }
      this.userInfo = data.data;
      this.model = data.data;
    },
    //删除留言
    async handleDelete(id) {
      this.$confirm("是否删除该留言", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.deleteComment({ id });
          this.$message.success("删除成功！");
          this.bFetch3();
        })
        .catch(() => {});
    },
    //提交留言
    async handleConfirm(type) {
      if (this.model.content === "") {
        return this.$message.info("请输入内容");
      }
      if (!this.userInfo.user_id) {
        return this.$message.info("请先登录");
      }
      this.model.user_id = this.userInfo.user_id;
      this.model.avatar = this.userInfo.avatar;
      const { data, code } = await this.$http.sendMessage(this.model);
      if (code === 400) {
        return this.$message.error("服务器错误");
      }
      this.$message.success("留言成功！");
      this.bFetch3();
      this.model.content = "";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>