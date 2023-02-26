<template>
  <div>
    <div class="amazing-wrap" style="width: 1200px">
      <el-alert title="所有部门类别列表" />
      <el-button
        style="margin: 10px 20px"
        size="mini"
        type="primary"
        @click="openAdd"
        >{{ table === true ? "添加部门类别" : "返回" }}
      </el-button>
      <el-button
        style="margin: 10px 0"
        size="mini"
        type="danger"
        @click="multipleDelete"
        >多选删除
      </el-button>
      <el-card style="margin:0 10px">
        <div v-show="table" class="table">
          <el-table
            v-loading="loading"
            :height="650"
            size="mini"
            stripe
            border
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="40"
              align="center"
            ></el-table-column>
            <el-table-column
              type="index"
              width="55"
              label="序号"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="部门名称"
              prop="sector_name"
              align="center"
            />
            <el-table-column
              label="部门职责"
              prop="sector_duty"
              align="center"
            />

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
                  @click="handleDelete(scope.row.sec_id)"
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
          <el-form-item label="选择社团">
            <el-select
              v-model="model.organization_id"
              placeholder="请选择社团"
              size="mini"
            >
              <el-option
                v-for="item in options3"
                :key="item.organization_id"
                :label="item.organization_name"
                :value="item.organization_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="部门类别名称">
            <el-input
              v-model="model.sector_name"
              placeholder="请输入部门类别名称"
              size="mini"
            />
          </el-form-item>
          <el-form-item label="部门职责">
            <el-input
              v-model="model.sector_duty"
              placeholder="请输入部门职责"
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="!editing"
              size="mini"
              type="primary"
              @click="handleConfirm(1)"
              >确定添加部门类别
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
      pageSize: 20,
      total: 0,
      options: [],
      options3: [],
      selected: -1,
      searchText: "",
      model: {
        sector_name: "",
        introduction: "",
        sec_id: "",
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
    this.bFetch3();
    this.fetch();
    this.getUserList();
  },
  methods: {
    async bFetch3() {
      const { data } = await this.$http.getOrganization({
        organization_id: this.$store.state.user.organizationManager,
        page: 1,
        limit: 10000,
      });
      this.options3 = data;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async multipleDelete() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请选择具体一个部门类别，再选择删除')
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.sec_id).join(",")
      );
    },
    async getUserList() {
      this.loading = true;
      const data = await this.$http.getAllUser({
        page: this.currentPage,
        limit: 10000,
      });
      this.userList = data.data;
    },
    async bFetch() {
      const { data } = await this.$http.getSectorInfo();
      this.options = data;
    },
    async fetch() {
      this.loading = true;
      const data = await this.$http.getSectorInfo({
        page: this.currentPage,
        limit: this.pageSize,
        organization_id: this.$store.state.user.organizationManager,
      });
      if (data.length === 0 && this.currentPage !== 1) {
        this.currentPage--;
        this.fetch();
      }
      this.tableData = data.data;
      this.total = data.total;
      this.loading = false;
    },
    handleDelete(sec_id) {
      this.$confirm("是否确定删除该部门类别", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.deleteSectorInfo({ sec_id });
          this.$message.success("删除成功！");
          this.fetch();
        })

        .catch(() => {});
    },
    openAdd() {
      this.model = {
        sector_name: "",
        sector_duty: "",
        introduction: "",
        sec_id: "",
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
      if (this.model.sector_name === "") {
        return this.$message.info("请输入部门类别名称");
      }
      if (this.model.sector_duty === "") {
        return this.$message.info("请输入部门职责");
      }
      if (type === 1) {
        await this.$http.addSectorInfo(this.model);
      } else {
        await this.$http.setSectorInfo(this.model);
      }
      this.$message.success("操作成功！");
      this.table = true;
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
  },
};
</script>

<style></style>
