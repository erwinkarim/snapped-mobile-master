<template>
  <div>
    <div v-for="student in students"
         :key="student.id"
         @click="goToStudentShow(student.id)"
         class="text-left px-5 py-2 h-20 flex flex-row w-full border-b-1 items-center bg-white"
    >
      <div class="flex flex-row items-center w-11/12">
        <icon-base-two class=" w-1/6" icon-name="profile-photo-icon" icon-color="white" view-box="0 0 60 55">
          <profile-photo/>
        </icon-base-two>
        <div class="w-5/6 ml-5 text-purple-primary  truncate pr-4"> {{ student.name }}</div>
      </div>
      <div v-for="performance in performances"
           v-if="performance.student_id === student.id "
           class="place-self-end w-1/12"
      >
        <icon-base-two :class="taggingClass(performance.status_color)" class="w-5/6" view-box="-2 -2 25 40">
          <tagging-icon/>
        </icon-base-two>
      </div>
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
import TaggingIcon from "../../../components/icons/TaggingIcon";
import IconBaseTwo from "../../../components/IconBaseTwo";

export default {
  name: "StudentsList",
  components: {IconBaseTwo, TaggingIcon, ProfilePhoto, IconBase},
  props: {
    search: String
  },
  data() {
    return {

      // states
      error: null,
      loading: false,
      awaitingSearch: false,

      // data
      students: null,
      performances: null
    }
  },
  watch: {
    '$route': 'fetchData',
    'search': 'searchName'
  },
  computed: {
    responses() {
      if (this.loading === false && (this.students === null || this.students.length === 0)) {
        return 'Oops! No student available.'
      }

      if (this.loading === true) {
        return ' Fetching data...'
      }
    },
  },
  methods: {
    fetchData() {
      this.error = this.students = null
      this.loading = true

      TeacherRepository.getTeacherStudents({
        pageNum: 1,
        perPage: 50,
        search: this.search
      })
          .then(response => {

            this.students = response.data.data
            this.loading = false
          })
          .catch(err => {

          })
    },

    getStudentPerformance() {
      TeacherRepository.getStudentPerformance()
          .then(response => {
            let data = response.data;

            this.performances = data.data;
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
      router.push({name: 'student.profile.show', params: {studentID: studentID}})
    },

    taggingClass(statusColor) {

      switch (statusColor) {
        case 'neutral' :
          return '';
        case 'red':
          return 'text-red-primary';
        case 'yellow':
          return "text-yellow-primary";
        case 'green':
          return "text-green-primary";
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.getStudentPerformance()
  }
}
</script>

<style scoped>

</style>
