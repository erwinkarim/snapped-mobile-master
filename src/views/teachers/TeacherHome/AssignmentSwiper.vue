<template>
  <div class="w-full">
    <div v-my-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="item.assignmentID" v-for="item in assignments">

          <div class="max-w-sm h-30 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 pt-5 pb-3">
            <div class="text-left text-purple-primary text-xs-plus">{{item.title}}</div>

            <div class="text-left text-purple-primary text-px-10">{{item.description}}</div>

            <div class="flex flex-row">

              <div class="flex flex-row w-3/4 text-left text-px-10 text-purple-secondary">
                <div class="w-1/4"> {{item.subjectID}} </div>
                <div class="w-1/4"> {{item.classroomID}} </div>
                <div class="w-2/4"> {{ getHumanDate(item.dueDatetime)}}</div>
              </div>

              <div class="w-1/4 bg-purple-secondary rounded-full">

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
import TeacherRepository from "@/repositories/TeacherRepository";
import moment from 'moment'

export default {
  components: {

  },
  directives: {
    mySwiper: directive
  },
  data() {
    return {
      nowDatetime: '',
      assignments: [],
      swiperOption: {
        initialSlide: 0,
        direction: 'horizontal',
        speed: 200,
        slidesPerView: 1.2,
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
        // ...
      }
    }
  },
  methods: {
    getNowDatetime() {
      this.nowDatetime = moment().format()
    },
    getAssignments: function () {

      TeacherRepository.getTeacherAssignments()
          .then(response => {

            const data = response.data.data

            for (let i = 0; i < data.length; i++) {

              let item = data[i];

              let assignmentDetail = {
                assignmentID: item.id,
                subjectID: item.subject_id,
                classroomID: item.classroom_id,
                title: item.title,
                description: item.written_description,
                dueDatetime: item.due_datetime,
              }

              this.assignments.push(assignmentDetail);
            }

          })
    },
    getHumanDate(datetime) {
      return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
    }
  },
  mounted() {
    this.getAssignments()
    // this.interval = setInterval(this.datetime, 1000)
  },

  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>

</style>
