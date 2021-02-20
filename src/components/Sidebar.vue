<template>
  <aside class="sidebar">
    <div class="sidebar__info info-line info-line_top">
      <span>Категории товаров</span>
    </div>
    <div class="sidebar__content">
      <div class="sidebar__content-wrap">
          <CategoryCard
            :category='category' v-for="category in categories"
            :key="category.id" />
      </div>
    </div>
  </aside>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Sidebar',
    mounted() {
      this.$store.dispatch('setCategories')
    },
    watch: {
      categories() {this.$store.commit('setCurrentCategory')},
      currentCategory() {this.$store.dispatch('setProducts')}
    },
    computed: {
      ...mapGetters(['categories', 'currentCategory'])
    }
  }
</script>

<style lang="sass">
  .sidebar
    position: relative
    flex: 0 0 auto
    width: $sidebar-width
    background-color: $g-color-grey-dark
    border-right: 1px solid $g-color-border
    &__info
      text-transform: uppercase
      font-weight: 500
    &__content
      height: calc(100% - #{$info-line-height})
      margin-top: $info-line-height
      padding: 16px 16px 0
      overflow-y: auto
</style>
