<template>
  <div>
      <div class="text-left px-5 py-2 h-20 flex flex-row w-full border-b-1 items-center bg-white" :key="student.student_id" v-for="student in students">
        <div class="w-1/6 h-full relative">
          <icon-base class="absolute w-full" icon-name="profile-photo-icon" icon-color="white" view-box="0 0 60 55">
            <profile-photo/>
          </icon-base>
        </div>
        <div class="ml-5 text-purple-primary">{{ student.name }}</div>
      </div>
  </div>
</template>

<script>
import TeacherRepository from "@/repositories/TeacherRepository";
import IconBase from "@/components/IconBase";
import ProfilePhoto from "@/components/icons/ProfilePhoto";

export default {
  name: "StudentsList",
  components: {ProfilePhoto, IconBase},
  data() {
    return {

      // states
      error: null,
      loading: false,

      // data
      students: null
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {

    fetchData() {
      this.error = this.students = null
      this.loading = true

      console.log('fetch data')

      TeacherRepository.getTeacherStudents()
          .then(response => {
            this.students = response.data.data
          })
          .catch(err => {

          })
    },
  }
}
</script>

<style scoped>

</style>
