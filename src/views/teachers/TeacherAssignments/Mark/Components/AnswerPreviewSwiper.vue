<template>
  <div class="w-full">
    <!--div v-my-swiper="swiperOption"-->
    <swiper>

      <!--div class="swiper-wrapper"-->
        <swiper-slide v-for="(path, index) in $store.getters['teacherMarking/images']"
             @click="enterMarkingMode(path, index)"
             :class="swiperClass"
             class=" swiper-slide rounded-2xl h-full overflow-hidden">
          <div
              class="w-full py-2 px-4 h-full flex flex-col justify-start items-center object-cover top-0 items-center absolute">
            <img :src="path" crossorigin="anonymous" />
          </div>
        </swiper-slide>
      <!--/div-->
      <div class="swiper-pagination"></div>
      <!--            <div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--            <div class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
    <!--/div-->
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

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
      this.scrollToTop();

      this.$store.commit('teacherMarking/togglePreparingCanvasMode')

      if (this.$store.getters["teacherMarking/isPreviewing"]) {

        this.$store.dispatch('teacherMarking/enterMarkingMode', {
          index: index,
          path: path
        })
            .then(() => {
              setTimeout(() => {
                this.$store.commit('teacherMarking/setMarkingMode')
                this.$router.push({name: 'teacher.assignments.marking.snapped_answer.edit'})
              }, 1200);


              // this.$store.commit('teacherMarking/togglePreparingCanvasMode')

            })
            .catch(error => {
              this.$store.commit('teacherMarking/togglePreparingCanvasMode')
            })
      }
    },
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
  },
  components: {
    Swiper, SwiperSlide,
  }
}
</script>

<style scoped>

</style>
