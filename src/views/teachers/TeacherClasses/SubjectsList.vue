<template>

  <div class="mb-20" :class="containerClass" v-scroll="handleScroll">
      <div :key="subject.subject_title" v-for="subject in subjects">

        <!-- Subject Title + Period -->
        <div :class="titleClass" class="text-purple-primary font-bold text-left text-sm bg-gray-secondary py-2 px-5">
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

</template>

<script>
import TeacherRepository from "@/repositories/TeacherRepository";
import IconBase from "@/components/IconBase";
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import '@/directives/scroll'

export default {
  name: "SubjectsList",
  components: {ProfilePhoto, IconBase},
  data() {
    return {
      loading: false,
      subjects: null,
      error: null,
      isScrolledDownTwo: false,
      isScrolledUp: false,
      scrollLocation: 0
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    titleClass: function () {
      if (this.isScrolledDownTwo) {
        // return 'mt-60'
      }
    },
    containerClass: function () {
      if (this.isScrolledDownTwo) {
        return 'mt-58'
      }
      if (this.isScrolledUp) {
        return 'mt-0'
      }
    }
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
    },
    handleScroll: function (evt, el) {

      if (window.scrollY > 50 && window.scrollY > this.scrollLocation) {
        let status = window.scrollY > 50
        this.isScrolledDownTwo  = status
        this.isScrolledUp  = !status
      }

      if (window.scrollY < 50 && window.scrollY < this.scrollLocation) {
        let status = window.scrollY < 50
        this.isScrolledUp  = status
        this.isScrolledDownTwo  = !status
      }

      this.scrollLocation = window.scrollY

    }
  }
}
</script>

<style scoped>

</style>
