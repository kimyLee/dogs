// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* eslint-disable */
!(function(doc, win) {
  var docEle = doc.documentElement,
  evt = "onorientationchange" in window ? "orientationchange" : "resize",
  fn = function() {
      var width = docEle.clientWidth;
      width && (docEle.style.fontSize = 10 * (width / 320) + "px");
  };

  win.addEventListener(evt, fn, false);
  doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window))

Vue.config.productionTip = false
// Vue.prototype.$domain = document.URL.indexOf('8081') >= 0 ? '/static' : '/dogs/static'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
