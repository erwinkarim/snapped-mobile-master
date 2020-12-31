<template>

  <div class="mb-20" :class="containerClass" v-scroll="handleScroll">
    <div :key="subject.subject_title" v-for="subject in filteredSubjects">

      <!-- Subject Title + Period -->
      <div class="text-purple-primary truncate font-bold flex flex-row justify-between text-left text-sm bg-gray-secondary py-2 px-5">
        <div class="w-3/5 truncate">
          {{ subject.subject_title }}
        </div>
        <div class="w-2/5 text-right">
          {{ subject.period }}
        </div>
      </div>

      <!-- Student List for Subject -->
      <div @click="goToStudentShow(student.id)" :key="student.id" v-for="student in subject.students"
           class="text-left px-5 py-2 h-20 flex flex-row w-full border-b-1 items-center bg-white"
      >
        <div class="w-1/6 h-full relative">
          <icon-base class="absolute w-full" icon-name="profile-photo-icon" icon-color="white" view-box="0 0 60 55">
            <profile-photo/>
          </icon-base>
        </div>
        <div class="w-5/6 ml-5 text-purple-primary truncate pr-4">
          {{ student.name }}
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
import '@/directives/scroll'
import router from "@/router";

export default {
  name: "SubjectsList",
  components: {ProfilePhoto, IconBase},
  props: {
    search: String
  },
  data() {
    return {

      // States
      loading: false,
      error: null,
      isScrolledDownTwo: false,
      isScrolledUp: false,
      scrollLocation: 0,
      setStickySearchBar: false,

      // Data
      subjects: null,
      filteredSubjects: null

    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
    'search': 'searchName'
  },
  computed: {
    containerClass: function () {
      if (this.setStickySearchBar) {
        return 'mt-20'
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

      TeacherRepository.getSubjectsWithStudentsForTeacherClass({classID: classID, search: null})
          .then(response => {
            this.subjects = response.data.data;
            this.filteredSubjects = response.data.data;
          })
          .catch(err => {

          })
    },
    searchName() {

      // Copy original results into filterSubjects
      this.filteredSubjects = JSON.parse(JSON.stringify(this.subjects));

      this.filteredSubjects = this.filteredSubjects.map((subject) => {
        return {
          period: subject.period,
          students: subject.students.filter(student => {
            return (student.name.toLowerCase()).includes(this.search.toLowerCase())
          }),
          subject_title: subject.subject_title
        }
      })
    },

    goToStudentShow (studentID) {
      router.push({ name: 'student.profile.show', params: { studentID: studentID } })
    },
    handleScroll: function (evt, el) {

      if (window.scrollY > 60 && window.scrollY > this.scrollLocation) {
        let status = window.scrollY > 60
        this.isScrolledDownTwo = status
        this.isScrolledUp = !status
      }

      if (window.scrollY < 60 && window.scrollY < this.scrollLocation) {
        let status = window.scrollY < 60
        this.isScrolledUp = status
        this.isScrolledDownTwo = !status
      }

      this.setStickySearchBar = window.scrollY > 60
      this.scrollLocation = window.scrollY
    }
  }
}
</script>

<style scoped>

</style>
