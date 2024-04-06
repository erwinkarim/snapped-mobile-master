<template>

  <dashboard-layout :has-fixed-header="true" :has-custom-bottom-bar="true">


    <template v-slot:pageHeader>
      <page-header-three class="pb-4">
        <template v-slot:leftAction>
          <nav-back class="w-2/7" stroke-color="red-primary"/>
        </template>

        <template v-slot:mini-title>
          {{ pageTitle }}
        </template>

      </page-header-three>
    </template>

    <!--  ASSIGNMENT ANSWERS-->
    <template v-slot:content>

      <!-- SHOW MARKINGS -->
      <div v-if="isShowingMarkings"
           class="relative max-w-xl top-24">
        <div class="pt-4 z-10 mb-20 bg-white px-6 ">
          <div class="w-full">
            <div v-my-swiper="swiperOption">
              <div class="swiper-wrapper">
                <div v-for="(path, index) in details.markingPicturePaths"
                     class=" swiper-slide rounded-2xl h-full overflow-hidden">
                  <div class="w-full flex flex-row justify-center py-2 px-4 h-full object-cover top-0 items-center">
                    <img :src="path" crossorigin="anonymous">
                  </div>
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <!--            <div class="swiper-button-prev" slot="button-prev"></div>-->
              <!--            <div class="swiper-button-next" slot="button-next"></div>-->
            </div>
          </div>
        </div>
        <!-- showing text answer and feedback-->
        <div v-if="hasTextAnswer" class="ml-5 text-left">
          <div class="text-lg font-bold">Marks</div>
          <div>{{  details.marks }} / 100</div>
          <div class="text-lg mt-2 font-bold">Your Answer</div>
          <div>{{  details.writtenAnswer }}</div>
          <div class="text-lg mt-2 font-bold">Feedback</div>
          <div>{{  details.feedback }}</div>
        </div>
      </div>

      <!-- SHOW FEEDBACK -->
      <div v-if="isShowingFeedback"
           class="relative px-8 md:mt-10 mb-28"
           :class="details.feedback ? 'top-26 text-purple-primary text-left' : 'top-30 text-purple-secondary text-center' "
      >
        {{ details.feedback || 'No feedback available.' }}
      </div>

    </template>

    <template v-slot:bottomBar>

      <div class="w-full flex flex-col">
        <router-link 
          :to="{ name: 'student.marked.analytics', params: {
            assignmentID: $route.params.assignmentID, marksID: $route.params.marksID,
          }}"
          class="w-full md:max-w-xl md:mx-auto font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center mb-4">
          View Analytics
        </router-link>
        <button @click="toggleMode"
                class="w-full md:max-w-xl md:mx-auto font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
          {{ buttonText }}
        </button>
      </div>

    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import NavBack from "@/components/NavBack";
import PageHeaderThree from "@/components/PageHeaderThree";
import IconBaseTwo from "@/components/IconBaseTwo";
import AnswerPreviewSwiper from "@/views/teachers/TeacherAssignments/Mark/Components/AnswerPreviewSwiper";
import MarksRepository from "@/repositories/teachers/MarksRepository";
// import router from "@/router";
import AuthenticationRepository from "@/repositories/AuthenticationRepository";
import axios from "axios";

export default {
  name: "Index",
  props: {
    assignmentID: [String, Number],
    marksID: [String, Number]
  },
  data() {
    return {

      // states
      isShowingMarkings: true,
      isShowingFeedback: false,

      details: {
        marks: 0,
        markingPicturePaths: [],
        feedback: null, 
        writtenAnswer: null,
      },

      swiperOption: {
        initialSlide: 0,
        direction: 'horizontal',
        speed: 200,
        slidesPerView: 1,
        spaceBetween: 15,
        freeMode: false,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: false
      }
    }
  },
  computed: {
    pageTitle() {
      if (this.isShowingMarkings) {
        return 'Markings'
      } else if (this.isShowingFeedback) {
        return 'Feedback'
      } else {
        return ''
      }
    },
    buttonText() {
      if (this.isShowingMarkings) {
        return 'View Feedback'
      } else if (this.isShowingFeedback) {
        return 'View Markings'
      } else {
        return ''
      }
    },
    hasTextAnswer(){
      return this.details.writtenAnswer != null;
    }
  },
  methods: {
    fetchData() {
      MarksRepository.find(this.marksID)
          .then(response => {

            if (response.data.success) {

              let data = response.data.data;

              let isUnanswered = data.marks_tag ? data.marks_tag === 'unanswered' : false;

              if (isUnanswered) {
                this.$router.push({
                  name: 'student.assignments.show', params: {
                    assignmentID: data.assignment_id,
                  }
                })
              } else {
                if(data.marking_picture_url != undefined){
                  this.details.markingPicturePaths = data.marking_picture_url.split(',');
                }
                this.details.marks = data.marks;
                this.details.feedback = data.marks_feedback;
                this.details.writtenAnswer = data.written_answer
              }
            }

          })
    },

    toggleMode() {
      this.isShowingFeedback = !this.isShowingFeedback;
      this.isShowingMarkings = !this.isShowingMarkings;
    },
  },
  created() {
    this.fetchData()
  },
  components: {AnswerPreviewSwiper, IconBaseTwo, PageHeaderThree, NavBack, DashboardLayout}
}
</script>

<style scoped>

</style>
