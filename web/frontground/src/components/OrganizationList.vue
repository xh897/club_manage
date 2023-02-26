<template>
  <div>
    <div class="games_wrap">
      <van-list finished-text="没有更多了">
        <van-empty
          v-if="list.length === 0"
          image="search"
          description="暂无社团"
        />
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          @click="$router.push('/organization-detail/' + item.organization_id)"
        >
          <div class="games_item">
            <div class="left">
              <div class="icon">
                <img :src="imgUrl + item.icon" alt="">
              </div>
              <div class="center">
                <div class="name">{{ item.organization_name }}</div>
                <div class="information">部门：计算机系</div>
                <div class="information">
                  <van-icon name="contact" />{{ item.people_num }}
                </div>
              </div>
            </div>
            <div class="download">
              <div class="graph">
                社团详情
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      // loading: false,
      // finished: false
      imgUrl: process.env.VUE_APP_IMG_URL
    }
  },
  methods: {
    getGamesList() {
      console.log(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.games_wrap {
  .games_item {
    position: relative;
    padding: 0.1rem 0;
    display: flex;
    align-items: center;
    .left {
      display: flex;
      flex: 1;
      .icon {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0.3rem;
        border: 1px solid #ccc;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
      }
      .center {
        display: flex;
        flex-direction: column;
        margin-left: 0.5rem;
        margin-right: 0.1rem;
        .name {
          flex: 1;
          font-size: 0.4rem;
        }
        .information {
          font-size: 0.2rem;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
      }
    }
    .download {
      display: flex;
      flex-direction: column;
      .graph {
        margin: 0.1rem 0;
        z-index: 0;
        width: 1.8rem;
        height: 0.8rem;
        background-color: #00d09e;
        border-radius: 0.1rem;
        color: #fff;
        font-size: 0.35rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
