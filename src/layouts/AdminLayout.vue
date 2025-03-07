<template>
  <div class="admin-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <div class="header-left">
          <div class="logo">FIVE 2.0 后台管理</div>
          <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="horizontal"
            class="menu"
          >
            <a-menu-item key="dashboard">
              <router-link to="/dashboard">
                <dashboard-outlined />
                仪表盘
              </router-link>
            </a-menu-item>
            <a-sub-menu>
              <template #icon><setting-outlined /></template>
              <template #title>系统管理</template>
              <a-menu-item key="user">
                <router-link to="/admin/user">
                  <user-outlined />
                  用户管理
                </router-link>
              </a-menu-item>
              <a-menu-item key="class">
                <router-link to="/admin/class">
                  <team-outlined />
                  班级管理
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
        <div class="header-right">
          <a-space size="large">
            <a-badge count="5">
              <bell-outlined class="header-icon" />
            </a-badge>
            <a-dropdown>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="profile">
                    <router-link to="/user/profile">
                      <user-outlined />
                      个人信息
                    </router-link>
                  </a-menu-item>
                  <a-menu-item key="settings">
                    <setting-outlined />
                    系统设置
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout" @click="handleLogout">
                    <logout-outlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
              <div class="admin-dropdown">
                <a-avatar class="avatar">
                  {{ loginUserStore.loginUser?.userName?.[0] || "A" }}
                </a-avatar>
                <span class="username">{{
                  loginUserStore.loginUser?.userName || "未登录"
                }}</span>
                <down-outlined />
              </div>
            </a-dropdown>
          </a-space>
        </div>
      </a-layout-header>
      <a-layout-content class="main-content">
        <div class="content-wrapper">
          <div class="page-header">
            <a-breadcrumb>
              <a-breadcrumb-item>首页</a-breadcrumb-item>
              <a-breadcrumb-item>{{ currentRoute }}</a-breadcrumb-item>
            </a-breadcrumb>
            <h1 class="page-title">{{ currentRoute }}</h1>
          </div>
          <div class="page-content">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer class="footer">
        FIVE 2.0 后台管理 ©2024 Created by Marrrr
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginUserStore } from "@/store/userStore";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const router = useRouter();
const route = useRoute();
const loginUserStore = useLoginUserStore();

const selectedKeys = ref<string[]>([]);

const currentRoute = computed(() => {
  switch (route.path) {
    case "/admin/user":
      return "用户管理";
    case "/admin/class":
      return "班级管理";
    case "/admin/dashboard":
      return "仪表盘";
    default:
      return "";
  }
});

// 根据当前路由设置选中的菜单项
selectedKeys.value = [route.path.split("/")[2] || "dashboard"];

const handleLogout = async () => {
  try {
    await loginUserStore.logout();
    message.success("退出成功");
    router.push("/user/login");
  } catch (error) {
    message.error("退出失败");
  }
};
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";

.admin-layout {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    background: @header-gradient;
    box-shadow: @box-shadow-base;
    z-index: 1;

    .header-left {
      display: flex;
      align-items: center;
      flex: 1;

      .logo {
        color: #fff;
        font-size: @font-size-title-large;
        font-weight: 600;
        margin-right: @spacing-large;
        white-space: nowrap;
      }

      .menu {
        line-height: @header-height;
        border-bottom: none;
        flex: 1;

        :deep(.ant-menu-item),
        :deep(.ant-menu-submenu) {
          padding: 0 @spacing-medium;
          margin: 0 4px;

          &::after {
            display: none;
          }

          a {
            color: rgba(255, 255, 255, 0.85);
            text-decoration: none;

            &:hover {
              color: #fff;
            }
          }

          .anticon {
            margin-right: @spacing-small;
          }
        }

        :deep(.ant-menu-item-selected) {
          background: rgba(255, 255, 255, 0.1);

          a {
            color: #fff;
          }
        }
      }
    }

    .header-right {
      .header-icon {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.85);
        cursor: pointer;
        padding: 4px;
        transition: all 0.3s;

        &:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
      }

      .admin-dropdown {
        display: flex;
        align-items: center;
        padding: 0 @spacing-small;
        cursor: pointer;
        transition: all 0.3s;
        color: rgba(255, 255, 255, 0.85);
        text-decoration: none;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .avatar {
          background: @primary-color;
          margin-right: @spacing-small;
        }

        .username {
          margin-right: @spacing-small;
          color: rgba(255, 255, 255, 0.85);
        }
      }

      :deep(.ant-dropdown-menu) {
        .anticon {
          margin-right: 8px;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      }
    }
  }

  .main-content {
    padding: @spacing-large;
    background: @background-color;

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;

      .page-header {
        margin-bottom: @spacing-large;

        .page-title {
          margin: @spacing-medium 0 0;
          color: @text-primary;
          font-weight: 600;
          font-size: @font-size-title-large;
        }
      }

      .page-content {
        background: #fff;
        padding: @spacing-large;
        border-radius: 4px;
        box-shadow: @box-shadow-base;
      }
    }
  }

  .footer {
    text-align: center;
    padding: @spacing-medium;
    color: @text-secondary;
    background: #fff;
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity @animation-duration-base @animation-timing-function;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
