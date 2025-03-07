import { RouteRecordRaw } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import NoAuthPage from "@/views/NoAuthPage.vue";
import UserLoginPage from "@/views/user/UserLoginPage.vue";
import UserRegisterPage from "@/views/user/UserRegisterPage.vue";
import AdminUserPage from "@/views/admin/AdminUserPage.vue";
import AdminClassPage from "@/views/admin/AdminClassPage.vue";
import UserProfilePage from "@/views/user/UserProfilePage.vue";
import DashboardPage from "@/views/admin/DashboardPage.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "首页",
    component: AdminLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "仪表盘",
        component: DashboardPage,
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "admin/user",
        name: "用户管理",
        component: AdminUserPage,
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "admin/class",
        name: "班级管理",
        component: AdminClassPage,
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "user/profile",
        name: "个人信息",
        component: UserProfilePage,
        meta: {
          access: [ACCESS_ENUM.STUDENT, ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMIN],
        },
      },
    ],
  },
  {
    path: "/user",
    component: UserLayout,
    children: [
      {
        path: "login",
        name: "用户登录",
        component: UserLoginPage,
      },
      {
        path: "register",
        name: "用户注册",
        component: UserRegisterPage,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthPage,
    meta: {
      hideInMenu: true,
    },
  },
];
