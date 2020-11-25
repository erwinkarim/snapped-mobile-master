<template>
  <select v-model="selectedMonth"
          class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
  >
    <option disabled value="">Select month</option>
    <option v-for="month in months" :value="month.id">{{ month.name }}</option>
  </select>
</template>

<script>
export default {
  name: "SelectMonth",
  watch: {
    'selectedMonth' : 'emitSelectedMonth'
  },
  methods: {
    emitSelectedMonth () {
      this.$emit('selectedMonth', this.selectedMonth)
    }
  },
  data() {
    return {
      selectedMonth: '',
      months: [
        {
          id: 1,
          name: 'January',
        },
        {
          id: 2,
          name: 'February',
        },
        {
          id: 3,
          name: 'March'
        },
        {
          id: 4,
          name: 'April'
        },
        {
          id: 5,
          name: 'May'
        },
        {
          id: 6,
          name: 'June'
        },
        {
          id: 7,
          name: 'July'
        },
        {
          id: 8,
          name: 'August'
        },
        {
          id: 9,
          name: 'September'
        },
        {
          id: 10,
          name: 'October'
        },
        {
          id: 11,
          name: 'November'
        },
        {
          id: 12,
          name: 'December'
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>
