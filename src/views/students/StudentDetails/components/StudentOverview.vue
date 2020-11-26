<template>
  <div class="px-5">

    <!-- TOTAL SCORE -->
    <div class="bg-purple-primary flex flex-row w-full rounded-lg">
      <div class="flex flex-col w-2/3 text-white text-left px-5 py-6">
        <div class="font-bold text-3xl mb-1"> {{ assignmentScore.total || '-' }}</div>
        <div class="text-xs">Total assignments score</div>
      </div>
    </div>

    <assignment-submission-panel :assignment-submission="assignmentSubmission"/>

    <!-- SUBJECT SCORE -->
   <subject-score-panel :subjects="overallSubjectsScore"/>

    <!-- Guardian/Parent -->
    <parent-guardian-panel :guardians="guardians" />

    <!-- PERSONAL INFORMATION -->
    <personal-detail-panel :details="personalDetails" />

  </div>
</template>

<script>
import IconBase from "@/components/IconBase";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import SectionTitle from "@/components/SectionTitle";
import StudentRepository from "@/repositories/StudentRepository";
import AssignmentSubmissionPanel from "@/views/students/StudentDetails/components/AssignmentSubmissionPanel";
import PersonalDetailPanel from "@/views/students/StudentDetails/components/PersonalDetailPanel";
import ParentGuardianPanel from "@/views/students/StudentDetails/components/ParentGuardianPanel";
import SubjectScorePanel from "@/views/students/StudentDetails/components/SubjectScorePanel";
import router from "@/router";

export default {
  name: "StudentOverview",
  props: {
    userRole: String,
    isAuthStudent:Boolean,
    studentID: [String, Number],
  },
  data() {
    return {
      assignmentScore: [],
      assignmentSubmission: {},
      overallSubjectsScore: [],
      guardians: {},
      personalDetails: {}
    }
  },
  methods: {
    fetchData() {

      StudentRepository.getOverview(this.studentID)
          .then(response => {

            let data = response.data;

            this.assignmentScore = data.assignment_score;
            this.assignmentSubmission = data.assignment_submission;
            this.overallSubjectsScore = data.overall_subjects_score;
            this.guardians = data.guardian;


            this.personalDetails = data.data

          })
          .catch(err => {

          })
    }
  },
  mounted() {
    this.fetchData()
  },
  components: {
    SubjectScorePanel,
    ParentGuardianPanel,
    PersonalDetailPanel,
    AssignmentSubmissionPanel,
    SectionTitle, ArrowDownIcon, ArrowUpIcon, IconBase
  }
}
</script>

<style scoped>

</style>
