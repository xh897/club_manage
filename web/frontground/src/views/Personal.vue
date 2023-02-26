<template>
    <div class="personal-box">
      <el-radio-group
        v-model="tabPosition"
        style="margin-bottom: 30px; margin-top: 50px"
      >
        <el-radio-button label="申请">申请</el-radio-button>
        <el-radio-button label="我的社团">我的社团</el-radio-button>
      </el-radio-group>
      <div>
        <el-button @click="dialogVisible = true">新社团创建</el-button>
        <el-button @click="dialogVisible1 = true">加入社团</el-button>
        <el-button @click="dialogVisible2 = true">申请职位</el-button>
      </div>
      <div v-if="tabPosition == '申请'">
        <div
          v-for="item in options11"
          :key="item"
          style="
            margin: 5px 200px 5px 40px;
            display: flex;
            padding: 5px;
            height: 100px;
            border: 1px solid #eee;
            align-items: center;
            box-shadow: 0px 0px 5px 1px rgb(236, 236, 236);
          "
        >
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 0;
              color: rgb(193, 193, 193);
              text-align: center;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">类型</p>
            创建社团
          </div>
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 20px;
              color: rgb(193, 193, 193);
              text-align: center;
  
              width: 100px;
              word-wrap: break-word;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">社团名称</p>
            {{ item.organization_name }}
          </div>
  
          <div
            style="
              margin: -63px 20px 0px 20px;
              flex: 1;
              font-size: 14px;
              overflow: hidden;
              text-align: center;
              text-overflow: ellipsis;
            "
          >
            <p
              style="
                margin-block-start: 0em;
                margin-block-end: 0em;
                color: rgb(26, 218, 207);
                text-align: center;
                font-size: 16px;
                margin-bottom: 0.5em;
              "
            ></p>
            {{ item.reason }}
          </div>
          <div style="margin: 0px 20px 0px 20px; color: #409eff">
            {{ statusList[item.status] }}
          </div>
          <el-button @click="handleDelete('user_addorg', item.organization_id)"
            >删除</el-button
          >
        </div>
        <div
          v-for="item in options3"
          :key="item"
          style="
            margin: 5px 200px 5px 40px;
            display: flex;
            padding: 5px;
            height: 100px;
            border: 1px solid #eee;
            align-items: center;
            box-shadow: 0px 0px 5px 1px rgb(236, 236, 236);
          "
        >
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 0;
              color: rgb(193, 193, 193);
              text-align: center;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">类型</p>
            加入社团
          </div>
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 20px;
              color: rgb(193, 193, 193);
              text-align: center;
  
              width: 100px;
              word-wrap: break-word;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">社团名称</p>
            {{ item.organization_name }}
          </div>
  
          <div
            style="
              margin: -63px 20px 0px 20px;
              flex: 1;
              font-size: 14px;
              overflow: hidden;
              text-align: center;
              text-overflow: ellipsis;
            "
          >
            <p
              style="
                margin-block-start: 0em;
                margin-block-end: 0em;
                color: rgb(26, 218, 207);
                text-align: center;
                font-size: 16px;
                margin-bottom: 0.5em;
              "
            >
              申请理由
            </p>
            {{ item.reason }}
          </div>
          <div style="margin: 0px 20px 0px 20px; color: #409eff">
            {{ statusList[item.status] }}
          </div>
          <el-button @click="handleDelete('user_department', item.id)"
            >删除</el-button
          >
        </div>
        <div
          v-for="item in options7"
          :key="item"
          style="
            margin: 5px 200px 5px 40px;
            display: flex;
            padding: 5px;
            height: 100px;
            border: 1px solid #eee;
            box-shadow: 0px 0px 5px 1px rgb(236, 236, 236);
            align-items: center;
          "
        >
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 0;
              color: rgb(193, 193, 193);
              text-align: center;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">类型</p>
            申请职位
          </div>
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 20px;
              color: rgb(193, 193, 193);
              text-align: center;
  
              width: 100px;
              word-wrap: break-word;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">社团名称</p>
            {{ item.organization_name }}
          </div>
  
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 20px;
              color: rgb(193, 193, 193);
              text-align: center;
  
              width: 70px;
              word-wrap: break-word;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">职位名称</p>
            {{ item.stu_position }}
          </div>
          <div
            style="
              margin: -63px 20px 0px 20px;
              flex: 1;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: center;
            "
          >
            <p
              style="
                margin-block-start: 0em;
                margin-block-end: 0em;
                color: rgb(26, 218, 207);
                text-align: center;
                font-size: 16px;
                margin-bottom: 0.5em;">
              申请理由
            </p>
            {{ item.reason }}
          </div>
          <div style="margin: 0px 20px 0px 20px; color: #409eff">
            {{ statusList[item.status] }}
          </div>
          <el-button @click="handleDelete('user_member', item.id)"
            >删除</el-button
          >
        </div>
        <div
          v-for="item in options8"
          :key="item"
          style="
            margin: 5px 200px 5px 40px;
            display: flex;
            padding: 5px;
            height: 100px;
            border: 1px solid #eee;
            box-shadow: 0px 0px 5px 1px rgb(236, 236, 236);
            align-items: center;
          "
        >
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 0;
              color: rgb(193, 193, 193);
              text-align: center;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">类型</p>
            退出社团
          </div>
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 20px;
              color: rgb(193, 193, 193);
              text-align: center;
  
              width: 100px;
              word-wrap: break-word;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">社团名称</p>
            {{ item.organization_name }}
          </div>
          <div
            style="
              margin: -63px 20px 0px 20px;
              flex: 1;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: center;
            "
          >
            <p
              style="
                margin-block-start: 0em;
                margin-block-end: 0em;
                color: rgb(26, 218, 207);
                text-align: center;
                font-size: 16px;
                margin-bottom: 0.5em;
              "
            >
              申请理由
            </p>
            {{ item.reason }}
          </div>
          <div style="margin: 0px 20px 0px 20px; color: #409eff">
            {{ statusList[item.status] }}
          </div>
          <el-button @click="handleDelete('quit_association', item.id)"
            >删除</el-button
          >
        </div>
        <div
          v-for="item in options9"
          :key="item"
          style="
            margin: 5px 200px 5px 40px;
            display: flex;
            padding: 5px;
            height: 100px;
            border: 1px solid #eee;
            box-shadow: 0px 0px 5px 1px rgb(236, 236, 236);
            align-items: center;
          "
        >
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 0;
              color: rgb(193, 193, 193);
              text-align: center;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">类型</p>
            参加活动
          </div>
          <div
            style="
              height: 40px;
              padding: 0;
              margin: -93px 0 0 20px;
              color: rgb(193, 193, 193);
              text-align: center;
  
              width: 100px;
              word-wrap: break-word;
            "
          >
            <p style="color: rgb(26, 218, 207); text-align: center">活动名称</p>
            {{ item.title }}
          </div>
          <div
            style="
              margin: -63px 20px 0px 20px;
              flex: 1;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: center;
            "
          >
            <p
              style="
                margin-block-start: 0em;
                margin-block-end: 0em;
                color: rgb(26, 218, 207);
                text-align: center;
                font-size: 16px;
                margin-bottom: 0.5em;
              "
            ></p>
          </div>
          <div style="margin: 0px 20px 0px 20px; color: #409eff">
            {{ statusList[item.status] }}
          </div>
          <el-button @click="handleDelete('user_activity', item.quitId)" style=""
            >删除</el-button
          >
        </div>
      </div>
      <div v-else>
        <div style="display: flex; flex-wrap: wrap; margin: 0 auto">
          <div
            v-for="(item, index) in organizationList"
            :key="index"
            @click.prevent="
              $router.push('/organizationdetail/' + item.organization_id)
            "
            class="games_item"
            style="width: 33%"
          >
            <div
              class="left"
              style="display: flex; align-items: center; flex-direction: column"
            >
              <div class="icon">
                <img
                  :src="imgUrl + item.icon"
                  alt=""
                  style="width: 150px; height: 150px; border-radius: 50%"
                />
              </div>
              <div
                class="center"
                style="text-align: center; margin: 10px 0; font-size: 16px"
              >
                <div class="name">{{ item.organization_name }}</div>
              </div>
              <div
                class="center"
                style="
                  text-align: center;
                  margin: 10px 0;
                  font-size: 14px;
                  color: rgb(107, 107, 107);
                "
              >
                <div class="name">{{ item.tenet }}</div>
              </div>
              <el-button
                @click.stop="
                  logoutOrg({
                    organization_id: item.organization_id,
                    user_id: userInfo.user_id,
                  })
                "
                >退出社团</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="添加社团" :visible.sync="dialogVisible" width="30%">
        <el-form label-width="100px">
          <el-form-item label="选择所属院系">
            <el-select
              v-model="model.department_id"
              placeholder="请选择社团所属院系"
              size="mini"
            >
              <el-option
                v-for="item in options"
                :key="item.department_id"
                :label="item.department_name"
                :value="item.department_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择社团类型">
            <el-select
              v-model="model.associType"
              placeholder="请选择社团社团类型"
              size="mini"
            >
              <el-option
                v-for="item in options1"
                :key="item.type_id"
                :label="item.type_name"
                :value="item.type_id"
              />
            </el-select>
          </el-form-item>
  
          <el-form-item label="上传logo">
            <input type="file" accept="image/*" @change="uploading" />
          </el-form-item>
          <el-form-item label="社团logo预览">
            <el-image
              :src="baseImg + model.icon"
              style="width: 100px; height: 100px"
              fit="cover"
            />
          </el-form-item>
          <el-form-item label="社团名称">
            <el-input
              v-model="model.organization_name"
              placeholder="请输入社团名称"
              size="mini"
            />
          </el-form-item>
          <el-form-item label="社团宗旨">
            <el-input
              v-model="model.tenet"
              placeholder="请输入社团宗旨"
              size="mini"
            />
          </el-form-item>
          <el-form-item label="品牌活动名称">
            <el-input
              v-model="model.brandName"
              placeholder="请输入品牌活动名称"
              size="mini"
            />
          </el-form-item>
          <el-form-item label="品牌活动内容">
            <el-input
              v-model="model.brandContent"
              placeholder="请输入品牌活动内容"
              size="mini"
            />
          </el-form-item>
  
          <el-form-item label="社团简介">
            <el-input type="textarea" v-model="model.introduction" />
          </el-form-item>
  
          <el-form-item>
            <el-button size="mini" type="primary" @click="handleConfirm(1)"
              >确定添加社团
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="申请加入社团" :visible.sync="dialogVisible1" width="40%">
        <el-form label-width="100px">
          <el-form-item label="选择社团">
            <el-select
              v-model="model1.organization_id"
              placeholder="请选择社团"
              size="mini"
            >
              <el-option
                v-for="item in options2"
                :key="item.organization_id"
                :label="item.organization_name"
                :value="item.organization_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="申请原因">
            <el-input
              v-model="model1.reason"
              placeholder="请输入申请原因"
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="handleConfirm1()"
              >确定加入社团
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="申请职位" :visible.sync="dialogVisible2" width="40%">
        <el-form label-width="100px">
          <el-form-item label="选择社团">
            <el-select
              v-model="model2.organization_id"
              placeholder="请选择社团"
              size="mini"
            >
              <el-option
                v-for="item in options2"
                :key="item.organization_id"
                :label="item.organization_name"
                :value="item.organization_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择职位">
            <el-select
              v-model="model2.memberId"
              placeholder="请选择职位"
              size="mini"
            >
              <el-option
                v-for="item in options4"
                :key="item.posi_id"
                :label="item.stu_position"
                :value="item.posi_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="申请原因">
            <el-input
              v-model="model2.reason"
              placeholder="请输入申请原因"
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="handleConfirm2()"
              >确定申请职位
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
        active: 0,
        status: -1,
        userId: "",
        organizationList: [],
        imgUrl: process.env.VUE_APP_IMG_URL,
        formInline: {
          associType: "",
        },
        options: [],
        options1: [],
        tabPosition: "申请",
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        model: {
          organization_name: "",
          introduction: "",
          department_id: "",
          icon: "",
          user_id: "",
        },
        model1: {
          organization_id: "",
          user_id: "",
          reason: "",
        },
        model2: {
          organization_id: "",
          memberId: "",
          user_id: "",
          reason: "",
        },
        options: [],
        options1: [],
        options2: [],
        options3: [],
        options4: [],
        options5: [],
        options6: [],
        options7: [],
        options8: [],
        options9: [],
        options11: [],
        loading: false,
        userList: [],
        baseImg: process.env.VUE_APP_IMG_URL,
        userInfo: {},
        statusList: ["审核中", "审核通过", "审核不通过"],
        map: {},
      };
    },
    async mounted() {
      //初始化申请列表与用户信息
      await this.getUserInfo();
      await this.fetch();
      this.bFetch1();
      this.bFetch2();
      this.bFetch3();
      this.bFetch7();
      this.bFetch8();
      this.bFetch9();
      this.bFetch4();
      this.bFetch11();
  
      this.bFetch();
    },
    methods: {
      refresh() {
        this.bFetch3();
        this.bFetch7();
        this.bFetch8();
        this.bFetch11();
      },
      async handleDelete(table, id) {
        if (table == "user_addorg") {
          await this.$http.deleteOrganization({ organization_id: id });
          this.refresh();
          return;
        }
        await this.$http.deleteByTableAndId({ table, id });
        this.refresh();
      },
      async logoutOrg2(data) {
        await this.$http.logoutOrg(data);
        this.tabPosition = "申请";
        this.refresh();
        this.$message.success("申请成功！");
      },
      //退出社团
      async logoutOrg(data) {
        this.$prompt("请输入申请理由", "提示", {
          confirmButtonText: "申请退出社团",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            data.reason = value;
            this.logoutOrg2(data);
          })
          .catch(() => {});
      },
      async bFetch6() {
        const { data } = await this.$http.getMyOrg({
          page: 1,
          limit: 10000,
        });
  
        this.options6 = data.data;
      },
      async bFetch4() {
        const { data } = await this.$http.getStuposition({
          page: 1,
          limit: 10000,
        });
  
        this.options4 = data.data;
      },
      async bFetch3() {
        const { data } = await this.$http.getOrganizationAuditById({
          page: 1,
          limit: 10000,
          userId: this.userInfo.user_id,
          status: -1,
        });
  
        this.options3 = data.data;
      },
      async bFetch7() {
        const { data } = await this.$http.getOrganizationAuditById1({
          page: 1,
          limit: 10000,
          userId: this.userInfo.user_id,
          status: -1,
        });
  
        this.options7 = data.data;
      },
      async bFetch11() {
        const { data } = await this.$http.getOrganizationAuditById2({
          page: 1,
          limit: 10000,
          userId: this.userInfo.user_id,
          status: 0,
        });
  
        this.options11 = data.data;
      },
      async bFetch8() {
        const { data } = await this.$http.getQuitByUserId({
          page: 1,
          limit: 10000,
          userId: this.userInfo.user_id,
          status: -1,
        });
  
        this.options8 = data.data;
      },
      async bFetch9() {
        const { data } = await this.$http.getUserActivityByUserId({
          page: 1,
          limit: 10000,
          userId: this.userInfo.user_id,
          status: -1,
        });
        this.options9 = data.data;
      },
      async bFetch2() {
        const { data } = await this.$http.getOrganization({
          page: 1,
          limit: 10000,
        });
        // 过滤自己是社团管理员，并且已经审核的
        this.options2 = (data.data || []).filter(
          (item) =>
            this.organizationList.findIndex(
              (item1) => item1.organization_id == item.organization_id
            ) < 0
        );
      },
      async getUserInfo() {
        const { data } = await this.$http.getUserInfo();
        if (this.$route.path == "/personal") {
          if (data.code == 401) {
            this.$message.error("您未登录，请登录后查看");
            this.$router.push(`/login`);
            return;
          }
        }
        this.userInfo = data.data;
      },
      async handleConfirm1() {
        if (!this.userInfo.user_id) {
          return this.$message.info("请先登录");
        }
        if (this.model1.organization_id === "") {
          return this.$message.info("请选择社团");
        }
        this.model1.user_id = this.userInfo.user_id;
        await this.$http.joinOrganization(this.model1);
        this.$message.success("申请成功！");
        this.dialogVisible1 = false;
        this.refresh();
      },
      async handleConfirm2() {
        if (!this.userInfo.user_id) {
          return this.$message.info("请先登录");
        }
        if (this.model2.organization_id === "") {
          return this.$message.info("请选择社团");
        }
        if (this.model2.memberId === "") {
          return this.$message.info("请选择职位");
        }
        this.model2.user_id = this.userInfo.user_id;
        await this.$http.joinOrganization1(this.model2);
        this.$message.success("申请成功！");
        this.dialogVisible2 = false;
        this.refresh();
      },
      async handleConfirm(type) {
        if (this.model.department_id === "") {
          return this.$message.info("请选择社团分类");
        }
        if (this.model.organization_name === "") {
          return this.$message.info("请输入社团名称");
        }
        if (this.model.icon === "") {
          return this.$message.info("请上传社团logo");
        }
        if (this.model.introduction === "") {
          return this.$message.info("请输入社团介绍");
        }
  
        if (type === 1) {
          this.model.user_id = this.userInfo.user_id;
          await this.$http.addOrganization(this.model);
        }
        this.$message.success("申请成功！");
        this.dialogVisible = false;
        this.fetch();
        this.bFetch9();
        this.refresh();
      },
      async uploading(e) {
        if (e.target.files.length === 0) {
          return;
        }
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const data = await this.$http.upload(formData);
        this.model.icon = data.data.filename;
      },
      async bFetch1() {
        const { data } = await this.$http.getClubType();
  
        this.options1 = data.data;
      },
      async bFetch() {
        const { data } = await this.$http.getDepartment();
        this.options = data.data;
      },
      async getUserList() {
        this.loading = true;
        const data = await this.$http.getAllUser({
          page: this.currentPage,
          limit: 10000,
        });
        this.userList = data.data;
      },
      async fetch() {
        const { data = {} } = await this.$http.getMyOrg({
          page: 1,
          limit: 100,
          user_id: this.userInfo.user_id,
        });
        this.organizationList = (data.data || []).filter((item) => {
          if (!this.map[item.organization_id]) {
            this.map[item.organization_id] = true;
            return true;
          }
          return false;
        });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .personal-box {
    width: 85%;
    margin: 0 auto;
    min-height: 700px;
    .bottom-button {
      border: none;
      background-color: #2a00d0;
    }
  }
  </style>