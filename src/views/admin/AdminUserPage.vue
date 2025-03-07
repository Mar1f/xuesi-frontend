<template>
  <div class="admin-user-page">
    <!-- 搜索栏 -->
    <div class="search-section">
      <a-form layout="inline" :model="searchForm">
        <a-form-item label="账号">
          <a-input
            v-model:value="searchForm.userAccount"
            placeholder="请输入账号"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="角色">
          <a-select
            v-model:value="searchForm.userRole"
            placeholder="请选择角色"
            style="width: 120px"
            allow-clear
          >
            <a-select-option value="STUDENT">学生</a-select-option>
            <a-select-option value="TEACHER">教师</a-select-option>
            <a-select-option value="ADMIN">管理员</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSearch">
              <template #icon><search-outlined /></template>
              搜索
            </a-button>
            <a-button @click="handleReset">
              <template #icon><redo-outlined /></template>
              重置
            </a-button>
            <a-button type="link" @click="toggleAdvanced">
              {{ showAdvanced ? "收起" : "展开" }}
              <down-outlined
                :style="{ transform: showAdvanced ? 'rotate(180deg)' : '' }"
              />
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>

      <!-- 高级搜索 -->
      <div v-show="showAdvanced" class="advanced-search">
        <a-form layout="inline" :model="advancedForm">
          <a-form-item label="创建时间">
            <a-range-picker v-model:value="advancedForm.dateRange" />
          </a-form-item>
        </a-form>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="operation-bar">
      <div class="left">
        <a-space>
          <a-button type="primary" @click="showCreateModal">
            <template #icon><plus-outlined /></template>
            新增用户
          </a-button>
          <a-button>
            <template #icon><download-outlined /></template>
            导出数据
          </a-button>
        </a-space>
      </div>
      <div class="right" v-if="selectedRowKeys.length > 0">
        <a-space>
          <span class="selected-count"
            >已选择 {{ selectedRowKeys.length }} 项</span
          >
          <a-button danger @click="handleBatchDelete"> 批量删除 </a-button>
          <a-button @click="handleBatchExport"> 导出选中 </a-button>
        </a-space>
      </div>
    </div>

    <!-- 用户表格 -->
    <a-table
      :columns="columns"
      :data-source="userList"
      :row-selection="rowSelection"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
      row-key="id"
    >
      <!-- 用户名列 -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'userName'">
          <a @click="showUserDetail(record)">{{ record.userName }}</a>
        </template>
        <!-- 角色列 -->
        <template v-else-if="column.key === 'userRole'">
          <a-tag :color="getRoleColor(record.userRole)">
            {{ getRoleText(record.userRole) }}
          </a-tag>
        </template>
        <!-- 操作列 -->
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a @click="showEditModal(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定要删除此用户吗？"
              @confirm="handleDelete(record)"
            >
              <a class="danger-link">删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <!-- 新增/编辑用户弹窗 -->
    <a-modal
      v-model:visible="modalVisible"
      :title="modalTitle"
      @ok="handleModalSubmit"
      @cancel="handleModalCancel"
      :confirm-loading="modalLoading"
      width="600px"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="用户名" name="userName">
              <a-input
                v-model:value="formState.userName"
                placeholder="请输入用户名"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="账号" name="userAccount">
              <a-input
                v-model:value="formState.userAccount"
                placeholder="请输入账号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色" name="userRole">
              <a-select
                v-model:value="formState.userRole"
                placeholder="请选择角色"
              >
                <a-select-option value="STUDENT">学生</a-select-option>
                <a-select-option value="TEACHER">教师</a-select-option>
                <a-select-option value="ADMIN">管理员</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import {
  SearchOutlined,
  RedoOutlined,
  DownOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import * as userController from "@/api/userController";
import * as classController from "@/api/classController";
import ACCESS_ENUM from "@/access/accessEnum";

// 搜索表单
const searchForm = ref({
  userAccount: "",
  userRole: undefined as string | undefined,
});

const advancedForm = ref({
  dateRange: [],
});

const showAdvanced = ref(false);

// 表格数据
const loading = ref(false);
const userList = ref<API.UserVO[]>([]);
const selectedRowKeys = ref<number[]>([]);
const classList = ref<API.ClassVO[]>([]);

// 分页配置
const pagination = ref({
  current: 1,
  pageSize: 20,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
});

// 表格列定义
const columns = [
  {
    title: "用户名",
    dataIndex: "userName",
    key: "userName",
    width: 150,
  },
  {
    title: "账号",
    dataIndex: "userAccount",
    key: "userAccount",
    width: 150,
  },
  {
    title: "角色",
    dataIndex: "userRole",
    key: "userRole",
    width: 100,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    width: 180,
  },
  {
    title: "操作",
    key: "action",
    width: 150,
    fixed: "right",
  },
];

// 表单相关
const modalVisible = ref(false);
const modalLoading = ref(false);
const modalTitle = ref("新增用户");
const formRef = ref<FormInstance>();
const formState = ref<{
  userName?: string;
  userAccount?: string;
  userRole?: string;
}>({
  userName: "",
  userAccount: "",
  userRole: "",
});

const rules = {
  userName: [
    { required: true, message: "请输入用户名" },
    { min: 2, max: 20, message: "用户名长度在2-20个字符之间" },
  ],
  userAccount: [
    { required: true, message: "请输入账号" },
    { min: 4, message: "账号长度不能小于4个字符" },
  ],
  userRole: [{ required: true, message: "请选择角色" }],
};

// 方法定义
const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
};

