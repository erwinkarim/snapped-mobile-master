<template>
    <button @click="goBack" class="relative h-full w-1/5 focus:bg-transparent focus:outline-none">
      <icon-base class="absolute" icon-name="arrow-right-icon" view-box="0 5 60 55">
        <arrow-back-icon/>
      </icon-base>
    </button>
</template>

<script>
import IconBase from "@/components/IconBase";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import router from "@/router";

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
    }
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
  components: {ArrowBackIcon, IconBase},
}
</script>

<style scoped>

</style>
