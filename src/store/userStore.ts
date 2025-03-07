import { defineStore } from "pinia";
import { ref } from "vue";
import * as userController from "@/api/userController";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 登录用户信息全局状态
 */
export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: "未登录",
  });

  const setLoginUser = (newLoginUser: API.LoginUserVO) => {
    loginUser.value = newLoginUser;
  };

  const getLoginUser = async () => {
    const res = await userController.getLoginUserUsingGet();
    if (res.data?.code === 0) {
      setLoginUser(res.data.data || {});
    }
  };

  const logout = async () => {
    const res = await userController.userLogoutUsingPost();
    if (res.data?.code === 0) {
      setLoginUser({});
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
