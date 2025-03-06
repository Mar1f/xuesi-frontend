// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** getAllStudents GET /api/students */
export async function getAllStudentsUsingGet(options?: { [key: string]: any }) {
  return request<API.User[]>('/api/students', {
    method: 'GET',
    ...(options || {}),
  });
}

/** createStudent POST /api/students */
export async function createStudentUsingPost(body: API.User, options?: { [key: string]: any }) {
  return request<API.User>('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getStudent GET /api/students/${param0} */
export async function getStudentUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudentUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.User>(`/api/students/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateStudent PUT /api/students/${param0} */
export async function updateStudentUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateStudentUsingPUTParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.User>(`/api/students/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** deleteStudent DELETE /api/students/${param0} */
export async function deleteStudentUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteStudentUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/students/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
