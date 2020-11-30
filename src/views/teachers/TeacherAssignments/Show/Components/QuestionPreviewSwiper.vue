<template>
  <div :class="isPreviewing ? 'bg-white' : 'bg-black-primary'" class="pt-3 pb-7 rounded-2xl">
    <div @click="togglePreview"
         class="z-30 flex flex-row justify-end pr-4 pb-2"
    >
      <icon-base-two :class="isPreviewing ? 'w-1/12' : 'w-1/24'">
        <expand-image-icon :stroke-color="isPreviewing ? 'black' : 'white'"/>
      </icon-base-two>
    </div>
    <div :class="isPreviewing ? 'bg-white' : 'bg-black-primary'" class="w-full  rounded-2xl">

      <div v-my-swiper="swiperOption">
        <div class="swiper-wrapper">
          <div
              :class="swiperClass"
              class=" swiper-slide rounded-2xl flex flex-col"
              v-for="path in snappedAnswerPaths">
            <div class="w-full h-full object-cover top-0 flex flex-row items-center absolute">
              <img :src="path">
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import {directive} from "vue-awesome-swiper";
import IconBaseTwo from "@/components/IconBaseTwo";
import ExpandImageIcon from "@/components/icons/ExpandImageIcon";


export default {
  name: "QuestionPreviewSwiper",
  props: {
    snappedAnswerPaths: Array
  },
  data() {
    return {

      // States
      isPreviewing: false,

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
    swiperClass: function () {
      if (this.isPreviewing) {
        return 'pb-16/9 ';
      } else {
        return 'pb-5/4';
      }
    }
  },
  methods: {
    togglePreview() {
      this.isPreviewing = !this.isPreviewing;
    }
  },

  directives: {
    mySwiper: directive
  },
  components: {ExpandImageIcon, IconBaseTwo},

}
</script>

<style scoped>

</style>
