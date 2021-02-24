<template>
  <div class="px-5">
    <div class="text-purple-primary font-bold text-left text-sm bg-gray-secondary py-2 px-5 mb-5">
      National Ranking (Jan - Dec {{ $store.getters.currentYear }})
    </div>
    <router-link v-for="(student, index) in $store.state.studentRanking.nationalRankings.data"
                 :key="student.student_id"
                 :to="{name : 'student.profile.show', params: {studentID: student.student_id} }"
                 class="mb-3 w-full rounded rounded-xl overflow-hidden bg-gray-secondary flex flex-row pl-1">

      <div class="flex flex-row w-3/12 items-center">
        <!-- Ranking -->


        <div v-if="student.ranking === 1"
             class=" flex flex-col w-3/7 h-full text-center mr-1 items-start"
        >
          <icon-base-two class="w-full">
            <gold-medal-icon/>
          </icon-base-two>
        </div>
        <div v-else
             class=" flex flex-col w-3/7 h-full text-center mr-1 justify-center px-2"
        >
          <div class="font-bold text-lg md:text-3xl">
            {{ student.ranking }}
          </div>
        </div>

        <!-- Student photo -->
        <icon-base-two class="w-3/7">
          <profile-photo :gender="student.student_gender"/>
        </icon-base-two>
      </div>

      <div class="flex w-6/12 py-3">

        <!-- Student Details -->
        <div class="flex flex-col w-full justify-between">
          <div>
            <div class="text-left text-purple-primary text-xs-plus font-bold  truncate  pr-5">
              {{ student.student_name }}
            </div>

            <div class="text-left text-purple-secondary text-px-10 truncate mt-2 pr-5">
              {{ student.school_name }}
            </div>
          </div>
        </div>
      </div>

      <div class="w-3/12 flex flex-col justify-center font-semibold text-sm text-right pr-5 md:text-lg ">
        {{ `${student.marks_average}%` }}
      </div>
    </router-link>

    <infinite-loading :identifier="$store.state.studentRanking.nationalRankings.infiniteScrollIdentifier"
                      @infinite="handleNationalRankingData"
                      spinner="bubbles"
                      force-use-infinite-wrapper
    >
      <div slot="spinner" class="mt-10">Loading...</div>
      <div slot="no-more"></div>
      <div slot="no-results">
        <div v-if="!$store.state.studentRanking.nationalRankings.data.length">
          No data available
        </div>
      </div>
    </infinite-loading>
  </div>
</template>

<script>

import IconBaseTwo from "@/components/IconBaseTwo";
import GoldMedalIcon from "@/components/icons/GoldMedalIcon";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "NationalRanking",
  methods: {
    handleNationalRankingData($state) {
      this.$store.dispatch('studentRanking/handleNationalRankingData')
          .then(status => {
            if (status === 'loaded') {
              $state.loaded();
            } else if (status === 'completed') {
              $state.complete();
            }
          })
    }
  },
  components: {ProfilePhoto, GoldMedalIcon, IconBaseTwo, InfiniteLoading}
}
</script>

<style scoped>

</style>
