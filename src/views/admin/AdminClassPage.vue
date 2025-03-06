<template>
  <div class="class-management">
    <div class="header">
      <div class="left">
        <a-input-search
          v-model:value="searchText"
          placeholder="搜索班级名称"
          style="width: 200px"
          @search="onSearch"
        />
      </div>
      <div class="right">
        <a-button type="primary" @click="handleAdd">
          <template #icon><plus-outlined /></template>
          添加班级
        </a-button>
      </div>
    </div>

    <a-table
      :columns="columns"
      :data-source="classes"
      :loading="loading"
      :row-key="(record) => record.id"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button type="link" @click="handleEdit(record)">
              <template #icon><edit-outlined /></template>
              编辑
            </a-button>
            <a-button type="link" @click="handleManageStudents(record)">
              <template #icon><team-outlined /></template>
              学生管理
            </a-button>
            <a-button type="link" @click="handleManageTeachers(record)">
              <template #icon><user-outlined /></template>
              教师管理
            </a-button>
            <a-popconfirm
              title="确定要删除这个班级吗？"
              @confirm="handleDelete(record.id)"
              ok-text="确定"
              cancel-text="取消"
            >
              <a-button type="link" danger>
                <template #icon><delete-outlined /></template>
                删除
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <!-- 班级表单弹窗 -->
    <a-modal
      :title="editingClass ? '编辑班级' : '添加班级'"
      :visible="modalVisible"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
      width="600px"
    >
      <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
        <a-form-item label="班级名称" name="className">
          <a-input v-model:value="formState.className" />
        </a-form-item>
        <a-form-item label="班级编号" name="classCode">
          <a-input v-model:value="formState.classCode" />
        </a-form-item>
        <a-form-item label="年级" name="grade">
          <a-select v-model:value="formState.grade">
            <a-select-option value="一年级">一年级</a-select-option>
            <a-select-option value="二年级">二年级</a-select-option>
            <a-select-option value="三年级">三年级</a-select-option>
            <a-select-option value="四年级">四年级</a-select-option>
            <a-select-option value="五年级">五年级</a-select-option>
            <a-select-option value="六年级">六年级</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="班主任" name="headTeacher">
          <a-input v-model:value="formState.headTeacher" />
        </a-form-item>
        <a-form-item label="描述" name="description">
          <a-textarea v-model:value="formState.description" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 学生管理弹窗 -->
    <a-modal
      title="学生管理"
      :visible="studentModalVisible"
      @ok="handleStudentModalOk"
      @cancel="handleStudentModalCancel"
      width="800px"
    >
      <div class="student-management">
        <div class="student-header">
          <a-select
            v-model:value="selectedStudentIds"
            mode="multiple"
            placeholder="选择学生"
            style="width: 100%"
            :options="availableStudents"
            :loading="loadingStudents"
            @search="handleStudentSearch"
          />
        </div>
        <a-table
          :columns="studentColumns"
          :data-source="currentClassStudents"
          :loading="loadingStudents"
          :row-key="(record) => record.id"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-button type="link" danger @click="handleRemoveStudent(record)">
                移除
              </a-button>
            </template>
          </template>
        </a-table>
      </div>
    </a-modal>

    <!-- 教师管理弹窗 -->
    <a-modal
      title="教师管理"
      :visible="teacherModalVisible"
      @ok="handleTeacherModalOk"
      @cancel="handleTeacherModalCancel"
      width="800px"
    >
      <div class="teacher-management">
        <div class="teacher-header">
          <a-select
            v-model:value="selectedTeacherIds"
            mode="multiple"
            placeholder="选择教师"
            style="width: 100%"
            :options="availableTeachers"
            :loading="loadingTeachers"
            @search="handleTeacherSearch"
          />
        </div>
        <a-table
          :columns="teacherColumns"
          :data-source="currentClassTeachers"
          :loading="loadingTeachers"
          :row-key="(record) => record.id"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-button type="link" danger @click="handleRemoveTeacher(record)">
                移除
              </a-button>
            </template>
          </template>
        </a-table>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import { classController, userController } from "@/api";
// import {} from "@/api/classController"
import API from "@/api";
// 班级列表相关
const classes = ref<API.ClassVO[]>([]);
const loading = ref(false);
const searchText = ref("");
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});

// 班级表单相关
const modalVisible = ref(false);
const formRef = ref<FormInstance>();
const editingClass = ref<API.Class | null>(null);
const formState = ref({
  className: "",
  classCode: "",
  grade: "",
  headTeacher: "",
  description: "",
});

