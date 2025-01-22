<template>
  <div class="container mx-auto p-4">
    <!-- 顶部导航和语言切换 -->
    <div class="mb-4 flex justify-between items-center">
      <div class="flex items-center gap-4">
        <NuxtLink to="/user" class="text-blue-500 hover:text-blue-700">About</NuxtLink>
        <NuxtLink to="/order" class="text-blue-500 hover:text-blue-700">Orders</NuxtLink>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <button 
            @click="setLocale('en')"
            class="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >EN</button>
          <button 
            @click="setLocale('fr')"
            class="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >FR</button>
        </div>
        
        <button 
          @click="ulogin" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          v-if="!isLoggedIn"
        >
          {{ $t('login') }}
        </button>
        <button 
          @click="checkLoginState" 
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          v-else
        >
          {{ $t('check_status') }}
        </button>
      </div>
    </div>

    <!-- 包裹管理部分 -->
    <div v-if="isLoggedIn">
      <!-- 顶部统计信息 -->
      <OrderSummary
        :count="packages.length"
        :base-price="basePrice"
        :hst-rate="0"
        @batch-add="showBatchHandler = true"
        @add-package="addToCart"
        @submit="submitOrder"
      />

      <!-- 包裹列表 -->
      <div class="space-y-2">
        <PackageCard
          v-for="(pkg, index) in packages"
          :key="index"
          v-model="packages[index]"
          :index="index"
        />
      </div>

      <!-- 批量处理弹窗 -->
      <BatchHandler
        v-if="showBatchHandler"
        @close="showBatchHandler = false"
        @submit="handleBatchSubmit"
      />
    </div>
    
    <!-- 未登录提示 -->
    <div v-else class="text-center py-8">
      <p class="text-gray-500">{{ $t('please_login') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '~/stores/order'
import PackageCard from '~/components/PackageCard.vue'
import OrderSummary from '~/components/OrderSummary.vue'
import { userAPI } from '~/services/api/modules/users'
import BatchHandler from '~/components/BatchHandler.vue'

const { setLocale } = useI18n()
const orderStore = useOrderStore()
const packages = ref([])
const basePrice = 0.01 // CAD
const isLoggedIn = ref(false)
const showBatchHandler = ref(false)

// 登录相关方法
function checkLoginState() {
  userAPI.checkLoginState().then(res => {
    console.log(res)
    isLoggedIn.value = true // 根据实际返回值设置
  })
}

function ulogin() {
  let params = {
    "loginName": "chenqu",
    "password": "19343990"
  }
  userAPI.login(params).then(res => {
    console.log(res)
    isLoggedIn.value = true // 根据实际返回值设置
  })
}

// 包裹相关方法
const createNewPackage = () => {
  return {
    isCompleted: false,
    isExpanded: true,
    sender: {
      company: '',
      name: '',
      email: '',
      address: '',
      phone: '',
      unit: '',
      doorNumber: '',
      isDefault: false
    },
    receiver: {
      company: '',
      name: '',
      email: '',
      address: '',
      phone: '',
      unit: '',
      doorNumber: ''
    },
    details: {
      pickupDate: '',
      pickupTime: '13:30 ~ 16:00',
      deliveryDate: '',
      deliveryTime: '13:30 ~ 17:00',
      type: '鲜花',
      size: 'standard',
      quantity: 1,
      tip: 0,
      notes: ''
    },
    service: {
      type: '',
      name: '',
      price: 0
    }
  }
}

const addPackage = () => {
  packages.value.push(createNewPackage())
}

// 计算总金额
const totalAmount = computed(() => {
  return (packages.value.length * basePrice).toFixed(2)
})

const hst = computed(() => {
  return (parseFloat(totalAmount.value) * 0).toFixed(2)
})

const grandTotal = computed(() => {
  return (parseFloat(totalAmount.value) + parseFloat(hst.value)).toFixed(2)
})

// 添加获取按钮文本的函数
const getButtonText = (step) => {
  switch (step) {
    case 1:
      return '下一步'
    case 2:
      return '下一步'
    case 3:
      return '完成'
    default:
      return '下一步'
  }
}

// 修改处理步骤动作的函数
const handleStepAction = async (index) => {
  const pkg = packages.value[index]
  
  // 根据当前步骤进行相应的验证和操作
  if (pkg.step === 1) {
    // 验证地址表单
    if (!validateAddressForm(pkg)) {
      alert('请填写完整的发件人和收件人信息')
      return
    }
    // 进入详细信息 tab
    pkg.step = 2
  } else if (pkg.step === 2) {
    // 验证详细信息表单
    if (!validateDetailsForm(pkg)) {
      alert('请填写完整的包裹详情')
      return
    }
    // 进入服务 tab
    pkg.step = 3
  } else if (pkg.step === 3) {
    // 验证服务信息
    if (!validateServiceForm(pkg)) {
      alert('请选择服务类型')
      return
    }
    // 完成订单
    try {
      await orderStore.createOrder(pkg)
      pkg.isCompleted = true
      pkg.isExpanded = false
    } catch (error) {
      alert('保存失败，请重试')
    }
  }
}

// 拆分验证函数
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
  return pkg.service.type // 添加服务验证逻辑
}

// 提交订单
const submitOrder = async () => {
  if (packages.value.some(pkg => !pkg.isCompleted)) {
    alert('请完成所有包裹的信息填写')
    return
  }
  try {
    await orderStore.submitOrders(packages.value)
    packages.value = []
    addPackage()
  } catch (error) {
    alert('提交订单失败，请重试')
  }
}

// 替换 toggleAccordion 为 togglePackage
const togglePackage = (index) => {
  packages.value[index].isExpanded = !packages.value[index].isExpanded
}

// 添加日期格式化函数
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '';
  const date = new Date(dateTimeStr);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// 添加地址簿功能
const openAddressBook = async (type) => {
  try {
    // TODO: 调用地址簿 API
    const addresses = await fetchAddresses(type)
    // TODO: 显示地址簿选择弹窗
  } catch (error) {
    console.error('获取地址簿失败:', error)
  }
}

// 监听默认地址变化
watch(
  () => packages.value.map(pkg => pkg.sender.isDefault),
  (newValues, oldValues) => {
    // 当一个地址被设为默认时，取消其他地址的默认状态
    const defaultIndex = newValues.findIndex(value => value)
    if (defaultIndex !== -1) {
      packages.value.forEach((pkg, index) => {
        if (index !== defaultIndex) {
          pkg.sender.isDefault = false
        }
      })
    }
  },
  { deep: true }
)

// 添加数量和小费的处理函数
const decreaseQuantity = (pkg) => {
  if (pkg.details.quantity > 1) {
    pkg.details.quantity--
  }
}

const increaseQuantity = (pkg) => {
  pkg.details.quantity++
}

const decreaseTip = (pkg) => {
  if (pkg.details.tip > 0) {
    pkg.details.tip--
  }
}

const increaseTip = (pkg) => {
  pkg.details.tip = (pkg.details.tip || 0) + 1
}

// 添加到购物车
const addToCart = () => {
  addPackage()
}

// 初始化添加一个包裹
if (packages.value.length === 0) {
  addPackage()
}

const handleBatchSubmit = (data) => {
  console.log('Batch data:', data)
  // TODO: 处理批量数据
  showBatchHandler.value = false
}
</script>

<style>
.btn {
  @apply px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500;
}

.btn-gray {
  @apply bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500;
}

.btn-success {
  @apply bg-green-500 text-white hover:bg-green-600 focus:ring-green-500;
}

.btn-outline {
  @apply border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500;
}

.form-group {
  @apply space-y-1;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

.form-input {
  @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm;
}

.form-select {
  @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm;
}

.form-textarea {
  @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm;
}
</style> 