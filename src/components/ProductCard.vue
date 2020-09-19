<template>
  <div class="product-card">
    <div class="product-card__image">
      <img :src="product.image" :alt="product.name">
    </div>
    <p class="product-card__description">{{product.description}}</p>
    <div class="product-card__actions">
      <button class="button button_accent product-card__buy">Купить</button>
      <div class="product-card__price">{{product.price}} &#8381;</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductCard',
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="sass">
  .product-card
    display: flex
    flex-direction: column
    background-color: $g-color-white
    margin-bottom: 16px
    border-radius: 12px
    padding: 16px
    box-shadow: $g-box-shadow
    &__image
      position: relative
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      padding-bottom: 62.5%
      margin-bottom: 16px
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit: contain
        object-position: center
    &__description
      display: block
      font-size: pxtorem(16)
      margin-bottom: 16px
    &__actions
      display: flex
      align-items: center
      justify-content: space-between
      margin-top: auto
    &__price
      font-size: pxtorem(24)
      font-weight: 500

</style>
