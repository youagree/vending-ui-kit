export default {
  setCategories: (state, data) => {
    let categories = data
    categories.map(function (item) {
      item.image = 'data:image/png;base64,' + item.image
    })
    state.categories = categories
  },
  setCurrentCategory: (state, payload = null) => {
    if(payload) {
      state.currentCategory = payload
    } else if(typeof state.categories == 'object' && Object.keys(state.categories).length) {
      state.currentCategory = state.categories[0].id ?? null
    }
  },
  setProducts: (state, data) => {
    let products = data
    products.map(function (item) {
      item.image = 'data:image/png;base64,' + item.image
    })
    state.products = products
  },
  setProduct: (state, product = null) => {
    if(state && product && typeof product === 'object') {
      product.image = 'data:image/png;base64,' + product.image
      state.product = product
    }
  },
  setIncomeSum: (state, payload) => {
    if(state) {
      state.incomeSum = payload
    }
  },
  setIsCheckPayStatus: (state, value) => {
    state.isCheckPayStatus = value
  },
  setCanDispense: (state, value) => {
    state.canDispense = value
  }

}
