<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
      <!-- 步骤指示器 -->
      <div class="border-b pb-4 mb-6">
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center" v-if="step === 1">1</div>
            <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center" v-else>✓</div>
            <div class="ml-2 font-medium" :class="{ 'text-blue-500': step === 1 }">上传文件</div>
          </div>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center" v-if="step === 2">2</div>
            <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center" v-else-if="step > 2">✓</div>
            <div class="w-8 h-8 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center" v-else>2</div>
            <div class="ml-2 font-medium" :class="{ 'text-blue-500': step === 2 }">匹配列</div>
          </div>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center" v-if="step === 3">3</div>
            <div class="w-8 h-8 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center" v-else>3</div>
            <div class="ml-2 font-medium" :class="{ 'text-blue-500': step === 3 }">检查订单</div>
          </div>
        </div>
      </div>

      <!-- 步骤 1: 文件上传 -->
      <div v-if="step === 1">
        <h2 class="text-xl font-bold mb-4">Import Orders</h2>
        <p class="text-gray-600 mb-4">
          You can import orders from your Excel, CSV and tab-delimited file or add addresses manually. Having trouble? 
          <a href="#" class="text-blue-500">Learn how</a> to import orders or 
          <a href="#" class="text-blue-500" @click="downloadTemplate">download</a> our sample Excel file.
        </p>

        <!-- 拖拽上传区域 -->
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center"
          @drop.prevent="handleDrop"
          @dragover.prevent="dragover = true"
          @dragleave.prevent="dragover = false"
          :class="{ 'border-blue-500 bg-blue-50': dragover }"
        >
          <div class="flex flex-col items-center justify-center">
            <div class="mb-4">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p class="mb-2">Drag & drop or <button @click="triggerFileInput" class="text-blue-500">Browse</button></p>
            <p class="text-sm text-gray-500">Supported: CSV, Excel or Tab-delimited text files</p>
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              accept=".xlsx,.xls,.csv,.txt"
              @change="handleFileSelect"
            >
          </div>
        </div>

        <!-- 手动输入区域 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Paste addresses below, one per line:</label>
          <textarea
            v-model="manualAddresses"
            rows="4"
            class="w-full border rounded-md p-2"
            placeholder="2345 Broadway, New York, NY 10024, USA&#10;1386 Avenue of the Americas, New York, NY 10019, USA"
          ></textarea>
        </div>

        <!-- 底部设置 -->
        <div class="flex justify-between items-center">
          <div class="flex space-x-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Planning date</label>
              <input type="date" v-model="planningDate" class="mt-1 border rounded-md p-1">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Service duration per location</label>
              <select v-model="serviceDuration" class="mt-1 border rounded-md p-1">
                <option value="5">5 min</option>
                <option value="10">10 min</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
              </select>
            </div>
          </div>
          <div class="space-x-2">
            <button @click="$emit('close')" class="px-4 py-2 border rounded-md">Cancel</button>
            <button 
              @click="goToColumnMapping"
              class="px-4 py-2 bg-blue-500 text-white rounded-md"
              :disabled="!canProceed"
            >
              Import
            </button>
          </div>
        </div>
      </div>

      <!-- 步骤 2: 列映射 -->
      <div v-else-if="step === 2">
        <h2 class="text-xl font-bold mb-4">Review Mapped Columns</h2>
        <p class="text-gray-600 mb-4">Compare if columns from your file were correctly mapped to Fleetnow columns.</p>
        
        <div class="flex justify-end mb-4">
          <button class="text-sm text-blue-500 flex items-center">
            <svg class="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
            Advanced options
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th v-for="(column, index) in columns" :key="index" class="px-4 py-2">
                  <select 
                    v-model="columnMapping[index]" 
                    class="w-full border rounded-md p-1"
                  >
                    <option value="">Not Mapped</option>
                    <option v-for="field in availableFields" :key="field" :value="field">
                      {{ field }}
                    </option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(row, rowIndex) in previewData.slice(0, 5)" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-4 py-2 text-sm">
                  {{ cell }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-between items-center">
          <div class="flex items-center">
            <input type="checkbox" v-model="saveMapping" class="mr-2">
            <label class="text-sm text-gray-600">Save this mapping as my default mapping</label>
          </div>
          <div class="space-x-2">
            <button @click="step = 1" class="px-4 py-2 border rounded-md">Cancel</button>
            <button 
              @click="goToReview"
              class="px-4 py-2 bg-blue-500 text-white rounded-md"
              :disabled="!isValidMapping"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <!-- 步骤 3: 订单检查 -->
      <div v-else-if="step === 3">
        <h2 class="text-xl font-bold mb-4">Review Imported Orders</h2>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-yellow-700">
                Locations that were not found can't be used to plan. To schedule orders and plan routes with them, they need to be corrected. Double-click on the Order to edit Location.
              </p>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <div class="text-sm text-gray-500">Import orders summary: {{ errorCount }} errors found</div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th v-for="field in displayFields" :key="field" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ field }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(order, index) in processedOrders" :key="index" :class="{ 'bg-red-50': order.hasError }">
                <td v-for="field in displayFields" :key="field" class="px-4 py-2 text-sm">
                  <div class="flex items-center">
                    <svg v-if="order.hasError" class="h-4 w-4 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ order[field] }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-end space-x-2">
          <button @click="step = 2" class="px-4 py-2 border rounded-md">Cancel</button>
          <button 
            @click="finalizeImport"
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
            :disabled="errorCount > 0"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'

