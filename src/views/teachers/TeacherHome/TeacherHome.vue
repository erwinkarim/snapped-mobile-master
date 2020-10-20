<template>

  <teacher-dashboard class="pt-10">
    <div class="px-5 ">
      <div class="w-3/4">
        <icon-base width="190" height="70" icon-name="app-logo" view-box="0 0 320 18">
          <AppLogo/>
        </icon-base>
      </div>

      <!-- SECTION: USER -->
      <div class="flex flex-row items-center items-center mt-4">
        <icon-base width="100" height="100" icon-name="app-logo" icon-color="white" view-box="0 -5 70 70">
          <ProfilePhoto/>
        </icon-base>
        <div class="flex flex-col w-full text-left">
          <h1 class=" text-purple-primary">Welcome, <span class="font-bold">{{ username }}</span></h1>

          <div class="flex flex-row text-purple-secondary text-px-13 mt-1">
            <span class="pr-2">{{ nowDate || ''}}</span>
            <span>{{ nowTime || '' }}</span>
          </div>
        </div>

        <div class="rounded-full flex items-center justify-center h-12 w-12 bg-yellow-primary">
          <icon-base width="50" height="50" icon-name="app-logo" view-box="-18 -18 50 50">
            <PlusIcon/>
          </icon-base>
        </div>
      </div>

      <!-- SECTION: CLASSES -->
      <div class="mt-2">
        <div class="text-left mb-3">
          <section-title class="mb-5">Your Classes</section-title>
        </div>

        <ClassesSwiper class="w-full mt-3"/>
      </div>

      <!-- SECTION: CLASSES -->
      <div class="mt-6">
        <div class="text-left mb-3">
          <section-title class="mb-5">Active Assignments</section-title>
        </div>
        <AssignmentSwiper class="mt-3"/>
      </div>

      <!-- SECTION: CLASSES -->
      <div class="mt-8">
        <div class="text-left mb-3">
          <section-title class="mb-5">Submissions</section-title>
        </div>
        <submission-card/>
      </div>
    </div>

  </teacher-dashboard>

</template>

<script>
import IconBase from "@/components/IconBase";
import AppLogo from "@/components/icons/AppLogo";
import PlusIcon from "@/components/icons/PlusIcon";
import SectionTitle from "@/components/SectionTitle";
import ClassesSwiper from "@/views/teachers/TeacherHome/ClassesSwiper";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import AssignmentSwiper from "@/views/teachers/TeacherHome/AssignmentSwiper";
import moment from 'moment'
import TeacherDashboard from "@/views/layout/TeacherDashboard";
import SubmissionCard from "@/views/teachers/TeacherHome/SubmissionCard";

export default {
  name: "Home",
  components: {
    SubmissionCard,
    TeacherDashboard,
    AssignmentSwiper,
    ProfilePhoto,
    ClassesSwiper,
    SectionTitle,
    AppLogo,
    IconBase,
    PlusIcon
  },
  data() {
    return {
      nowDatetime: ''
    }
  },
  computed: {
    username() {
      return this.$store.getters.getAuthUsername
    },
    nowDate() {
      const date = moment(this.nowDatetime, "YYYY-MM-DD hh:mm:ss").format('YYYY-MM-DD')
      return date === 'Invalid date' ? moment().format('YYYY-MM-DD') : date
    },
    nowTime() {
      const time = moment(this.nowDatetime, "YYYY-MM-DD hh:mm:ss").format('hh:mm A')
      return time === 'Invalid date' ? moment().format('hh:mm A')  : time
    }
  },
  methods: {
    datetime() {
      this.nowDatetime = moment().format()
    },
  },
  mounted() {
    this.interval = setInterval(this.datetime, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>

</style>
