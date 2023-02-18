<template>
    <div class="amazing-wrap" style="width: 1200px">
      <el-alert title="所有留言列表" />
      <el-button
        style="margin: 10px"
        size="mini"
        type="primary"
        @click="multipleDelete"
        >多选删除
      </el-button>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名/用户昵称" style="margin-left: 10px">
          <el-input
            v-model="formInline.data"
            placeholder="用户名/用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-card style="margin-left: 10px">
        <div v-show="table" class="table">
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
            <el-table-column type="index" label="序号" width="55" align="center">
            </el-table-column>
            <el-table-column label="用户名" prop="username" width="110" align="center" />
            <el-table-column label="昵称" width="110" prop="nickname" align="center" />
            <el-table-column label="留言内容" prop="content" align="center" />
            <el-table-column
              label="用户头像 (点击放大)"
              align="center"
              width="200px">
              <template slot-scope="scope">
                <el-image
                  :src="baseImg + scope.row.avatar"
                  :preview-src-list="[baseImg + scope.row.avatar]"
                  style="width: 80px; height: 80px"
                  fit="cover"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="留言时间" width="200px">
              <template slot-scope="scope">
                {{
                  $moment(new Date(scope.row.create_time)).format(
                    "yyyy-MM-DD HH:mm:ss"
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              prop="title"
              width="100px"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)"
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
              :page-sizes="[15, 30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>

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
        formInline: {
          data: "",
        },
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
          title: "",
          content: "",
          organization_id: "",
          icon: "",
        },
        baseImg: process.env.VUE_APP_IMG_URL,
        multipleSelection: [],
      };
    },
    async mounted() {
      this.fetch();
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      async multipleDelete() {
        if (!this.multipleSelection.length) {
          return alert("请选择具体一个留言");
        }
        this.handleDelete(
          this.multipleSelection.map((item) => item.id).join(",")
        );
      },
      async fetch() {
        this.loading = true;
        const data = await this.$http.getCommentList({
          page: this.currentPage,
          limit: this.pageSize,
          data: this.formInline.data,
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
        this.$confirm("是否确定删除该留言", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await this.$http.deleteCommentById({ id });
            this.$message.success("删除成功！");
            this.fetch();
          })
          .catch(() => {});
      },
      goEdit(data) {
        this.editing = true;
        this.model = data;
        this.table = false;
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
    },
  };
  </script>
  
  <style></style>
  