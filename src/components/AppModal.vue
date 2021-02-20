<template>
  <div>
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal">

      <div class="modal-content">
        <h3 class="title" v-if="title">{{ title }}</h3>
        <p class="description" v-if="hasSlotData">
          <slot />
        </p>
        <div class="buttons">
          <button class="button"
                  @click="$emit('success')"
                  :style= "[cancelButton ? {'border-right':'none'} : {}]"
                  v-if="successButton">Да</button>
          <button class="button"
                  @click="$emit('close')"
                  v-if="cancelButton">Нет</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  emits: ['close','success'],
  props: {
    title: {
      type: String
    },
    successButton: {
      default: true,
      type: Boolean
    },
    cancelButton: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    hasSlotData() {
      return this.$slots.default
    }
  }
}
</script>

<style lang="sass" scoped>
.modal
  //background: #fff
  border-radius: 10px
  //box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2)
  left: 50%
  padding: 1rem
  position: fixed
  transform: translateX(-50%)
  top: 60px
  width: 600px
  z-index: 1000


.modal-backdrop
  background: rgba(0, 0, 0, .35)
  bottom: 0
  left: 0
  right: 0
  position: fixed
  top: 0
  z-index: 100

.modal-content
  background-color: #fefefe
  border: 1px solid black
  border-radius: 5px
  min-height: 100px
  margin: auto
  padding: 10px 30px
  width: 320px
  .title
    border-bottom: 1px solid $g-color-border
    font-size: 20px
    font-weight: 500
    padding: 15px
    text-align: center
  .description
    font-size: 17px
    padding: 10px
    text-align: center
  .buttons
    text-align: center
  button
    align-items: center
    border: 1px solid $g-color-border
    border-radius: 5px
    color: $g-color-accent
    display: inline-flex
    justify-content: center
    margin: 20px 0
    padding: 8px 15px
    width: 50%
    &:hover, &:active, &:focus
      border: 1px solid $g-color-border
      outline-color: $g-color-border
    &.active
      background-color: $g-color-accent
      color: #fff
    &:first-child
      //border-right: none
      border-bottom-right-radius: 0
      border-top-right-radius: 0
    &:last-child
      border-bottom-left-radius: 0
      border-top-left-radius: 0

</style>
