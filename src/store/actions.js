import axios from "@/axios/axios"

const dev_mode = process.env.NODE_ENV === 'development'

export default {
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
  }
}
