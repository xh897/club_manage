(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-91283570"],{"366d":function(t,e,n){"use strict";n("3e64")},"3ad6":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article-wrap"},[n("van-nav-bar",{attrs:{title:"社团活动","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}}),n("div",{staticClass:"article"},[n("div",{staticClass:"title"},[t._v(" "+t._s(t.article.title)+" ")]),n("div",{staticClass:"time"},[t._v(" "+t._s(t.$moment(t.article.create_time).format("yyyy-MM-DD HH:mm:ss"))+" ")]),n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.article.content)}})]),n("van-goods-action",[n("van-goods-action-icon",{attrs:{icon:"home-o",text:"首页"},on:{click:function(e){return t.$router.push("/")}}}),n("van-goods-action-icon",{attrs:{icon:"user-o",text:"我的"},on:{click:function(e){return t.$router.push("/mine")}}}),n("van-goods-action-button",{attrs:{type:"danger",color:"#00d09e",text:"立即参加活动"},on:{click:t.joinThis}})],1)],1)},i=[],a=n("1da1"),s=(n("96cf"),{props:{id:String},data:function(){return{article:{},imgUrl:"http://127.0.0.1:21505/images/",userInfo:{user_id:""}}},mounted:function(){this.fetch(),this.getUserInfo()},methods:{fetch:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getActivityById({id:t.id});case 2:n=e.sent,r=n.data,t.article=r.data[0];case 5:case"end":return e.stop()}}),e)})))()},getUserInfo:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getUserInfo();case 2:n=e.sent,r=n.data,t.userInfo=r.data;case 5:case"end":return e.stop()}}),e)})))()},onClickLeft:function(){this.$router.back()},joinThis:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!==t.userInfo.user_id){e.next=2;break}return e.abrupt("return",t.$toast.fail("您还没有登录账户"));case 2:return e.next=4,t.$http.userJoinActivity({id:t.userInfo.user_id,aid:t.id});case 4:t.$toast.success("加入活动成功！");case 5:case"end":return e.stop()}}),e)})))()}}}),c=s,o=(n("366d"),n("2877")),u=Object(o["a"])(c,r,i,!1,null,"6307392e",null);e["default"]=u.exports},"3e64":function(t,e,n){}}]);