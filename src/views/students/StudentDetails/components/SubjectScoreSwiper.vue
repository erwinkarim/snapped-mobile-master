<template>

  <div v-my-swiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="item.classID" v-for="item in classes">
        <div class="max-w-sm h-46 rounded rounded-xl overflow-hidden bg-gray-secondary flex flex-col px-3 py-3">

        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <!--      <div class="swiper-button-prev" slot="button-prev"></div>-->
    <!--      <div class="swiper-button-next" slot="button-next"></div>-->
  </div>
</template>

<script>
import {directive} from "vue-awesome-swiper";
import TeacherRepository from "@/repositories/TeacherRepository";
import router from "@/router";

export default {
  name: "SubjectScoreSwiper",
  data() {
    return {
      classes: [1, 2, 3],
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
  methods: {},
  mounted() {

  },
  directives: {
    mySwiper: directive
  },
}
</script>

<style scoped>

</style>
