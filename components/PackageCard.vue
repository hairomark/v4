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
        <!-- 合并地址和详细信息 -->
        <div class="grid grid-cols-2 gap-2">
          <!-- 左侧：地址信息 -->
          <div class="space-y-3">
            <!-- 寄件人信息 -->
            <div class="space-y-2">
              <h3 class="font-medium text-cyan-500">寄件人</h3>
              <div class="grid grid-cols-2 gap-2">
                <UFormGroup>
                  <template #label>
                    <div class="flex justify-between items-center">
                      <span>公司名称</span>
                      <div class="text-xs text-gray-400">0/50</div>
                    </div>
                  </template>
                  <UInput 
                    v-model="modelValue.sender.company" 
                    size="sm"
                    :ui="{ 
                      base: 'h-8',
                      input: 'text-sm'
                    }"
                  />
                </UFormGroup>

                <UFormGroup>
                  <template #label>
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-1">
                        <span class="text-red-500">*</span>
                        <span>Email</span>
                      </div>
                      <div class="text-xs text-gray-400">0/100</div>
                    </div>
                  </template>
                  <UInput 
                    v-model="modelValue.sender.email" 
                    type="email"
                    size="sm"
                    :ui="{ 
                      base: 'h-8',
                      input: 'text-sm'
                    }"
                  />
                </UFormGroup>
              </div>

              <UFormGroup>
                <template #label>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-1">
                      <span class="text-red-500">*</span>
                      <span>联系人姓名</span>
                    </div>
                    <div class="text-xs text-gray-400">0/50</div>
                  </div>
                </template>
                <UInput 
                  v-model="modelValue.sender.name"
                  size="sm"
                  :ui="{ 
                    base: 'h-8',
                    input: 'text-sm'
                  }"
                />
              </UFormGroup>

              <div class="grid grid-cols-2 gap-2">
                <UFormGroup>
                  <template #label>
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-1">
                        <span class="text-red-500">*</span>
                        <span>电话号码</span>
                      </div>
                      <div class="text-xs text-gray-400">0/17</div>
                    </div>
                  </template>
                  <UInput 
                    v-model="modelValue.sender.phone"
                    type="tel"
                    size="sm"
                    :ui="{ 
                      base: 'h-8',
                      input: 'text-sm'
                    }"
                  />
                </UFormGroup>

                <UFormGroup>
                  <template #label>
                    <div class="flex justify-between items-center">
                      <span>单元号</span>
                      <div class="text-xs text-gray-400">0/10</div>
                    </div>
                  </template>
                  <UInput 
                    v-model="modelValue.sender.unit"
                    size="sm"
                    :ui="{ 
                      base: 'h-8',
                      input: 'text-sm'
                    }"
                  />
                </UFormGroup>
              </div>

              <UFormGroup>
                <template #label>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-1">
                      <span class="text-red-500">*</span>
                      <span>地址</span>
                    </div>
                  </div>
                </template>
                <UInput 
                  v-model="modelValue.sender.address"
                  size="sm"
                  :ui="{ 
                    base: 'h-8',
                    input: 'text-sm'
                  }"
                />
              </UFormGroup>

              <div class="flex items-center gap-1">
                <UToggle
                  v-model="modelValue.sender.isDefault"
                  :ui="{
                    wrapper: 'flex items-center gap-1',
                    button: {
                      base: 'bg-gray-100',
                      active: 'bg-cyan-500'
                    }
                  }"
                >
                  <template #default="{ checked }">
                    <div class="flex items-center gap-1">
                      <UIcon
                        name="i-heroicons-map-pin"
                        class="w-4 h-4"
                        :class="checked ? 'text-white' : 'text-gray-500'"
                      />
                      <span :class="checked ? 'text-cyan-500 font-medium' : 'text-gray-500'">
                        默认地址
                      </span>
                    </div>
                  </template>
                </UToggle>
              </div>
            </div>

            <!-- 收件人信息 -->
            <div class="space-y-2">
              <h3 class="font-medium text-red-500">收件人</h3>
              <div class="grid grid-cols-2 gap-2">
                <UFormGroup>
                  <template #label>
                    <div class="flex justify-between items-center">
                      <span>公司名称</span>
                      <div class="text-xs text-gray-400">0/50</div>
                    </div>
                  </template>
                  <UInput 
                    v-model="modelValue.receiver.company" 
                    size="sm"
                    :ui="{ 
                      base: 'h-8',
                      input: 'text-sm'
                    }"
                  />
                </UFormGroup>

                <UFormGroup>
                  <template #label>
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-1">
                        <span class="text-red-500">*</span>
                        <span>Email</span>
                      </div>
                      <div class="text-xs text-gray-400">0/100</div>
                    </div>
                  </template>
                  <UInput 
                    v-model="modelValue.receiver.email" 
                    type="email"
                    size="sm"
                    :ui="{ 
                      base: 'h-8',
                      input: 'text-sm'
                    }"
                  />
                </UFormGroup>
              </div>

              <UFormGroup>
                <template #label>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-1">
                      <span class="text-red-500">*</span>
                      <span>联系人姓名</span>
                    </div>
                    <div class="text-xs text-gray-400">0/50</div>
                  </div>
                </template>
                <UInput 
                  v-model="modelValue.receiver.name"
                  size="sm"
                  :ui="{ 
                    base: 'h-8',
                    input: 'text-sm'
                  }"
                />
              </UFormGroup>

              <div class="grid grid-cols-2 gap-2">
                <UFormGroup>
                  <template #label>
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-1">
                        <span class="text-red-500">*</span>
                        <span>电话号码</span>
                      </div>
                      <div class="text-xs text-gray-400">0/17</div>
                    </div>
                  </template>
                  <UInput 
                    v-model="modelValue.receiver.phone"
                    type="tel"
                    size="sm"
                    :ui="{ 
                      base: 'h-8',
                      input: 'text-sm'
                    }"
                  />
                </UFormGroup>

                <UFormGroup>
                  <template #label>
                    <div class="flex justify-between items-center">
                      <span>单元号</span>
                      <div class="text-xs text-gray-400">0/10</div>
                    </div>
                  </template>
                  <UInput 
                    v-model="modelValue.receiver.unit"
                    size="sm"
                    :ui="{ 
                      base: 'h-8',
                      input: 'text-sm'
                    }"
                  />
                </UFormGroup>
              </div>

              <UFormGroup>
                <template #label>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-1">
                      <span class="text-red-500">*</span>
                      <span>地址</span>
                    </div>
                  </div>
                </template>
                <UInput 
                  v-model="modelValue.receiver.address"
                  size="sm"
                  :ui="{ 
                    base: 'h-8',
                    input: 'text-sm'
                  }"
                />
              </UFormGroup>

              <div class="flex items-center gap-1">
                <UToggle
                  v-model="modelValue.receiver.isDefault"
                  :ui="{
                    wrapper: 'flex items-center gap-1',
                    button: {
                      base: 'bg-gray-100',
                      active: 'bg-cyan-500'
                    }
                  }"
                >
                  <template #default="{ checked }">
                    <div class="flex items-center gap-1">
                      <UIcon
                        name="i-heroicons-map-pin"
                        class="w-4 h-4"
                        :class="checked ? 'text-white' : 'text-gray-500'"
                      />
                      <span :class="checked ? 'text-cyan-500 font-medium' : 'text-gray-500'">
                        默认地址
                      </span>
                    </div>
                  </template>
                </UToggle>
              </div>
            </div>
          </div>

          <!-- 右侧：详细信息和服务选择 -->
          <div class="space-y-3">
            <!-- 包裹详情 -->
            <div class="space-y-2">
              <h3 class="font-medium text-gray-700">包裹详情</h3>
              <!-- 发货和收货日期 -->
              <div class="grid grid-cols-2 gap-1">
                <div class="space-y-1">
                  <div class="flex items-center gap-1 text-xs">
                    <span class="text-red-500">*</span>
                    <span>发货日期</span>
                  </div>
                  <UInput
                    v-model="modelValue.details.pickupDate"
                    type="date"
                    size="sm"
                    placeholder="选择日期"
                  />
                  <USelect
                    v-model="modelValue.details.pickupTime"
                    :options="[{ label: '13:30 ~ 16:00', value: '13:30 ~ 16:00' }]"
                    size="sm"
                  />
                </div>

                <div class="space-y-1">
                  <div class="flex items-center gap-1 text-xs">
                    <span class="text-red-500">*</span>
                    <span>收货日期</span>
                  </div>
                  <UInput
                    v-model="modelValue.details.deliveryDate"
                    type="date"
                    size="sm"
                    placeholder="选择日期"
                  />
                  <USelect
                    v-model="modelValue.details.deliveryTime"
                    :options="[{ label: '13:30 ~ 17:00', value: '13:30 ~ 17:00' }]"
                    size="sm"
                  />
                </div>
              </div>

              <!-- 类型和尺寸 -->
              <div class="grid grid-cols-2 gap-1">
                <UFormGroup label-class="text-xs">
                  <template #label>
                    <div class="flex items-center gap-1">
                      <span class="text-red-500">*</span>
                      <span>类型</span>
                    </div>
                  </template>
                  <USelect
                    v-model="modelValue.details.type"
                    :options="[{ label: '鲜花', value: '鲜花' }]"
                    size="sm"
                  />
                </UFormGroup>

                <UFormGroup label-class="text-xs">
                  <template #label>
                    <div class="flex items-center gap-1">
                      <span class="text-red-500">*</span>
                      <span>尺寸</span>
                    </div>
                  </template>
                  <USelect
                    v-model="modelValue.details.size"
                    :options="[{ label: '标准', value: 'standard' }]"
                    size="sm"
                  />
                </UFormGroup>
              </div>

              <!-- 数量和小费 -->
              <div class="grid grid-cols-2 gap-1">
                <div class="space-y-1">
                  <div class="flex items-center gap-1 text-xs">
                    <span class="text-red-500">*</span>
                    <span>数量</span>
                  </div>
                  <div class="flex items-center">
                    <UButton
                      icon="i-heroicons-minus"
                      color="gray"
                      variant="soft"
                      size="xs"
                      @click="decreaseQuantity"
                    />
                    <span class="mx-2 text-sm">{{ modelValue.details.quantity }}</span>
                    <UButton
                      icon="i-heroicons-plus"
                      color="gray"
                      variant="soft"
                      size="xs"
                      @click="increaseQuantity"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <div class="flex items-center gap-1 text-xs">
                    <span>小费</span>
                  </div>
                  <div class="flex items-center">
                    <UButton
                      icon="i-heroicons-minus"
                      color="gray"
                      variant="soft"
                      size="xs"
                      @click="decreaseTip"
                    />
                    <div class="flex items-center mx-2">
                      <span class="text-xs text-gray-500">$</span>
                      <span class="text-sm mx-1">{{ modelValue.details.tip }}</span>
                      <span class="text-xs text-gray-500">CAD</span>
                    </div>
                    <UButton
                      icon="i-heroicons-plus"
                      color="gray"
                      variant="soft"
                      size="xs"
                      @click="increaseTip"
                    />
                  </div>
                </div>
              </div>

              <!-- 备注 -->
              <UFormGroup label-class="text-xs">
                <template #label>
                  <div class="flex justify-between items-center">
                    <span>备注</span>
                    <div class="text-[10px] text-gray-400">0/200</div>
                  </div>
                </template>
                <UTextarea
                  v-model="modelValue.details.notes"
                  rows="2"
                  size="sm"
                  placeholder="请填写备注信息"
                />
              </UFormGroup>
            </div>

            <!-- 服务选择 -->
            <div class="space-y-2">
              <h3 class="font-medium text-gray-700">服务选择</h3>
              <div class="space-y-2">
                <!-- Fleet Basic -->
                <UCard
                  class="cursor-pointer relative overflow-hidden"
                  :class="{
                    'ring-2 ring-cyan-500': modelValue.service.type === 'basic'
                  }"
                  @click="selectService('basic')"
                >
                  <div class="flex items-center">
                    <!-- 左侧标题和价格 -->
                    <div class="bg-cyan-500 text-white p-2 flex flex-col items-center justify-center w-24">
                      <div class="font-medium">Fleet Basic</div>
                      <div>
                        <span class="text-lg font-bold">$12</span>
                        <span class="text-sm">.99</span>
                      </div>
                    </div>
                    <!-- 右侧服务内容 -->
                    <div class="flex-1 p-2 space-y-1">
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-check" class="w-4 h-4 text-cyan-500" />
                        <span class="text-sm">基础服务</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-check" class="w-4 h-4 text-cyan-500" />
                        <span class="text-sm">保险</span>
                      </div>
                    </div>
                  </div>
                </UCard>

                <!-- Fleet Prime -->
                <UCard
                  class="cursor-pointer relative overflow-hidden"
                  :class="{
                    'ring-2 ring-orange-500': modelValue.service.type === 'prime'
                  }"
                  @click="selectService('prime')"
                >
                  <div class="flex items-center">
                    <!-- 左侧标题和价格 -->
                    <div class="bg-orange-500 text-white p-2 flex flex-col items-center justify-center w-24">
                      <div class="font-medium">Fleet Prime</div>
                      <div>
                        <span class="text-lg font-bold">$15</span>
                        <span class="text-sm">.99</span>
                      </div>
                    </div>
                    <!-- 右侧服务内容 -->
                    <div class="flex-1 p-2 space-y-1">
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-check" class="w-4 h-4 text-orange-500" />
                        <span class="text-sm">基础服务</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-check" class="w-4 h-4 text-orange-500" />
                        <span class="text-sm">优级服务</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-check" class="w-4 h-4 text-orange-500" />
                        <span class="text-sm">无忧服务</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-check" class="w-4 h-4 text-orange-500" />
                        <span class="text-sm">保险</span>
                      </div>
                    </div>
                  </div>
                </UCard>

                <!-- 价格说明 -->
                <div class="text-xs text-gray-500">
                  * 所示价格仅适用于大多伦多地区（GTA）的服务。周边地区会略有价格调整。
                </div>
              </div>
            </div>
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

