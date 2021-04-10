export default {
  categories: state => state.categories,
  product: state => state.product,
  products: state => state.products,
  currentCategory: state => state.currentCategory,
  canDispense: state => state.canDispense,
  incomeSum: state => state.incomeSum,
  isCheckPayStatus: state => state.isCheckPayStatus,
  cashBack: state => {
    const price = state.product.price ?? 0
    return price - state.incomeSum
  }
}
