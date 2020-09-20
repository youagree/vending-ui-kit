import Home from '../views/Home.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: () => import ('@/views/Order.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: Home
  }
]
