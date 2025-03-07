<template>
  <div class="user-profile">
    <a-row :gutter="24">
      <a-col :span="8">
        <a-card class="profile-card">
          <template #cover>
            <div class="avatar-wrapper">
              <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="/api/user/upload/avatar"
                :before-upload="beforeAvatarUpload"
                @change="handleAvatarChange"
              >
                <div
                  v-if="loginUserStore.loginUser.userAvatar"
                  class="avatar-preview"
                >
                  <img
                    :src="loginUserStore.loginUser.userAvatar"
                    alt="avatar"
                  />
                </div>
                <div v-else class="avatar-text">
                  <a-avatar :size="120" class="avatar">
                    {{ loginUserStore.loginUser.userName?.[0] ?? "U" }}
                  </a-avatar>
                </div>
                <div class="avatar-upload-overlay">
                  <camera-outlined />
                  <div>更换头像</div>
                </div>
              </a-upload>
            </div>
          </template>
          <template #title>{{ loginUserStore.loginUser.userName }}</template>
          <template #extra>
            <a-tag :color="roleColor">{{ roleDisplayName }}</a-tag>
          </template>
          <a-descriptions :column="1">
            <a-descriptions-item label="用户名">
              {{ loginUserStore.loginUser.userName }}
            </a-descriptions-item>
            <a-descriptions-item label="角色">
              {{ roleDisplayName }}
            </a-descriptions-item>
            <a-descriptions-item label="加入时间">
              {{ formatDate(loginUserStore.loginUser.createTime) }}
            </a-descriptions-item>
          </a-descriptions>
          <a-divider />
          <div class="user-stats">
            <div class="stat-item">
              <div class="stat-value">{{ userClasses.length }}</div>
              <div class="stat-label">加入的班级</div>
            </div>
            <a-divider type="vertical" />
            <div class="stat-item">
              <div class="stat-value">{{ completedTasks }}</div>
              <div class="stat-label">完成的任务</div>
            </div>
            <a-divider type="vertical" />
            <div class="stat-item">
              <div class="stat-value">{{ averageScore }}分</div>
              <div class="stat-label">平均成绩</div>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :span="16">
        <a-tabs v-model:activeKey="activeTab">
          <a-tab-pane key="basic" tab="基本信息">
            <a-card :bordered="false">
              <a-form
                ref="formRef"
                :model="formState"
                :rules="rules"
                layout="vertical"
              >
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item label="用户名" name="userName">
                      <a-input
                        v-model:value="formState.userName"
                        placeholder="请输入用户名"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="性别" name="gender">
                      <a-radio-group
                        v-model:value="extraFormState.gender"
                        button-style="solid"
                      >
                        <a-radio-button value="男">
                          <template #icon><man-outlined /></template>
                          男
                        </a-radio-button>
                        <a-radio-button value="女">
                          <template #icon><woman-outlined /></template>
                          女
                        </a-radio-button>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item label="手机号" name="phone">
                      <a-input-group compact>
                        <a-select
                          v-model:value="extraFormState.phonePrefix"
                          style="width: 20%"
                        >
                          <a-select-option value="+86">+86</a-select-option>
                          <a-select-option value="+852">+852</a-select-option>
                          <a-select-option value="+853">+853</a-select-option>
                        </a-select>
                        <a-input
                          v-model:value="extraFormState.phone"
                          style="width: 80%"
                          placeholder="请输入手机号"
                        />
                      </a-input-group>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="邮箱" name="email">
                      <a-input
                        v-model:value="extraFormState.email"
                        placeholder="请输入邮箱"
                      >
                        <template #prefix><mail-outlined /></template>
                      </a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item label="生日" name="birthday">
                      <a-date-picker
                        v-model:value="extraFormState.birthday"
                        style="width: 100%"
                        :disabledDate="disabledDate"
                        placeholder="请选择生日"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="地区" name="location">
                      <a-cascader
                        v-model:value="extraFormState.location"
                        :options="locationOptions"
                        placeholder="请选择地区"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item label="个人简介" name="userProfile">
                  <a-textarea
                    v-model:value="formState.userProfile"
                    :rows="4"
                    placeholder="介绍一下你自己吧..."
                    :maxLength="500"
                    show-count
                  />
                </a-form-item>
                <a-form-item label="兴趣爱好" name="hobbies">
                  <a-select
                    v-model:value="extraFormState.hobbies"
                    mode="tags"
                    style="width: 100%"
                    placeholder="请输入你的兴趣爱好"
                    :token-separators="[',']"
                  >
                    <a-select-option
                      v-for="hobby in commonHobbies"
                      :key="hobby"
                      :value="hobby"
                    >
                      {{ hobby }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item>
                  <a-space>
                    <a-button type="primary" @click="handleSubmit">
                      <template #icon><save-outlined /></template>
                      保存修改
                    </a-button>
                    <a-button @click="resetForm">
                      <template #icon><undo-outlined /></template>
                      重置
                    </a-button>
                  </a-space>
                </a-form-item>
              </a-form>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="security" tab="安全设置">
            <a-card :bordered="false">
              <a-list item-layout="horizontal">
                <a-list-item>
                  <a-list-item-meta title="修改密码">
                    <template #description>
                      定期修改密码可以提高账号安全性
                    </template>
                  </a-list-item-meta>
                  <template #extra>
                    <a-button type="link" @click="showChangePasswordModal">
                      修改
                    </a-button>
                  </template>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta title="绑定手机">
                    <template #description>
                      已绑定：{{
                        extraFormState.phone
                          ? `${extraFormState.phonePrefix} ${extraFormState.phone}`
                          : "未绑定"
                      }}
                    </template>
                  </a-list-item-meta>
                  <template #extra>
                    <a-button type="link" @click="showBindPhoneModal">
                      {{ extraFormState.phone ? "修改" : "绑定" }}
                    </a-button>
                  </template>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta title="绑定邮箱">
                    <template #description>
                      已绑定：{{ extraFormState.email || "未绑定" }}
                    </template>
                  </a-list-item-meta>
                  <template #extra>
                    <a-button type="link" @click="showBindEmailModal">
                      {{ extraFormState.email ? "修改" : "绑定" }}
                    </a-button>
                  </template>
                </a-list-item>
              </a-list>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="classes" tab="班级信息">
            <a-card :bordered="false">
              <template v-if="userClasses.length > 0">
                <a-list
                  :data-source="userClasses"
                  :grid="{ gutter: 16, column: 2 }"
                >
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-card :title="item.className" hoverable>
                        <template #extra>
                          <a-tag v-if="item.role === 'student'" color="blue"
                            >学生</a-tag
                          >
                          <a-tag
                            v-else-if="item.role === 'teacher'"
                            color="green"
                            >教师</a-tag
                          >
                        </template>
                        <a-descriptions :column="1">
                          <a-descriptions-item label="班主任">
                            {{ item.headTeacherName }}
                          </a-descriptions-item>
                          <a-descriptions-item label="学生数量">
                            {{ item.studentCount }}
                          </a-descriptions-item>
                          <a-descriptions-item label="教师数量">
                            {{ item.teacherCount }}
                          </a-descriptions-item>
                        </a-descriptions>
                        <template v-if="item.description">
                          <a-divider />
                          <div class="class-description">
                            {{ item.description }}
                          </div>
                        </template>
                        <template #actions>
                          <a-button type="link" @click="viewClassDetail(item)">
                            查看详情
                          </a-button>
                          <a-button type="link" @click="viewClassMembers(item)">
                            成员列表
                          </a-button>
                        </template>
                      </a-card>
                    </a-list-item>
                  </template>
                </a-list>
              </template>
              <template v-else>
                <a-empty description="暂无班级信息">
                  <template #extra>
                    <a-button type="primary" @click="handleJoinClass">
                      加入班级
                    </a-button>
                  </template>
                </a-empty>
              </template>
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>

    <!-- 修改密码弹窗 -->
    <a-modal
      v-model:visible="passwordModalVisible"
      title="修改密码"
      @ok="handleChangePassword"
      :confirmLoading="passwordLoading"
    >
      <a-form :model="passwordForm" layout="vertical">
        <a-form-item
          label="当前密码"
          name="oldPassword"
          :rules="[{ required: true, message: '请输入当前密码' }]"
        >
          <a-input-password v-model:value="passwordForm.oldPassword" />
        </a-form-item>
        <a-form-item
          label="新密码"
          name="newPassword"
          :rules="[
            { required: true, message: '请输入新密码' },
            { min: 8, message: '密码长度不能小于8位' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: '密码必须包含大小写字母和数字',
            },
          ]"
        >
          <a-input-password v-model:value="passwordForm.newPassword" />
        </a-form-item>
        <a-form-item
          label="确认新密码"
          name="confirmPassword"
          :rules="[
            { required: true, message: '请确认新密码' },
            { validator: validateConfirmPassword },
          ]"
        >
          <a-input-password v-model:value="passwordForm.confirmPassword" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import * as userController from "@/api/userController";
