import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: []
  }),

  actions: {
    async createOrder(order) {
      // 模拟API调用
      this.orders.push(order)
    },

    async submitOrders(orders) {
      // 模拟提交订单
      this.orders = []
    }
  }
}) 