// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** addQuestionsToBank POST /api/questionBank/addQuestions */
export async function addQuestionsToBankUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addQuestionsToBankUsingPOSTParams,
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionBank/addQuestions', {
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

/** createQuestionBank POST /api/questionBank/create */
export async function createQuestionBankUsingPost(
  body: API.QuestionBank,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/questionBank/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteQuestionBank POST /api/questionBank/delete */
export async function deleteQuestionBankUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionBankUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionBank/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getQuestionBank GET /api/questionBank/get */
export async function getQuestionBankUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestionBankVO_>('/api/questionBank/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** initializeScoringResult POST /api/questionBank/initScoring */
export async function initializeScoringResultUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.initializeScoringResultUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseScoringResultVO_>('/api/questionBank/initScoring', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listQuestionBanks GET /api/questionBank/list */
export async function listQuestionBanksUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listQuestionBanksUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionBankVO_>('/api/questionBank/list', {
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

/** getQuestionsByBankId GET /api/questionBank/questions */
export async function getQuestionsByBankIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionsByBankIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListQuestionVO_>('/api/questionBank/questions', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** removeQuestionsFromBank POST /api/questionBank/removeQuestions */
export async function removeQuestionsFromBankUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeQuestionsFromBankUsingPOSTParams,
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionBank/removeQuestions', {
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

/** getScoringHistory GET /api/questionBank/scoringHistory */
export async function getScoringHistoryUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getScoringHistoryUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListScoringResultVO_>('/api/questionBank/scoringHistory', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getQuestionBankStats GET /api/questionBank/stats */
export async function getQuestionBankStatsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankStatsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestionBankVO_>('/api/questionBank/stats', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** submitAnswers POST /api/questionBank/submit */
export async function submitAnswersUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.submitAnswersUsingPOSTParams,
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseScoringResultVO_>('/api/questionBank/submit', {
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

/** updateQuestionBank POST /api/questionBank/update */
export async function updateQuestionBankUsingPost(
  body: API.QuestionBank,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionBank/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
