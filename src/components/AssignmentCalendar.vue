<template>
  <v-calendar class="w-full"  v-model="date" :attributes="attributes" @dayclick="onDayClick"/>
</template>

<script>


import Vue from 'vue';
import VCalendar from 'v-calendar';
import moment from 'moment';

Vue.use(VCalendar);

export default {
  name: "AssignmentCalendar",
  data() {
    return {
      days: [],
      date: new Date(),
    };
  },
  watch: {
    'days' : 'emitSelectedDate'
  },
  computed: {
    dates() {
      return this.days.map(day => day.date);
    },

    todayDate() {
      return {
        id: moment().format("YYYY-MM-DD"),
        date: moment().toDate()
      }
    },
    attributes() {
      return this.dates.map(date => ({
        highlight: true,
        dates: date,
      }));
    },
  },
  methods: {

    onDayClick(day) {
      const idx = this.days.findIndex(d => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days = [{
          id: day.id,
          date: day.date,
        }]
      }
    },

    emitSelectedDate () {
      if (this.days.length > 0) {
        this.$emit('selectedDate', this.days[0]['date'])
      }
    }

  },
  mounted() {
    // Set initial date
    this.days.push(this.todayDate)
  }
}
</script>

<style scoped>

</style>
