<template>
  <layout-two page-title="School Rank">
    <div class="px-5">

      <list-response-bar :loading="loading" :item-length="rankings.length"/>

      <div v-for="(student, index) in rankings"
           class="mb-3 w-full rounded rounded-xl overflow-hidden bg-gray-secondary flex flex-row pl-1">

        <div class="flex flex-row w-4/12 items-center">
          <!-- Ranking -->
          <div class="font-bold text-3xl w-3/7 px-2 text-center mr-1">
            {{ student.ranking }}
          </div>

          <!-- Student photo -->
          <icon-base-two class="w-3/7">
            <profile-photo/>
          </icon-base-two>
        </div>

        <div class="flex w-7/12 py-3">

          <!-- Student Details -->
          <div class="flex flex-col w-full justify-between">
            <div>
              <div class="text-left text-purple-primary text-xs-plus font-bold  truncate  pr-10">
                {{ student.student.student_name }}
              </div>

              <div class="text-left text-purple-secondary text-px-10  truncate mt-2 pr-10">
                Class
              </div>
            </div>
          </div>
        </div>

        <div class="w-1/6">
          <icon-base-two v-if="student.ranking === 1" class="w-5/6">
            <gold-medal-icon/>
          </icon-base-two>
        </div>
      </div>
    </div>
  </layout-two>
</template>

<script>
import LayoutTwo from "@/views/students/StudentClass/Components/LayoutTwo";
import IconBaseTwo from "@/components/IconBaseTwo";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import GoldMedalIcon from "@/components/icons/GoldMedalIcon";
import StudentRepository from "@/repositories/StudentRepository";
import ListResponseBar from "@/components/ListResponseBar";
export default {
name: "SchoolRanking",
  data() {
    return {

      // states
      error: null,
      loading: false,
      awaitingSearch: false,

      rankings: [],
      totalNumOfStudents: 0,
    }
  },

  methods: {
    getRankings() {

      this.loading = true;

      StudentRepository.getClassRanking()
          .then(response => {

            this.loading = false;

            let data = response.data;

            this.totalNumOfStudents = data.total_students;
            this.rankings = data.data
          })
    }
  },
  mounted() {
    this.getRankings()
  },
  components: {ListResponseBar, GoldMedalIcon, ProfilePhoto, IconBaseTwo, LayoutTwo}
}
</script>

<style scoped>

</style>
