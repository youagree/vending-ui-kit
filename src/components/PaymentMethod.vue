<template>
  <div>
    <div class="payment-method">
      <div class="payment-method__col">
        <button class="button button_payment payment-method__button">Купюрами и монетами</button>
        <p class="payment-method__coins">Принимаются купюры номиналом в 10 &#8381;, 50 &#8381;, 100 &#8381;, 200 &#8381;.</p>
        <p class="payment-method__coins">Принимаются монеты номиналом в 1 &#8381;, 2 &#8381;, 5 &#8381;, 10 &#8381;.</p>
      </div>
      <div class="payment-method__col">
        <button class="button button_payment payment-method__button">Бесконтактно</button>
        <p class="payment-method__card">Оплата с помощью карты или смартфона с функцией NFC</p>
        <div class="payment-method__pays">
          <p>Поддерживаемые платежные системы</p>
          <div class="payment-method__pay">
            <img src="https://evgenykatyshev.ru/projects/mir-logo/mir-logo-h229px.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PaymentMethod'
  }
</script>

<style lang="sass">

</style>
