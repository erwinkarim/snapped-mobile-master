<template>
    <button @click="goBack" class="focus:bg-transparent focus:outline-none">
      <icon-base-two >
        <arrow-back-icon :stroke-color="strokeColor"/>
      </icon-base-two>
    </button>
</template>

<script>
import IconBase from "@/components/IconBase";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import router from "@/router";
import IconBaseTwo from "@/components/IconBaseTwo";

export default {
  name: "NavBack",
  props: {
    to: {
      type: [String, Number],
      default: null
    },
    counter: {
      type: Number,
      default: -1
    },
    strokeColor: String,
  },
  methods: {
    goBack () {

      if (this.to === null) {
        router.go(this.counter)
      } else {
        router.push({ name: this.to})
      }
    }
  },
  components: {IconBaseTwo, ArrowBackIcon, IconBase},
}
</script>

<style scoped>

</style>
