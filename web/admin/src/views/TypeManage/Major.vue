<template>
  <div>
    <div class="amazing-wrap" style="width: 1200px">
      <el-alert title="所有专业列表" />
      <el-button
        style="margin: 10px 10px"
        size="mini"
        type="primary"
        @click="openAdd"
        >{{ table === true ? "添加专业" : "返回" }}
      </el-button>
      <el-button
        style="margin: 10px 0"
        size="mini"
        type="primary"
        @click="allSelect"
        >点击刷新</el-button>
      <el-button
        style="margin: 10px 10px"
        size="mini"
        type="danger"
        @click="multipleDelete"
        >多选删除
      </el-button>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学院或专业名称" style="margin: 0 10px">
          <el-input
            v-model="formInline.data"
            placeholder="请输入查找的学院或专业名称"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch" style="margin: 0 10px"
            >点击查找</el-button
          >
        </el-form-item>
      </el-form>
      <el-card style="margin: 0 10px">
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
              label="专业名称"
              prop="major_name"
              align="center"
            />
            <el-table-column
              label="学院名称"
              prop="department_name"
              align="center"
            />

            <el-table-column align="center" label="创建时间" width="200px">
              <template slot-scope="scope">
                {{
                  $moment(scope.row.create_time).format("yyyy-MM-DD HH:mm:ss")
                }}
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
                  @click="
                    handleDelete(scope.row.major_id, scope.row.major_name)
                  "
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
          <el-form-item label="选择学院">
            <el-select
              v-model="model.faculty"
              placeholder="请选择学院"
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
          <el-form-item label="专业名称">
            <el-input
              v-model="model.major_name"
              placeholder="请输入专业名称"
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="!editing"
              size="mini"
              type="primary"
              @click="handleConfirm(1)"
              >确定添加专业
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
      formInline: {
        data: "",
      },
      tableData: [], // 总数据
      showData: [], // 展示数据
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
        major_name: "",
        department_id: "",
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
        return alert("请至少选择具体一个专业");
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.major_id).join(",")
      );
    },
    async bFetch() {
      const { data } = await this.$http.getDepartment();
      this.options = data;
    },
    async fetch() {
      this.loading = true;
      const data = await this.$http.getMajor({
        data: this.formInline.data
      });
      if (data.length === 0 && this.currentPage !== 1) {
        this.currentPage--;
        this.fetch();
      }
      this.tableData = data.data;
      this.showData = this.tableData.slice(0, this.pageSize);
      // console.log(data.total);
      this.total = data.total;
      this.loading = false;
    },
    async allSelect() {
      const { data } = await this.$http.getMajor();
      this.tableData = data;
      this.formInline.data = "";
      this.table = true;
    },
    handleDelete(major_id, major_name) {
      this.$confirm("是否删除专业：" + major_name, "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          await this.$http.deleteMajor({ major_id });
          this.fetch();
          this.$message.success("删除成功！");
        }).catch(() => {});
    },
    openAdd() {
      this.model = {
        major_name: "",
        department_id: "",
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
      if (this.model.major_name === "") {
        return this.$message.info("请输入专业名称");
      }
      if (type === 1) {
        await this.$http.addMajor(this.model);
      } else {
        await this.$http.setMajor(this.model);
      }
      this.$message.success("操作成功！");
      this.table = true;
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
  