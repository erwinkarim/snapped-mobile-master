<template>
  <div>
    <div v-my-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="goToClass(item.classID)" :key="item.classID" v-for="item in classes">
          <div class="max-w-sm h-46 rounded rounded-xl overflow-hidden bg-gray-secondary flex flex-col px-3 py-3">

            <div class="flex-grow">
              <icon-base width="100" height="50" icon-name="app-logo" icon-color="white" view-box="0 0 105 50">
                <ProfilePhotoStacked/>
              </icon-base>

              <div class="text-left text-px-10 ml-1 mt-2 text-purple-secondary">
                <span class="font-bold text-xs">{{ item.numOfStudents }}</span> Students
              </div>
            </div>

            <div class="flex flex-row mt-4 text-left w-full items-end">
              <div class="text-md flex-grow pb-2">
                <span class="">{{ item.className }} </span>
              </div>
              <div>
                <icon-base width="28" height="50" icon-name="app-logo" icon-color="white" view-box="-5 5 27 27">
                  <BookmarkIcon/>
                </icon-base>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
<!--      <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--      <div class="swiper-button-next" slot="button-next"></div>-->
    </div>
  </div>

</template>

<script>

import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import StackedProfilePhoto from "@/components/icons/ProfilePhotoStacked";
import IconBase from "@/components/IconBase";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import ProfilePhotoStacked from "@/components/icons/ProfilePhotoStacked";
import TeacherRepository from "@/repositories/TeacherRepository";
import router from "@/router";


export default {
  components: {ProfilePhotoStacked, BookmarkIcon, IconBase, StackedProfilePhoto},
  directives: {
    mySwiper: directive
  },
  data() {
    return {
      classes: [],
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
    getClasses: function () {

      TeacherRepository.getTeacherClasses()
          .then(response => {

            const data = response.data.data

            for (let i = 0; i < data.length; i++) {

              let item = data[i];

              let classDetail = {
                classID : item.class_id,
                className: item.class_name,
                numOfStudents: item.num_of_students
              }

              this.classes.push(classDetail);
            }

          })
    },

    goToClass (classID) {
      router.push({ name: 'teacher.classes.details', params: { classID: classID } })
    },

  },
  mounted() {
    this.getClasses()
  }
}

</script>

<style scoped>

</style>
