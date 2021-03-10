<template>
  <div>
    <div v-for="student in students"
         :key="student.id"
         @click="goToStudentShow(student.id)"
         class="text-left px-5 py-2 h-20 flex flex-row w-full border-b-1 items-center bg-white"
    >
      <div class="flex flex-row items-center w-11/12">
        <icon-base-two class=" w-1/6" icon-name="profile-photo-icon" icon-color="white" view-box="0 0 60 55">
          <profile-photo :gender="student.gender"/>
        </icon-base-two>
        <div class="w-5/6 ml-5 text-purple-primary  truncate pr-4"> {{ student.name }}</div>
      </div>
      <div v-for="performance in performances"
           v-if="performance.student_id === student.id "
           class=" w-1/12"
      >
        <icon-base-two :class="taggingClass(performance.status_color)" class="w-5/6">
          <tagging-icon/>
        </icon-base-two>
      </div>
    </div>

    <infinite-loading :identifier="filterCount"
                      @infinite="handleInfiniteScroll"
                      spinner="bubbles"
                      force-use-infinite-wrapper
    >
      <div slot="spinner" class="mt-10">Loading...</div>
      <div slot="no-more"></div>
      <div slot="no-results">No results message</div>
    </infinite-loading>

  </div>
</template>

<script>
import TeacherRepository from "@/repositories/TeacherRepository";
import IconBase from "@/components/IconBase";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import router from "@/router";
import TaggingIcon from "../../../components/icons/TaggingIcon";
import IconBaseTwo from "../../../components/IconBaseTwo";
import StudentRepository from "@/repositories/StudentRepository";
import InfiniteLoading from "vue-infinite-loading";


export default {
  name: "StudentsList",
  props: {
    search: String
  },
  data() {
    return {

      // states
      error: null,
      loading: false,
      awaitingSearch: false,

      filterCount: 0,
      filters: {
        pageNum: 1,
        perPage: 20,
        search: ''
      },
      meta: null,

      // data
      students: [],
      performances: null
    }
  },
  watch: {
    '$route': 'fetchData',
    'search': 'searchName'
  },
  computed: {
    hasLoadMore() {
      if (this.meta) {
        return this.filters.pageNum <= this.meta.last_page
      } else {
        return true;
      }
    },
  },
  methods: {

    handleInfiniteScroll($state) {

      if (this.hasLoadMore) {

        TeacherRepository.getTeacherStudents(this.filters)
            .then(response => {

              let data = response.data.data

              for (let i = 0; i < data.length; i++) {
                this.students.push(data[i]);
              }

              // Update meta details and pageNum for filters
              this.meta = response.data.meta;
              this.filters.pageNum = this.meta.current_page + 1;

              $state.loaded();

            })

      } else {
        $state.complete();
      }
    },

    getStudentPerformance() {
      TeacherRepository.getStudentPerformance()
          .then(response => {
            let data = response.data;

            this.performances = data.data;
          })
    },

    searchName() {

      this.filters.search = this.search;

      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.awaitingSearch = false;
          this.updateFilter();
        }, 1000); // 1 sec delay
      }
      this.awaitingSearch = true;
    },

    updateFilter() {
      this.filters.pageNum = 1
      this.filters.perPage = 20

      this.students = [];
      this.filterCount++;
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
    // this.fetchData()
  },
  mounted() {
    this.getStudentPerformance()
  },
  components: {IconBaseTwo, TaggingIcon, ProfilePhoto, IconBase, InfiniteLoading},

}
</script>

<style scoped>

</style>
