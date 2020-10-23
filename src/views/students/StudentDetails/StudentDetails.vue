<template>
  <dashboard-layout>

    <div class="px-5 fixed z-40 bg-white w-full border-b-1/4 border-opacity-10 border-gray-100 shadow-md-soft pb-4">

      <div class="flex flex-row w-full justify-between pt-16">
        <nav-back class="w-1/3"/>
      </div>

      <!-- SECTION: STUDENT DETAILS -->
      <div class="flex flex-row items-center items-center mt-10 px-2">
        <icon-base width="100" height="100" icon-name="app-logo" icon-color="white" view-box="0 -5 70 70">
          <profile-photo/>
        </icon-base>
        <div class="flex flex-col w-full text-left">
          <h1 class="text-purple-primary font-bold">
            {{ studentDetails.studentName }}
          </h1>

          <div class="flex flex-row text-purple-secondary text-px-13 mt-1">
            <span class="pr-6">{{ studentDetails.className || '' }}</span>
            <span>{{ nowDate || '' }}</span>
          </div>
        </div>
      </div>

      <ranking-panel/>

      <!-- SECTION: TABS -->
      <div class="flex mt-6 justify-between items-center">
        <button @click="showTab({tabName: tab.name,route: tab.route})" v-for="tab in tabs" :class="isActiveTab(tab.name)" class="text-xs font-bold py-2 px-4 rounded-lg w-full mx-1">
          {{ tab.displayName }}
        </button>
      </div>
    </div>

    <router-view class="top-98 relative mb-24"/>

  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import NavBack from "@/components/NavBack";
import IconBase from "@/components/IconBase";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import moment from "moment";
import StudentRepository from "@/repositories/StudentRepository";
import CircleProgressBar from "@/components/CircleProgressBar";
import RankingPanel from "@/views/students/StudentDetails/components/RankingPanel";
import router from "@/router";

export default {
  name: "StudentDetails",
  data() {
    return {
      studentID: null,
      studentDetails: '',
      path:'',
      activeTab: 'show',
      tabs: [
        {
          name: 'show',
          displayName: 'BADGES',
          route: 'teacher.students.show'
        },
        {
          name: 'assignments',
          displayName: 'ASSIGNMENT',
          route: 'teacher.students.show.assignments'
        },
        {
          name: 'overview',
          displayName: 'OVERVIEW',
          route: 'teacher.students.show.overview'
        }
      ]
    }
  },
  computed: {
    nowDate() {
      const date = moment(this.nowDatetime, "YYYY-MM-DD hh:mm:ss").format('YYYY-MM-DD')
      return date === 'Invalid date' ? moment().format('DD MMMM YYYY') : date
    },
    nowTime() {
      const time = moment(this.nowDatetime, "YYYY-MM-DD hh:mm:ss").format('hh:mm A')
      return time === 'Invalid date' ? moment().format('hh:mm A') : time
    }
  },
  created() {
    this.getRouteParams()
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
    'activeTab' : 'isActiveTab'
  },
  methods: {
    fetchData() {

      StudentRepository.getOverview(this.studentID)
          .then(response => {

            let data = response.data;

            this.studentDetails = {
              studentName: data.student_details.student_name,
              className: data.student_details.student_class,
              contactNum: data.data.personal_details.contact_number,
              email: data.data.personal_details.email
            }

          })
          .catch(err => {

          })
    },
    showTab({tabName: tabName ,route: routeName}){
      this.activeTab = tabName;
      this.$router.push({name: routeName});
    },
    getRouteParams() {

      this.path = this.$route.path
      this.studentID = this.$route.params.studentID
    },
    isActiveTab(tabName){
      if (this.activeTab === tabName) {
        return 'bg-purple-primary text-white'
      } else {
        return 'text-gray-primary'
      }
    }

  },
  components: {RankingPanel, CircleProgressBar, ProfilePhoto, IconBase, NavBack, DashboardLayout}
}
</script>

<style scoped>

</style>