// 状态变量
const step = ref(1)
const dragover = ref(false)
const fileInput = ref(null)
const previewData = ref([])
const manualAddresses = ref('')
const planningDate = ref(new Date().toISOString().split('T')[0])
const serviceDuration = ref('5')
const columnMapping = ref({})
const saveMapping = ref(false)
const processedOrders = ref([])

// 可用字段列表
const availableFields = [
  'Order ID',
  'Email',
  'Phone',
  'Name',
  'Company',
  'Address',
  'Notes',
  'Service Type',
  'Time Window'
]

// 显示字段
const displayFields = [
  'Order ID',
  'Date',
  'Location Accuracy',
  'Address',
  'Geocoded Address',
  'Latitude',
  'Longitude',
  'Duration',
  'Time Windows',
  'Notes'
]

// 列信息
const columns = computed(() => {
  return previewData.value[0] || []
})

// 是否可以进行下一步
const canProceed = computed(() => {
  return previewData.value.length > 0 || manualAddresses.value.trim()
})

// 映射是否有效
const isValidMapping = computed(() => {
  const mappedFields = Object.values(columnMapping.value)
  return mappedFields.includes('Address') // 至少需要地址字段
})

// 错误数量
const errorCount = computed(() => {
  return processedOrders.value.filter(order => order.hasError).length
})

// 处理文件上传
const handleDrop = async (event) => {
  dragover.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    await processExcel(file)
  }
}

const handleFileSelect = async (event) => {
  const file = event.target.files[0]
  if (file) {
    await processExcel(file)
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const processExcel = async (file) => {
  try {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    previewData.value = jsonData
  } catch (error) {
    console.error('Error processing Excel file:', error)
    alert('处理 Excel 文件时出错，请确保文件格式正确')
  }
}

// 下载模板
const downloadTemplate = () => {
  // TODO: 实现模板下载
  console.log('Download template')
}

// 进入列映射步骤
const goToColumnMapping = () => {
  // 自动尝试映射列
  const headers = previewData.value[0] || []
  headers.forEach((header, index) => {
    const matchedField = availableFields.find(field => 
      field.toLowerCase() === header.toLowerCase()
    )
    if (matchedField) {
      columnMapping.value[index] = matchedField
    }
  })
  step.value = 2
}

// 进入检查步骤
const goToReview = async () => {
  // 处理数据并检查错误
  processedOrders.value = previewData.value.slice(1).map(row => {
    const order = {}
    Object.entries(columnMapping.value).forEach(([index, field]) => {
      order[field] = row[index]
    })
    
    // 模拟地理编码检查
    order.hasError = Math.random() < 0.2 // 20% 的概率有错误
    order.Date = planningDate.value
    order['Location Accuracy'] = order.hasError ? 'Not Found' : 'Found'
    order.Duration = serviceDuration.value + ' min'
    
    return order
  })
  
  step.value = 3
}

// 完成导入
const finalizeImport = () => {
  // TODO: 实现最终导入逻辑
  console.log('Finalizing import:', processedOrders.value)
  emit('close')
}

const emit = defineEmits(['close'])
</script> 