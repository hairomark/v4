export const state = () => ({
  orders: [],
  currentOrder: null
})

export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  SET_CURRENT_ORDER(state, order) {
    state.currentOrder = order
  },
  ADD_ORDER(state, order) {
    state.orders.push(order)
  }
}

export const actions = {
  async fetchOrders({ commit }) {
    try {
      const { data } = await this.$axios.get('/orders')
      commit('SET_ORDERS', data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  },

  async createOrder({ commit }, orderData) {
    try {
      const { data } = await this.$axios.post('/orders', orderData)
      commit('ADD_ORDER', data)
      return data
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }
} 