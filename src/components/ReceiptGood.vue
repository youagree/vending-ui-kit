<template>
  <div>
    <div class="receipt-good">
      <div class="progress-bar">
        <div class="progress-bar-value" v-bind:style="{ width: progressPercent + '%' }"></div>
      </div>
      <p>Автомат подготавливает товар к получению</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ReceiptGood',
  created() {
    this.progressPercent = 20
    this.dev_mode = process.env.NODE_ENV === 'development' ? 1 : 0
    this.productGive()
  },
  data: function () {
    return {
      progressPercent: 0,
    }
  },
  emits: ['eventEndOrder'],
  methods: {
    productGive() {
      let checkMotorStatus = (response) => {
        if(response.data.motorStatus === 's') {
          this.progressPercent = 100
          setTimeout(() => {this.$emit('eventEndOrder')}, 1000)
        }
      }
      this.$store.dispatch('runMotors', checkMotorStatus)
    }
  },
  computed: {
    ...mapGetters(['product'])
  }
}
</script>

<style lang="sass">
.receipt-good
  padding: 20px 0
  p
    padding: 10px 0
.progress-bar
  background-color: #ccc
  height: 8px
  width: 50%
.progress-bar-value
  background-color: $g-color-accent
  height: 100%
</style>
