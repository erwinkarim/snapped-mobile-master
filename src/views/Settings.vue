<template>
  <dashboard-layout>

    <template v-slot:pageHeader>
      <page-title title="Settings" />
    </template>

    <template v-slot:content>
      <div class="w-full px-7 mt-3">
        <section-title class="text-left mt-4" title="Profile"/>

        <div class="text-left py-2 h-12 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-7 h-full relative">
            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">
              <identification-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-purple-primary  truncate pr-4">{{ studentDetails.fullname }}</div>
        </div>
        <div class="text-left py-2 h-12 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-7 h-full relative">
            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">
              <academic-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-purple-primary  truncate pr-4">{{ studentDetails.school }}</div>
        </div>
        <div class="text-left py-2 h-12 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-7 h-full relative">
            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">
              <book-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-purple-primary  truncate pr-4">{{ studentDetails.classroom }}</div>
        </div>
        <div class="text-left py-2 h-12 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-7 h-full relative">
            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">
              <email-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-purple-primary  truncate pr-4">{{ studentDetails.email }}</div>
        </div>
        <div class="text-left py-2 h-12 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-7 h-full relative">
            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">
              <phone-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-purple-primary  truncate mr-4">{{ studentDetails.contactNum }}</div>
        </div>
        <div @click="logout" class="text-red-primary text-white py-4 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-1/10">
            <icon-base class="">
              <logout-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-white-primary truncate mr-4 font-semibold">Log out</div>
        </div>
      </div>
    </template>
  </dashboard-layout>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import DashboardLayout from "@/views/layout/DashboardLayout";
import LogoutIcon from "../components/icons/LogoutIcon";
import PhoneIcon from "../components/icons/PhoneIcon";
import EmailIcon from "../components/icons/EmailIcon";
import BookIcon from "../components/icons/BookIcon";
import AcademicIcon from "../components/icons/AcademicIcon";
import IconBase from "../components/IconBase";
import IdentificationIcon from "../components/icons/IdentificationIcon";
import IconBaseTwo from "../components/IconBaseTwo";
import SectionTitle from "../components/SectionTitle";
import TeacherRepository from "../repositories/TeacherRepository";
import StudentRepository from "../repositories/StudentRepository";

export default {
  name: "Settings",
  components: {
    LogoutIcon,
    PhoneIcon,
    EmailIcon,
    BookIcon,
    AcademicIcon,
    IconBase,
    IdentificationIcon,
    IconBaseTwo,
    SectionTitle,
    PageTitle,
    DashboardLayout
  },
  data(){
    return{
      studentDetails:''
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'login'})
    },
    getDetails: function() {
      StudentRepository.getStudentDetails()
              .then(response => {

                const data = response.data.success

                this.studentDetails = {
                  id: data.id,
                  fullname: data.fullname,
                  school: data.school_name,
                  classroom: data.classroom_name,
                  email: data.email,
                  contactNum: data.contact_num
                }
              })
    },
  },
  mounted() {
    this.getDetails()
  }
}
</script>

<style scoped>

</style>
