<template>
    <div>
      <div class="content">
        <div
          class="name"
          style="margin-top: 10px atuo; text-align: center; font-size: 40px"
        >
          {{ item.afficheTheme }}
        </div>
        <div
          style="
            text-align: center;
            margin: 10px;
            color: #575757;
            font-size: 14px;
          "
        >
          发布时间:{{ $moment(item.afficheTime).format("yyyy-MM-DD HH:mm:ss") }}
        </div>
        <div style="text-align: left; margin: 60px 0 40px 40px; font-size: 20px">
          一、时间:&#8195;
          <span style="color: #5e5e5e; font-size: 18px">{{
            $moment(item.afficheTime).format("yyyy-MM-DD HH:mm:ss")
          }}</span>
        </div>
        <div style="text-align: left; margin: 40px 0 40px 40px; font-size: 20px">
          二、地点:&#8195;
          <span style="color: #5e5e5e; font-size: 18px">{{
            item.affichePlace
          }}</span>
        </div>
  
        <div
          style="
            text-align: left;
            margin: 40px 0 40px 40px;
            font-size: 20px;
            color: #5e5e5e;
          "
        >
          三、内容:&#8195;
          <div
            style="display: flex; flex-direction: column; padding: 10px; flex: 1"
          >
            <div class="logo" style="display: flex; justify-content: center">
              <img
                :src="imgUrl + item.icon"
                alt=""
                style="width: 150px; height: 150px"
              />
            </div>
            <div
              v-html="item.afficheContent"
              style="
                height: 100px;
                font-size: 18px;
                margin-left: 2em;
                text-indent: 2em;"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        //公告信息
        item: {},
        imgUrl: process.env.VUE_APP_IMG_URL,
        userInfo: {
          user_id: "",
        },
      };
    },
    mounted() {
      //初始化用户信息和公告
      this.getUserInfo();
      this.fetch();
    },
    methods: {
      //获取用户信息
      async getUserInfo() {
        const { data } = await this.$http.getUserInfo();
        this.userInfo = data.data;
      },
      //根据路由参数获取公告信息
      async fetch() {
        const { data } = await this.$http.getAfficheInfoById(
          this.$route.params.id
        );
        this.item = data.data[0];
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .content {
    margin-bottom: 200px !important;
    position: relative;
    width: 85%;
    margin: 20px auto 20px auto;
  
    .picture {
      width: 10rem;
      height: 8rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .card {
      position: absolute;
      top: 6.8rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      width: 8.5rem;
      margin: 0 auto;
      border-radius: 0.2rem;
      height: 1.4rem;
      padding: 0.4rem;
      box-shadow: 0px 0px 5px 1px rgb(236, 236, 236);
      .title {
        font-size: 0.45rem;
      }
      .people-number {
        margin-top: 0.2rem;
        font-size: 0.3rem;
        span {
          color: red;
          font-size: 0.5rem;
        }
      }
    }
    .box {
      padding: 0.4rem;
      margin-top: 1rem;
      font-size: 0.4rem;
      .category {
        font-size: 0.35rem;
        span {
          color: #aaa;
        }
      }
      .introduction {
        &-title {
          padding-left: 0.15rem;
          border-left: 0.15rem solid yellow;
          margin: 0.5rem 0;
        }
        &-content {
          overflow: scroll;
          border-top: 1px dashed #eee;
          .image {
            margin: 0 !important;
          }
          line-height: 0.6rem;
          img {
            width: 100% !important;
            height: 100% !important;
          }
          font-size: 14px;
          .ql-size-small {
            font-size: 10px !important;
          }
          .ql-size-large {
            font-size: 18px !important;
          }
          .ql-size-huge {
            font-size: 32px !important;
          }
        }
      }
    }
  }
  </style>
  