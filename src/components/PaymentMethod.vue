<template>
  <div>
    <div class="payment-method">
      <div class="payment-method__col">
        <button class="button button_payment payment-method__button"
                v-bind:class="{ active: this.methodId === 1 }"
                v-on:click="setPaymentMethod(1)">
          Купюрами и монетами
        </button>
        <ul class="payment-method__coins">
          <li><p>Принимаются купюры номиналом в 10 &#8381;, 50 &#8381;, 100 &#8381;, 200 &#8381;.</p></li>
          <li><p>Принимаются монеты номиналом в 1 &#8381;, 2 &#8381;, 5 &#8381;, 10 &#8381;.</p></li>
        </ul>
      </div>
      <div class="payment-method__col">
        <button class="button button_payment payment-method__button"
                v-bind:class="{ active: this.methodId === 2 }"
                v-on:click="setPaymentMethod(2)">
          Бесконтактно
        </button>
        <p class="payment-method__card">Оплата с помощью карты или смартфона с функцией NFC</p>
        <div class="payment-method__pays">
          <p>Поддерживаемые платежные системы</p>
          <div class="payment-method__pay">
            <ul>
              <li><img src="/payment-logo/mir.png" alt="mir"></li>
              <li><img src="/payment-logo/visa.png" alt="visa"></li>
              <li><img src="/payment-logo/mastercard.png" alt="mastercard"></li>
              <li><img src="/payment-logo/g-pay.png" alt="google pay"></li>
              <li><img src="/payment-logo/apple_pay_logo.png" alt="apple pay"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapGetters } from 'vuex'
  export default {
    name: 'PaymentMethod',
    created() {
      this.dev_mode = process.env.NODE_ENV === 'development' ? 1 : 0
    },
    data: function () {
      return {
        timerId: 0,
        methodId: 0,
        isCheckPayStatus: false
      }
    },
    props: ['paramPaymentMethod'],
    methods: {
      setPaymentMethod(methodId = 0){
        this.methodId = methodId
        const methodName = (methodId === 1) ? 'n' : 'b'
        this.$emit('changePaymentMethod', methodId)
        let url
        if(this.dev_mode){
          url = `payment${this.product.id}.json`
        } else {
          url = 'payment/' + this.product.id
          axios.post(url, {payMethod: this.product.price + ' ' + methodName});
        }
        this.isCheckPayStatus = true
        this.checkPayStatus()
      },
      checkPayStatus() {
        let url
        if(this.dev_mode){
          url = `payment/${this.product.id}/payStatus.json`
        } else {
          url = 'payment/' + this.product.id + '/payStatus?price=' + this.product.price
        }
        this.timerId = setInterval(() => {
          if(this.isCheckPayStatus) {
            axios.get(url).then(response => {
              const currentMoney = response.data.currentMoney ?? 0
              this.$store.commit('setIncomeSum', currentMoney)
              if(response.data.paymentStatus === 's' && currentMoney >= this.product.price) {
                this.isCheckPayStatus = false
                clearInterval(this.timerId)
                this.giveProduct()
              }

            });
          }
        }, 2000)
      },
      giveProduct(){
        this.$emit('setThirdStep')
      }
    },
    watch: {
      paramPaymentMethod: function(newVal) {
        this.methodId = newVal
        if (this.methodId === 0) {
          this.isCheckPayStatus = false
        }
      }
    },
    beforeDestroy () {
      clearInterval(this.timerId)
    },
    computed: {
      ...mapGetters(['product'])
    }
  }
</script>

<style lang="sass">
.payment-method
  display: flex
.payment-method__col
  display: flex
  flex-direction: column
  flex: 50%
  padding: 0 5px
.payment-method__coins
  padding: 0 15px
  li
    border-bottom: 1px solid $g-color-border
    color: $color-order-card-info
    padding: 15px 0
    &:last-child
      border-bottom: none
  p
    color: #000

.payment-method__card
  padding: 15px 0
.payment-method__pays
  color: $color-info-line-text
  font-size: 12px
  padding: 5px 0
  p
    padding-bottom: 10px
  ul
    list-style: none

.payment-method__pay
  ul
    display: flex
  li
    display: flex
    flex-direction: column
    padding: 5px
  img
    height: 20px
    max-width: 100%
</style>
