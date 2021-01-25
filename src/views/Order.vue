<template>
  <div class="order">
    <div v-if="stepStates[4] === 0">
      <div class="order__header">
        <router-link class="order__back"
                     :class="{disable:disableHomeLink}"
                     to="/">
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
            <PaymentMethod
              @changePaymentMethod="changePaymentMethod"
              @setThirdStep="setThirdStep"
              :paramPaymentMethod="paymentMethod"/>
          </div>
        </div>
        <div class="order__box" v-bind:class="getBoxClass(2)">
          <OrderBoxHeader step="2" label="Оплата" />
          <div class="order__box-content" v-if="stepStates[2]">
            <Payment v-bind:paymentMethod="paymentMethod"
                     v-bind:sum="product.price"
                     @setFirstStep="setFirstStep"/>
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
    <div v-else class="end-step">
      <img src="/icon-success.png" alt="success order">
      <div v-if="paymentMethod === 1" class="cash-back">
        Ваша сдача: {{getCashBack()}} ₽
      </div>
      <h1>Спасибо за покупку. Заберите товар в нижнем окне</h1>
      <button @click="$router.push('/')" class="button button_accent">На главный экран</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from "axios";

  export default {
    name: 'Order',
    created() {
      this.dev_mode = process.env.NODE_ENV === 'development' ? 1 : 0
      const prodId = this.$route.params.id
      this.$store.commit('setProduct', prodId)
    },
    updated() {
      if(this.stepStates[4] ){
        this.returnOfCashback()
      }
    },
    data: function() {
      return {
        paymentMethod: 0,
        stepStates: {1:1,2:0,3:0,4:0},
        disableHomeLink: false
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
          this.stepStates[1] = 2
          this.stepStates[2] = 1
        } else {
          this.stepStates[1] = 1
          this.stepStates[2] = 0
        }
      },
      setFirstStep(){
        this.paymentMethod = 0
        this.stepStates = {1:1,2:0,3:0,4:0}
      },
      setThirdStep() {
        this.stepStates[2] = 2
        this.stepStates[3] = 1
      },
      eventEndOrder() {
        this.stepStates[4] = 2
      },
      getCashBack() {
        return this.incomeSum - this.product.price
      },
      returnOfCashback() {
        const cashback = this.getCashBack()
        if (cashback){
          let url, response
          try {
            if(this.dev_mode){
              url = `payment/dispense${cashback}.json`
              response = axios.get(url);
            } else {
              url = 'payment/dispense/' + cashback
              response = axios.post(url);
            }
          } catch (e) {console.warn(e.message)}
          response.then((r) => {console.log('Response for dispense',r.data)})
        }
      }
    },
    watch: {
      incomeSum: function(newVal) {
        if (newVal) {
          this.disableHomeLink = true
        }
      }
    },
    computed: {
      ...mapGetters(['product','incomeSum'])
    },
    beforeRouteLeave(to, from, next) {
      if(this.incomeSum && this.stepStates[4] === 0) {
        this.disableHomeLink = true
        next(false)
      } else {
        this.disableHomeLink = false
        next()
      }
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
  .end-step
    text-align: center
    padding: 100px 50px
    img
      display: block
      margin: 50px auto
    .cash-back
      background-color: #f5f5f5
      border: 1px solid $g-color-border
      border-radius: 5px
      bottom: -25px
      margin: auto
      padding: 12px 30px
      position: relative
      width: fit-content
    h1
      border-bottom: 1px solid $g-color-border
      border-top: 1px solid $g-color-border
      font-weight: 500
      margin-bottom: 100px
      padding: 50px 100px
    button
      font-size: 18px
      padding: 15px 30px
</style>
