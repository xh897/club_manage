<template>
  <div class="boxs">
    <div>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
        <el-radio-button label="社团介绍">社团介绍</el-radio-button>
        <el-radio-button label="社团成员">社团成员</el-radio-button>
      </el-radio-group>
    </div>
    <el-card v-if="tabPosition == '社团介绍'">
      <div class="content">
        <div class="title">
          {{ model.organization_name }}
        </div>
        <div class="picture">
          <img v-if="model.icon" :src="imgUrl + model.icon" alt="" />
        </div>
      </div>
      <div class="introduce_box">
        <div class="introduce">社团简介</div>
        <div v-html="model.introduction" class="introduce_detail"></div>
      </div>
      <div class="introduce_box">
        <div class="introduce">社团宗旨</div>
        <div v-html="model.tenet" class="introduce_detail"></div>
      </div>
      <div class="introduce_box">
        <div class="introduce">社团类型</div>
        <div class="introduce_detail">
          {{ model.associType1 }}
        </div>
      </div>
      <div class="introduce_box">
        <div class="introduce">所属院系</div>
        <div v-html="model.department_name" class="introduce_detail"></div>
      </div>
      <div class="introduce_box">
        <div class="introduce">
          社团成员
          <div class="introduce_detail">{{ options4 }}人</div>
        </div>
      </div>

      <!-- <div style="margin: 10px">
          <div
            style="
              position: relative;
              left: -100px;
              font-size: 22px;
              margin-bottom: 20px;">
            部门简介
          </div>
          <p v-for="(item2, index2) in model.sector_info" :key="index2">
            {{ item2.sector_name }}】{{ item2.sector_duty }}
          </p>
        </div>
        <div style="margin: 10px">
          <div 
            style="
              position: relative;
              left: -100px;
              font-size: 22px;
              margin-bottom: 20px;">
          </div>
          <div>
            <div style="margin-bottom: 20px; font-size: 19px; line-height: 1.5em">
              <span style="font-size: 20px; line-height: 2em">活动名称</span
              ><br />&#8195;&#8195;<span
                style="color: #5e5e5e; text-indent: 2em"
                >{{ model.brandName }}</span>
            </div>
            <div style="font-size: 19px; line-height: 2em">
              <span style="font-size: 20px">活动内容</span
              ><br />&#8195;&#8195;<span
                style="color: #5e5e5e; text-indent: 2em"
                >{{ model.brandContent }}</span>
            </div>
          </div>
        </div> -->
    </el-card>

    <div v-else>
      <el-card>
        <div v-for="item in options2" :key="item.id" class="bigbox">
          <img :src="imgUrl + item.avatar" />
          <div class="smallbox">
            <div>
              <div class="username">用户名：{{ item.username }}</div>
              <div class="stu">职位：{{ item.stu_position }}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
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
      //社团信息
      model: {},
      imgUrl: process.env.VUE_APP_IMG_URL,
      //用户信息
      userInfo: {
        user_id: "",
      },
      //栏目
      tabPosition: "社团介绍",
      options1: [],
      options2: [],
      options4: [],
    };
  },
  async mounted() {
    //初始化更新信息
    await this.bFetch1();
    this.fetch();
    this.bFetch2();
    this.bFetch4();
  },
  methods: {
    async bFetch4() {
      const { data } = await this.$http.getVipNum({
        organization_id: this.id,
      });
      this.options4 = ((data.data || [])[0] || {}).total;
    },
    async bFetch1() {
      const { data } = await this.$http.getClubType();
      this.options1 = data.data;
    },
    async bFetch2() {
      const { data } = await this.$http.getHuizhang({
        id: this.id,
        page: 1,
        limit: 10000,
      });
      this.options2 = data.data;
      // console.log(this.options2);
    },
    async getUserInfo() {
      const { data } = await this.$http.getUserInfo();
      this.userInfo = data.data;
    },
    async joinThis() {
      if (this.userInfo.user_id === "") {
        return this.$$message.error("您还没有登录账户");
      }
      await this.$http.joinOrganization({
        userId: this.userInfo.user_id,
        organizationId: this.id,
        status: 0,
      });
      this.$message.success("您已申请加入社团，等待管理员审核");
    },

    async fetch() {
      const { data } = await this.$http.getOrganizationById({
        organization_id: this.id,
      });
      this.model = data.data[0];
      this.model.associType1 = (
        this.options1.find((item) => item.type_id == this.model.associType) ||
        {}
      ).type_name;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.boxs {
  width: 90%;
  margin: 10px auto;
  margin-bottom: 100px;
  .content {
    display: flex;
    width: 50rem;
    height: 20rem;
    margin-left: 8%;
    align-items: center;
    justify-content: center;
    // flex-direction: column;
    .title {
      font-size: 3rem;
      margin-bottom: 10px;
      width: 40%;
    }
    .picture {
      width: 98%;
      height: 98%;
      img {
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }

  .introduce_box {
    margin: 10px;
    .introduce {
      font-size: 1.5rem;
    }
    .introduce_detail {
      font-size: 1rem;
      margin: 20px;
      color: #333;
      text-indent: 2em;
    }
  }

  .bigbox {
    padding: 5px;
    display: flex;
    display: inline-block;
    // flex-direction: column;
    // flex-wrap: wrap;
    .samllbox {
      display: flex;
    }
    img {
      width: 150px;
      height: 150px;
    }
    .username,
    .stu {
      font-size: 14px;
      line-height: 22px;
    }
    .username {
      margin-top: 5px;
    }
  }
}
</style>
  