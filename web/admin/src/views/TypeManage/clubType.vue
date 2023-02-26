<template>
  <div>
    <div class="amazing-wrap" style="width: 1200px">
      <el-alert title="所有社团类别列表" />
      <el-button
        style="margin: 10px 20px"
        size="mini"
        type="primary"
        @click="openAdd"
        >{{ table === true ? "添加社团类别" : "返回" }}
      </el-button>
      <el-button
        style="margin: 10px 0"
        size="mini"
        type="primary"
        @click="multipleDelete"
        >多选删除
      </el-button>
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
              label="社团类别名称"
              prop="type_name"
              align="center"
            />
            <el-table-column
              label="操作"
              align="center"
              prop="title"
              width="300px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="goEdit(scope.row)"
                  >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.type_id)"
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
          <el-form-item label="社团类别名称">
            <el-input
              v-model="model.type_name"
              placeholder="请输入社团类别名称"
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="!editing"
              size="mini"
              type="primary"
              @click="handleConfirm(1)"
              >确定添加社团类别
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
import VueEditor from "@/components/VueEditor.vue";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      tableData: [],
      table: true,
      editing: false,
      currentPage: 1,
      loading: false,
      pageSize: 15,
      total: 0,
      options: [],
      showData: [],
      selected: -1,
      searchText: "",
      model: {
        type_name: "",
        type_id: "",
      },
      baseImg: process.env.VUE_APP_IMG_URL,
      userList: [],
      multipleSelection: [],
    };
  },
  async mounted() {
    this.bFetch();
    //   this.fetch();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async multipleDelete() {
      if (!this.multipleSelection.length) {
        return alert("请选择具体一个社团类别");
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.type_id).join(",")
      );
    },
    async bFetch() {
      this.loading = true;
      const  data  = await this.$http.getClubType();
      this.options = data.data;
      this.showData = this.options.slice(0, this.pageSize);
      if (data.length === 0 && this.currentPage !== 1) {
        this.currentPage--;
        this.fetch();
      }
      console.log(data);
      this.total = data.total;
      this.loading = false;
    },
    handleDelete(type_id) {
      this.$confirm("是否确定删除该社团类别", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.deleteClubType({ type_id });
          this.$message.success("删除成功！");
          this.bFetch();
        })
        .catch(() => {});
    },
    openAdd() {
      this.model = {
        type_name: "",
        type_id: "",
      };
      this.editing = false;
      this.table = !this.table;
    //   this.bFetch();
    },
    goEdit(data) {
      this.editing = true;
      this.model = data;
      this.table = false;
    },
    async handleConfirm(type) {
      if (this.model.type_name === "") {
        return this.$message.info("请输入社团类别名称");
      }
      if (type === 1) {
        await this.$http.addClubType(this.model);
      } else {
        await this.$http.setClubType(this.model);
      }
      this.$message.success("操作成功！");
      this.table = true;
      this.bFetch();
      
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.showData = this.options.slice(0, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showData = this.options.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
    },
  },
};
</script>
  
  <style></style>
  