import axios from "@/axios/axios";

export default {
  setProduct: async ( { commit }, prodId) => {
    try {
      const {data} = await axios.get('products/' + prodId)
      commit('setProduct', data)
    } catch (e) {console.warn(e.message)}
  }
}
