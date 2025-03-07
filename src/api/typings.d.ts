declare namespace API {
  type addQuestionsToBankUsingPOSTParams = {
    /** questionBankId */
    questionBankId: number;
  };

  type addStudentToClassUsingPOSTParams = {
    /** classId */
    classId: number;
    /** studentId */
    studentId: number;
  };

  type addTeacherToClassUsingPOSTParams = {
    /** classId */
    classId: number;
    /** subject */
    subject: string;
    /** teacherId */
    teacherId: number;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseClassVO_ = {
    code?: number;
    data?: ClassVO;
    message?: string;
  };

  type BaseResponseListQuestion_ = {
    code?: number;
    data?: Question[];
    message?: string;
  };

  type BaseResponseListQuestionVO_ = {
    code?: number;
    data?: QuestionVO[];
    message?: string;
  };

  type BaseResponseListScoringResultVO_ = {
    code?: number;
    data?: ScoringResultVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageClassVO_ = {
    code?: number;
    data?: PageClassVO_;
    message?: string;
  };

  type BaseResponsePageQuestionBankVO_ = {
    code?: number;
    data?: PageQuestionBankVO_;
    message?: string;
  };

  type BaseResponsePageScoringResult_ = {
    code?: number;
    data?: PageScoringResult_;
    message?: string;
  };

  type BaseResponsePageScoringResultVO_ = {
    code?: number;
    data?: PageScoringResultVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserAnswer_ = {
    code?: number;
    data?: PageUserAnswer_;
    message?: string;
  };

  type BaseResponsePageUserAnswerVO_ = {
    code?: number;
    data?: PageUserAnswerVO_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseQuestion_ = {
    code?: number;
    data?: Question;
    message?: string;
  };

  type BaseResponseQuestionBankVO_ = {
    code?: number;
    data?: QuestionBankVO;
    message?: string;
  };

  type BaseResponseScoringResultVO_ = {
    code?: number;
    data?: ScoringResultVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserAnswerVO_ = {
    code?: number;
    data?: UserAnswerVO;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Class = {
    className?: string;
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    teacherId?: number;
    updateTime?: string;
  };

  type ClassVO = {
    createTime?: string;
    description?: string;
    headTeacherId?: number;
    headTeacherName?: string;
    id?: number;
    isDelete?: boolean;
    name?: string;
    studentIds?: number[];
    students?: UserVO[];
    teacherIds?: number[];
    teachers?: UserVO[];
    updateTime?: string;
  };

  type CreateQuestionRequest = {
    answer?: string[];
    options?: string[];
    questionBankBinding?: QuestionBankBinding;
    questionContent?: string;
    questionType?: number;
    score?: number;
    source?: number;
    tags?: string[];
  };

  type deleteClassUsingPOSTParams = {
    /** id */
    id: number;
  };

  type deleteLearningAnalysisUsingDELETEParams = {
    /** classId */
    classId: number;
    /** userId */
    userId: number;
  };

  type deleteQuestionBankUsingPOSTParams = {
    /** id */
    id: number;
  };

  type deleteQuestionUsingPOSTParams = {
    /** id */
    id: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type deleteStudentUsingDELETEParams = {
    /** id */
    id: number;
  };

  type getClassByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getLearningAnalysisUsingGETParams = {
    /** classId */
    classId: number;
    /** userId */
    userId: number;
  };

  type getQuestionBankStatsUsingGETParams = {
    /** id */
    id: number;
  };

  type getQuestionBankUsingGETParams = {
    /** id */
    id: number;
  };

  type getQuestionsByBankIdUsingGETParams = {
    /** questionBankId */
    questionBankId: number;
  };

  type getQuestionUsingGETParams = {
    /** id */
    id: number;
  };

  type getScoringHistoryUsingGETParams = {
    /** questionBankId */
    questionBankId: number;
  };

  type getScoringResultVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getStudentUsingGETParams = {
    /** id */
    id: number;
  };

  type getUserAnswerVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type initializeScoringResultUsingPOSTParams = {
    /** questionBankId */
    questionBankId: number;
  };

  type LearningAnalysis = {
    analysis?: string;
    avgScore?: number;
    classId?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    isOverall?: boolean;
    questionBankId?: number;
    questionId?: number;
    score?: number;
    suggestion?: string;
    tagStats?: string;
    totalScore?: number;
    updateTime?: string;
    userAnswer?: string;
    userId?: number;
    weakTags?: string;
  };

  type listClassesUsingGETParams = {
    /** current */
    current?: number;
    /** size */
    size?: number;
  };

  type listQuestionBanksUsingGETParams = {
    /** current */
    current?: number;
    /** size */
    size?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type Option = {
    key?: string;
    result?: string;
    score?: number;
    value?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageClassVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ClassVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionBankVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionBankVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageScoringResult_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ScoringResult[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageScoringResultVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ScoringResultVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserAnswer_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserAnswer[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserAnswerVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserAnswerVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Question = {
    analysis?: string;
    answer?: string[];
    answerStr?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    options?: string[];
    optionsStr?: string;
    questionContent?: string;
    questionType?: number;
    score?: number;
    source?: number;
    tags?: string[];
    tagsStr?: string;
    updateTime?: string;
    userId?: number;
  };

  type QuestionAnswer = {
    answer?: string[];
    questionId?: number;
  };

  type QuestionBank = {
    classId?: number;
    createTime?: string;
    description?: string;
    endTime?: string;
    id?: number;
    isDelete?: number;
    passScore?: number;
    picture?: string;
    questionBankType?: number;
    questionCount?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    scoringStrategy?: number;
    subject?: string;
    teacherId?: number;
    title?: string;
    totalScore?: number;
    updateTime?: string;
    userId?: number;
  };

  type QuestionBankBinding = {
    questionBankId?: number;
    questionOrder?: number;
  };

  type QuestionBankVO = {
    averageScore?: number;
    createTime?: string;
    creatorId?: number;
    creatorName?: string;
    description?: string;
    highestScore?: number;
    id?: number;
    isDelete?: boolean;
    lowestScore?: number;
    name?: string;
    participantCount?: number;
    questionCount?: number;
    updateTime?: string;
  };

  type QuestionContentDTO = {
    options?: Option[];
    title?: string;
  };

  type QuestionVO = {
    analysis?: string;
    answers?: string[];
    content?: string;
    createTime?: string;
    creatorId?: number;
    creatorName?: string;
    id?: number;
    isDelete?: boolean;
    options?: string[];
    questionContent?: QuestionContentDTO[];
    score?: number;
    tags?: string[];
    type?: number;
    updateTime?: string;
  };

  type removeQuestionsFromBankUsingPOSTParams = {
    /** questionBankId */
    questionBankId: number;
  };

  type removeStudentFromClassUsingPOSTParams = {
    /** classId */
    classId: number;
    /** studentId */
    studentId: number;
  };

  type removeTeacherFromClassUsingPOSTParams = {
    /** classId */
    classId: number;
    /** subject */
    subject: string;
    /** teacherId */
    teacherId: number;
  };

  type ScoringResult = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    isDynamic?: number;
    questionBankId?: number;
    resultDesc?: string;
    resultName?: string;
    resultScoreRange?: number;
    updateTime?: string;
    userId?: number;
  };

  type ScoringResultAddRequest = {
    questionBankId?: number;
    resultDesc?: string;
    resultName?: string;
    resultPicture?: string;
    resultProp?: string[];
    resultScoreRange?: number;
  };

  type ScoringResultEditRequest = {
    id?: number;
    resultDesc?: string;
    resultName?: string;
    resultPicture?: string;
    resultProp?: string[];
    resultScoreRange?: number;
  };

  type ScoringResultQueryRequest = {
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    questionBankId?: number;
    resultDesc?: string;
    resultName?: string;
    resultScoreRange?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type ScoringResultUpdateRequest = {
    id?: number;
    resultDesc?: string;
    resultName?: string;
    resultPicture?: string;
    resultProp?: string[];
    resultScoreRange?: number;
  };

  type ScoringResultVO = {
    createTime?: string;
    duration?: number;
    id?: number;
    isDelete?: boolean;
    questionBankId?: number;
    score?: number;
    status?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
    userName?: string;
  };

  type submitAnswersUsingPOSTParams = {
    /** questionBankId */
    questionBankId: number;
  };

  type transferStudentUsingPOSTParams = {
    /** fromClassId */
    fromClassId: number;
    /** studentId */
    studentId: number;
    /** toClassId */
    toClassId: number;
  };

  type updateLearningAnalysisUsingPUTParams = {
    /** classId */
    classId: number;
    /** userId */
    userId: number;
  };

  type updateQuestionUsingPOSTParams = {
    /** id */
    id: number;
  };

  type updateStudentUsingPUTParams = {
    /** id */
    id: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserAnswer = {
    choices?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    questionBankId?: number;
    questionBankType?: number;
    resultDesc?: string;
    resultId?: number;
    resultName?: string;
    resultScore?: number;
    scoringStrategy?: number;
    updateTime?: string;
    userAnswerId?: number;
  };

  type UserAnswerAddRequest = {
    choices?: QuestionAnswer[];
    questionBankId?: number;
  };

  type UserAnswerEditRequest = {
    choices?: string[];
    id?: number;
    questionBankId?: number;
  };

  type UserAnswerQueryRequest = {
    choices?: string;
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    questionBankId?: number;
    questionBankType?: number;
    resultDesc?: string;
    resultId?: number;
    resultScore?: number;
    scoringStrategy?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type UserAnswerUpdateRequest = {
    choices?: string[];
    id?: number;
    questionBankId?: number;
  };

  type UserAnswerVO = {
    appType?: number;
    choices?: string[];
    createTime?: string;
    id?: number;
    questionBankId?: number;
    resultDesc?: string;
    resultId?: number;
    resultName?: string;
    resultScore?: number;
    scoringStrategy?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    gender?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    gender?: number;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    gender?: number;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
