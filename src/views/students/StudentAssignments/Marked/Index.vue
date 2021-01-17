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
           class="relative pb-16/9 top-24">
        <div class="pt-4 z-10 bg-white px-6 pb-16">
          <div class="w-full">
            <div v-my-swiper="swiperOption">
              <div class="swiper-wrapper">
                <div v-for="(path, index) in details.markingPicturePaths"
                     class="pb-16/9 bg-black-primary swiper-slide rounded-2xl flex flex-col">
                  <div class="w-full h-full object-cover top-0 flex flex-row items-center absolute">
                    <img :src="path">
                  </div>
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <!--            <div class="swiper-button-prev" slot="button-prev"></div>-->
              <!--            <div class="swiper-button-next" slot="button-next"></div>-->
            </div>
          </div>
        </div>
      </div>

      <!-- SHOW FEEDBACK -->
      <div v-if="isShowingFeedback"
           class="relative px-8"
           :class="details.feedback ? 'top-26 text-purple-primary text-left' : 'top-30 text-purple-secondary text-center' "
      >
        {{ details.feedback || 'No feedback available.' }}
      </div>
    </template>

    <template v-slot:bottomBar>

      <div class="w-full flex flex-row">
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
import {directive} from "vue-awesome-swiper";

export default {
  name: "Index",
  directives: {
    mySwiper: directive
  },
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
        markingPicturePaths: [],
        feedback: null
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
    }
  },
  methods: {
    fetchData() {
      MarksRepository.find(this.marksID)
          .then(response => {
            let data = response.data;

            this.details.markingPicturePaths = data.marks_details.marking_picture_url.split(',');
            this.details.feedback = data.marks_details.marks_feedback;

          })
    },
    toggleMode() {
      this.isShowingFeedback = !this.isShowingFeedback;
      this.isShowingMarkings = !this.isShowingMarkings;
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
