<template>
  <div class="px-5">

    <!-- TOTAL SCORE -->
    <div class="bg-purple-primary flex flex-row w-full rounded-lg">
      <div class="flex flex-col w-2/3 text-white text-left px-5 py-6">
        <div class="font-bold text-3xl mb-1">413</div>
        <div class="text-xs">Total assignments score</div>
      </div>
    </div>

    <!-- TOTAL SUBMISSIONS -->
    <div class="w-full mt-8 text-left ">
      <div class="flex flex-row justify-between mb-2 items-center">
        <div class="flex flex-row items-center">
          <div class="bg-blue-500 rounded-full w-3 h-3 mr-3"/>
          <div class="text-purple-secondary text-xs">
            Total assignments submission
          </div>

        </div>
        <div class="text-purple-primary text-sm font-bold">
          84 %
        </div>
      </div>
      <div class="w-full bg-gray-secondary rounded-full">
        <div class="bg-blue-500 text-xs leading-none h-3 text-center rounded-full" style="width:45%"></div>
      </div>
    </div>

    <!-- SUBMISSION PERFORMANCE -->
    <div class="flex flex-row mt-6 w-full">
      <div class="flex w-1/3 flex-col text-center">
        <div class="font-bold text-purple-primary text-3xl"> 15</div>
        <div class="text-xs"> Today</div>
      </div>

      <div class="flex w-1/3 flex-col text-center">
        <div class="font-bold text-purple-primary text-3xl"> 15</div>
        <div class="text-xs"> Weekly</div>
      </div>

      <div class="flex w-1/3 flex-col text-center">
        <div class="font-bold text-purple-primary text-3xl"> 15</div>
        <div class="text-xs"> Overall</div>
      </div>
    </div>

    <!-- SUBJECT SCORE -->
    <div class="mt-8">
      <section-title class="text-left">
        Overall Subject Score
      </section-title>
      <div class="mt-5">
        <subject-score-swiper/>
      </div>
    </div>

    <!-- SUBJECT SCORE -->
    <div class="mt-8">
      <section-title class="text-left">
        Guardian/Parents
      </section-title>
      <div>
        <parent-guardian-card class="mt-4"/>
      </div>
    </div>

    <!-- PERSONAL INFORMATION -->
    <div class="mt-8 mb-4">
      <section-title class="text-left">
        Personal Information
      </section-title>
      <div class="mt-5">
        <div class="flex flex-row text-xs justify-between py-1">
          <div class="text-left text-purple-secondary">
            School ID
          </div>
          <div class="text-right text-purple-primary">
            P3567800
          </div>
        </div>
        <div class="flex flex-row text-xs justify-between  py-1">
          <div class="text-left text-purple-secondary">
            Email
          </div>
          <div class="text-right text-purple-primary">
            muhammad.imran@mail.com
          </div>
        </div>
        <div class="flex flex-row text-xs justify-between  py-1">
          <div class="text-left text-purple-secondary">
            Contact Number
          </div>
          <div class="text-right text-purple-primary">
            013 345 9866
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import IconBase from "@/components/IconBase";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import SubjectScoreSwiper from "@/views/students/StudentDetails/components/SubjectScoreSwiper";
import SectionTitle from "@/components/SectionTitle";
import ParentGuardianCard from "@/views/students/StudentDetails/components/ParentGuardianCard";

export default {
  name: "StudentOverview",
  components: {ParentGuardianCard, SectionTitle, SubjectScoreSwiper, ArrowDownIcon, ArrowUpIcon, IconBase},
  props: {
    studentID: [String, Number],
  },
  created() {

  }
}
</script>

<style scoped>

</style>
