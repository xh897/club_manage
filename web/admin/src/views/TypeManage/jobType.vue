<template>
  <div>
    <div class="amazing-wrap" style="width: 1200px">
      <el-alert title="所有职位类别列表" />
      <el-button
        style="margin: 10px 20px"
        size="mini"
        type="primary"
        @click="openAdd"
        >{{ table === true ? "添加职位类别" : "返回" }}
      </el-button>
      <el-button
        style="margin: 10px 0"
        size="mini"
        type="primary"
        @click="multipleDelete"
        >多选删除
      </el-button>
      <el-card>
        <div v-show="table" class="table">
          <el-table
            v-loading="loading"
            :height="650"
            size="mini"
            stripe
            border
            :data="showData"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40" align="center">
            </el-table-column>
            <el-table-column
              type="index"
              width="55"
              label="序号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="职位类别名称"
              prop="stu_position"
              align="center"
            />
            <el-table-column align="center" label="创建时间" width="200px">
              <template slot-scope="scope">
                {{ $moment(scope.row.addtime).format("yyyy-MM-DD HH:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              prop="title"
              width="300px"
            >
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="goEdit(scope.row)"
                  >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.posi_id)"
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

        <el-form v-show="!table" label-width="100px">
          <el-form-item label="职位类别名称">
            <el-input
              v-model="model.stu_position"
              placeholder="请输入职位类别名称"
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="!editing"
              size="mini"
              type="primary"
              @click="handleConfirm(1)"
              >确定添加职位类别
            </el-button>
            <el-button
              v-else
              size="mini"
              type="success"
              @click="handleConfirm(2)"
              >保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      tableData: [],
      showData: [],
      table: true,
      editing: false,
      currentPage: 1,
      loading: false,
      pageSize: 15,
      total: 0,
      options: [],
      selected: -1,
      searchText: "",
      model: {
        stu_position: "",
        introduction: "",
        posi_id: "",
        icon: "",
        user_id: "",
      },
      baseImg: process.env.VUE_APP_IMG_URL,
      userList: [],
      multipleSelection: [],
    };
  },
  async mounted() {
    this.bFetch();
    this.fetch();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async multipleDelete() {
      if (!this.multipleSelection.length) {
        return alert("请选择具体一个职位类别");
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.posi_id).join(",")
      );
    },
    async bFetch() {
      const { data } = await this.$http.getStuposition({
        page: this.currentPage,
        limit: this.pageSize,
      });
      this.options = data;
    },
    async fetch() {
      this.loading = true;
      const data = await this.$http.getStuposition({
        page: this.currentPage,
        limit: this.pageSize,
      });
      if (data.length === 0 && this.currentPage !== 1) {
        this.currentPage--;
        this.fetch();
      }
      this.tableData = data.data;
      this.showData = this.tableData.slice(0, this.pageSize)
      this.total = data.total;
      this.loading = false;
    },
    handleDelete(posi_id) {
      this.$confirm("是否确定删除该职位类别", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.deleteStuposition({ posi_id });
          this.$message.success("删除成功！");
          this.fetch();
        })

        .catch(() => {});
    },
    openAdd() {
      this.model = {
        stu_position: "",
        introduction: "",
        posi_id: "",
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
      if (this.model.stu_position === "") {
        return this.$message.info("请输入职位类别名称");
      }
      if (type === 1) {
        await this.$http.addStuposition(this.model);
      } else {
        await this.$http.setStuposition(this.model);
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
      this.showData = this.tableData.slice(0, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showData = this.tableData.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
    },
  },
};
</script>
  
  <style></style>
  