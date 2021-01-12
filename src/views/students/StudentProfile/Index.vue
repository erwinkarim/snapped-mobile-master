<template>
  <dashboard-layout>

    <template v-slot:pageHeader>
      <page-header-three>
        <template v-slot:leftAction>
          <nav-back class="w-2/7" stroke-color="red-primary"/>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="fixed  top-20 px-5 pt-4 z-40 bg-white w-full border-b-1/4 border-opacity-10 border-gray-100 shadow-md-soft pb-4">

        <!-- SECTION: STUDENT DETAILS -->
        <div class="flex flex-row items-center items-center px-2">

          <div class="w-3/12">
            <icon-base-two icon-name="app-logo" icon-color="white" view-box="0 -5 70 70">
              <profile-photo/>
            </icon-base-two>
          </div>

          <div class="flex flex-col w-full text-left w-3/5  truncate">
            <h1 class="text-purple-primary font-bold ">
              {{ studentDetails.studentName }}
            </h1>

            <div class="flex flex-row text-purple-secondary text-px-13 mt-1">
              <span class="pr-6">{{ studentDetails.className || '' }}</span>
              <span>{{ nowDate || '' }}</span>
            </div>
          </div>
        </div>

        <ranking-panel class="mt-5"/>

        <!-- SECTION: TABS -->
        <div class="flex mt-5 justify-between items-center">
          <div v-for="tab in tabs"
                       :class="isActiveTab(tab.name)"
                       class="text-xs font-bold py-2 px-4 rounded-lg w-full mx-1" exact>
            {{ tab.displayName }}
          </div>
        </div>
      </div>

      <router-view class="top-98 relative mb-24"/>

    </template>


  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import RankingPanel from "@/views/students/StudentDetails/components/RankingPanel";
import StudentRepository from "@/repositories/StudentRepository";
import moment from "moment";

export default {
  name: "Index",
  props: {
    studentID: [String, Number]
  },
  watch: {
    '$route': 'fetchData',
    'activeTab': 'isActiveTab'
  },
  data() {
    return {
      studentDetails: '',

      // Navigations
      activeTab: 'show',
      tabs: [
        {
          name: 'show',
          displayName: 'BADGES',
          route: ''
        },
        {
          name: 'assignments',
          displayName: 'ASSIGNMENT',
          route: ''
        },
        {
          name: 'overview',
          displayName: 'OVERVIEW',
          route: ''
        }
      ]
    }
  },
  computed: {
    nowDate() {
      const date = moment(this.nowDatetime, "YYYY-MM-DD hh:mm:ss").format('YYYY-MM-DD')
      return date === 'Invalid date' ? moment().format('DD MMMM YYYY') : date
    },
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

    /* NAVIGATIONS */
    showTab({tabName: tabName, route: routeName}) {
      this.activeTab = tabName;
      this.navBackCounter--;
    },
    isActiveTab(tabName) {
      if (this.activeTab === tabName) {
        return 'bg-purple-primary text-white'
      } else {
        return 'text-gray-primary'
      }
    }
  },
  created() {
    // this.getRouteParams()
    this.fetchData()
  },
  mounted() {
    // this.getInitialActiveTab()
  },
  components: {RankingPanel, ProfilePhoto, IconBaseTwo, NavBack, PageHeaderThree, DashboardLayout}
}
</script>

<style scoped>

</style>
