<template>
  <UCard class="mb-2">
    <div class="flex justify-between items-center">
      <!-- 统计信息 -->
      <div class="flex gap-2">
        <UBadge color="red" variant="subtle" class="text-xs">
          小计: ${{ totalAmount }} CAD
        </UBadge>
        <UBadge class="text-xs">
          HST: ${{ hst }} CAD
        </UBadge>
        <UBadge color="red" variant="subtle" class="text-xs">
          费用总计: ${{ grandTotal }} CAD
        </UBadge>
        <UBadge class="text-xs">
          数量: {{ count }}
        </UBadge>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-2">
        <button 
          @click="$emit('batch-add')"
          class="btn btn-primary"
        >
          批量发货
        </button>
        <slot name="actions"></slot>
        <UButton
          color="primary"
          size="sm"
          @click="$emit('add-package')"
        >
          添加包裹
        </UButton>
        <UButton
          color="green"
          size="sm"
          @click="$emit('submit')"
          :disabled="count === 0"
        >
          下单
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    required: true
  },
  basePrice: {
    type: Number,
    default: 0.01
  },
  hstRate: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['batch-add', 'add-package', 'submit'])

// 计算属性
const totalAmount = computed(() => {
  return (props.count * props.basePrice).toFixed(2)
})

const hst = computed(() => {
  return (parseFloat(totalAmount.value) * props.hstRate).toFixed(2)
})

const grandTotal = computed(() => {
  return (parseFloat(totalAmount.value) + parseFloat(hst.value)).toFixed(2)
})
</script> 