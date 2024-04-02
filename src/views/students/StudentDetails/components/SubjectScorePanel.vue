<template>
  <div class="mt-8">
    <section-title class="text-left" title="Overall Subject Score"/>
    <!-- SUBJECTS  -->
    <div class="mt-5">
      <!--div v-my-swiper="swiperOption"-->
      <swiper :modules="modules" :pagination="{ clickable: true }">
        <!--div class="swiper-wrapper"-->
          <!--div class="swiper-slide" :key="subject.subject_id" v-for="(subject, index) in subjects"-->
          <swiper-slide class="swiper-slide" :key="subject.subject_id" v-for="(subject, index) in subjects">
            <div :style="cardStyle(index)" class="max-w-sm  rounded rounded-xl text-left text-white overflow-hidden bg-gray-secondary flex flex-col justify-between px-4 py-8">
              <div class="text-lg items-start multi-line-truncate h-14 mb-4">{{subject.subject_name}}</div>
              <div><span class="text-3xl font-bold pr-1">{{subject.overall_mark}}</span> <span class="text-sm">Marks</span></div>
            </div>
          </swiper-slide>
        <!--/div-->
        <!--div class="swiper-pagination"></div-->
        <!--      <div class="swiper-button-prev" slot="button-prev"></div>-->
        <!--      <div class="swiper-button-next" slot="button-next"></div>-->
      </swiper>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  name: "SubjectScorePanel",
  props: {
    subjects: Array
  },
  setup(){
    return {
      modules: [Pagination],
    };
  },
  data() {
    return {
      swiperOption: {
        initialSlide: 0,
        direction: 'horizontal',
        speed: 200,
        slidesPerView: 2.3,
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
  methods: {
    cardStyle(index) {
      switch (index){
        case (index % 3 === 0):
          return {'background-color': "#FFDA79"};

        case (index % 2 === 0):
          return {'background-color': "#FF793F"};

        default:
          return {'background-color': "#F53B57"};

      }
    }
  },
  components: {SectionTitle, Swiper, SwiperSlide}
}
</script>

<style scoped>
  .multi-line-truncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
