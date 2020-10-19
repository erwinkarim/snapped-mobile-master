<template>
    <button @click="goBack" class="relative h-full w-1/5 focus:bg-transparent focus:outline-none">
      <icon-base class="absolute" icon-name="arrow-right-icon" icon-color="white" view-box="0 0 60 55">
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
  components: {ArrowBackIcon, IconBase},
  methods: {
    goBack () {
      router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
