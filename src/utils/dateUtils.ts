import dayjs from "dayjs";

export const formatDate = (date: string | undefined): string => {
  if (!date) {
    return "未设置";
  }
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

export const formatShortDate = (date: string | undefined): string => {
  if (!date) {
    return "未设置";
  }
  return dayjs(date).format("YYYY-MM-DD");
};
