import Vue from "vue";
import Router from "vue-router";
import routes from "./router";
import { getSessionStorage } from "@/utils/common";
Vue.use(Router);
let whiteList = ["/login", "/agent", "/", "/404", "/Noprivileges"];
const router = new Router({
  routes
});

//全局路由前置钩子函数
router.beforeEach((to, from, next) => {
  //是否前去登陆页
  if (to.path == "/login") {
    next();
  } else {
    if (getSessionStorage("CommData")) {
      //判断是否存在权限验证拦截
      next();
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
    } else {
        // 还没有登录过 则跳转到登录界面
        next("/login");
    }
    }
  }

  // next();
});

export default router;