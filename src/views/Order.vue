<template>
  <div class="order">
    <div class="order__header">
      <router-link class="order__back" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.006 512.006">
          <path d="M388.419,475.59L168.834,256.005L388.418,36.421c8.341-8.341,8.341-21.824,0-30.165s-21.824-8.341-30.165,0    L123.586,240.923c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251    c5.461,0,10.923-2.091,15.083-6.251C396.76,497.414,396.76,483.931,388.419,475.59z"/>
        </svg>
        <span>На главный экран</span>
      </router-link>
      <OrderCard :product="product" class="order__card" />
    </div>
    <div class="order__main">
      <div class="order__box" v-bind:class="getBoxClass(1)">
        <OrderBoxHeader step="1" label="Выберите способ оплаты" />
        <div class="order__box-content"  v-if="stepStates[1]">
          <PaymentMethod @changePaymentMethod="changePaymentMethod" @setThirdStep="setThirdStep" />
        </div>
      </div>
      <div class="order__box" v-bind:class="getBoxClass(2)">
        <OrderBoxHeader step="2" label="Оплата" />
        <div class="order__box-content" v-if="stepStates[2]">
          <Payment v-bind:paymentMethod="paymentMethod" v-bind:sum="product.price" />
        </div>
      </div>
      <div class="order__box" v-bind:class="getBoxClass(3)">
        <OrderBoxHeader step="3" label="Получение товара" />
        <div class="order__box-content"  v-if="stepStates[3]">
          <ReceiptGood @eventEndOrder="eventEndOrder" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Order',
    created() {
      const prodId = this.$route.params.id
      this.$store.commit('setProduct', prodId)
    },
    data: function() {
      return {
        paymentMethod: 0,
        stepStates: {1:1,2:0,3:0}
      }
    },
    methods: {
      getBoxClass(step){
        switch (this.stepStates[step]) {
          case 1:
            return 'is-active'
          case 2:
            return 'is-done'
          default:
            return ''
        }
      },
      changePaymentMethod(methodId = 0){
        this.paymentMethod = methodId
        if(methodId) {
          this.stepStates = {1:2,2:1,3:0}
        } else {
          this.stepStates = {1:1,2:0,3:0}
        }
      },
      setThirdStep() {
        this.stepStates[2] = 2
        this.stepStates[3] = 1
      },
      eventEndOrder() {
        console.log('end order')
      }
    },
    computed: {
      ...mapGetters(['product'])
    }
  }
</script>

<style lang="sass">
  .order
    display: flex
    flex-direction: column
    height: 100%
    &__header
      background-color: $g-color-white
      padding: 24px
    &__main
      flex-grow: 1
      background-color: $g-color-grey
      padding: 24px
      .order__box:last-child
        .order__box-content::before
          content: none
    &__back
      display: flex
      align-items: center
      text-decoration: none
      margin-bottom: 24px
      svg
        width: 20px
        height: 20px
        margin-right: 8px
    &__box
      $box: &
      &.is-active
        #{$box}
          &-step
            background-color: $color-order-step-active
          &-content
            &::before
              border-left-color: $color-order-step-active
      &.is-done
        #{$box}
          &-step
            background-color: $color-order-step-done
          &-content
            &::before
              border-left-color: $color-order-step-done
      &-content
        position: relative
        // min-height: 100px
        padding: 0 16px 0 44px
        margin-left: 14px
        margin-bottom: 16px
        &::before
          content: ''
          position: absolute
          left: 0
          top: 0
          width: 2px
          height: 100%
          border-left: 2px dotted $color-order-step
</style>
