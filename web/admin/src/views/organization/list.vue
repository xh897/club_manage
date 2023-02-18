<template>
  <div class="amazing-wrap" style="width: 1200px">
    <el-alert title="所有社团列表" />
    <el-button
      style="margin: 10px 10px"
      size="mini"
      type="primary"
      @click="openAdd"
      >{{ table === true ? "添加社团" : "返回" }}
    </el-button>
    <el-card style="margin: 0 10px">
      <div v-show="table" class="table">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="全部">
            <el-button
              @click="
                formInline = {};
                fetch();"
              >全部</el-button>
          </el-form-item>
          <el-form-item label="全部">
            <el-input
              v-model="formInline.organization_name"
              placeholder="请输入社团名称"
              size="mini"
            />
          </el-form-item>

          <el-form-item label="所属院系">
            <el-select
              v-model="formInline.department_id"
              placeholder="所属院系"
            >
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
        <el-button
          style="margin: 10px"
          size="mini"
          type="danger"
          @click="multipleDelete"
          >多选删除
        </el-button>
        <el-table
          v-loading="loading"
          :height="650"
          size="mini"
          stripe
          border
          :data="tableData"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" align="center">
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="55"
          />
          <el-table-column
            label="社团名称"
            prop="organization_name"
            align="center"
          />
          <el-table-column label="社团管理员" prop="username" align="center" />
          <el-table-column label="手机号" prop="phone" align="center" />
          <el-table-column
            label="所属学院"
            prop="department_name"
            align="center"
          />
          <el-table-column label="会员人数" prop="vip_num" align="center" />
          <el-table-column label="成员人数" prop="people_num" align="center" />
          <el-table-column
            label="社团logo (点击放大)"
            align="center"
            width="200px"
          >
            <template slot-scope="scope">
              <el-image
                :src="baseImg + scope.row.icon"
                :preview-src-list="[baseImg + scope.row.icon]"
                style="width: 80px; height: 80px"
                fit="cover"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="审核状态" width="100px">
            <template slot-scope="scope">
              {{ statusList[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间" width="150px">
            <template slot-scope="scope">
              {{ $moment(scope.row.create_time).format("yyyy-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            prop="title"
            width="200px"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="goEdit(scope.row)"
                >详情 / 编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.organization_id)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <div style="text-align: center">
          <el-pagination
            background
            :current-page="currentPage"
            :page-sizes="[20, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <el-form v-show="!table" label-width="100px">
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
        <el-form-item label="选择社团管理员">
          <el-select
            v-model="model.user_id"
            placeholder="请选择社团管理员"
            size="mini"
          >
            <el-option
              v-for="item in userList"
              :key="item.user_id"
              :label="item.nickname"
              :value="item.user_name"
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
          <VueEditor v-model="model.introduction" />

        </el-form-item>

        <el-form-item>
          <el-button
            v-if="!editing"
            size="mini"
            type="primary"
            @click="handleConfirm(1)"
            >确定添加社团
          </el-button>
          <el-button v-else size="mini" type="success" @click="handleConfirm(2)"
            >保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import VueEditor from "@/components/VueEditor.vue";


export default {
  components: {

    VueEditor,

  },
  data() {
    return {
      statusList: ["审核中", "审核通过", "审核不通过"],
      tableData: [],
      table: true,
      editing: false,
      currentPage: 1,
      loading: false,
      pageSize: 20,
      total: 0,
      options: [],
      selected: -1,
      searchText: "",
      model: {
        organization_name: "",
        introduction: "",
        department_id: "",
        icon: "",
        user_id: ""
      },
      baseImg: process.env.VUE_APP_IMG_URL,
      userList: [],
      options1: [],
      formInline: {
        user: "",
        region: "",
      },
      multipleSelection: [],
    };
  },
  async mounted() {
    this.bFetch();
    this.fetch();
    this.getUserList();
    this.bFetch1();
  },
  methods: {
    //批量删除
    handleSelectionChange(val) {

      this.multipleSelection = val;
    },
    async multipleDelete() {
      if (!this.multipleSelection.length) {
        return alert("请选择具体一个社团");
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.organization_id).join(",")
      );

    },
    //搜索
    onSubmit() {
      this.fetch();
    },
    // 获取社团类型
    async bFetch1() {
      const { data } = await this.$http.getClubType();
      this.options1 = data;
    },
    //获取用户列表
    async getUserList() {
      this.loading = true;
      const data = await this.$http.getAllUser({
        page: this.currentPage,
        limit: 10000,
      });
      this.userList = data.data;
    },
    // 获取院系列表
    async bFetch() {
      const { data } = await this.$http.getDepartment();
      this.options = data;
    },
    // 获取社团列表
    async fetch() {
      this.loading = true;
      const data = await this.$http.getOrganization({
        page: this.currentPage,
        limit: this.pageSize,
        ...this.formInline,
        organization_id: this.$store.state.user.organizationManager,
        status:'1'
      });
      if (data.length === 0 && this.currentPage !== 1) {
        this.currentPage--;
        this.fetch();
      }
      this.tableData = data.data;
      this.total = data.total;
      this.loading = false;
    },
    async handleDelete1(organization_id, status) {
      await this.$http.setOrganization1({ organization_id, status });
      this.$message.success("添加成功！");
      this.table = true;
      this.fetch();
    },
    // 社团删除
    handleDelete(organization_id) {
      this.$confirm("是否确定删除该社团", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.deleteOrganization({ organization_id });
          this.$message.success("删除成功！");
          this.fetch();
        })

        .catch(() => {});
    },
    openAdd() {
      this.model = {
        organization_name: "",
        introduction: "",
        department_id: "",
        icon: "",
      };

      this.editing = false;
      this.table = !this.table;
    },
    goEdit(data) {
      this.editing = true;
      this.model = data;

      this.table = false;
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
      if (this.model.user_id === "") {
        return this.$message.info("请输入社团管理员");
      }
      if (type === 1) {
        await this.$http.addOrganization(this.model);
      } else {
        await this.$http.setOrganization(this.model);
      }
      this.$message.success("操作成功！");
      this.table = true;
      this.fetch();
    },
    handleSearchRadio() {
      this.searchText = "";
      this.currentPage = 1;
      this.fetch();
    },
    handleSearchAll() {
      this.currentPage = 1;
      this.selected = -1;
      this.fetch();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.fetch();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetch();
    },

    async uploading(e) {
      if (e.target.files.length === 0) {
        return;
      }
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const data = await this.$http.upload(formData);
      this.model.icon = data.filename;
    },
  },
};
</script>

<style></style>