import * as classController from "@/api/classController";
import { useLoginUserStore } from "@/store/userStore";
import ACCESS_ENUM from "@/access/accessEnum";
import {
  ManOutlined,
  WomanOutlined,
  SaveOutlined,
  UndoOutlined,
  MailOutlined,
  CameraOutlined,
} from "@ant-design/icons-vue";
import { formatDate } from "@/utils/dateUtils";
import { locationOptions } from "@/constants/locations";
import { commonHobbies } from "@/constants/hobbies";
import dayjs from "dayjs";

const loginUserStore = useLoginUserStore();
const formRef = ref<FormInstance>();
const userClasses = ref<API.ClassVO[]>([]);
const activeTab = ref("basic");

// 统计数据
const completedTasks = ref(0);
const averageScore = ref(0);

// 表单状态
const formState = ref<API.UserUpdateMyRequest>({
  userName: "",
  userProfile: "",
});

// 额外的表单字段（仅用于UI显示，不提交到后端）
const extraFormState = ref({
  phonePrefix: "+86",
  gender: "",
  phone: "",
  email: "",
  birthday: null as dayjs.Dayjs | null,
  location: [] as string[],
  hobbies: [] as string[],
});

// 密码修改
const passwordModalVisible = ref(false);
const passwordLoading = ref(false);
const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const rules = {
  userName: [
    { required: true, message: "请输入用户名" },
    { min: 2, max: 20, message: "用户名长度在2-20个字符之间" },
  ],
  userProfile: [{ max: 500, message: "个人简介不能超过500个字符" }],
};

