<template>
  <div class="order-card">
    <div class="order-card__image">
      <img
        :src="product.image"
        :alt="product.name">
    </div>
    <div class="order-card__box">
      <span class="order-card__info">Вы покупаете</span>
      <p class="order-card__description">{{product.description}}</p>
      <span class="order-card__price">{{product.price}} &#8381;</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderCard',
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="sass">
  .order-card
    display: flex
    &__image
      flex-shrink: 0
      position: relative
      display: flex
      align-items: center
      justify-content: center
      width: 14%
      padding-bottom: 12.5%
      border: 1px solid $g-color-grey-dark
      border-radius: 12px
      margin-right: 24px
      img
        position: absolute
        top: 50%
        left: 50%
        width: 90%
        height: 90%
        object-fit: contain
        object-position: center
        transform: translate(-50%, -50%)
    &__box
      display: flex
      flex-direction: column
      align-items: flex-start
    &__price
      margin-top: auto
      font-size: pxtorem(20)
      font-weight: 500
    &__info
      font-size: pxtorem(14)
      color: $color-order-card-info
      margin-bottom: 8px
    &__description
      margin-bottom: 8px
</style>
