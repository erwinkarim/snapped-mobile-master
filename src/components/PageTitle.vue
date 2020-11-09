<template>
  <div class="flex flex-row w-full justify-between px-5 pt-16 items-baseline">
    <div class="text-left text-4xl font-bold text-purple-primary w-1/2">
      {{ title }}
    </div>
    <div class="flex flex-row w-1/2 justify-end">
      <slot name="rightAction"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
