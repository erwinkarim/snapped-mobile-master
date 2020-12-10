<template>
  <div class="h-screen">

    <!-- HEADER -->
    <page-header-three :bottom-padding="8"
    >

      <template v-slot:leftAction>
        <nav-back :to="{name: 'student.assignments.show', params: {assignmentID: assignmentID}}"
                  class="w-1/4"
        />
      </template>
    </page-header-three>

    <!-- CONTENT -->
    <div class="relative pb-16/9 top-24">

      <!--  ASSIGNMENT ANSWERS-->

      <div class="pt-4 z-10 bg-white px-6 pb-16">
        <answer-preview-swiper
          :images="details.markingPicturePaths"
        />
      </div>
    </div>


  </div>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import NavBack from "@/components/NavBack";
import PageHeaderThree from "@/components/PageHeaderThree";
import IconBaseTwo from "@/components/IconBaseTwo";
import AnswerPreviewSwiper from "@/views/teachers/TeacherAssignments/Mark/Components/AnswerPreviewSwiper";
import MarksRepository from "@/repositories/teachers/MarksRepository";

export default {
  name: "Index",
  props: {
    assignmentID: [String, Number],
    marksID: [String, Number]
  },
  data() {
    return {
      details: {
        markingPicturePaths: []
      }
    }
  },
  methods: {
    fetchData() {
      MarksRepository.find(this.marksID)
          .then(response => {
            let data = response.data;

            this.details.markingPicturePaths = data.marks_details.marking_picture_url.split(',');

          })
    }
  },
  mounted() {
    this.fetchData()
  },
  components: {AnswerPreviewSwiper, IconBaseTwo, PageHeaderThree, NavBack, DashboardLayout}
}
</script>

<style scoped>

</style>