// 添加服务相关的数据
const serviceOptions = [
  {
    id: 'standard',
    name: '标准服务',
    description: '常规配送服务',
    price: 9.99
  },
  {
    id: 'express',
    name: '快速服务',
    description: '2小时内送达',
    price: 19.99
  },
  {
    id: 'premium',
    name: '优质服务',
    description: '专人配送+保价',
    price: 29.99
  }
]

const timeSlotOptions = [
  { label: '上午 (9:00-12:00)', value: 'morning' },
  { label: '下午 (13:00-17:00)', value: 'afternoon' },
  { label: '晚上 (18:00-21:00)', value: 'evening' }
]

const durationOptions = [
  { label: '1小时', value: 1 },
  { label: '2小时', value: 2 },
  { label: '3小时', value: 3 }
]

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

// 添加数量和小费的处理方法
const decreaseQuantity = () => {
  if (props.modelValue.details.quantity > 1) {
    emit('update:modelValue', {
      ...props.modelValue,
      details: {
        ...props.modelValue.details,
        quantity: props.modelValue.details.quantity - 1
      }
    })
  }
}

const increaseQuantity = () => {
  emit('update:modelValue', {
    ...props.modelValue,
    details: {
      ...props.modelValue.details,
      quantity: props.modelValue.details.quantity + 1
    }
  })
}

const decreaseTip = () => {
  if (props.modelValue.details.tip > 0) {
    emit('update:modelValue', {
      ...props.modelValue,
      details: {
        ...props.modelValue.details,
        tip: props.modelValue.details.tip - 1
      }
    })
  }
}

const increaseTip = () => {
  emit('update:modelValue', {
    ...props.modelValue,
    details: {
      ...props.modelValue.details,
      tip: (props.modelValue.details.tip || 0) + 1
    }
  })
}

const selectService = (type) => {
  const serviceData = {
    basic: {
      type: 'basic',
      name: 'Fleet Basic',
      price: 12.99
    },
    prime: {
      type: 'prime',
      name: 'Fleet Prime',
      price: 15.99
    }
  }

  emit('update:modelValue', {
    ...props.modelValue,
    service: {
      ...props.modelValue.service,
      ...serviceData[type]
    }
  })
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