<template>
    <button @click="goBack" class="focus:bg-transparent focus:outline-none">

      <div v-if="type === 'cancel'" class="text-red-primary w-full text-sm">
        Cancel
      </div>

      <icon-base-two v-if="type === 'arrow'">
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
      type: [String, Number, Object],
      default: null
    },
    counter: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: 'arrow'
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
