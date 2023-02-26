<template>
  <div class="amazing-wrap" style="width: 1200px">
    <el-alert title="所有用户列表" />
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="用户名/学院/专业" style="margin: 10px;">
        <el-input
          v-model="formInline.data"
          placeholder="请输入要查询的用户名或学院或专业"
          style="width: 258px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetch" style="margin: 10px; ">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card style="margin: 0 10px">
      <div v-show="table" class="table">
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" align="center" />
          <el-table-column label="序号" type="index" align="center" />
          <el-table-column label="用户名" prop="username" align="center" />
          <el-table-column label="学院" prop="department_name" align="center" />
          <el-table-column label="专业" prop="major_name" align="center" />
          <el-table-column label="班级" prop="class_name" align="center" />
          <el-table-column label="学号" prop="stuId" align="center" />
          <el-table-column label="用户昵称" prop="nickname" align="center" />
          <el-table-column label="手机号" prop="phone" align="center" />
          <el-table-column label="性别" align="center" prop="sex" width="60" />
          <el-table-column
            label="用户头像 (点击放大)"
            align="center"
            width="150px"
          >
            <template slot-scope="scope">
              <el-image
                :src="baseImg + scope.row.avatar"
                :preview-src-list="[baseImg + scope.row.avatar]"
                style="width: 40px; height: 40px"
                fit="cover"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="注册时间" width="100px">
            <template slot-scope="scope">
              {{ $moment(scope.row.create_time).format("yyyy-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.user_id)"
                >删除</el-button >
            </template>
          </el-table-column>
        </el-table>
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
export default {
  components: {},
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
        nickname: "",
        sex: "",
        phone: "",
        avatar: "",
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
        return alert("请选择具体一个注册用户");
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.user_id).join(",")
      );
    },
    async fetch() {
      this.loading = true;
      const data = await this.$http.getAllUser({
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
    handleDelete(row) {
      this.$confirm("是否确定删除该用户", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          await this.$http.deleteUserInfoById({
            user_id: row,
          });
          this.$message.success("删除成功！");
          this.fetch();
        }).catch(() => {});
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
  