<template>
  <div class="w-full">
    <div v-my-swiper="swiperOption">
      <div class="swiper-wrapper">

        <assignment-card
            v-for="assignment in assignments"
            :key="assignment.assignmentID"
            :assignment="assignment"
            :route="{name: 'teacher.assignments.show', params: { assignmentID: assignment.assignmentID }}"
            :description-lines="1"
            class="mt-4 swiper-slide h-30"
        />
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
import AssignmentCard from "@/components/AssignmentCard";

export default {
  components: {
    AssignmentCard

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
