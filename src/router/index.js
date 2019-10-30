import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../components/Discover")
  },
  {
    path: "/news",
    component: () => import("../components/News")
  },
  {
    path: "/near",
    component: () => import("../components/Near")
  },
  {
    path:"/userdetail",
    name:'username',
    component: () => import("../components/Userdetail")
  },
  {
    path:"/postdetail",
    name:'postdetail',
    component: () => import("../views/Postdetail")
  },
  {
    path:"/newdetail",
    name:'newdetail',
    component: () => import("../components/Newdetail")
  }
];

const router = new VueRouter({
  routes
});

export default router;
