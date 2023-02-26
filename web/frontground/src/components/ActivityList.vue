<template>
  <div class="activity">
    <div class="activity-content">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="activity-content-item"
        @click="$router.push('/artivitylist/' + item.id)"
      >
        <div class="left">
          <img :src="imgUrl + item.icon" alt="">
        </div>
        <div class="right ">
          <div class="title ellipsis">
            {{ item.title }}
          </div>
          <div class="content ellipsis" v-html="item.content.slice(0,50)" />
        </div>
      </div>
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
      imgUrl: process.env.VUE_APP_IMG_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.activity {
  &-content {
    &-item {
      margin-bottom: 0.4rem;
      display: flex;
      .left {
        width: 3rem;
        height: 2rem;
        margin-right: 0.2rem;
        img {
          border-radius: 0.2rem;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .right {
        flex: 1;
        overflow: hidden;
        ::v-deep {
          img {
            display: none;
          }
        }
        .ellipsis {
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .title {
          font-size: 0.34rem;
          margin-bottom: 0.15rem;
        }
        .content {
          font-size: 0.25rem;
          color: #666;
        }
      }
    }
  }
}
</style>
