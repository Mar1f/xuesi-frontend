<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="titleBar">
            <img class="logo" src="../assets/logo.png" />
            <div class="title">Five 2.0</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="160px">
      <div v-if="loginUserStore.loginUser.id" class="user-info">
        <a-dropdown trigger="hover">
          <div class="user-dropdown-link">
            <a-avatar :size="32" style="margin-right: 8px">
              {{ loginUserStore.loginUser.userName?.[0] ?? "U" }}
            </a-avatar>
            <span class="username">{{
              loginUserStore.loginUser.userName ?? "无名"
            }}</span>
            <down-outlined style="margin-left: 4px" />
          </div>
          <template #content>
            <a-doption>
              <template #icon>
                <user-outlined />
              </template>
              <a @click="goToProfile">个人信息</a>
            </a-doption>
            <a-doption>
              <template #icon>
                <logout-outlined />
              </template>
              <a @click="handleLogout">退出登录</a>
            </a-doption>
          </template>
        </a-dropdown>
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";
import { Modal } from "ant-design-vue";
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";

const loginUserStore = useLoginUserStore();
const router = useRouter();

// 当前选中的菜单项
const selectedKeys = ref(["/"]);

// 路由跳转时，自动更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

// 展示在菜单栏的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 点击菜单跳转到对应页面
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 跳转到个人信息页面
const goToProfile = () => {
  router.push("/user/profile");
};

// 处理退出登录
const handleLogout = () => {
  Modal.confirm({
    title: "确认退出",
    content: "您确定要退出登录吗？",
    okText: "确认",
    cancelText: "取消",
    onOk: async () => {
      try {
        // 清除用户信息
        loginUserStore.setLoginUser({});
        // 跳转到登录页
        router.push("/user/login");
      } catch (error) {
        console.error("退出登录失败", error);
      }
    },
  });
};
</script>

<style scoped>
#globalHeader {
  padding: 0 24px;
}

.titleBar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 16px;
  color: black;
}

.logo {
  height: 48px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

.user-dropdown-link {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.user-dropdown-link:hover {
  background: rgba(0, 0, 0, 0.025);
}

.username {
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
