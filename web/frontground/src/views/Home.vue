<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="wrap-content">
      <div class="swiper" style="height: 350px; width: 100%; margin: 0 auto">
        <div class="swipe" style="height: 350px; margin: 0 auto">
          <el-carousel height="350px">
            <el-carousel-item
              v-for="(banners, index) in bannerList"
              :key="index"
            >
              <img
                :src="banners.img"
                style="height: 350px; width: 100%; margin: 0 auto"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <!-- 系统公告模块 -->
    <div class="recommend">
        <div class="title-more">
            <div class="title">系统公告</div>
            
        </div>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  // 引入组件
  components: {
    Footer,
  },
  data() {
    return {
      // 轮播图参数
      swiperOption: {
        // 分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // 无线循环
        loop: true,
        debugger: true,
        // 自动切换
        autoplay: 5000,
        // 设置slider容器能够同时显示的slides数量
        slidesPerView: "auto",
        // 居中幻灯片
        centeredSlides: true,
      },

      //推荐社团列表
      recommendList: [],
      //存储公告列表
      orgList: [],
      //存储活动列表
      activityList: [],
      imgUrl: process.env.VUE_APP_IMG_URL,
      //   轮播图片
      bannerList: [
        {
          img: require("@/assets/images/swipe2.png"),
          link: '/organization'
        },
        {
          img: require("@/assets/images/swipe1.png"),
        },
        {
          img: require("@/assets/images/swipe3.png"),
        },
      ],
    };
  },
  methods: {
    // 点击轮播图跳转
    linkTo() {
      let activeIndex = this.$refs.carousel.activeIndex;
      this.$router.push(this.imgs[activeIndex].link);
    },
  },
};
</script>

<style scoped lang="scss">
.wrap-content {
  margin-bottom: 1.2rem;
}
</style>
