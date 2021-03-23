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

      <!-- INTEGRATIONS -->
      <div class="w-full px-7 mt-3">
        <section-title class="text-left my-4" title="Integrations"/>

        <!-- GOOGLE CLASSROOM -->
        <div @click="handleGoogleClassroomIntegration"
             class="w-full  py-3 flex flex-row w-full border-b-1 items-center bg-white">
          <div class="w-1/12 text-center">
            <font-awesome-icon class="w-full fa-1x text-purple-primary" :icon="faIcons.google"/>
          </div>
          <div class="w-7/12 ml-5 text-purple-primary text-left  truncate pr-4">
            Google Classroom
          </div>
          <div :class="isGoogleClassroomIntegrated ? 'bg-purple-primary' : 'bg-gray-500'"
               class="text-white rounded-lg py-1 tracking-wide text-xs uppercase px-3 h-full w-4/12"
          >
            {{ isGoogleClassroomIntegrated ? 'DISCONNECT' : 'CONNECT' }}
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

import GoogleClassroomRepository from "@/repositories/GoogleClassroomRepository";

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
  computed: {
    isGoogleClassroomIntegrated() {
      return this.$store.getters.getGoogleIntegrated
    }
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
    handleGoogleClassroomIntegration() {

      // If already integrated, disconnect
      if (this.isGoogleClassroomIntegrated) {
        GoogleClassroomRepository.disconnect()
            .then(response => {
              if (response.data.success) {
                this.$store.dispatch('setAuthUser')
                console.log(response.data.message)
              }
            })
      } else {

        GoogleClassroomRepository.integration()
            .then(response => {

              const newWindow = this.openWindow('', 'message')
              newWindow.location.href = response.data
            })
            .catch(function (error) {
              console.error(error);
            });
      }
    },

    handleMessage(event) {
      if (event.data.success) {
        this.$store.dispatch('setAuthUser')
      }
    },

    /**
     *   Opens a popup window to load Laravel Socialite redirect pages via URL
     **/
    openWindow(url, title, options = {}) {
      if (typeof url === 'object') {
        options = url
        url = ''
      }

      options = {url, title, width: 600, height: 720, ...options}

      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
      const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
      const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height

      options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
      options.top = ((height / 2) - (options.height / 2)) + dualScreenTop

      const optionsStr = Object.keys(options).reduce((acc, key) => {
        acc.push(`${key}=${options[key]}`)
        return acc
      }, []).join(',')

      const newWindow = window.open(url, title, optionsStr)

      if (window.focus) {
        newWindow.focus()
      }

      return newWindow
    }

  },
  mounted() {
    window.addEventListener('message', this.handleMessage)
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
