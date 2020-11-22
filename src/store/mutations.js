import axios from "axios";
let dev_mode = process.env.NODE_ENV === 'development' ? 1 : 0
axios.defaults.baseURL = '/ui/vending'

export default {
  setCategories: (state) => {
    let url
    if(dev_mode){
      url = 'categories.json'
    } else {
      url = 'categories'
    }
    axios.get(url)
      .then(response => {
        let categories = response.data
        categories.map(function (item) {
          item.image = 'data:image/png;base64,' + item.image
        })
        state.categories = categories
      });
  },

  setCurrentCategory: (state, payload = null) => {
    if(payload) {
      state.currentCategory = payload
    } else if(typeof state.categories == 'object' && Object.keys(state.categories).length) {
      state.currentCategory = state.categories[0].id ?? null
    }
  },

  setProducts: (state) => {
    if(state.currentCategory) {
      let url
      if(dev_mode){
        url = `category${state.currentCategory}.json`
      } else {
        url = `categories/${state.currentCategory}`
      }
      axios.get(url)
        .then(response => {
          let category = response.data
          let products = category.products

          products.map(function (item) {
            item.image = 'data:image/png;base64,' + item.image
          })
          state.products = products
        });
    }
  },
  setProduct: (state, payload = null) => {
    if(state && payload) {
      let url
      if(dev_mode){
        url = `products${payload}.json`
      } else {
        url = `products/${payload}`
      }
      axios.get(url)
        .then(response => {
          let product = response.data
          product.image = 'data:image/png;base64,' + product.image
          state.product = product
        });
    }
  },

  setIncomeSum: (state, payload) => {
    if(state) {
      state.incomeSum = payload
    }
  }

}