const extraRules = {
  gender: [{ required: true, message: "请选择性别" }],
  phone: [
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }],
  birthday: [{ required: true, message: "请选择生日" }],
  location: [{ required: true, type: "array", message: "请选择地区" }],
};

// 头像上传
const beforeAvatarUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传 JPG/PNG 格式的图片！");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("图片大小不能超过 2MB！");
  }
  return isJpgOrPng && isLt2M;
};

const handleAvatarChange = (info: any) => {
  if (info.file.status === "done") {
    message.success("头像上传成功");
    loginUserStore.fetchLoginUser();
  } else if (info.file.status === "error") {
    message.error("头像上传失败");
  }
};

// 日期选择限制
const disabledDate = (current: dayjs.Dayjs) => {
  return current && current > dayjs().endOf("day");
};

// 密码验证
const validateConfirmPassword = async (_rule: any, value: string) => {
  if (value !== passwordForm.value.newPassword) {
    throw new Error("两次输入的密码不一致");
  }
};

const showChangePasswordModal = () => {
  passwordModalVisible.value = true;
  passwordForm.value = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
};

const handleChangePassword = async () => {
  message.info("密码修改功能暂未开放");
  passwordModalVisible.value = false;
};

const resetForm = () => {
  formRef.value?.resetFields();
  extraFormState.value = {
    phonePrefix: "+86",
    gender: "",
    phone: "",
    email: "",
    birthday: null,
    location: [],
    hobbies: [],
  };
};

