import router from "@/router";
import { useLoginUserStore } from "@/store/userStore";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

// 免登录白名单
const whiteList = ["/user/login", "/user/register"];

// 进入页面前，进行权限校验
router.beforeEach(async (to, from, next) => {
  // 获取当前登录用户
  const loginUserStore = useLoginUserStore();
  let loginUser = loginUserStore.loginUser;

  // 如果是白名单页面，直接放行
  if (whiteList.includes(to.path)) {
    next();
    return;
  }

  // 如果之前没有尝试获取过登录用户信息，才自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等待用户登录成功并获取到值后，再执行后续操作
    await loginUserStore.getLoginUser();
    loginUser = loginUserStore.loginUser;
  }

  // 如果未登录且访问的不是白名单页面，跳转到登录页
  if (
    !loginUser ||
    !loginUser.userRole ||
    loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
  ) {
    next(`/user/login?redirect=${to.fullPath}`);
    return;
  }

  // 当前页面需要的权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果页面需要特定权限，检查用户权限是否满足
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果权限不足，跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }

  next();
});
