(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{206:function(t,r,e){var content=e(285);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(62).default)("4db9d57e",content,!0,{sourceMap:!1})},219:function(t,r,e){"use strict";var o=e(312),n=e(314),c=e(313),l={name:"DefaultLayout"},d=e(75),component=Object(d.a)(l,(function(){var t=this._self._c;return t(o.a,{attrs:{dark:""}},[t(c.a,[t(n.a,[t("Nuxt")],1)],1)],1)}),[],!1,null,null,null);r.a=component.exports},230:function(t,r,e){e(231),t.exports=e(232)},284:function(t,r,e){"use strict";e(206)},285:function(t,r,e){var o=e(61)(!1);o.push([t.i,"h1[data-v-6ffeedc3]{font-size:20px}",""]),t.exports=o},58:function(t,r,e){"use strict";var o=e(312),n={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},c=(e(284),e(75)),component=Object(c.a)(n,(function(){var t=this,r=t._self._c;return r(o.a,{attrs:{dark:""}},[404===t.error.statusCode?r("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):r("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),r("NuxtLink",{attrs:{to:"/"}},[t._v(" Home page ")])],1)}),[],!1,null,"6ffeedc3",null);r.a=component.exports}},[[230,9,3,10]]]);