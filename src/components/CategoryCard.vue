<template>
  <div class="category-card"
       :class='{"is-active" : currentCategory === category.id}'
       v-on:click="$store.commit('setCurrentCategory', category.id)">
    <div class="overlay"></div>
    <div class="category-card__image">
      <img :src="category.image"
           :alt="category.name">
    </div>
    <span class="category-card__name">{{category.name}}</span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'CategoryCard',
    props: {
      category: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters(['currentCategory'])
    }
  }
</script>

<style lang="sass">
.category-card
  background-color: rgba(245,245,245,0.1)
  margin-bottom: 16px
  border: 1px solid transparent
  border-radius: 12px
  padding: 16px
  box-shadow: $g-box-shadow
  position: relative
  .overlay
    background-color: rgba(245,245,245,0.1)
    border-radius: 12px
    display: block
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 2
  &.is-active
    background-color: #fff
    border-color: $g-color-border-active
    .overlay
      background-color: rgba(255, 255, 255, 0.1)
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
  &__name
    display: block
    text-align: center
    text-transform: uppercase
    font-size: pxtorem(14)
    font-weight: 500
    color: $color-category-card-text
</style>
