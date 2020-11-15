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
          <a href="#">Отменить покупку</a>
          <p>После оплаты товара отмена покупки невозможна</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Payment',
    props: ['paymentMethod', 'sum'],
    data: function() {
      return {
        incomeSum: 0
      }
    },
    methods: {
      isFullPrice(){
        return this.sum <= this.incomeSum
      }
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
