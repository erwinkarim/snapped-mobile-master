<template>
  <layout-one>
    <!-- Subject Title + Period -->
    <div class="text-purple-primary font-bold text-left text-sm bg-gray-secondary py-2 px-5 mb-5">
      Jan - Dec {{ $store.getters.currentYear }}
    </div>

    <div class="">
      <div v-for="teacher in teachers"
           :key="teacher.teacher_id"
           class="text-left px-5 py-2 md:py-3 flex flex-row w-full border-b-1 items-center bg-white">

        <div class="flex flex-row items-center truncate w-11/12">
          <icon-base-two class=" w-1/6">
            <profile-photo :gender="teacher.gender"/>
          </icon-base-two>
          <div class="ml-5 text-purple-primary w-5/6 mr-2 truncate pr-4">
            {{ teacher.name }}
          </div>
        </div>
        <div class=" w-1/12">
          <icon-base-two v-if="teacher.is_homeroom" class="w-full">
            <bookmark-icon/>
          </icon-base-two>
        </div>
      </div>
    </div>
  </layout-one>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import GoldMedalIcon from "@/components/icons/GoldMedalIcon";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import LayoutOne from "@/views/students/StudentClass/Components/LayoutOne";
import StudentRepository from "@/repositories/StudentRepository";

export default {
  name: "ClassTeachers",
  data() {
    return {
      teachers: [],
      className: ''
    }
  },
  methods: {
    getTeachers() {
      StudentRepository.getClassTeachers({
        pageNum: 1,
        perPage: 50
      })
          .then(response => {
            let data = response.data;

            this.teachers = data.data;
            this.className = data.meta.class_name;
          })
    }
  },
  mounted() {
    this.getTeachers();
  },
  components: {LayoutOne, BookmarkIcon, GoldMedalIcon, ProfilePhoto, IconBaseTwo}
}
</script>

<style scoped>

</style>
