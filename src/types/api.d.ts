export interface UserVO {
  id?: number;
  userName?: string;
  userAccount?: string;
  userRole?: string;
  gender?: string;
  phone?: string;
  email?: string;
  userProfile?: string;
  createTime?: string;
  updateTime?: string;
}

export interface LoginUserVO extends UserVO {}

export interface ClassVO {
  id?: number;
  className?: string;
  headTeacherName?: string;
  studentCount?: number;
  teacherCount?: number;
  description?: string;
  role?: 'student' | 'teacher';
  createTime?: string;
  updateTime?: string;
}

export interface UserUpdateMyRequest {
  userName?: string;
  userProfile?: string;
}

export interface BaseResponse<T> {
  code?: number;
  data?: T;
  message?: string;
}

export interface PageResponse<T> {
  records?: T[];
  total?: number;
  size?: number;
  current?: number;
  pages?: number;
} 