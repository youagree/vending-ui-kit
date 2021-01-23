<template>
  <div class="main">
    <div class="main__content">
      <div class="main__content-wrap">
        <header class="main__header">
          <span class="main__title">Весь ассортимент</span>
          <span class="main__count">{{ products.length }} товаров</span>
        </header>
        <div class="main__lists">
          <ProductCard
            :product='product' v-for="product in products"
            :key="product.id" />
        </div>
      </div>
    </div>
   <div class="main__info info-line info-line_bottom">
      <span>Возникли проблемы? Звоните по номеру горячей линии: +7 (903) 766-34-67</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Main',
    computed: {
      ...mapGetters(['products'])
    }
  }
</script>

<style lang="sass">
  .main
    position: relative
    background-color: $g-color-grey
    width: calc(100% - #{$sidebar-width})
    height: 100%
    padding: 0 0 $info-line-height
    &__content
      padding: 0 24px
      height: 100%
      overflow-y: auto
    &__header
      padding: 24px 0
      border-bottom: 1px solid $g-color-border
    &__title
      display: block
      font-size: pxtorem(32)
    &__lists
      display: flex
      flex-wrap: wrap
      width: calc(100% + 24px)
      margin: 0 -12px -24px
      padding: 24px 0 0
      & > *
        width: calc(50% - 24px)
        margin: 0 12px 24px
</style>
