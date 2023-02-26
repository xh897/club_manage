<template>
  <div class="home">
    <div class="wrap-content">
      <!-- banner轮播图模块 -->
      <div class="swiper" style="height: 350px; width: 100%; margin: 0 auto">
        <div
          v-if="bannerList.length !== 0"
          class="swiper"
          style="height: 350px; margin: 0 auto" >
          <el-carousel height="350px">
            <el-carousel-item
              v-for="(banners, index) in bannerList"
              :key="index" >
              <img
                :src="banners.img"
                style="height: 350px; width: 100%; margin: 0 auto" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 系统公告模块 -->
      <div class="recommend">
        <div class="title-more">
          <div class="title">系统公告</div>
          <div
            class="more"
            @click="$router.push('/announcelist')"
            style="font-size: 15px; cursor: pointer" >
            更多<svg-icon
              icon-class="right"
              style="width: 15px; height: 15px; cursor: pointer"
            />
          </div>
        </div>
        <div class="recommend-content" id="xitong">
          <div
            v-for="(item, index) in recommendList"
            :key="index"
            class="recommend-content-item"
            @click="$router.push('/announcedetail/' + item.afficheId)"
            style="
              width: 28%;
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 20px;">
            <div class="logo" style="width: 150px; height: 150px">
              <img :src="imgUrl + item.icon" alt="" />
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                padding: 10px;
                flex: 1;">
              <div
                class="name"
                style="
                  font-size: 17px;
                  word-wrap: break-word;
                  font-weight: bold;">
                {{ item.afficheTheme }}
              </div>
              <div
                v-html="item.afficheContent"
                style="height: 100px; overflow: hidden; color: #323232"></div>
              <div style="color: #575757; font-size: 14px; text-align: right">
                {{
                  $moment(item.afficheTime)
                    .utcOffset(0)
                    .format("yyyy-MM-DD HH:mm:ss")
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 社团公告模块 -->
      <div class="recommend">
        <div class="title-more">
          <div class="title">社团公告</div>
          <div
            class="more"
            @click="$router.push('/announcelist')"
            style="font-size: 15px; cursor: pointer">
            更多<svg-icon
              icon-class="right"
              style="width: 15px; height: 15px; cursor: pointer"
            />
          </div>
        </div>
        <div class="recommend-content">
          <div
            v-for="(item, index) in orgList"
            :key="index"
            class="recommend-content-item"
            @click="$router.push('/announcedetail/' + item.afficheId)"
            style="
              width: 28%;
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 20px;">
            <div class="logo" style="width: 150px; height: 150px">
              <img :src="imgUrl + item.icon" alt="" />
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                padding: 10px;
                flex: 1;">
              <div
                class="name"
                style="
                  font-size: 17px;
                  word-wrap: break-word;
                  font-weight: bold;">
                {{ item.afficheTheme }}
              </div>
              <div
                v-html="item.afficheContent"
                style="height: 100px; overflow: hidden; color: #323232"
              ></div>
              <div style="color: #575757; font-size: 14px; text-align: right">
                {{
                  $moment(item.afficheTime)
                    .utcOffset(0)
                    .format("yyyy-MM-DD HH:mm:ss")
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 社团活动模块 -->
      <div class="recommend">
        <div class="title-more">
          <div class="title">社团活动</div>
          <div
            class="more"
            @click="$router.push('/activitylist')"
            style="font-size: 15px; cursor: pointer"
          >
            更多<svg-icon
              icon-class="right"
              style="width: 15px; height: 15px; cursor: pointer"
            />
          </div>
        </div>
        <div class="recommend-content1" style="margin: 10px">
          <div
            v-for="(item, index) in activityList"
            :key="index"
            class="recommend-content-item"
            @click="$router.push('/activitydetail/' + item.id)"
            style="display: flex; flex-wrap: wrap; margin-bottom: 20px" >
            <div class="logo" style="width: 250px; height: 250px">
              <img :src="imgUrl + item.icon" alt="" />
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                padding: 10px;
                flex: 1;">
              <div class="name">
                <p
                  style="
                    font-size: 18px;
                    word-wrap: break-word;
                    font-weight: bold;">
                  {{ item.title }}
                </p>
                <p style="text-align: right">{{ item.organization_name }}</p>
              </div>
              <div
                v-html="item.content"
                style="height: 170px; overflow: hidden; margin: 5px"
              ></div>
              <div style="text-align: right; color: #575757; font-size: 14px">
                {{
                  $moment(item.create_time)
                    .utcOffset(0)
                    .format("yyyy-MM-DD HH:mm:ss")
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
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
  mounted() {
    this.getOrganization();
    this.getOrgAfficheInfo();
    this.getActivity();
  },
  methods: {
    // 获取推荐社团
    async getOrganization() {
      const { data } = await this.$http.getAfficheInfo({
        page: 1,
        limit: 3,
      });
      this.recommendList = data.data;
    },
    // 最多显示三个公告
    async getOrgAfficheInfo() {
      const { data } = await this.$http.getOrgAfficheInfo({
        page: 1,
        limit: 3,
      });
      this.orgList = data.data;
    },
    // 获取最新活动
    async getActivity() {
      const { data } = await this.$http.getActivity({
        page: 1,
        limit: 6,
      });
      this.activityList = data.data;
    },
  },
};
</script>

<style lang="scss" scoped>
$basePadding: 0.4rem;
.wrap-content {
  margin-bottom: 1.2rem;
}
.home {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 85%;
  margin: 0 auto;
  .bg {
    position: absolute;
    width: 100%;
    top: 0;
    height: 4rem;
    background-color: #00d09e;
    border-radius: 0 0 30% 30%;
    .name {
      text-align: center;
      font-size: 0.5em;
      padding: 0.2rem 0;
      color: #fff;
    }
  }
  .swiper {
    // padding-top: 0.55rem;
    height: 4.2rem;
    // margin-bottom: 0.5rem;
    .swiper-pagination {
      position: absolute;
    }
    .swiper-slide {
      width: 8rem;
      height: 4.2rem;
      &.swiper-slide-active {
        img {
          margin-top: 0;
          width: 100%;
        }
      }
      img {
        display: block;
        width: 90%;
        object-fit: cover;
        height: 90.625%;
        margin: auto;
        align-items: center;
        justify-content: center;
        border-radius: 0.26rem;
        // -webkit-transition: all 0.5s ease 0s;
        // -moz-transition: all 0.5s ease 0s;
        // -ms-transition: all 0.5s ease 0s;
        // -o-transition: all 0.5s ease 0s;
        // transition: all 0.5s ease 0s;
      }
    }
  }
  .recommend {
    // background-color: green;
    padding: $basePadding;
    padding-right: 0;
    // background-color: #f8f8fc;
    border: 6px #f8f8fc solid;
    width: 100%;

    margin-top: 10px;
    .title-more {
      padding-right: 0.4rem;
    }
    &-content {
      display: flex;
      margin: 10px 0;

      &-item {
        border: 1px solid rgb(231, 231, 231);
        box-shadow: 5px 5px 15px rgba(10, 16, 20, 0.24),
          0 0 10px rgba(10, 16, 20, 0.12);
        border-radius: 10px;
        margin-right: 30px;
        padding: 10px;
        // display: none;
        .logo {
          width: 3rem;
          height: 3rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          font-size: 0.36rem;
          text-align: center;
          margin: 0.2rem;
        }
        .number {
          font-size: 0.35rem;
          text-align: right;
          padding-right: 0.2rem;
          color: #655;
        }
      }
    }
  }
  .activity-wrap {
    padding: 0 $basePadding;
    border-top: 1px solid rgb(211, 211, 211);
  }
  // background-color: red;
}
.title-more {
  display: flex;
  padding: 0.4rem 0;
  .title {
    border-left: 0.14rem solid #01b169;
    padding-left: 0.2rem;
    font-size: 0.4rem;
    border-radius: 0 8px 0 0;
    font-size: 25px;
    // height: 30px;
    padding: 5px;
    color: #fff;
    background-color: rgb(26, 91, 119);
  }
  .more {
    margin-right: 0.2rem;
    margin-left: auto;
    font-size: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
  }
}
</style>
