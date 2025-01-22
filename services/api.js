import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000'
})

export const orderAPI = {
  // 创建订单
  createOrder(orderData) {
    return api.post('/orders', orderData)
  },

  // 获取订单列表
  getOrders() {
    return api.get('/orders')
  },

  // 获取单个订单详情
  getOrder(id) {
    return api.get(`/orders/${id}`)
  }
}

export default api 