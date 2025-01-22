<template>
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
          v-model="modelValue.company" 
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
          v-model="modelValue.email" 
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
        v-model="modelValue.name"
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
          v-model="modelValue.phone"
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
          v-model="modelValue.unit"
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
        v-model="modelValue.address"
        size="sm"
        :ui="{ 
          base: 'h-8',
          input: 'text-sm'
        }"
      />
    </UFormGroup>

    <div class="flex items-center gap-2">
      <UToggle
        v-model="modelValue.isDefault"
        :ui="{
          wrapper: 'flex items-center gap-2',
          button: {
            base: 'h-6 w-11',
            ring: 'ring-cyan-500',
            active: 'bg-cyan-500',
            inactive: 'bg-gray-200'
          }
        }"
      />
      <div class="flex items-center gap-1">
        <UIcon
          name="i-heroicons-map-pin"
          class="w-4 h-4"
          :class="modelValue.isDefault ? 'text-cyan-500' : 'text-gray-400'"
        />
        <span :class="modelValue.isDefault ? 'text-cyan-500 font-medium' : 'text-gray-400'">
          默认地址
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script> 