const handleSearch = async () => {
  pagination.value.current = 1;
  await fetchUserList();
};

const handleReset = () => {
  searchForm.value = {
    userAccount: "",
    userRole: undefined,
  };
  advancedForm.value = {
    dateRange: [],
  };
  handleSearch();
};

const showCreateModal = () => {
  modalTitle.value = "新增用户";
  currentEditUser.value = null;
  formState.value = {
    userName: "",
    userAccount: "",
    userRole: "",
  };
  modalVisible.value = true;
};

const showUserDetail = (record: API.UserVO) => {
  message.info(`查看用户：${record.userName}`);
};

const showEditModal = (record: API.UserVO) => {
  modalTitle.value = "编辑用户";
  currentEditUser.value = record;
  formState.value = {
    userName: record.userName,
    userRole: record.userRole,
  };
  modalVisible.value = true;
};

const handleModalSubmit = async () => {
  try {
    await formRef.value?.validate();
    modalLoading.value = true;

    const { userName, userAccount, userRole } = formState.value;

    if (currentEditUser.value) {
      // 编辑用户
      const updateRequest: API.UserUpdateRequest = {
        id: currentEditUser.value.id,
        userName,
        userRole,
      };
      await userController.updateUserUsingPost(updateRequest);
      message.success("更新成功");
    } else {
      // 新增用户
      const addRequest: API.UserAddRequest = {
        userName,
        userAccount,
        userRole,
      };
      await userController.addUserUsingPost(addRequest);
      message.success("创建成功");
    }

    modalVisible.value = false;
    await fetchUserList();
  } catch (error) {
    console.error("表单验证失败:", error);
  } finally {
    modalLoading.value = false;
  }
};

const handleModalCancel = () => {
  modalVisible.value = false;
  currentEditUser.value = null;
  formRef.value?.resetFields();
};

const handleDelete = async (record: API.UserVO) => {
  try {
    await userController.deleteUserUsingPost({ id: record.id });
    message.success("删除成功");
    await fetchUserList();
  } catch (error) {
    message.error("删除失败");
  }
};

const handleBatchDelete = async () => {
  try {
    for (const id of selectedRowKeys.value) {
      await userController.deleteUserUsingPost({ id });
    }
    message.success("批量删除成功");
    selectedRowKeys.value = [];
    await fetchUserList();
  } catch (error) {
    message.error("批量删除失败");
  }
};

const handleBatchExport = () => {
  message.info("导出功能开发中");
};

const handleTableChange = (pag: any) => {
  pagination.value.current = pag.current;
  pagination.value.pageSize = pag.pageSize;
  fetchUserList();
};

const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: number[]) => {
    selectedRowKeys.value = keys;
  },
};

const getRoleColor = (role: string) => {
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
};

const getRoleText = (role: string) => {
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
};

const getClassName = (classInfo: API.ClassVO) => {
  return classInfo.name || "未命名班级";
};

const fetchUserList = async () => {
  loading.value = true;
  try {
    const { data: response } = (await userController.listUserByPageUsingPost({
      ...searchForm.value,
      ...advancedForm.value,
      current: pagination.value.current,
      pageSize: pagination.value.pageSize,
    })) as API.AxiosResponseData<API.BaseResponsePageUser>;

    if (response.code === 0 && response.data) {
      userList.value = response.data.records;
      pagination.value.total = response.data.total;
    }
  } catch (error) {
    message.error("获取用户列表失败");
  } finally {
    loading.value = false;
  }
};

const fetchClassList = async () => {
  try {
    const response = await classController.listClassesUsingGet({
      current: 1,
    });
    if (response.data?.code === 0 && response.data.data?.records) {
      classList.value = response.data.data.records;
    }
  } catch (error) {
    message.error("获取班级列表失败");
  }
};

// 添加当前编辑的用户引用
const currentEditUser = ref<API.UserVO | null>(null);

onMounted(async () => {
  await Promise.all([fetchUserList(), fetchClassList()]);
});
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";

.admin-user-page {
  .search-section {
    margin-bottom: @spacing-large;
    padding: @spacing-large;
    background: #fff;
    border-radius: 4px;
    box-shadow: @box-shadow-base;

    .advanced-search {
      margin-top: @spacing-medium;
      padding-top: @spacing-medium;
      border-top: 1px dashed #d9d9d9;
    }
  }

  .operation-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: @spacing-medium;

    .selected-count {
      color: @text-regular;
    }
  }

  :deep(.ant-table) {
    background: #fff;
    border-radius: 4px;
    box-shadow: @box-shadow-base;

    .ant-table-thead > tr > th {
      font-weight: 600;
      background: #fafafa;
      border-bottom: 1px solid #f0f0f0;
    }

    .ant-table-row {
      &:nth-child(even) {
        background: #fafafa;
      }

      td {
        height: 54px;
      }
    }
  }

  .danger-link {
    color: @status-error;
  }
}

// 动画
.ant-table-row {
  animation: fadeIn @animation-duration-base ease-in-out;
}

@keyframes fadeIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
