<template>
  <layout-two page-title="Classmate List">

    <div class=" border-t-2 border-opacity-15 border-gray-primary">
      <router-link  :to="{ name: '' }" :key="student.id" v-for="student in students" class="text-left px-5 py-2 h-20 flex flex-row w-full border-b-2 border-opacity-15 border-gray-primary items-center bg-white" >
        <div class="w-1/6 h-full relative">
          <icon-base-two class="absolute w-full" icon-name="profile-photo-icon" icon-color="white" view-box="0 0 60 55">
            <profile-photo/>
          </icon-base-two>
        </div>
        <div class="ml-5 text-purple-primary  truncate pr-4"> {{ student.name }}</div>
      </router-link>
    </div>

  </layout-two>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import FilterIcon from "@/components/icons/FilterIcon";
import PageTitle from "@/components/PageTitle";
import LayoutTwo from "@/views/students/StudentClass/Components/LayoutTwo";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import StudentRepository from "@/repositories/StudentRepository";

export default {
  name: "ClassClassmates",
  data() {
    return {
      search: '',
      students: []
    }
  },
  methods: {
    getClassmates() {
      StudentRepository.getClassmates()
          .then(response => {
            let data = response.data;

            this.students = data.students;
            this.className = data.class_name;
          })
    }
  },
  mounted() {
    this.getClassmates();
  },
  components: {ProfilePhoto, MagnifyingGlassIcon, LayoutTwo, PageTitle, FilterIcon, IconBaseTwo}
}
</script>

<style scoped>

</style>
