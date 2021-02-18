import axios from "@/axios/axios";

export default {
  setProduct: async ( { commit }, prodId) => {
    try {
      const {data} = await axios.get('products/' + prodId)
      commit('setProduct', data)
    } catch (e) {console.warn(e.message)}
  },
  checkCanDispense: async ({ commit }) => {
    try {
      const {data} = await axios.get('canDispense')
      commit('setCanDispense', data.canDispense ?? false)
    } catch (e) {console.warn(e.message)}
  }
}
