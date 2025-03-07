declare global {
  namespace API {
    interface UserVO {
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

    interface LoginUserVO extends UserVO {}

    interface ClassVO {
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

    interface UserUpdateMyRequest {
      userName?: string;
      userProfile?: string;
    }

    interface BaseResponse<T> {
      code: number;
      data: T;
      message?: string;
    }

    interface PageResponse<T> {
      records: T[];
      total: number;
      size: number;
      current: number;
      pages: number;
    }

    type BaseResponseBoolean = BaseResponse<boolean>;
    type BaseResponsePageUser = BaseResponse<PageResponse<UserVO>>;
    type BaseResponseUser = BaseResponse<UserVO>;
    type BaseResponseLoginUser = BaseResponse<LoginUserVO>;
    type BaseResponseClass = BaseResponse<ClassVO>;
    type BaseResponsePageClass = BaseResponse<PageResponse<ClassVO>>;

    type AxiosResponseData<T> = {
      data: T;
    };
  }
}

export {}; 