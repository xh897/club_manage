(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-449e0cbc"],{"576d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("van-nav-bar",{attrs:{title:"我的信息","left-text":"返回","left-arrow":""},on:{"click-left":e.onClickLeft}}),a("br"),a("van-form",{on:{submit:e.onSubmit}},[a("van-field",{attrs:{label:"头像上传",name:"avatar"},scopedSlots:e._u([{key:"input",fn:function(){return[a("div",{staticClass:"upload"},[a("input",{attrs:{type:"file",accept:"image/*"},on:{change:e.uploading}}),e.model.avatar?a("img",{attrs:{src:e.baseImg+e.model.avatar,alt:""}}):e._e()])]},proxy:!0}])}),a("van-field",{attrs:{name:"nickname",label:"昵称",placeholder:"昵称"},model:{value:e.model.nickname,callback:function(t){e.$set(e.model,"nickname",t)},expression:"model.nickname"}}),a("van-field",{attrs:{name:"phone",label:"手机号",placeholder:"手机号"},model:{value:e.model.phone,callback:function(t){e.$set(e.model,"phone",t)},expression:"model.phone"}}),a("van-field",{attrs:{name:"sex",label:"性别"},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.model.sex,callback:function(t){e.$set(e.model,"sex",t)},expression:"model.sex"}},[a("van-radio",{attrs:{name:"男"}},[e._v("男")]),a("van-radio",{attrs:{name:"女"}},[e._v("女")])],1)]},proxy:!0}])},[e._v(" > ")]),a("div",{staticStyle:{margin:"16px"}},[a("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[e._v("提交")])],1)],1)],1)},r=[],o=a("1da1"),i=(a("96cf"),{props:{id:{type:String,default:""}},data:function(){return{model:{nickname:"",sex:"",phone:"",avatar:""},baseImg:"http://127.0.0.1:21505/images/",uploader:[]}},mounted:function(){this.fetch()},methods:{fetch:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getUserInfoById({id:e.id});case 2:a=t.sent,n=a.data,e.model=n.data,e.model.avatar&&(e.uploader=[{url:e.model.avatar}]);case 6:case"end":return t.stop()}}),t)})))()},onClickLeft:function(){this.$router.back()},onSubmit:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.setUserInfoById(e.model);case 2:a=t.sent,n=a.data,e.$toast.success(n.message),setTimeout((function(){e.$router.back()}),1500);case 6:case"end":return t.stop()}}),t)})))()},uploading:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(0!==e.target.files[0].length){a.next=2;break}return a.abrupt("return");case 2:return n=new FormData,n.append("file",e.target.files[0]),a.next=6,t.$http.uploadImage(n);case 6:r=a.sent,o=r.data,t.model.avatar=o.filename;case 9:case"end":return a.stop()}}),a)})))()}}}),s=i,c=(a("afb6"),a("2877")),l=Object(c["a"])(s,n,r,!1,null,"3b306f70",null);t["default"]=l.exports},8312:function(e,t,a){},afb6:function(e,t,a){"use strict";a("8312")}}]);