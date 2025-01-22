<template>
  <div class="space-y-2">
    <h3 class="font-medium text-gray-700">服务选择</h3>
    <div class="space-y-2">
      <!-- Fleet Basic -->
      <UCard
        class="cursor-pointer relative overflow-hidden"
        :class="{
          'ring-2 ring-cyan-500': modelValue.type === 'basic'
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
          'ring-2 ring-orange-500': modelValue.type === 'prime'
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
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

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
    ...serviceData[type]
  })
}
</script> 