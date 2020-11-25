<template>
  <select v-model="selectedYear"
          class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
    <option disabled value="">Select year</option>
    <option v-for="year in years" :value="year.year">{{ year.year }}</option>
  </select>
</template>

<script>
export default {
  name: "SelectYear",
  data() {
    return {
      selectedYear: "",
      years: [
        {
          year: 2020
        }
      ],
    }
  },
  watch: {
    'selectedYear' : 'emitSelectedYear'
  },
  methods: {
    emitSelectedYear () {
      this.$emit('selectedYear', this.selectedYear)
    }
  }
}
</script>

<style scoped>

</style>
