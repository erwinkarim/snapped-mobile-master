<template>
  <v-date-picker is-expanded
                 title-position="left"
                 v-model="date"
                 :attributes="attributes"
                 :select-attribute="selectAttribute"
                 @dayclick="onDayClick"
  />
</template>

<script>


import Vue from 'vue';
import VCalendar from 'v-calendar';
import moment from 'moment';
import AssignmentRepository from "../repositories/AssignmentRepository";

Vue.use(VCalendar);

export default {
  name: "AssignmentCalendar",
  data() {
    return {
      days: [],
      selectedDay: [],
      date: new Date(),
      duedates: [],

      selectAttribute: {
        highlight: 'yellow'
        // Don't need the date here
      },
    };
  },
  watch: {
    'selectedDay' : 'emitSelectedDate',
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
        highlight: (this.todayDate.date === date) ? 'indigo':'red',
        dates: date,
      }));
    }
  },
  methods: {
    onDayClick(day) {
      const idx = this.selectedDay.findIndex(d => d.id === day.id);
      if (idx >= 0) {
        this.selectedDay.splice(idx, 1);
      } else {
        this.selectedDay = [{
          id: day.id,
          date: day.date,
        }]
      }
    },

    emitSelectedDate () {
      if (this.selectedDay.length > 0) {
        this.$emit('selectedDate', this.selectedDay[0]['date'])
      }
    },

    getDuedates () {
      AssignmentRepository.getDueDates()
              .then(response => {

                const data = response.data.data

                for (let i = 0; i < data.length; i++) {

                  let item = data[i];

                  let itemDetail = {
                    id: item.due_datetime,
                    date: moment(String(item.due_datetime)).toDate()

                  }
                  this.days.push(itemDetail)
                }
        })
    }

  },
  mounted() {
    // Set initial date
    this.days.push(this.todayDate)
    this.selectedDay.push(this.todayDate)

    // Get due dates
    this.getDuedates()
  }
}
</script>

<style scoped>
</style>