const rules = {
  className: [{ required: true, message: "请输入班级名称" }],
  classCode: [{ required: true, message: "请输入班级编号" }],
  grade: [{ required: true, message: "请选择年级" }],
  headTeacher: [{ required: true, message: "请输入班主任姓名" }],
};

// 学生管理相关
const studentModalVisible = ref(false);
const currentClassId = ref<number>();
const currentClassStudents = ref<API.UserVO[]>([]);
const loadingStudents = ref(false);
const availableStudents = ref<{ label: string; value: number }[]>([]);
const selectedStudentIds = ref<number[]>([]);

// 教师管理相关
const teacherModalVisible = ref(false);
const currentClassTeachers = ref<API.UserVO[]>([]);
const loadingTeachers = ref(false);
const availableTeachers = ref<{ label: string; value: number }[]>([]);
const selectedTeacherIds = ref<number[]>([]);

const columns = [
  {
    title: "班级名称",
    dataIndex: "className",
    key: "className",
  },
  {
    title: "班级编号",
    dataIndex: "classCode",
    key: "classCode",
  },
  {
    title: "年级",
    dataIndex: "grade",
    key: "grade",
  },
  {
    title: "班主任",
    dataIndex: "headTeacher",
    key: "headTeacher",
  },
  {
    title: "学生数量",
    dataIndex: "studentCount", // 对应计算后的字段
    key: "studentCount",
  },
  {
    title: "教师数量",
    dataIndex: "teacherCount", // 对应计算后的字段
    key: "teacherCount",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "操作",
    key: "action",
  },
];

const studentColumns = [
  {
    title: "学号",
    dataIndex: "userAccount",
    key: "userAccount",
  },
  {
    title: "姓名",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "操作",
    key: "action",
  },
];

const teacherColumns = [
  {
    title: "工号",
    dataIndex: "userAccount",
    key: "userAccount",
  },
  {
    title: "姓名",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "操作",
    key: "action",
  },
];

// 获取班级列表
// 修改后的 fetchClasses 函数
const fetchClasses = async () => {
  try {
    loading.value = true;
    const response = await classController.listClassesUsingGet({
      current: pagination.value.current,
      size: pagination.value.pageSize,
      searchText: searchText.value,
    });
    if (response.code === 0 && response.data) {
      // 添加数量计算
      classes.value = (response.data.records || []).map(
        (classVO: { students: string | any[]; teachers: string | any[] }) => ({
          ...classVO,
          studentCount: classVO.students?.length || 0,
          teacherCount: classVO.teachers?.length || 0,
        })
      );
      pagination.value.total = response.data.total || 0;
    }
  } catch (error) {
    message.error("获取班级列表失败");
  } finally {
    loading.value = false;
  }
};

// 搜索
const onSearch = () => {
  pagination.value.current = 1;
  fetchClasses();
};

// 表格变化
const handleTableChange = (pag: any) => {
  pagination.value.current = pag.current;
  pagination.value.pageSize = pag.pageSize;
  fetchClasses();
};

// 班级表单相关方法
const handleAdd = () => {
  editingClass.value = null;
  formState.value = {
    className: "",
    classCode: "",
    grade: "",
    headTeacher: "",
    description: "",
  };
  modalVisible.value = true;
};

const handleEdit = (record: API.ClassVO) => {
  editingClass.value = record;
  formState.value = {
    className: record.name || "", // 确保字段名称正确
    classCode: record.id || "", // 确保字段名称正确
    // grade: record.grade || "",
    headTeacher: record.headTeacherName || "",
    description: record.description || "",
  };
  modalVisible.value = true;
};

const handleDelete = async (id: number) => {
  try {
    const response = await classController.deleteClassUsingPost({ id });
    if (response.code === 0) {
      message.success("删除成功");
      fetchClasses();
    }
  } catch (error) {
    message.error("删除失败");
  }
};

const handleModalOk = async () => {
  try {
    await formRef.value?.validate();
    if (editingClass.value) {
      const response = await classController.updateClassUsingPost({
        ...formState.value,
        id: editingClass.value.id,
      });
      if (response.code === 0) {
        message.success("更新成功");
        modalVisible.value = false;
        fetchClasses();
      }
    } else {
      const response = await classController.createClassUsingPost(
        formState.value
      );
      if (response.code === 0) {
        message.success("创建成功");
        modalVisible.value = false;
        fetchClasses();
      }
    }
  } catch (error) {
    message.error("操作失败");
  }
};

const handleModalCancel = () => {
  modalVisible.value = false;
};

// 学生管理相关方法
const handleManageStudents = async (record: API.ClassVO) => {
  currentClassId.value = record.id;
  studentModalVisible.value = true;
  await fetchClassStudents(record.id);
  await fetchAvailableStudents();
};

