<template>
  <div class="dashboard-page">
    <a-row :gutter="24">
      <a-col :span="8">
        <a-card>
          <template #title>
            <team-outlined />
            <span>用户统计</span>
          </template>
          <a-statistic
            title="总用户数"
            :value="1234"
            style="margin-right: 50px"
          >
            <template #suffix>
              <user-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <template #title>
            <read-outlined />
            <span>班级统计</span>
          </template>
          <a-statistic title="总班级数" :value="56">
            <template #suffix>
              <team-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <template #title>
            <solution-outlined />
            <span>系统状态</span>
          </template>
          <a-statistic title="系统运行时间" value="99.9%">
            <template #suffix>%</template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 24px">
      <a-col :span="12">
        <a-card title="最近活动">
          <a-timeline>
            <a-timeline-item>新用户注册 - 张三</a-timeline-item>
            <a-timeline-item>新班级创建 - 高三一班</a-timeline-item>
            <a-timeline-item>系统更新 - v1.0.1</a-timeline-item>
            <a-timeline-item>数据备份完成</a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="快速操作">
          <a-space direction="vertical" style="width: 100%">
            <a-button type="primary" block @click="$router.push('/admin/user')">
              <user-add-outlined />
              添加用户
            </a-button>
            <a-button
              type="primary"
              block
              @click="$router.push('/admin/class')"
            >
              <plus-outlined />
              创建班级
            </a-button>
            <a-button block>
              <download-outlined />
              导出数据
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  TeamOutlined,
  UserOutlined,
  ReadOutlined,
  SolutionOutlined,
  UserAddOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";

.dashboard-page {
  :deep(.ant-card) {
    height: 100%;

    .ant-card-head-title {
      display: flex;
      align-items: center;
      gap: @spacing-small;

      .anticon {
        color: @primary-color;
        font-size: 20px;
      }
    }
  }

  .ant-timeline {
    padding: @spacing-medium 0;
  }

  .ant-space {
    padding: @spacing-medium 0;
  }
}
</style>
