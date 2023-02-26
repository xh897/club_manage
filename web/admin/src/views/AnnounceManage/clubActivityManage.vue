<template>
    <!-- 社团活动界面 -->
    <div class="amazing-wrap" style="width: 1200px">
      <el-alert title="所有社团活动列表" style="margin: 10px"/>
      <el-button
        style="margin: 10px"
        size="mini"
        type="primary"
        @click="openAdd"
        >{{ table === true ? "添加社团活动" : "返回" }}
      </el-button>
      <el-button
        style="margin: 10px"
        size="mini"
        type="danger"
        @click="multipleDelete"
        >多选删除
      </el-button>
      <el-card style="margin-left: 10px">
        <div v-show="table" class="table">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-button type="primary"
                @click=" formInline = {}; fetch();">点击刷新</el-button>
            </el-form-item>
            <el-form-item label="请输入社团活动名称">
              <el-input
                v-model="formInline.title"
                placeholder="请输入社团活动名称"
                size="mini"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
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
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column label="社团活动名称" prop="title" align="center" />
            <el-table-column label="举办方" prop="host" align="center" />
            <el-table-column label="开始时间" prop="timeStart" align="center">
              <template slot-scope="scope">
                {{ $moment(scope.row.timeStart).format("yyyy-MM-DD HH:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column label="结束时间" prop="timeEnd" align="center">
              <template slot-scope="scope">
                {{ $moment(scope.row.timeEnd).format("yyyy-MM-DD HH:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column
              label="所属社团"
              prop="organization_name"
              align="center"/>
            <el-table-column
              label="社团活动封面 (点击放大)"
              align="center"
              width="120px">
              <template slot-scope="scope">
                <!-- fit="cover"等比剪裁 居中 -->
                <el-image
                  :src="baseImg + scope.row.icon"
                  :preview-src-list="[baseImg + scope.row.icon]"
                  style="width: 80px; height: 80px"
                  fit="cover"/>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                {{ $moment(scope.row.create_time).format("yyyy-MM-DD HH:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              prop="title">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="goEdit(scope.row)">详情</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <div style="text-align: center">
            <el-pagination
              background
              :current-page="currentPage"
              :page-sizes="[15, 30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
  
        <el-form v-show="!table" label-width="130px">
          <el-form-item label="选择社团">
            <el-select
              v-model="model.organization_id"
              placeholder="请选择选择社团"
              size="mini" >
              <el-option
                v-for="item in options3"
                :key="item.organization_id"
                :label="item.organization_name"
                :value="item.organization_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上传logo">
            <input type="file" accept="image/*" @change="uploading" />
          </el-form-item>
          <el-form-item label="社团活动logo预览">
            <el-image
              :src="baseImg + model.icon"
              style="width: 100px; height: 100px"
              fit="cover"
            />
          </el-form-item>
          <el-form-item label="社团活动名称">
            <el-input
              v-model="model.title"
              placeholder="请输入社团活动名称"
              size="mini"
            />
          </el-form-item>
          <el-form-item label="社团活动举办方">
            <el-input
              v-model="model.host"
              placeholder="请输入社团活动举办方"
              size="mini"
            />
          </el-form-item>
          <el-form-item label="社团活动时间">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="社团活动开始日期"
              end-placeholder="社团活动结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
  
          <el-form-item label="社团活动地点">
            <el-input
              v-model="model.activityPlace"
              placeholder="请输入社团活动地点"
              size="mini"
            />
          </el-form-item>
  
          <el-form-item label="活动对象">
            <el-input
              v-model="model.activityObjtext"
              placeholder="请输入活动对象"
              size="mini"
            />
          </el-form-item>
          <el-form-item label="社团活动内容">
            <VueEditor v-model="model.content" />
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="!editing"
              size="mini"
              type="primary"
              @click="handleConfirm(1)"
              >确定发布社团活动
            </el-button>
            <el-button v-else size="mini" type="success" @click="handleConfirm(2)">保存
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
        value1: [],
        tableData: [],
        table: true,
        editing: false,
        currentPage: 1,
        loading: false,
        pageSize: 15,
        total: 0,
        options: [],
        options3: [],
        selected: -1,
        searchText: "",
        model: {
          title: "",
          content: "",
          organization_id: "",
          icon: "",
          host: "",
          activityObj: "活动对象",
          activityObjtext: "",
          timeStart: "",
          timeEnd: "",
          activityPlace: "",
        },
        baseImg: process.env.VUE_APP_IMG_URL,
        multipleSelection: [],
        formInline: {
          title: "",
        },
      };
    },
    async mounted() {
      this.bFetch();
      this.bFetch3();
      this.fetch();
    },
    methods: {
      onSubmit() {
        this.fetch();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      async multipleDelete() {
        if (!this.multipleSelection.length) {
          return alert("请选择至少选择具体一个审批");
        }
        this.handleDelete(
          this.multipleSelection.map((item) => item.id).join(","));
      },
      async bFetch3() {
        const { data } = await this.$http.getOrganization({
          organization_id: this.$store.state.user.organizationManager,
          page: 1,
          limit: 10000,
        });
        this.options3 = data;
      },
      async bFetch() {
        const { data } = await this.$http.getOrganization({
          page: 1,
          limit: 100,
        });
        this.options = data;
      },
      async fetch() {
        this.loading = true;
        const data = await this.$http.getActivity({
          page: this.currentPage,
          limit: this.pageSize,
          activityObj: "活动对象",
          organization_id: this.$store.state.user.organizationManager,
          title: this.formInline.title,
        });
        if (data.length === 0 && this.currentPage !== 1) {
          this.currentPage--;
          this.fetch();
        }
        this.tableData = data.data;
        this.total = data.total;
        this.loading = false;
      },
      handleDelete(id) {
        this.$confirm("是否确定删除该活动", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await this.$http.deleteActivity({ id });
            this.$message.success("删除成功！");
            this.fetch();
          })
          .catch(() => {});
      },
      openAdd() {
        this.model = {
          title: "",
          content: "",
          organization_id: "",
          icon: "",
          activityObj: "活动对象",
        };
        this.editing = false;
        this.table = !this.table;
      },
      goEdit(data) {
        this.editing = true;
        this.model = data;
        this.value1 = [this.model.timeStart, this.model.timeEnd];
        this.table = false;
      },
      async handleConfirm(type) {
        if (this.model.organization_id === "") {
          return this.$message.info("请选择社团活动分类");
        }
        if (this.model.title === "") {
          return this.$message.info("请输入社团活动名称");
        }
        if (this.model.icon === "") {
          return this.$message.info("请上传社团活动logo");
        }
        if (this.model.content === "") {
          return this.$message.info("请输入社团活动内容");
        }
        this.model.timeStart = this.value1[0];
        this.model.timeEnd = this.value1[1];
        if (type === 1) {
          await this.$http.addActivity(this.model);
        } else {
          await this.$http.setActivity(this.model);
        }
        this.$message.success("添加成功！");
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
  