<template>
  <div>
    <div v-my-swiper="swiperOption">
      <div class="swiper-wrapper">

        <div class="swiper-slide" v-for="(column, index) in classes">

          <!-- CARD: CLASS DETAILS -->
          <div v-for="(item, index) in column"
               :key="item.classID"
               @click="goToClass(item.classID, item.className)"
               class="max-w-sm h-46 rounded rounded-xl overflow-hidden bg-gray-secondary flex flex-col px-3 py-3 mb-8"
          >
            <div class="flex-grow">
              <icon-base width="100" height="50" icon-name="app-logo" icon-color="white" view-box="0 0 105 50">
                <ProfilePhotoStacked/>
              </icon-base>

              <!-- Num of Students -->
              <div class="text-left text-px-10 ml-1 mt-3 text-purple-secondary">
                <span class="font-bold text-xs mr-1">{{ item.numOfStudents }}</span> Students
              </div>

              <!-- Num of Active Assignments -->
              <div class="text-left text-px-10 ml-1 mt-1 text-purple-secondary">
                <span class="font-bold text-xs mr-1">{{ item.numOfActiveAssignments }}</span> Active Assignments
              </div>
            </div>

            <div class="flex flex-row mt-4 text-left w-full items-center">
              <div class="text-md w-4/5 md:w-6/7 pb-2 truncate">
                <span class="truncate">{{ item.className }} </span>
              </div>
                <icon-base-two v-if="item.isHomeroom === true"
                  class="w-1/5 md:w-1/7"
                >
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
// import 'swiper/swiper-bundle.css'
import 'swiper/css/swiper.css'
import TeacherRepository from "@/repositories/TeacherRepository";
import IconBase from "@/components/IconBase";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import ProfilePhotoStacked from "@/components/icons/ProfilePhotoStacked";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import router from "@/router";
import IconBaseTwo from "@/components/IconBaseTwo";

export default {
  name: "ClassesSwiper",
  components: {IconBaseTwo, BookmarkIcon, ProfilePhotoStacked, IconBase},
  directives: {
    mySwiper: directive
  },
  watch: {
    'numOfClasses' : 'emitNumOfClasses'
  },
  data(){
    return {
      numOfClasses: 0,
      classes: [],
      swiperOption: {
        initialSlide: 0,
        direction: 'horizontal',
        speed: 200,
        slidesPerView: 2,
        spaceBetween: 30,
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
    getClasses(){
      TeacherRepository.getTeacherClasses()
          .then(response => {

            const data = response.data.data

            this.numOfClasses = data.length;

            let column = [];
            let cardsPerColumn = 2;

            for (let i = 0; i < data.length; i++) {

              let item = data[i];

              let classDetail = {
                classID : item.class_id,
                className: item.class_name,
                numOfStudents: item.num_of_students,
                numOfActiveAssignments: item.num_of_active_assignments,
                isHomeroom: item.homeroom
              }

              if (column.length < cardsPerColumn) {
                column.push(classDetail)
              }

              if (column.length === cardsPerColumn || i + 1 === data.length) {
                this.classes.push(column)
                column = []
              }
            }
          })
    },
    goToClass (classID, className) {
      router.push({ name: 'teacher.class.details', params: { classID: classID , className: className} })
    },
    emitNumOfClasses () {
      this.$emit('numOfClasses', this.numOfClasses)
    },
  },
  mounted() {
    this.getClasses()
  }
}
</script>

<style scoped>

</style>
