<template>
  <div class="activity-box">
    <img class="header" src="../assets/images/bg3.png" />
    <el-card>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
        <el-radio-button label="社团活动">社团活动</el-radio-button>
        <el-radio-button label="社团招新">社团招新</el-radio-button>
      </el-radio-group>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.title" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>

      <div class="actdetail">
        <div
          v-for="(item, index) in organizationList"
          :key="index"
          class="recommend-content-item"
          @click="$router.push('/activitydetail/' + item.id)"
        >
          <div class="logo">
            <img :src="imgUrl + item.icon" alt="" />
          </div>

          <div class="namebox">
            <div class="name">
              <p style="text-align: center; font-size: 18px; font-weight: bold">
                {{ item.title }}
              </p>
              <!-- <p style="text-align: left">{{ item.activityObjtext }}</p> -->
              <p style="text-align: right">{{ item.organization_name }}</p>
            </div>
            <div
              v-html="item.content"
              style="height: 150px; overflow: hidden; margin: 2px"
            ></div>
            <div style="text-align: right; color: #575757; font-size: 14px">
              {{ $moment(item.create_time).format("yyyy-MM-DD HH:mm:ss") }}
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入社团活动列表组件
import OrganizationList from "@/components/OrganizationList";
export default {
  //引入组件
  components: {
    OrganizationList,
  },
  data() {
    return {
      //存储活动列表数据
      organizationList: [],
      imgUrl: process.env.VUE_APP_IMG_URL,
      // 提交搜索活动名称信息
      formInline: {
        associType: "",
        activityObj: "社团活动",
      },
      tabPosition: "社团活动",
    };
  },
  mounted() {
    //初始化社团活动列表
    this.fetch();
  },
  methods: {
    // 开始搜索活动名称
    onSubmit() {
      this.fetch();
    },
    async fetch() {
      const { data } = await this.$http.getActivity({
        page: 1,
        limit: 100,
        ...this.formInline,
        activityObj:
          this.formInline.activityObj == "社团活动" ? "活动对象" : "招新对象",
      });
      this.organizationList = data.data;
    },
  },
  watch: {
    //监听栏目切换更新活动列表
    tabPosition(newVal) {
      this.formInline.activityObj = newVal;
      this.fetch();
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-block-start: 0em;
  margin-block-end: 0em;
}
.activity-box {
  width: 85%;
  margin: 0 auto;
  min-height: 500px;
  .header {
    display: block;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    padding-bottom: 20px;
  }
  .actdetail {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 0 auto;
    .logo {
      img {
        width: 250px;
        height: 250px;
      }
    }
    .recommend-content-item {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      margin-bottom: 20px;
      justify-content: space-around;
      align-items: center;
      padding: 0px 20px 0px 0px;
      border: 1px solid #eee;
      .namebox {
        display: flex;
        flex-direction: column;
        padding: 0 10px 0 10px;
        flex: 1;
      }
    }
  }
}
</style>