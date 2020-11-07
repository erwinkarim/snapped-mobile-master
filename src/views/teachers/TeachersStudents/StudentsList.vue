<template>
  <div>
    <div @click="goToStudentShow(student.id)" :key="student.id" v-for="student in students"
         class="text-left px-5 py-2 h-20 flex flex-row w-full border-b-1 items-center bg-white">
      <div class="w-1/6 h-full relative">
        <icon-base class="absolute w-full" icon-name="profile-photo-icon" icon-color="white" view-box="0 0 60 55">
          <profile-photo/>
        </icon-base>
      </div>
      <div class="ml-5 text-purple-primary  truncate pr-4"> {{ student.name }}</div>
    </div>

    <div class="mt-4 font-light text-md text-purple-secondary">
      {{ responses }}
    </div>

  </div>
</template>

<script>
import TeacherRepository from "@/repositories/TeacherRepository";
import IconBase from "@/components/IconBase";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import router from "@/router";

export default {
  name: "StudentsList",
  components: {ProfilePhoto, IconBase},
  props: {
    search: String
  },
  computed: {
    responses() {
      if (this.loading === false && (this.students === null || this.students.length === 0)) {
        return 'Oops! No student available.'
      }

      if (this.loading === true) {
        return ' Fetching data...'
      }
    }
  },
  data() {
    return {

      // states
      error: null,
      loading: false,
      awaitingSearch: false,

      // data
      students: null
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
    'search': 'searchName'
  },
  methods: {

    fetchData() {
      this.error = this.students = null
      this.loading = true

      TeacherRepository.getTeacherStudents({search: this.search})
          .then(response => {
            this.students = response.data.data
            this.loading = false
          })
          .catch(err => {

          })
    },

    searchName() {
      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.fetchData();
          this.awaitingSearch = false;
        }, 1000); // 1 sec delay
      }
      this.awaitingSearch = true;
    },

    goToStudentShow(studentID) {
      router.push({name: 'teacher.student.show', params: {studentID: studentID}})
    },
  }
}
</script>

<style scoped>

</style>
