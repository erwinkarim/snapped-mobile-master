<template>

  <layout-one>
    <!-- Subject Title + Period -->
    <div class="text-purple-primary font-bold text-left text-sm bg-gray-secondary py-2 px-5 mb-5">
      Class Ranking (Jan - Dec 2021)
    </div>

    <div class="px-5">

      <router-link v-for="(student, index) in rankings"
                   :key="student.student.student_id"
                   :to="{name : 'student.profile.show', params: {studentID: student.student.student_id} }"
                   class="mb-3 w-full rounded rounded-xl overflow-hidden bg-gray-secondary flex flex-row pl-1"
      >

        <div class="flex flex-row w-4/12 items-center">
          <!-- Ranking -->
          <div :class="student.ranking === 1 ? 'items-start' : 'justify-center px-2'"
               class=" flex flex-col items-center w-3/7 h-full  text-center mr-1 ">

            <icon-base-two v-if="student.ranking === 1" class="w-full md:w-6/7">
              <gold-medal-icon/>
            </icon-base-two>

            <div v-else class="font-bold text-lg md:text-3xl">
              {{ student.ranking }}
            </div>
          </div>

          <!-- Student photo -->
          <icon-base-two class="w-3/7">
            <profile-photo/>
          </icon-base-two>
        </div>

        <div class="flex w-6/12 py-3 md:py-6">

          <!-- Student Details -->
          <div class="flex flex-col w-full justify-between">
            <div>
              <div class="text-left text-purple-primary text-xs-plus font-bold  truncate  pr-5">
                {{ student.student.student_name || '' }}
              </div>

              <div class="text-left text-purple-secondary text-px-10  truncate mt-2 pr-5">
                {{ student.student.class_name || '' }}
              </div>
            </div>
          </div>
        </div>

        <div class="w-3/12 flex flex-col justify-center font-bold text-sm text-right pr-5 md:text-lg ">
          {{ student.student.total_marks_overall }}
        </div>
      </router-link>
    </div>
  </layout-one>
</template>

<script>
import IconBase from "@/components/IconBase";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import StudentRepository from "@/repositories/StudentRepository";
import IconBaseTwo from "@/components/IconBaseTwo";
import GoldMedalIcon from "@/components/icons/GoldMedalIcon";
import LayoutOne from "@/views/students/StudentClass/Components/LayoutOne";

export default {
  name: "ClassRanking",
  data() {
    return {
      rankings: [],
      totalNumOfStudents: 0,
    }
  },
  methods: {
    getRankings() {
      StudentRepository.getClassRanking()
          .then(response => {
            let data = response.data;

            this.totalNumOfStudents = data.total_students;
            this.rankings = data.data
          })
    }
  },
  mounted() {
    this.getRankings()
  },
  components: {LayoutOne, GoldMedalIcon, IconBaseTwo, ProfilePhoto, IconBase}
}
</script>

<style scoped>

</style>