const fetchClassStudents = async (classId: number) => {
  try {
    loadingStudents.value = true;
    const response = await classController.getClassByIdUsingGet({
      id: classId,
    });
    if (response.code === 0 && response.data) {
      currentClassStudents.value = response.data.students || [];
    }
  } catch (error) {
    message.error("获取班级学生失败");
  } finally {
    loadingStudents.value = false;
  }
};

const fetchAvailableStudents = async () => {
  try {
    const response = await userController.getAllStudentsUsingGet();
    if (response.code === 0 && response.data) {
      availableStudents.value = response.data.map((student: API.UserVO) => ({
        label: `${student.userName} (${student.userAccount})`,
        value: student.id!,
      }));
    }
  } catch (error) {
    message.error("获取可选学生列表失败");
  }
};

const handleStudentSearch = (value: string) => {
  // 实现学生搜索逻辑
};

const handleRemoveStudent = async (student: API.UserVO) => {
  try {
    const response = await classController.removeStudentFromClassUsingPost({
      classId: currentClassId.value!,
      studentId: student.id!,
    });
    if (response.code === 0) {
      message.success("移除学生成功");
      fetchClassStudents(currentClassId.value!);
      await fetchClasses(); // 添加班级列表刷新
    }
  } catch (error) {
    message.error("移除学生失败");
  }
};

const handleStudentModalOk = async () => {
  try {
    if (selectedStudentIds.value.length > 0) {
      await Promise.all(
        selectedStudentIds.value.map((studentId) =>
          classController.addStudentToClassUsingPost({
            classId: currentClassId.value!,
            studentId,
          })
        )
      );
      message.success("添加学生成功");
      fetchClassStudents(currentClassId.value!);
      await fetchClasses(); // 添加班级列表刷新
    }
    studentModalVisible.value = false;
  } catch (error) {
    message.error("添加学生失败");
  }
};

const handleStudentModalCancel = () => {
  studentModalVisible.value = false;
  selectedStudentIds.value = [];
};

// 教师管理相关方法
const handleManageTeachers = async (record: API.ClassVO) => {
  currentClassId.value = record.id;
  teacherModalVisible.value = true;
  await fetchClassTeachers(record.id);
  await fetchAvailableTeachers();
};

const fetchClassTeachers = async (classId: number) => {
  try {
    loadingTeachers.value = true;
    const response = await classController.getClassByIdUsingGet({
      id: classId,
    });
    if (response.code === 0 && response.data) {
      currentClassTeachers.value = response.data.teachers || [];
    }
  } catch (error) {
    message.error("获取班级教师失败");
  } finally {
    loadingTeachers.value = false;
  }
};

const fetchAvailableTeachers = async () => {
  try {
    const response = await userController.getAllTeachersUsingGet();
    if (response.code === 0 && response.data) {
      availableTeachers.value = response.data.map((teacher: API.UserVO) => ({
        label: `${teacher.userName} (${teacher.userAccount})`,
        value: teacher.id!,
      }));
    }
  } catch (error) {
    message.error("获取可选教师列表失败");
  }
};

const handleTeacherSearch = (value: string) => {
  // 实现教师搜索逻辑
};

const handleRemoveTeacher = async (teacher: API.UserVO) => {
  try {
    const response = await classController.removeTeacherFromClassUsingPost({
      classId: currentClassId.value!,
      teacherId: teacher.id!,
    });
    if (response.code === 0) {
      message.success("移除教师成功");
      fetchClassTeachers(currentClassId.value!);
      await fetchClasses(); // 添加班级列表刷新
    }
  } catch (error) {
    message.error("移除教师失败");
  }
};

const handleTeacherModalOk = async () => {
  try {
    if (selectedTeacherIds.value.length > 0) {
      await Promise.all(
        selectedTeacherIds.value.map((teacherId) =>
          classController.addTeacherToClassUsingPost({
            classId: currentClassId.value!,
            teacherId,
          })
        )
      );
      message.success("添加教师成功");
      fetchClassTeachers(currentClassId.value!);
      await fetchClasses(); // 添加班级列表刷新
    }
    teacherModalVisible.value = false;
  } catch (error) {
    message.error("添加教师失败");
  }
};

const handleTeacherModalCancel = () => {
  teacherModalVisible.value = false;
  selectedTeacherIds.value = [];
};

onMounted(() => {
  fetchClasses();
});
</script>

<style scoped>
.class-management {
  padding: 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.student-management,
.teacher-management {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.student-header,
.teacher-header {
  margin-bottom: 16px;
}
</style>
