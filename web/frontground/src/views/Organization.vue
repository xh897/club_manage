<template>
  <div class="organizaton-box">
    <img class="header-img" src="../assets/images/bg3.png" alt="" />
    <el-card>
      <!-- 搜素框 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="">
          <el-button type="primary" @click="formInline={};fetch()">点击刷新</el-button>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formInline.organization_name"
            placeholder="请输入社团名称"
          />
        </el-form-item>
        <el-form-item label="所属院系">
          <el-select v-model="formInline.department_id" placeholder="所属院系">
            <el-option
              v-for="item in options"
              :label="item.department_name"
              :value="item.department_id"
              :key="item.department_id"
              >{{ item.department_name }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="社团类型">
          <el-select v-model="formInline.associType" placeholder="社团类型">
            <el-option
              v-for="item in options1"
              :label="item.type_name"
              :value="item.type_id"
              :key="item.type_id"
              >{{ item.type_name }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- 社团详情 -->
      <div class="detail">
        <el-card
          v-for="(item, index) in organizationList"
          :key="index"
          @click.native="$router.push('/organizationdetail/' + item.organization_id)"
          class="games_item">
          <div class="left">
            <div class="icon">
              <img class="detail_img" :src="imgUrl + item.icon" />
            </div>
            <div class="center">
              <div class="name">{{ item.organization_name }}</div>
            </div>
            <div class="center">
              <div class="name">{{ item.tenet }}</div>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import OrganizationList from "@/components/OrganizationList";
export default {
  components: {
    OrganizationList,
  },
  data() {
    return {
      organizationList: [],
      imgUrl: process.env.VUE_APP_IMG_URL,
      //提交搜索信息
      formInline: {
        associType: "",
      },
      options: [],
      options1: [],
    };
  },
  mounted() {
    this.fetch();
    this.bFetch1();
    this.bFetch();
  },
  methods: {
    //获取社团类型列表信息
    async bFetch1() {
      const { data } = await this.$http.getClubType();
      this.options1 = data.data;
    },
    //获取院系列表信息
    async bFetch() {
      const { data } = await this.$http.getDepartment();
      this.options = data.data;
    },
    //提交搜索
    onSubmit() {
      this.fetch();
    },
    //获取社团列表信息
    async fetch() {
      const { data } = await this.$http.getOrganization({
        page: 1,
        limit: 100,
        ...this.formInline,
        status: 1,
      });
      this.organizationList = data.data;
    },
  },
};
</script>


<style scoped lang="scss">
.organizaton-box {
  .header-img {
    display: block;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    padding-bottom: 20px;
  }
  .detail {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    .games_item {
      width: 30%;
      margin: 10px;
    }
    .left {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .detail_img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .center {
      text-align: center;
      margin: 10px 0;
    }
  }
}
</style>