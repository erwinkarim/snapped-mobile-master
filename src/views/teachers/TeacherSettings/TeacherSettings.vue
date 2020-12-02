<template>
  <dashboard-layout >

    <template v-slot:pageHeader>
        <page-title title="Settings" class="w-3/4" />
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
          <div class="ml-5 text-purple-primary  truncate pr-4">{{ teacherDetails.fullname }}</div>
        </div>
        <div class="text-left py-2 h-12 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-7 h-full relative">
            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">
              <academic-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-purple-primary  truncate pr-4">{{ teacherDetails.school }}</div>
        </div>
<!--        <div class="text-left py-2 h-12 flex flex-row w-full border-b-1 items-center bg-white">-->
<!--          <div class="w-7 h-full relative">-->
<!--            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">-->
<!--              <book-icon/>-->
<!--            </icon-base>-->
<!--          </div>-->
<!--          <div class="ml-5 text-purple-primary  truncate pr-4">{{ teacherDetails.classroom }}</div>-->
<!--        </div>-->
        <div class="text-left py-2 h-12 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-7 h-full relative">
            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">
              <email-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-purple-primary  truncate pr-4">{{ teacherDetails.email }}</div>
        </div>
        <div class="text-left py-2 h-12 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-7 h-full relative">
            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">
              <phone-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-purple-primary  truncate mr-4">{{ teacherDetails.contactNum }}</div>
        </div>
        <div @click="logout" class="text-red-primary text-white py-2 mt-5 h-12 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-7 h-full relative">
            <icon-base class="absolute w-full" icon-color="white" view-box="0 0 60 55">
              <logout-icon/>
            </icon-base>
          </div>
          <div class="ml-5 text-white-primary truncate mr-4">Log out</div>
        </div>
      </div>
<!--      <div class="flex flex-row w-full items-center justify-center mt-10">-->
<!--        <button @click="logout"-->
<!--                class="w-2/3 mt-3 font-display text-white font-bold py-2 px-4 rounded-full h-14 text-lg inline-flex justify-center items-center bg-red-primary">-->
<!--          Log Out-->
<!--        </button>-->
<!--      </div>-->
    </template>
  </dashboard-layout>
</template>

<script>

import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";
import SectionTitle from "../../../components/SectionTitle";
import IconBaseTwo from "../../../components/IconBaseTwo";
import IdentificationIcon from "../../../components/icons/IdentificationIcon";
import IconBase from "../../../components/IconBase";
import AcademicIcon from "../../../components/icons/AcademicIcon";
import BookIcon from "../../../components/icons/BookIcon";
import EmailIcon from "../../../components/icons/EmailIcon";
import PhoneIcon from "../../../components/icons/PhoneIcon";
import LogoutIcon from "../../../components/icons/LogoutIcon";
import TeacherRepository from "../../../repositories/TeacherRepository";

export default {
  name: "TeacherSettings",
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
      teacherDetails:''
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'login'})
    },
    getDetails: function() {
      TeacherRepository.getTeacherDetails()
              .then(response => {

                const data = response.data.success

                this.teacherDetails = {
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
