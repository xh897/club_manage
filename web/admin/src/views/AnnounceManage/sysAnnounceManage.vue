<template>
  <!-- 系统公告界面 -->
  <div class="amazing-wrap" style="width: 1200px">
    <el-alert title="系统公告列表" />
    <el-button
      style="margin: 10px 10px"
      size="mini"
      type="primary"
      @click="openAdd"
      >{{ table === true ? "添加系统公告" : "返回" }}
    </el-button>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin:  0 10px">
      <el-form-item label="系统公告主题">
        <el-input
          v-model="formInline.data"
          placeholder="系统公告主题"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button
      style="margin: 10px"
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
          :data="tableData"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" align="center">
          </el-table-column>
          <el-table-column type="index" width="55" label="序号" align="center">
          </el-table-column>
          <el-table-column
            label="系统公告主题"
            prop="afficheTheme"
            align="center"
          />
          <el-table-column label="地点" prop="affichePlace" align="center" />

          <el-table-column label="图片 (点击放大)" align="center" width="200px">
            <template slot-scope="scope">
              <el-image
                :src="baseImg + scope.row.icon"
                :preview-src-list="[baseImg + scope.row.icon]"
                style="width: 80px; height: 80px"
                fit="cover"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="系统公告时间" width="200px">
            <template slot-scope="scope">
              {{ $moment(scope.row.afficheTime).format("yyyy-MM-DD HH:mm:ss") }}
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
                >详情
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.afficheId)"
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
        <el-form-item label="上传图片">
          <input type="file" accept="image/*" @change="uploading" />
        </el-form-item>
        <el-form-item label="图片预览">
          <el-image
            :src="baseImg + model.icon"
            style="width: 100px; height: 100px"
            fit="cover"
          />
        </el-form-item>
        <el-form-item label="系统公告主题">
          <el-input
            v-model="model.afficheTheme"
            placeholder="请输入系统公告主题"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="系统公告地点">
          <el-input
            v-model="model.affichePlace"
            placeholder="请输入系统公告地点"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="系统公告时间">
          <el-date-picker
            v-model="model.afficheTime"
            type="datetime"
            placeholder="选择系统公告时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="系统公告内容">
          <VueEditor v-model="model.afficheContent" />
        </el-form-item>

        <el-form-item>
          <el-button
            v-if="!editing"
            size="mini"
            type="primary"
            @click="handleConfirm(1)"
            >确定添加系统公告
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
        afficheTheme: "",
        affichePlace: "",
        afficheContent: "",
        department_id: "",
        icon: "",
        user_id: "",
        afficheTime: "",
      },
      baseImg: process.env.VUE_APP_IMG_URL,
      userList: [],
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
        return alert("请选择具体一个审批");
      }
      this.handleDelete(
        this.multipleSelection.map((item) => item.id).join(",")
      );

    },

    async fetch() {
      this.loading = true;
      const data = await this.$http.getAfficheInfo({
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
    handleDelete(afficheId) {
      this.$confirm("是否确定删除该系统公告", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.deleteAfficheInfo({ afficheId });
          this.$message.success("删除成功！");
          this.fetch();
        })
        .catch(() => {});
    },
    openAdd() {
      this.model = {
        afficheTheme: "",
        affichePlace: "",
        afficheContent: "",
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

      if (this.model.title === "") {
        return this.$message.info("请输入系统公告主题");
      }
      if (this.model.affichePlace === "") {
        return this.$message.info("请输入系统公告地点");
      }
      if (this.model.icon === "") {
        return this.$message.info("请上传图片");
      }
      if (this.model.afficheContent === "") {
        return this.$message.info("请输入系统公告内容");
      }
      if (type === 1) {
        await this.$http.addAfficheInfo(this.model);
      } else {
        await this.$http.setAfficheInfo(this.model);
      }
      this.$message.success("添加成功！");
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
