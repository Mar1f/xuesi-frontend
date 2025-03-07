import { defineStore } from "pinia";
import { ref } from "vue";
import * as userController from "@/api/userController";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 登录用户信息全局状态
 */
export const useLoginUserStore = defineStore("loginUser", () => {
  // 初始状态为未登录
  const loginUser = ref<API.LoginUserVO>({
    userName: "未登录",
  });

  const setLoginUser = (newLoginUser: API.LoginUserVO) => {
    // 如果已登录但没有用户名，显示无名
    if (newLoginUser.id && !newLoginUser.userName) {
      newLoginUser.userName = "无名";
    }
    loginUser.value = newLoginUser;
  };

  const getLoginUser = async () => {
    const res = await userController.getLoginUserUsingGet();
    if (res.data?.code === 0) {
      const userData = res.data.data || {};
      // 如果已登录但没有用户名，显示无名
      if (userData.id && !userData.userName) {
        userData.userName = "无名";
      }
      setLoginUser(userData);
    }
  };

  const logout = async () => {
    const res = await userController.userLogoutUsingPost();
    if (res.data?.code === 0) {
      // 登出后显示未登录
      setLoginUser({
        userName: "未登录",
      });
      return true;
    }
    return false;
  };

  return {
    loginUser,
    setLoginUser,
    getLoginUser,
    logout,
  };
});
