// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** addStudentToClass POST /api/class/addStudent */
export async function addStudentToClassUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addStudentToClassUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/class/addStudent', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** addTeacherToClass POST /api/class/addTeacher */
export async function addTeacherToClassUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addTeacherToClassUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/class/addTeacher', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** createClass POST /api/class/create */
export async function createClassUsingPost(body: API.Class, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/class/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteClass POST /api/class/delete */
export async function deleteClassUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteClassUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/class/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getClassById GET /api/class/get */
export async function getClassByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getClassByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseClassVO_>('/api/class/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listClasses GET /api/class/list */
export async function listClassesUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listClassesUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageClassVO_>('/api/class/list', {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // size has a default value: 10
      size: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** removeStudentFromClass POST /api/class/removeStudent */
export async function removeStudentFromClassUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeStudentFromClassUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/class/removeStudent', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** removeTeacherFromClass POST /api/class/removeTeacher */
export async function removeTeacherFromClassUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeTeacherFromClassUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/class/removeTeacher', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** transferStudent POST /api/class/transferStudent */
export async function transferStudentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.transferStudentUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/class/transferStudent', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateClass POST /api/class/update */
export async function updateClassUsingPost(body: API.Class, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/class/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
