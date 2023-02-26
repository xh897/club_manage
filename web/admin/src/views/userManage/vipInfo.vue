<template>
  <div class="amazing-wrap" style="width: 1200px">
    <el-alert title="所有社团成员列表" />
    <el-button
      style="margin: 10px 10px"
      size="mini"
      type="primary"
      @click="openAdd"
      >{{ table === true ? "添加社团成员" : "返回" }}
    </el-button>
    <el-button
      style="margin: 10px"
      size="mini"
      type="danger"
      @click="multipleDelete"
      >多选删除
    </el-button>
    <el-button
      style="margin: 10px"
      size="mini"
      type="success"
      @click.native="exportExcel"
      >导出所选数据
    </el-button>
    <el-card style="margin: 10px 10px">
      <div v-show="table" class="table">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-button
              @click="
                formInline = {};
                fetch(); "
              >点击刷新</el-button
            >
          </el-form-item>
          <el-form-item label="用户名">
            <el-input
              v-model="formInline.username"
              placeholder="请输入用户名"
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

          <el-form-item label="所属专业">
            <el-select v-model="formInline.major_id" placeholder="所属专业">
              <el-option
                v-for="item in options1"
                :label="item.major_name"
                :value="item.major_id"
                :key="item.major_id"
                >{{ item.major_name }}</el-option
              >
            </el-select>
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="44" align="center">
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="50px"
          />
          <el-table-column label="用户名" prop="username" align="center" />
          <el-table-column label="学院" prop="department_name" align="center" />
          <el-table-column
            label="专业"
            prop="major_name"
            align="center"
            width="100px"
          />
          <el-table-column
            label="班级"
            prop="class_name"
            align="center"
            width="100px"
          />
          <el-table-column
            label="学号"
            prop="stuId"
            align="center"
            width="100px"
          />
          <el-table-column label="手机号" prop="phone" align="center" />
          <el-table-column label="性别" align="center" prop="sex" />
          <el-table-column
            label="社团成员头像 (点击放大)"
            align="center"
            width="110px"
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
          <el-table-column align="center" label="加入时间" width="100px">
            <template slot-scope="scope">
              {{ $moment(scope.row.create_time).format("yyyy-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-table
          style="display: none"
          v-loading="loading"
          :height="650"
          size="mini"
          stripe
          border
          id="out-table"
          :data="tableData2"
        >
          <el-table-column label="用户名" prop="username" align="center" />
          <el-table-column label="学院" prop="department_name" align="center" />
          <el-table-column
            label="专业"
            prop="major_name"
            align="center"
            width="100px"
          />
          <el-table-column
            label="班级"
            prop="class_name"
            align="center"
            width="100px"
          />
          <el-table-column
            label="学号"
            prop="stuId"
            align="center"
            width="100px"
          />
          <el-table-column
            label="社团名称"
            prop="organization_name"
            align="center"
            width="100px"
          />
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
        <el-form-item label="选择社团">
          <el-select v-model="model.organization_id" placeholder="请选择社团">
            <el-option
              v-for="item in options3"
              :key="item.organization_id"
              :label="item.organization_name"
              :value="item.organization_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择用户">
          <el-select
            v-model="model.user_id"
            placeholder="请选择用户"
            size="mini"
          >
            <el-option
              v-for="item in userList"
              :key="item.user_id"
              :label="item.username"
              :value="item.user_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="!editing"
            size="mini"
            type="primary"
            @click="handleConfirm(1)"
            >确定添加社团成员
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
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      tableData: [],
      tableData2: [],
      table: true,
      editing: false,
      currentPage: 1,
      loading: false,
      pageSize: 20,
      total: 0,
      options: [],
      options1: [],
      options3: [],
      selected: -1,
      searchText: "",
      model: {
        nickname: "",
        sex: "",
        phone: "",
        avatar: "",
      },
      baseImg: process.env.VUE_APP_IMG_URL,
      userList: [],
      multipleSelection: [],
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  async mounted() {
    this.fetch();

    this.getUserList();
    this.bFetch8();
    this.bFetch1();
    this.bFetch3();
  },
  methods: {
    exportExcel() {
      if (!this.multipleSelection.length) {
        return this.$message.info("请至少选择一个成员进行导出数据");
      }
      this.tableData2 = this.multipleSelection;
      setTimeout(() => {
        var xlsxParam = { raw: true };
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(
          document.querySelector("#out-table"),
          xlsxParam
        );
        console.log(wb);
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            "社团成员信息.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      }, 1000);
    },
    onSubmit() {
      this.fetch();
    },
    async bFetch3() {
      const { data } = await this.$http.getOrganization({
        organization_id: this.$store.state.user.organizationManager,
        page: 1,
        limit: 10000,
      });
      this.options3 = data.data;
    },
    async bFetch1() {
      const { data } = await this.$http.getMajor();
      this.options1 = data;
    },
    async bFetch8() {
      const { data } = await this.$http.getDepartment();
      this.options = data;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async multipleDelete() {
      if (!this.multipleSelection.length) {
        return this.$message.info("请选择具体一个成员");
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.id).join(",")
      );
    },
    async getUserList() {
      const data = await this.$http.getAllUser({
        page: this.currentPage,
        limit: 10000,
      });
      this.userList = data.data;
    },
    async bFetch() {
      const { data } = await this.$http.getOrganization({
        organization_id: this.$store.state.user.organizationManager,
        page: 1,
        limit: 10000,
      });
      this.options = data;
    },
    handleEdit(data) {
      this.editing = true;
      this.model = data;
      this.table = false;
    },
    async fetch() {
      this.loading = true;
      const data = await this.$http.getAllVip({
        page: this.currentPage,
        limit: this.pageSize,
        ...this.formInline,
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
    handleDelete(row) {
      this.$confirm("是否确定删除该社团成员", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.deleteVipById({
            id: row.id,
          });
          this.$message.success("删除成功！");
          this.fetch();
        })
        .catch(() => {});
    },
    openAdd() {
      this.model = {
        nickname: "",
        sex: "",
        phone: "",
        avatar: "",
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
      if (this.model.organization_id === "") {
        return this.$message.info("请输入社团");
      }
      if (this.model.user_id === "") {
        return this.$message.info("请输入社团成员");
      }

      await this.$http.postVipInfo(this.model);

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
    getImg(e) {
      this.model.avatar = e;
    },
    async rank(type, index) {
      if (type === 1) {
        if (index === 0) {
          return;
        }
        await this.$store.dispatch("project/setNews", {
          organization_id: this.tableData[index].organization_id,
          sort: this.tableData[index - 1].sort,
        });
        await this.$store.dispatch("project/setNews", {
          organization_id: this.tableData[index - 1].organization_id,
          sort: this.tableData[index].sort,
        });
      } else {
        if (index === this.tableData.length - 1) {
          return;
        }
        await this.$store.dispatch("project/setNews", {
          organization_id: this.tableData[index].organization_id,
          sort: this.tableData[index + 1].sort,
        });
        await this.$store.dispatch("project/setNews", {
          organization_id: this.tableData[index + 1].organization_id,
          sort: this.tableData[index].sort,
        });
      }
      this.$message.success("修改排序成功！");
      this.fetch();
    },
  },
};
</script>

<style></style>
