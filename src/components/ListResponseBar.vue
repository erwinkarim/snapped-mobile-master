<template>
  <div class="mt-4 font-light text-md text-purple-secondary">
    {{ responses }}
  </div>
</template>

<script>
export default {
  name: "ListResponseBar",
  props: {
    loading: Boolean,
    itemLength: Number,
    nullMessage: String
  },
  computed: {
    responses() {
      if (this.loading === false && (this.itemLength === null || this.itemLength === 0)) {
        return 'No data available'
      }

      if (this.loading === true) {
        return ' Fetching data...'
      }
    }
  },
}
</script>

<style scoped>

</style>
