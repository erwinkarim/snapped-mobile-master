<template>
  <div class="w-full">

    <div v-if="isPreparingCanvas" class="mt-16 flex flex-col">
      <div class="font-bold text-lg">
        Please wait.
      </div>
      <div>
        Preparing canvas..
      </div>
    </div>

    <div v-else v-my-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="(path, index) in $store.getters['teacherMarking/images']"
             @click="enterMarkingMode(path, index)"
             :class="swiperClass"
             class=" swiper-slide rounded-2xl h-full overflow-hidden">
          <div
              class="w-full py-2 px-4 h-full flex flex-col justify-start items-center object-cover top-0 items-center absolute">
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
  computed: {
    swiperClass: function () {
      if (this.$store.state.teacherMarking.states.isPreviewing) {
        return 'min-h-screen';
      } else {
        return 'pb-5/4';
      }
    }
  },
  data() {
    return {

      // states
      isPreparingCanvas: false,

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

    enterMarkingMode(path, index) {

      console.log('begin preparing canvas')
      this.isPreparingCanvas = true;
      this.$store.commit('teacherMarking/togglePreparingCanvasMode')

      if (this.$store.getters["teacherMarking/isPreviewing"]) {

        this.$store.dispatch('teacherMarking/enterMarkingMode', {
          index: index,
          path: path
        })
            .then(() => {
              console.log('redirecting to edit page')
              // this.$store.commit('teacherMarking/togglePreparingCanvasMode')
              router.push({name: 'teacher.assignments.marking.snapped_answer.edit'})
            })
            .catch(error => {
              this.$store.commit('teacherMarking/togglePreparingCanvasMode')
              console.log('Failed to convert image to dataURL')
            })
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
