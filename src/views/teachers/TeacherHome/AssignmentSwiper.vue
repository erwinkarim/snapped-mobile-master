<template>
  <div class="w-full">
    <div v-my-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="assignment.assignmentID" v-for="assignment in assignments">

          <router-link :to="{name: 'teacher.assignments.show', params: { assignmentID: assignment.assignmentID }}" class="max-w-sm h-30 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 pt-5 pb-3">
            <div class="text-left text-purple-primary text-xs-plus truncate  pr-10">{{ assignment.title }}</div>

            <div class="text-left text-purple-primary text-px-10 truncate pr-10">{{ assignment.description }}</div>

            <div class="flex flex-row">

              <div class="flex flex-row w-3/4 text-left text-px-10 text-purple-secondary">
                <div class="w-1/4 truncate"> {{ assignment.subjectName }}</div>
                <div class="w-1/4  truncate mx-1"> {{ assignment.classroomName }}</div>
                <div class="w-2/4"> {{ getHumanDate(assignment.dueDatetime) }}</div>
              </div>

              <div class="w-1/4 bg-purple-secondary rounded-full">

              </div>
            </div>

          </router-link>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import TeacherRepository from "@/repositories/TeacherRepository";
import moment from 'moment'
import AssignmentRepository from "@/repositories/AssignmentRepository";

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

      AssignmentRepository.active()
          .then(response => {

            const data = response.data.data

            for (let i = 0; i < data.length; i++) {

              let item = data[i];

              let assignmentDetail = {
                assignmentID: item.assignment_id,
                subjectName: item.subject_name,
                classroomName: item.classroom_name,
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
