import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限（判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess?: string | string[]) => {
  // 获取当前登录用户具有的权限（如果没有 loginUser，则表示未登录）
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果用户未登录
  if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
    return false;
  }

  // 如果不需要任何权限
  if (!needAccess) {
    return true;
  }

  // 如果需要的权限是数组
  if (Array.isArray(needAccess)) {
    return needAccess.includes(loginUserAccess);
  }

  // 如果用户是管理员，直接通过
  if (loginUserAccess === ACCESS_ENUM.ADMIN) {
    return true;
  }

  // 如果需要的权限等于当前用户的权限
  return needAccess === loginUserAccess;
};

export default checkAccess;
