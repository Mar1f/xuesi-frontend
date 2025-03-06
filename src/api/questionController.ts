// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** createQuestion POST /api/api/question/add */
export async function createQuestionUsingPost(
  body: API.CreateQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestion_>('/api/api/question/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteQuestion POST /api/api/question/delete */
export async function deleteQuestionUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/api/question/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getQuestion GET /api/api/question/get/${param0} */
export async function getQuestionUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseQuestion_>(`/api/api/question/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getAllQuestions GET /api/api/question/list */
export async function getAllQuestionsUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListQuestion_>('/api/api/question/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateQuestion POST /api/api/question/update */
export async function updateQuestionUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateQuestionUsingPOSTParams,
  body: API.Question,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestion_>('/api/api/question/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
