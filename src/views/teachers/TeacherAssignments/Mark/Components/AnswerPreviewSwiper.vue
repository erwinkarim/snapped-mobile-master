<template>
  <div class="w-full">
    <div v-my-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div :class="swiperClass" class="swiper-slide  rounded-2xl" v-for="item in answers">

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

export default {
  name: "AnswerPreviewSwiper",
  props: {
    isPreviewing: Boolean
  },
  computed: {
    swiperClass: function () {
      if (this.isPreviewing) {
        return 'pb-16/9 bg-black-primary';
      } else {
        return 'pb-5/4 bg-gray-secondary';
      }
    }
  },
  data() {
    return {
      answers: [1, 2, 3, 4, 5, 6, 7],
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
  directives: {
    mySwiper: directive
  },
}
</script>

<style scoped>

</style>
