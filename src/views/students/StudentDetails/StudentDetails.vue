<template>
  <dashboard-layout>

    <template v-slot:pageHeader>
      <page-header-three>
        <template v-slot:leftAction>
          <nav-back :to="handleNavBackRoute" class="w-2/7" stroke-color="red-primary"/>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div
          class="fixed top-20 md:top-24 px-5 pt-4 z-40 bg-white w-full md:max-w-xl border-b-1/4 border-opacity-10 border-gray-100 shadow-md-soft md:shadow-none pb-4">

        <!-- SECTION: STUDENT DETAILS -->
        <div v-if="isLoading" class="flex flex-row items-center items-center px-2">

          <div class="w-3/12 mr-2">
            <icon-base-two>
              <profile-photo :gender="studentDetails.gender"/>
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
        <tab-bar
            :user-role="authUser.role"
            :is-auth-student="isAuthStudent"
        />

      </div>

      <router-view class="top-98 relative mb-24"
                   :user-role="authUser.role"
                   :is-auth-student="isAuthStudent"
      />

    </template>


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
// import router from "@/router";
import PageTitleTwo from "@/components/PageTitleTwo";
import PageHeaderThree from "@/components/PageHeaderThree";
import TabBar from "@/views/students/StudentDetails/components/TabBar";
import IconBaseTwo from "@/components/IconBaseTwo";

export default {
  name: "StudentDetails",
  props: {
    studentID: [String, Number]
  },
  data() {
    return {

      // Status
      isLoading: false,

      authUser: null,
      studentDetails: '',
      studentOverview: '',
      path: '',
      navBackRoute: 'home'
    }
  },
  watch: {
    '$route': 'handleRouteChange',
  },
  computed: {
    handleNavBackRoute() {
      if (this.navBackRoute === 'home') {
        if (this.userRole === 'Student') {
          return {name: 'student.home'}
        }
        if (this.userRole === 'Teacher') {
          return {name: 'teacher.home'}
        }
      } else {
        return {name: this.navBackRoute.name, params: this.navBackRoute.params}
      }
    },
    userRole() {
      return this.authUser.role;
    },
    isAuthStudent() {
      if (this.authUser.role === 'Student') {
        return parseInt(this.authUser.id) === parseInt(this.studentID)
      } else {
        return null
      }
    },

    nowDate() {
      const date = moment(this.nowDatetime, "YYYY-MM-DD hh:mm:ss").format('YYYY-MM-DD')
      return date === 'Invalid date' ? moment().format('DD MMMM YYYY') : date
    },
    nowTime() {
      const time = moment(this.nowDatetime, "YYYY-MM-DD hh:mm:ss").format('hh:mm A')
      return time === 'Invalid date' ? moment().format('hh:mm A') : time
    },
  },

  methods: {

    handleRouteChange() {
      if (this.userRole !== 'Teacher' && !this.isAuthStudent) {
        if (this.$route.name !== 'student.profile.show') {
          this.$router.push({name: 'student.profile.show'})
        }
      }
    },
    fetchData() {

      StudentRepository.getOverview(this.studentID)
          .then(response => {

            if (response.data.success) {

              let data = response.data.data;

              this.studentDetails = {
                studentName: data.student_details.student_name,
                gender: data.student_details.gender,
                className: data.student_details.student_class,
                contactNum: data.personal_details.contact_number,
                email: data.personal_details.email
              }

              this.isLoading = true;
            }
          })
    },

    getRouteParams() {
      this.path = this.$route.path
    },


    getAuthUser() {
      let user = this.$store.getters.getAuthUser

      this.authUser = {
        id: user.id,
        role: user.role
      }
    }

  },

  beforeRouteEnter(to, from, next) {
    return next(vm => {
      vm.prevRoute = from
    })
  },

  created() {
    if (this.$route.name !== 'student.profile.show') {
      this.$router.push({name: 'student.profile.show'})
    }
    this.fetchData()
    this.getAuthUser()
  },
  mounted() {
    if (this.prevRoute.name) {
      this.navBackRoute = {
        name: this.prevRoute.name,
        params: this.prevRoute.params
      };
    } else {
      this.navBackRoute = 'home'
    }
  },
  components: {
    IconBaseTwo,
    TabBar,
    PageHeaderThree,
    PageTitleTwo, RankingPanel, CircleProgressBar, ProfilePhoto, IconBase, NavBack, DashboardLayout
  }
}
</script>

<style scoped>

</style>
