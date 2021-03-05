<template>
  <dashboard-layout>

    <template v-slot:pageHeader>
      <page-title title="Settings" class="w-3/4"/>
    </template>

    <template v-slot:content>
      <div class="w-full px-7 mt-3">
        <section-title class="text-left mt-4" title="Profile"/>

        <div v-for="detail in details"
             :key="detail.value"
             class="w-full text-left py-3 flex flex-row w-full border-b-1 items-center bg-white"
        >
          <div class="w-1/12">
            <icon-base class=" w-full">
              <component :is="detail.icon"/>
            </icon-base>
          </div>
          <div class="w-5/6 ml-5 text-purple-primary  truncate pr-4">
            {{ detail.value }}
          </div>
        </div>
      </div>
      <div class="w-full px-7 mt-3">
        <section-title class="text-left my-4" title="Integrations"/>

        <div @click="$store.dispatch('googleClassroom/integration')"
             class="w-full  py-3 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-1/12 text-center">
            <font-awesome-icon class="w-full fa-1x text-purple-primary" :icon="faIcons.google"/>
          </div>
          <div class="w-5/6 ml-5 text-purple-primary text-left  truncate pr-4">
            Google Classroom
          </div>
        </div>

      </div>
      <div class="w-full px-7 mt-3">
        <section-title class="text-left my-4" title="Log out"/>


        <!-- LOGOUT -->
        <div @click="logout"
             class="w-full text-left py-4 flex flex-row w-full border-b-1 items-center bg-white"
        >
          <div class="w-1/12">
            <icon-base class="w-full text-red-primary">
              <logout-icon/>
            </icon-base>
          </div>
          <div class="w-5/6 ml-5 text-red-primary  truncate pr-4">
            Log out
          </div>
        </div>
      </div>
    </template>
  </dashboard-layout>
</template>

<script>

export default {
  name: "TeacherSettings",
  data() {
    return {

      faIcons: {
        google: faGoogle
      },

      details: {
        fullName: {
          value: null,
          icon: 'identification-icon'
        },
        school: {
          value: null,
          icon: 'academic-icon'
        },
        email: {
          value: null,
          icon: 'email-icon'
        },
        contactNum: {
          value: null,
          icon: 'phone-icon'
        }
      }
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'login'})
    },
    getDetails: function () {
      TeacherRepository.getTeacherDetails()
          .then(response => {

            if (response.data.success) {

              let data = response.data.data[0];

              this.details.fullName.value = data.fullname;
              this.details.school.value = data.school_name;
              this.details.email.value = data.email;
              this.details.contactNum.value = data.contact_num;
            }
          })
    },
  },
  mounted() {
    this.getDetails()
  },
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
    DashboardLayout,
    FontAwesomeIcon
  },
}


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

// FONT AWESOME
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
</script>

<style scoped>

</style>
