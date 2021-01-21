<template>

  <div>
    <div v-my-swiper="swiperOption"
         @slideChangeTransitionEnd="handleSlideChange"
         v-on:imagesReady ="handleSwiperImagesReady"
         class="w-full"
    >
      <div class="swiper-wrapper">
        <div v-for="path in snappedAnswerPaths"
             :class="swiperClass"
             class="swiper-slide rounded-2xl h-full overflow-hidden"
        >
          <div class="w-full py-2 px-4 h-full object-cover top-0 items-center absolute">
            <img class="" :src="path">
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>


</template>

<script>
import {directive} from "vue-awesome-swiper";
import IconBaseTwo from "@/components/IconBaseTwo";
import ExpandImageIcon from "@/components/icons/ExpandImageIcon";

export default {
  name: "QuestionPreviewSwiper",
  props: {
    isPreviewing: Boolean,
    snappedAnswerPaths: Array
  },
  watch: {
    'swiperDetails.slidesCount' : 'emitSwiperDetails',
    'swiperDetails.activeSlideIndex' : 'emitSwiperDetails'
  },
  data() {
    return {

      swiperDetails: {
        slidesCount: 0,
        activeSlideIndex: 0,
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
    swiperClass: function () {
      if (this.isPreviewing) {
        return 'min-h-screen';
      } else {
        return 'pb-5/4';
      }
    }
  },
  methods: {
    handleSwiperImagesReady(swiper) {
      this.swiperDetails = {
        slidesCount: swiper.imagesLoaded,
        activeSlideIndex: swiper.activeIndex,
      }
    },
    handleSlideChange(swiper) {
      this.swiperDetails.activeSlideIndex = swiper.activeIndex
    },
    getSwiperDetails() {
      this.swiperDetails = {
        slidesCount: this.$swiper.imagesLoaded,
        activeSlideIndex: this.$swiper.activeIndex,
      }
    },
    emitSwiperDetails() {
      this.$emit('swiperDetails', this.swiperDetails)
    }
  },
  mounted() {
    this.getSwiperDetails()
  },

  directives: {
    mySwiper: directive
  },
  components: {ExpandImageIcon, IconBaseTwo},

}
</script>

<style scoped>

</style>
