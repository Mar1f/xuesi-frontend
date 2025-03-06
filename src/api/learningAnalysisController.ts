// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** createLearningAnalysis POST /api/learningAnalysis */
export async function createLearningAnalysisUsingPost(
  body: API.LearningAnalysis,
  options?: { [key: string]: any },
) {
  return request<API.LearningAnalysis>('/api/learningAnalysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getLearningAnalysis GET /api/learningAnalysis/${param1}/${param0} */
export async function getLearningAnalysisUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLearningAnalysisUsingGETParams,
  options?: { [key: string]: any },
) {
  const { classId: param0, userId: param1, ...queryParams } = params;
  return request<API.LearningAnalysis>(`/api/learningAnalysis/${param1}/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateLearningAnalysis PUT /api/learningAnalysis/${param1}/${param0} */
export async function updateLearningAnalysisUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateLearningAnalysisUsingPUTParams,
  body: API.LearningAnalysis,
  options?: { [key: string]: any },
) {
  const { classId: param0, userId: param1, ...queryParams } = params;
  return request<API.LearningAnalysis>(`/api/learningAnalysis/${param1}/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** deleteLearningAnalysis DELETE /api/learningAnalysis/${param1}/${param0} */
export async function deleteLearningAnalysisUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteLearningAnalysisUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { classId: param0, userId: param1, ...queryParams } = params;
  return request<any>(`/api/learningAnalysis/${param1}/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
