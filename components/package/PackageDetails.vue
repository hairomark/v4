<template>
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
          v-model="modelValue.pickupDate"
          type="date"
          size="sm"
          placeholder="选择日期"
        />
        <USelect
          v-model="modelValue.pickupTime"
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
          v-model="modelValue.deliveryDate"
          type="date"
          size="sm"
          placeholder="选择日期"
        />
        <USelect
          v-model="modelValue.deliveryTime"
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
          v-model="modelValue.type"
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
          v-model="modelValue.size"
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
          <span class="mx-2 text-sm">{{ modelValue.quantity }}</span>
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
            <span class="text-sm mx-1">{{ modelValue.tip }}</span>
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
        v-model="modelValue.notes"
        :rows="2"
        size="sm"
        placeholder="请填写备注信息"
      />
    </UFormGroup>
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

const decreaseQuantity = () => {
  if (props.modelValue.quantity > 1) {
    emit('update:modelValue', {
      ...props.modelValue,
      quantity: props.modelValue.quantity - 1
    })
  }
}

const increaseQuantity = () => {
  emit('update:modelValue', {
    ...props.modelValue,
    quantity: (props.modelValue.quantity || 0) + 1
  })
}

const decreaseTip = () => {
  if (props.modelValue.tip > 0) {
    emit('update:modelValue', {
      ...props.modelValue,
      tip: props.modelValue.tip - 1
    })
  }
}

const increaseTip = () => {
  emit('update:modelValue', {
    ...props.modelValue,
    tip: (props.modelValue.tip || 0) + 1
  })
}
</script> 