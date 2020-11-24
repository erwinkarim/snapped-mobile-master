<template>
  <select v-model="selectedSubject"
          class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
    <option disabled value="">Select subject</option>
    <option v-for="subject in subjects" :value="subject.name">{{ subject.name }}</option>
  </select>
</template>

<script>
import TeacherRepository from "@/repositories/TeacherRepository";

export default {
  name: "SelectSubject",
  data() {
    return {
      subjects: [],
      selectedSubject: '',
    }
  },
  watch: {
    'selectedSubject' : 'emitSelectedSubject'
  },
  methods: {
    getSubjects() {
      TeacherRepository.getTeacherSubjects()
          .then(response => {
            const data = response.data.subjects

            const numOfSubjects = data.length

            for (let i = 0; i < numOfSubjects; i++) {

              let item = data[i];

              let subjectDetail = {
                id: item.subject_id,
                name: item.subject_name
              }

              this.subjects.push(subjectDetail)
            }
          })
    },

    emitSelectedSubject () {
      this.$emit('selectedSubject', this.selectedSubject)
    }
  },
  mounted() {
    this.getSubjects()
  }
}
</script>

<style scoped>

</style>
