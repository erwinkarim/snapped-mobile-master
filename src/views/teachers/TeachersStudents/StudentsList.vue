<template>
  <div>
    <div @click="goToStudentShow(student.id)" :key="student.id" v-for="student in students"
         class="text-left px-5 py-2 h-20 flex flex-row w-full border-b-1 items-center bg-white">
        <div class="flex flex-row items-center">
        <!--        <div class="w-1/6 h-full relative">-->
            <icon-base-two class=" w-1/6" icon-name="profile-photo-icon" icon-color="white" view-box="0 0 60 55">
              <profile-photo/>
            </icon-base-two>
        <!--      </div>-->
            <div class="ml-5 text-purple-primary  truncate pr-4"> {{ student.name }}</div>
        </div>
        <div v-for="performance in performances" v-if="performance.student_id === student.id " class="place-self-end w-1/12">
            <icon-base-two v-if="performance.status_color === 'neutral'" class="w-5/6" view-box="-2 -2 25 40">
                <tagging-icon/>
            </icon-base-two>
            <icon-base-two v-if="performance.status_color === 'red'" class="w-5/6 text-red-primary" view-box="-2 -2 25 40">
              <tagging-icon/>
            </icon-base-two>
            <icon-base-two v-if="performance.status_color === 'yellow'" class="w-5/6 text-yellow-primary" view-box="-2 -2 25 40">
                <tagging-icon/>
            </icon-base-two>
            <icon-base-two v-if="performance.status_color === 'green'" class="w-5/6 text-green-primary" view-box="-2 -2 25 40">
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
      students: null,
      performances: null
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
    'search': 'searchName'
  },
    mounted() {
      this.getStudentPerformance()
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

    getStudentPerformance(){
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
  }
}
</script>

<style scoped>

</style>
