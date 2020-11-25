<template>
  <div class="w-full">
    <div v-my-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div @click="enterMarkingMode(path)" :class="swiperClass" class=" swiper-slide rounded-2xl flex flex-col" v-for="path in images">
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
</template>

<script>
import {directive} from "vue-awesome-swiper";
import router from "@/router";

export default {
  name: "AnswerPreviewSwiper",
  props: {
    isPreviewing: Boolean,
    images: Array
  },
  computed: {
    swiperClass: function () {
      if (this.isPreviewing) {
        return 'pb-16/9 bg-black-primary';
      } else {
        return 'pb-5/4';
      }
    }
  },
  data() {
    return {

      // STATES
      isMarking: false,

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
  methods: {
    enterMarkingMode (path) {
      if (this.isPreviewing) {
        this.$emit('nowMarking', path)
        router.push({ name: 'teacher.assignments.marking.snapped_answer.edit'})
      }
    }
  },
  directives: {
    mySwiper: directive
  },
}
</script>

<style scoped>

</style>
