<template>
  <div v-my-swiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="subject.subject_title" v-for="subject in subjects">

        <!-- Subject Title + Period -->
        <div class="text-purple-primary font-bold text-left text-sm bg-gray-secondary py-2 px-5">
          {{ subject.subject_title }}, {{ subject.period }}
        </div>

        <!-- Student List for Subject -->
        <div class="text-left px-5 py-2 h-20 flex flex-row w-full border-b-1 items-center bg-white" :key="student.id" v-for="student in subject.students">
          <div class="w-1/6 h-full relative">
            <icon-base class="absolute w-full" icon-name="profile-photo-icon" icon-color="white" view-box="0 0 60 55">
              <profile-photo/>
            </icon-base>
          </div>
          <div class="ml-5 text-purple-primary">{{ student.first_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TeacherRepository from "@/repositories/TeacherRepository";
import IconBase from "@/components/IconBase";
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import ProfilePhoto from "@/components/icons/ProfilePhoto";


export default {
  name: "SubjectsList",
  components: {ProfilePhoto, IconBase},
  directives: {
    mySwiper: directive
  },
  data() {
    return {
      loading: false,
      subjects: null,
      error: null,
      swiperOption: {
        initialSlide: 0,
        direction: 'vertical',
        speed: 200,
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
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {

    fetchData() {
      this.error = this.subjects = null
      this.loading = true

      const classID = this.$route.params.classID

      TeacherRepository.getSubjectsWithStudentsForTeacherClass(classID)
          .then(response => {
            this.subjects = response.data.data
          })
          .catch(err => {

          })
    }
  }
}
</script>

<style scoped>

</style>