const handleSubmit = async () => {
  try {
    const { data: response } = (await userController.updateMyUserUsingPost(
      formState.value
    )) as API.AxiosResponseData<API.BaseResponseBoolean>;
    if (response.code === 0 && response.data) {
      message.success("更新成功");
      await loginUserStore.fetchLoginUser();
    } else {
      message.error(response.message || "更新失败");
    }
  } catch (error) {
    message.error("更新失败");
  }
};

const viewClassDetail = (classInfo: API.ClassVO) => {
  // 实现查看班级详情的逻辑
};

const viewClassMembers = (classInfo: API.ClassVO) => {
  // 实现查看班级成员的逻辑
};

const handleJoinClass = () => {
  // 实现加入班级的逻辑
};

const fetchUserStats = async () => {
  try {
    // 这里添加获取用户统计数据的接口调用
    completedTasks.value = 0;
    averageScore.value = 0;
  } catch (error) {
    message.error("获取统计信息失败");
  }
};

const roleColor = computed(() => {
  const role = loginUserStore.loginUser.userRole;
  switch (role) {
    case ACCESS_ENUM.ADMIN:
      return "red";
    case ACCESS_ENUM.TEACHER:
      return "green";
    case ACCESS_ENUM.STUDENT:
      return "blue";
    default:
      return "default";
  }
});

const roleDisplayName = computed(() => {
  const role = loginUserStore.loginUser.userRole;
  switch (role) {
    case ACCESS_ENUM.ADMIN:
      return "管理员";
    case ACCESS_ENUM.TEACHER:
      return "教师";
    case ACCESS_ENUM.STUDENT:
      return "学生";
    default:
      return "未知";
  }
});

const showBindPhoneModal = () => {
  // TODO: 实现手机绑定功能
  message.info("手机绑定功能开发中");
};

const showBindEmailModal = () => {
  // TODO: 实现邮箱绑定功能
  message.info("邮箱绑定功能开发中");
};

const fetchUserClasses = async () => {
  try {
    const response = await classController.listClassesUsingGet({
      current: 1,
      size: 10,
    });
    if (response.data?.code === 0 && response.data.data?.records) {
      userClasses.value = response.data.data.records;
    }
  } catch (error) {
    message.error("获取班级信息失败");
  }
};

onMounted(async () => {
  const currentUser = loginUserStore.loginUser;
  formState.value = {
    userName: currentUser.userName || "",
    userProfile: currentUser.userProfile || "",
  };

  extraFormState.value = {
    phonePrefix: "+86",
    gender: "",
    phone: "",
    email: "",
    birthday: null,
    location: [],
    hobbies: [],
  };

  await Promise.all([fetchUserClasses(), fetchUserStats()]);
});
</script>

<style scoped>
.user-profile {
  padding: 24px;
}

.profile-card {
  text-align: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.avatar-wrapper {
  position: relative;
  padding: 24px 0;
  background: linear-gradient(135deg, #1890ff 0%, #52c41a 100%);
}

.avatar-uploader {
  position: relative;
  width: 128px !important;
  height: 128px;
  margin: 0 auto;
  cursor: pointer;
}

.avatar-preview {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar {
  font-size: 48px;
  background: #1890ff;
}

.avatar-upload-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-uploader:hover .avatar-upload-overlay {
  opacity: 1;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  color: #1890ff;
  font-weight: bold;
  font-size: 24px;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

.class-description {
  display: -webkit-box;
  max-height: 63px;
  overflow: hidden;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

:deep(.ant-tabs-nav) {
  margin-bottom: 0;
}

:deep(.ant-card) {
  border-radius: 8px;
}

:deep(.ant-list-item) {
  padding: 16px 0;
}

:deep(.ant-radio-group) {
  display: flex;
  gap: 8px;
}

:deep(.ant-radio-button-wrapper) {
  display: flex;
  gap: 4px;
  align-items: center;
}

:deep(.ant-form-item-label) {
  font-weight: 500;
}
</style>
