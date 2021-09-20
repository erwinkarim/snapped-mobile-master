<template>
  <select v-model="selectedSubject"
          class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
    <option disabled value="">Select subject</option>
    <option v-for="subject in subjects" :value="subject.id">{{ subject.name }}</option>
  </select>
</template>

<script>
import TeacherRepository from "@/repositories/TeacherRepository";
import StudentRepository from "@/repositories/StudentRepository";

export default {
  name: "SelectSubject",
  props: {
    userRole: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      subjects: [],
      selectedSubject: '',
    }
  },
  watch: {
    'selectedSubject': 'emitSelectedSubject'
  },
  methods: {
    getSubjects() {
      if (this.userRole === 'teacher') {
        TeacherRepository.getTeacherSubjects()
            .then(response => {

              if (response.data.success) {
                const data = response.data.data

                const numOfSubjects = data.length

                for (let i = 0; i < numOfSubjects; i++) {

                  let item = data[i];

                  let subjectDetail = {
                    id: item.subject_id,
                    name: item.subject_name
                  }

                  this.subjects.push(subjectDetail)
                }
              }
            })
      }

      if (this.userRole === 'student') {
        StudentRepository.getSubjects()
            .then(response => {

              if (response.data.success) {
                const data = response.data.data

                const numOfSubjects = data.length

                for (let i = 0; i < numOfSubjects; i++) {

                  let item = data[i];

                  let subjectDetail = {
                    id: item.subject_id,
                    name: item.subject_name
                  }

                  this.subjects.push(subjectDetail)
                }
              }
            })
      }
    },

    emitSelectedSubject() {
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
