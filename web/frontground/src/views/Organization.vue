<template>
  <div class="organizaton-box">
    <img class="header-img" src="../assets/images/bg3.png" alt="" />
    <el-card>
        <!-- 搜素框 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="">
            <el-buttom @click="">全部</el-buttom>
        </el-form-item>
        <el-form-item label="社团名称">
            <el-input placeholder="请输入社团名称" size="mini"/>
        </el-form-item>
        <el-form-item  label="社团名称">
            <el-select placeholder="所属院系">
                <el-option></el-option>
            </el-select>
        </el-form-item>
        <el-form-item  label="社团类型">
            <el-select placeholder="所属社团">
                <el-option></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>

      <div class="detail">

      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.organizaton-box {

    .header-img {
    display: block;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    padding-bottom: 20px;
  }

  .detail {

  }
}
</style>