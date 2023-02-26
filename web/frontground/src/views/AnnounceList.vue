<template>
    <div class="announce-box">
      <div style="font-size: 50px; text-align: center; color: rgb(189, 211, 252)">
        公告区
      </div>
      <div class="content" style="padding: 50px">
  
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
          <el-radio-button label="系统公告">系统公告</el-radio-button>
          <el-radio-button label="社团公告">社团公告</el-radio-button>
        </el-radio-group>
        <div >
          <el-card v-for="(item, index) in recommendList" :key="index" style="margin: 5px" >
            <div style="display: flex; align-items: center" @click="$router.push('/announcedetail/' + item.afficheId)">
              <div class="logo" style="width: 150px; height: 150px">
                <img
                  :src="imgUrl + item.icon"
                  alt=""
                  style="width: 150px; height: 150px"
                />
              </div>
              <div style="margin: 0 15px; height: 100%; width: 87%">
                <div>
                  <div
                    class="name"
                    style="font-size: 22px; margin: 0 auto; text-align: center"
                  >
                    {{ item.afficheTheme }}
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      padding: 0;
                      flex: 1;"
                  >
                    <div
                      v-html="item.afficheContent"
                      style="
                        height: 100px;
                        overflow: hidden;
                        word-wrap: break-word;
                        font-size: 18px;"
                    ></div>
                  </div>
                </div>
                <div
                  style="font-size: 15px; float: right; color: rgb(87, 87, 87)"
                >
                  {{ $moment(item.afficheTime).format("yyyy-MM-DD HH:mm:ss") }}
  
                </div>
              </div>
            </div>
          </el-card>
        </div>
        
        <div style="text-align: center; margin-top: 300px">
          <el-pagination
            background
            :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change.sync="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        imgUrl: process.env.VUE_APP_IMG_URL,
        //用户信息
        userInfo: {
          user_id: "",
        },
        // 公告列表
        recommendList: [],
        currentPage: 1,
        loading: false,
        pageSize: 15,
        total: 0,
        tabPosition: "系统公告",
      };
    },
    watch:{
      // 监听栏目切换
      'tabPosition':function(e,t){
        if (e == "系统公告") {
          this.fetch();
        }else{
          this.fetch2();
        }
      }
    },
    mounted() {
      //初始化用户信息和公告列表
      this.getUserInfo();
      this.fetch();
  
    },
    methods: {
      //切换页码更新公告列表
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        if (this.tabPosition == "系统公告") {
          this.fetch();
        }else{
          this.fetch2();
        }
      },
      //切换页码更新公告列表
      handleCurrentChange(val) {
        this.currentPage = val;
        if (this.tabPosition == "系统公告") {
          this.fetch();
        }else{
          this.fetch2();
        }
      },
      // 获取系统公告
      async fetch() {
        const { data } = await this.$http.getAfficheInfo({
          page: this.currentPage,
          limit: this.pageSize,
  
        });
        this.recommendList = data.data;
        this.total = data.total;
      },
      // 获取社团公告
      async fetch2() {
        const { data } = await this.$http.getOrgAfficheInfo({
          page: this.currentPage,
          limit: this.pageSize,
  
        });
        this.recommendList = data.data;
        this.total = data.total;
      },
      //获取用户信息
      async getUserInfo() {
        const { data } = await this.$http.getUserInfo();
        this.userInfo = data.data;
      },
  
  
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .announce-box {
    width: 85%;
    margin: 0 auto;
    min-height: 500px;
    .content {
      margin-bottom: 1rem;
      position: relative;
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
  }
  </style>
  