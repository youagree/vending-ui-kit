<template>
  <div class="order__box-header">
    <span class="order__box-step">{{step}}</span>
    <div class="order__box-title">{{label}}</div>
  </div>
</template>

<script>
  export default {
    name: 'OrderBoxHeader',
    props: {
      step: String,
      label: String
    }
  }
</script>

<style lang="sass">
  .order
    &__box
      &-header
        display: flex
        align-items: center
      &-step
        flex-shrink: 0
        display: flex
        align-items: center
        justify-content: center
        width: 32px
        height: 32px
        border-radius: 50%
        background-color: $color-order-step
        color: $g-color-white
        margin-right: 24px
        margin-top: -19px
      &-title
        flex-grow: 1
        font-size: pxtorem(24)
        font-weight: 500
        padding-bottom: 16px
        border-bottom: 1px solid $g-color-grey-dark
</style>
