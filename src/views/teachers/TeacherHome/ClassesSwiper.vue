<template>
  <div>
    <div v-my-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="goToClass(item.classID)" :key="item.classID" v-for="item in classes">
          <div class="max-w-sm h-46 rounded rounded-xl overflow-hidden bg-gray-secondary flex flex-col px-3 py-3">

            <div class="flex-grow">
              <icon-base width="100" height="50" icon-name="app-logo" icon-color="white" view-box="0 0 105 50">
                <ProfilePhotoStacked/>
              </icon-base>

              <div class="text-left text-px-10 ml-1 mt-3 text-purple-secondary">
                <span class="font-bold text-xs">{{ item.numOfStudents }}</span> Students
              </div>

              <!-- Num of Active Assignments -->
              <div class="text-left text-px-10 ml-1 mt-1 text-purple-secondary">
                <span class="font-bold text-xs mr-1">{{ item.numOfActiveAssignments }}</span> Active Assignments
              </div>
            </div>

            <div class="flex flex-row mt-4 text-left w-full items-start justify-between">
              <div class="text-sm md:text-md pb-2 w-4/5 md:w-6/7 truncate">
                <span class="truncate">{{ item.className }} </span>
              </div>
                <icon-base-two class="w-1/5 md:w-1/7" v-if="item.isHomeroom === true">
                  <BookmarkIcon/>
                </icon-base-two>
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
// this causes installation issues
// import 'swiper/swiper-bundle.css'
// import 'swiper/css/swiper.css';
import StackedProfilePhoto from "@/components/icons/ProfilePhotoStacked";
import IconBase from "@/components/IconBase";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import ProfilePhotoStacked from "@/components/icons/ProfilePhotoStacked";
import TeacherRepository from "@/repositories/TeacherRepository";
// import router from "@/router";
import { router } from "@/main.js";
import IconBaseTwo from "@/components/IconBaseTwo";


export default {
  components: {IconBaseTwo, ProfilePhotoStacked, BookmarkIcon, IconBase, StackedProfilePhoto},
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
        slidesPerView: 2.2,
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
                numOfStudents: item.num_of_students,
                isHomeroom : item.homeroom,
                numOfActiveAssignments: item.num_of_active_assignments
              }

              this.classes.push(classDetail);
            }

          })
    },

    goToClass (classID) {
      router.push({ name: 'teacher.class.details', params: { classID: classID } })
    },

  },
  mounted() {
    this.getClasses()
  }
}

</script>

<style scoped>

</style>
