<template>
  <dashboard-layout :has-custom-bottom-bar="true">

    <template v-slot:pageHeader>
      <page-header-three :background-color="isPreviewing ? 'bg-white' : 'bg-black-primary'" :bottom-padding="4">
        <template v-slot:leftAction>
          <nav-back v-if="!isPreviewing" class="w-2/3" stroke-color="white"/>

          <div @click="togglePreviewMode">
            <icon-base-two v-if="isPreviewing" class="w-2/3">
              <arrow-back-icon stroke-color="purple-primary"/>
            </icon-base-two>
          </div>

        </template>
        <template v-slot:title v-if="isPreviewing">
          Answer Preview
        </template>
        <template v-slot:rightAction v-if="!isPreviewing">
          <div @click="togglePreviewMode" class="flex flex-row justify-end">
            <icon-base-two class="w-1/3">
              <expand-image-icon/>
            </icon-base-two>
          </div>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>

      <!-- Content -->
      <div class="relative top-24">

        <!-- ASSIGNMENT ANSWERS (IMAGE) -->
        <div :class="imagePreviewClass" class="  pt-4">
          <answer-preview-swiper :is-previewing="isPreviewing"/>
        </div>

        <!-- ASSIGNMENT DETAILS -->
        <div class="mt-6 px-5" v-if="!isPreviewing">

          <!-- Achievements -->
          <div class="flex flex-row ">
            <div class="bg-gray-secondary rounded-full py-1 px-4 text-xs font-bold text-purple-primary uppercase">
              First Submit
            </div>
          </div>

          <div class="text-left mt-5 text-purple-primary font-bold tracking-normal text-xl truncate">
            {{ details.assignmentTitle || '' }}
          </div>

          <div class="text-purple-secondary font-bold text-sm mt-3 text-left truncate">
            {{ details.studentName || ''  }}
          </div>

          <div class="flex flex-row justify-between mt-4 text-sm ">
            <div class="text-purple-secondary text-left">
              Time submitted
            </div>
            <div class="flex flex-row justify-end text-purple-primary text-right">
              <div class="mr-4">
                {{ details.submittedTime || '' }}
              </div>
              <div>
                {{ details.submittedDate || '-' }}
              </div>
            </div>
          </div>

          <!-- MARKS -->
          <div class="flex flex-row font-bold text-xl mt-8 text-left tracking-wide">
            <div class="text-purple-secondary mr-1">
              {{ details.marks || '-' }}
            </div>
            <div class="text-purple-primary">
              /100 Marks
            </div>
          </div>

        </div>

      </div>


    </template>

    <template v-slot:bottomBar>
      <router-link :to="{name: 'teacher.assignments.marking.feedback'}" class="w-1/8 mr-2">
        <icon-base-two class="w-7/8">
          <dialog-bubble-icon/>
        </icon-base-two>
      </router-link>
      <div class="w-3/8 px-2">
        <router-link :to="{name: 'teacher.assignments.marking.add_mark'}" v-if="isPreviewing" class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary">
          Add Mark
        </router-link>
        <button v-else @click="togglePreviewMode" class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary">
          Marking
        </button>
      </div>
      <div class="w-4/8 px-2">
        <button
            class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
          <div class="w-5/7">
            Set as Marked
          </div>
        </button>
      </div>
    </template>
  </dashboard-layout>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import DialogBubbleIcon from "@/components/icons/DialogBubbleIcon";
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
import ExpandImageIcon from "@/components/icons/ExpandImageIcon";
import PageTitle from "@/components/PageTitle";
import AnswerPreviewSwiper from "@/views/teachers/TeacherAssignments/Mark/Components/AnswerPreviewSwiper";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import SubmissionRepository from "@/repositories/SubmissionRepository";

export default {
  name: "AssignmentDetails",
  props: {
    submissionID: [String, Number]
  },
  data() {
    return {
      details: {
        submissionID: null,
        studentID: null,
        studentName: null,
        assignmentID: null,
        assignmentTitle: null,
        snappedAnswer: null,
        writtenAnswer: null,
        marks: null,
        createdAt: null,
        updatedAt: null,
        submittedTime: null,
        submittedDate: null
      },
      isPreviewing: false
    }
  },
  computed: {
    imagePreviewClass: function () {
      if (this.isPreviewing) {
        return 'bg-white px-6 pb-16';
      } else {
        return 'bg-black-primary px-16  pb-10'
      }
    }
  },
  methods: {
    fetchData() {

      SubmissionRepository.find(this.submissionID)
          .then(response => {
            let data = response.data;

            this.details.submissionID = data.submission_details.submission_id;
            this.details.studentID = data.submission_details.student_id;
            this.details.studentName = data.submission_details.student_name;
            this.details.assignmentID = data.submission_details.assignment_id;
            this.details.assignmentTitle = data.submission_details.assignment_title;
            this.details.snappedAnswer = data.submission_details.snap_answer;
            this.details.writtenAnswer = data.submission_details.written_answer;
            this.details.createdAt = data.submission_details.created_at;
            this.details.updatedAt = data.submission_details.updated_at;
            this.details.submittedTime = data.submission_time;
            this.details.submittedDate = data.submission_date;
            this.details.marks = data.marks;
          });
    },
    togglePreviewMode() {
      this.isPreviewing = !this.isPreviewing;
    }
  },
  mounted() {
    this.fetchData()
  },
  components: {
    PageHeaderThree,
    DashboardLayout,
    ArrowBackIcon,
    AnswerPreviewSwiper,
    PageTitle,
    ExpandImageIcon, NavBack, PageTitleTwo, DialogBubbleIcon, IconBaseTwo
  }
}
</script>

<style scoped>

</style>
