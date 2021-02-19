import axios from "@/axios/axios";

export default {
  setProduct: async ( { commit }, prodId) => {
    try {
      const {data} = await axios.get('products/' + prodId)
      commit('setProduct', data)
    } catch (e) {console.error(e.message)}
  },
  checkCanDispense: async ({ commit }) => {
    try {
      const {data} = await axios.get('canDispense')
      commit('setCanDispense', data.canDispense ?? false)
    } catch (e) {console.error(e.message)}
  },
  returnOfCashback: async ({ getters }) => {
    if(getters['cashBack'] > 0) {
      try {
        await axios.post('dispense/' + getters['cashBack'])
      } catch (e) {console.error(e.message)}
    }
  },
  runPayment: async ( { getters }, payload) => {
    try { //Запуск процесса оплаты
      const id = getters['product'].id ?? 0
      await axios.post('payment/' + id, payload)
    } catch (e) {console.error(e.message)}
  }
}
