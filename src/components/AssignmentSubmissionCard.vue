<template>

  <div @click="showSubmission" class="max-w-sm h-18 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 py-3">
    <div class="flex flex-row items-center h-full">

      <div class="w-2/12">
        <icon-base-two class=" w-full">
          <profile-photo/>
        </icon-base-two>
      </div>

      <div class="w-9/12 flex-col pl-2">
        <div class="text-left text-purple-primary text-xs-plus mb-1  truncate pr-4">
          {{ submission.studentName || '' }}
        </div>
        <div class="flex flex-row text-left text-px-10 text-purple-secondary">
          <div class="w-1/4 truncate"> {{ meta.subjectName || '' }}</div>
          <div class="w-1/4 truncate"> {{ meta.classroomName || '' }}</div>
          <div class="w-2/4 truncate"> {{ getHumanDate(submission.submittedAt) }}</div>
        </div>
      </div>

      <div class="w-1/12 relative h-full flex flex-row items-center justify-center">
        <icon-base-two v-if="isMarked">
          <success-icon/>
        </icon-base-two>
        <!--        <icon-base class="absolute h-full w-full" icon-name="arrow-right-icon" icon-color="white"-->
        <!--                   view-box="-15 -20 60 55">-->
        <!--          <ArrowRightIcon/>-->
        <!--        </icon-base>-->
      </div>

    </div>

  </div>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import moment from "moment";
import router from "@/router";
import SuccessIcon from "@/components/icons/SuccessIcon";

export default {
  name: "AssignmentSubmissionCard",
  props: {
    submission: Object,
    meta: Object,
    allowShowSubmission: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    isMarked() {
      return this.submission.marksID !== null && this.submission.marksID !== undefined;
    }
  },
  methods: {
    getHumanDate(datetime) {

      if (datetime) {
        return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
      } else {
        return ''
      }

    },
    showSubmission(submissionID) {
      if (this.allowShowSubmission) {
        router.push({name: 'teacher.assignments.marking.details', params: { submissionID: this.submission.id }})
      }
    }
  },
  components: {SuccessIcon, ProfilePhoto, IconBaseTwo}
}
</script>

<style scoped>

</style>
