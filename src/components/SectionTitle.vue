<template>
  <div class="font-bold text-px-15 font-bold text-purple-primary">
    {{title}}
  </div>
</template>

<script>
export default {
  name: "SectionTitle",
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
