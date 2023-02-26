<template>
  <div id="app">
    <el-row>
      <el-row>
        <Header />
      </el-row>
      <router-view :key="$route.fullPath" />
      <el-row>
        <Footer />
      </el-row>
    </el-row>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    Footer
  },
}
</script>

<style >

</style>
