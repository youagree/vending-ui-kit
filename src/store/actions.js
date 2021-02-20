import axios from "@/axios/axios"

const dev_mode = process.env.NODE_ENV === 'development'

export default {
  setCategories: async ({ commit }) => {
    try {
      const {data} = await axios.get('categories')
      commit('setCategories', data)
    } catch (e) {console.error(e.message)}
  },
  setProducts: async ({ commit, getters }) => {
    try {
      const categoryId = getters["currentCategory"] ?? 0
      if(categoryId) {
        const {data} = await axios.get('categories/' + categoryId)
        commit('setProducts', data.products)
      }
    } catch (e) {console.error(e.message)}
  },
  setProduct: async ( { commit }, prodId) => {
    try {
      const {data} = await axios.get('products/' + prodId)
      commit('setProduct', data)
    } catch (e) {console.error(e.message)}
  },
  checkCanDispense: async ({ commit }) => {
    try {
      const url = (dev_mode ? '' : 'payment/dispense/') + 'canDispense'
      const {data} = await axios.get(url)
      commit('setCanDispense', data.canDispense ?? false)
    } catch (e) {console.error(e.message)}
  },
  returnOfCashback: async ({ getters }) => {
    if(getters['cashBack'] > 0) {
      try {
        const url = (dev_mode ? '' : 'payment/') + 'dispense/' + getters['cashBack']
        await axios.post(url)
      } catch (e) {console.error(e.message)}
    }
  },
  runPayment: async ( { getters }, payload) => {
    try { //Запуск процесса оплаты
      const id = getters['product'].id ?? 0
      await axios.post('payment/' + id, payload)
    } catch (e) {console.error(e.message)}
  },
  runPaymentCancel: async ( { getters }) => {
    try { //Запрос на отмену оплаты payment/paymentCancel
      const currentMoneyCount = getters['incomeSum']
      const url = (dev_mode ? '' : 'payment/') + 'paymentCancel'
      await axios.post(url, {currentMoneyCount})
    } catch (e) {console.error(e.message)}
  },
  runMotors: async ({ getters }, callback) => {
    try { //Запуск двигателей для выдачи товара motors/{id}
      const number = getters['product'].choiceNumber
      if(dev_mode){
        axios.get('motors/' + number).then(callback)
      } else {
        axios.post('motors/' + number).then(callback)
      }
    } catch (e) {console.error(e.message)}
  },
  runPayStatus: async ({ getters }, callback) => {
    try { //Запрос текущего количества внесенных средств payment/{id}/payStatus
      const product = getters['product']
      let url
      if(dev_mode) {
        url = 'payStatus/' + product.id + '?price=' + product.price
      } else {
        url = 'payment/' + product.id + '/payStatus?price=' + product.price
      }
      axios.get(url).then(callback)
    } catch (e) {console.error(e.message)}
  }
}
