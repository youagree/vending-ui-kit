<template>
  <div class="payment">
    <div class="payment-method">
      <div class="payment-method__col">
        <div class="sum">
          <span class="income-sum" v-bind:class="{'full-price': isFullPrice()}">{{incomeSum}}</span> /
          <span class="target-sum">{{sum}} ₽</span>
        </div>
        <p class="sum-description">Внесённая сумма (₽)</p>
      </div>
      <div class="payment-method__col">
        <div class="tip" v-if="paymentMethod === 2">
          <strong>ПОДСКАЗКА</strong>
          <p>Поднесите устройство оплаты к терминалу, расположенному под планшетом</p>
        </div>
        <div class="cancel-payment">
          <a href="#" v-on:click.prevent="modalCancelStatus = true">Отменить покупку</a>
          <p>После оплаты товара отмена покупки невозможна</p>
        </div>
        <app-modal title="Отмена покупки"
                   v-if="modalCancelStatus"
                   @close="modalCancelStatus = false"
                   @success="requestCancelPayment">
          Вы действительно хотите отменить покупку?
        </app-modal>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppModal from '@/components/AppModal'
  export default {
    name: 'Payment',
    props: ['paymentMethod', 'sum'],
    created() {
      this.dev_mode = process.env.NODE_ENV === 'development' ? 1 : 0
    },
    data: function () {
      return {
        modalCancelStatus: false
      }
    },
    emits: ['setFirstStep'],
    methods: {
      isFullPrice(){
        return this.sum <= this.incomeSum
      },
      requestCancelPayment(){
        this.$emit('setFirstStep')
        this.$store.dispatch('runPaymentCancel')
        this.$store.commit('setIncomeSum', 0)
        this.$router.push('/')
      }
    },
    components: {
      AppModal
    },
    computed: {
      ...mapGetters(['incomeSum'])
    }
  }
</script>

<style lang="sass">
.payment
  padding-top: 20px
  .sum
    margin-bottom: 10px
  .income-sum
    color: red
    &.full-price
      color: green
  .income-sum
    font-size: 24px
  .tip
    background-color: #fff
    border-radius: 12px
    margin-bottom: 20px
    padding: 20px 15px
    strong
      display: block
      letter-spacing: 1px
      padding-bottom: 10px
  .cancel-payment
    a
      color: red
    p
      color: #888
      font-size: 14px
      padding: 10px 0
</style>
