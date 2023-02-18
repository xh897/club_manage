<template>
  <div style="width: 85%; margin: 0 auto; margin-bottom: 20px; min-height: 500px">
    <el-card>
        <el-form label-width="100px">
            <el-form-item label="留言内容">
                <Editor v-model="model.content"></Editor>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="success" >留言</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card>

    </el-card>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue"
export default {
  components: {
    Editor
  },
  data() {
    return {

    }
  },
  methods: {
    // 当前用户信息
    // const {data} = await this.$http.getUserInfo()
  }
}
</script>


<style scoped lang="scss">
.amazing-wrap {
  width: 85%;
  margin: 0 auto;
  margin-bottom: 20px;
  min-height: 500px;
}
</style>