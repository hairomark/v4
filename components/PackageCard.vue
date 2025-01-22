<template>
  <UCard
    :ui="{
      base: 'mb-1',
      body: {
        padding: 'p-0'
      }
    }"
  >
    <div class="p-1">
      <!-- 折叠状态显示概要信息 -->
      <div 
        v-if="!modelValue.isExpanded" 
        class="grid grid-cols-[2rem_1fr_auto] items-center cursor-pointer"
        @click="toggleExpand"
      >
        <!-- 序号 -->
        <div class="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
          {{ index + 1 }}
        </div>

        <!-- 中间信息区域：两行布局 -->
        <div class="flex flex-col px-1">
          <!-- 第一行：寄收件信息 -->
          <div class="flex items-center gap-0.5">
            <!-- 寄件信息 -->
            <div class="flex items-center gap-0.5">
              <UBadge color="cyan" class="uppercase px-0.5">寄</UBadge>
              <div>
                <div class="font-medium">{{ modelValue.sender.name || '未填写' }}</div>
                <div class="flex items-center gap-0.5 text-xs text-gray-500">
                  <div class="truncate max-w-[100px]">{{ modelValue.sender.address || '地址未填写' }}</div>
                  <span class="text-gray-300">|</span>
                  <div>{{ modelValue.sender.phone || '电话未填写' }}</div>
                </div>
              </div>
            </div>

            <div class="text-gray-300 mx-0.5">|</div>

            <!-- 收件信息 -->
            <div class="flex items-center gap-0.5">
              <UBadge color="red" class="uppercase px-0.5">收</UBadge>
              <div>
                <div class="font-medium">{{ modelValue.receiver.name || '未填写' }}</div>
                <div class="flex items-center gap-0.5 text-xs text-gray-500">
                  <div class="truncate max-w-[100px]">{{ modelValue.receiver.address || '地址未填写' }}</div>
                  <span class="text-gray-300">|</span>
                  <div>{{ modelValue.receiver.phone || '电话未填写' }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 第二行：时间和服务信息 -->
          <div class="flex items-center text-xs text-gray-500 mt-0.5">
            <div class="flex items-center gap-1">
              <span>发货: {{ formatDate(modelValue.details.pickupDate) }} {{ modelValue.details.pickupTime }}</span>
              <span class="text-gray-300">|</span>
              <span>收货: {{ formatDate(modelValue.details.deliveryDate) }} {{ modelValue.details.deliveryTime }}</span>
              <span class="text-gray-300">|</span>
              <span>{{ modelValue.details.type }} × {{ modelValue.details.quantity || 0 }}</span>
              <span class="text-gray-300">|</span>
              <span class="text-cyan-500">{{ modelValue.service.name || '未选择服务' }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧状态 -->
        <div class="pl-1">
          <UBadge 
            :color="modelValue.isCompleted ? 'green' : 'yellow'"
            class="text-xs px-0.5"
          >
            {{ modelValue.isCompleted ? '已完成' : '填写中' }}
          </UBadge>
        </div>
      </div>

      <!-- 展开状态显示表单 -->
      <div v-else class="space-y-2">
        <div class="grid grid-cols-2 gap-2">
          <!-- 左侧：地址信息 -->
          <div class="space-y-3">
            <SenderInfo
              v-model="modelValue.sender"
            />
            <ReceiverInfo
              v-model="modelValue.receiver"
            />
          </div>

          <!-- 右侧：详细信息和服务选择 -->
          <div class="space-y-3">
            <PackageDetails
              v-model="modelValue.details"
            />
            <ServiceSelection
              v-model="modelValue.service"
            />
          </div>
        </div>

        <!-- 底部按钮和导航 -->
        <div class="mt-2">
          <div class="flex justify-end">
            <UButton
              color="primary"
              size="sm"
              @click.stop="handleStepAction"
            >
              完成
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
import { computed } from 'vue'
import { useOrderStore } from '~/stores/order'
import SenderInfo from './package/SenderInfo.vue'
import ReceiverInfo from './package/ReceiverInfo.vue'
import PackageDetails from './package/PackageDetails.vue'
import ServiceSelection from './package/ServiceSelection.vue'

const store = useOrderStore()
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

// 简化 handleStepAction 方法
const handleStepAction = async () => {
  const pkg = props.modelValue
  
  // 一次性验证所有必填信息
  if (!validateAddressForm(pkg)) {
    alert('请填写完整的发件人和收件人信息')
    return
  }
  if (!validateDetailsForm(pkg)) {
    alert('请填写完整的包裹详情')
    return
  }
  if (!validateServiceForm(pkg)) {
    alert('请选择服务类型')
    return
  }

  try {
    await store.createOrder(pkg)
    emit('update:modelValue', {
      ...pkg,
      isCompleted: true,
      isExpanded: false
    })
  } catch (error) {
    alert('保存失败，请重试')
  }
}

// 验证函数
const validateAddressForm = (pkg) => {
  const { sender, receiver } = pkg
  return (
    sender.name && 
    sender.email && 
    sender.phone && 
    sender.address &&
    receiver.name && 
    receiver.email && 
    receiver.phone && 
    receiver.address
  )
}

const validateDetailsForm = (pkg) => {
  const { details } = pkg
  return details.pickupDate && 
         details.pickupTime && 
         details.deliveryDate && 
         details.deliveryTime && 
         details.type && 
         details.size && 
         details.quantity > 0
}

const validateServiceForm = (pkg) => {
  return pkg.service.type
}

// 其他辅助方法
const formatDate = (dateStr) => {
  if (!dateStr) return '未设置';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

const toggleExpand = () => {
  emit('update:modelValue', {
    ...props.modelValue,
    isExpanded: !props.modelValue.isExpanded
  })
}
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
