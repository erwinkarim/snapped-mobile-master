<template>
  <assignment-dashboard-layout>


    <template v-slot:content>

      <page-title-three class="px-2">
        <template v-slot:leftAction>
          <nav-back class="w-5/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          New Assignment
        </template>
        <template v-slot:title>
          New Assignments
        </template>
      </page-title-three>

      <!-- DESCRIPTION -->
      <div class="w-full break-words px-7 mt-3 text-left text-purple-secondary text-sm leading-snug">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
      </div>

      <!-- FORM -->
     <div class="w-full px-7 mt-3">
       <input v-model="title"
                  class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                  type="text" placeholder="Title" autocomplete="off">

       <select v-model="subject"
               class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
         <option disabled value="">Subject</option>
         <option v-for="subject in subjects" :key="subject.id">{{subject.name}}</option>
       </select>

       <select v-model="classroom"
               class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
         <option disabled value="">Class</option>
         <option v-for="classroom in classrooms" :key="classroom.id">{{classroom.name}}</option>
       </select>

       <button class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
         Create Question
       </button>

       <div class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
         Set Duration
       </div>

       <textarea placeholder="Remarks"
           class="pl-6 pr-2 py-5 mt-2 h-36  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"/>

     </div>

    </template>

    <template v-slot:bottomBar>
      <div class="w-4/7 px-2">
        <router-link :to="{name:''}" class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
          <div class="w-5/7">
            Schedule Publish
          </div>
          <icon-base-two class="w-1/7">
            <calendar-icon/>
          </icon-base-two>
        </router-link>
      </div>
      <div class="w-3/7 px-2">
        <button class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
          <div class="w-5/7">
            Publish Now
          </div>
        </button>
      </div>
    </template>
  </assignment-dashboard-layout>
</template>

<script>
import AssignmentDashboardLayout from "@/views/layout/AssignmentDashboardLayout";
import IconBaseTwo from "@/components/IconBaseTwo";
import CalendarIcon from "@/components/icons/CalendarIcon";
import PageTitle from "@/components/PageTitle";
import NavBack from "@/components/NavBack";
import PageTitleTwo from "@/components/PageTitleTwo";
import PageTitleThree from "@/components/PageTitleThree";
export default {
  name: "AssignmentForm",
  data() {
    return {

      // MODELS
      title: '',
      subject: '',
      classroom: '',
      question: '',
      duration: '',
      remarks: '',

      // DATA
      subjects: [
        {
          id: 1,
          name: 'Sejarah'
        },
        {
          id: 2,
          name: 'Matematik Tambahan'
        },
        {
          id: 3,
          name: 'Matematik Tambahan'
        }
      ],
      classrooms: [
        {
          id: 1,
          name: '1 Opal'
        },
        {
          id: 2,
          name: '1 Bestari'
        },
        {
          id: 3,
          name: '1 Topaz'
        }
      ]
    }
  },
  components: {PageTitleThree, PageTitleTwo, NavBack, PageTitle, CalendarIcon, IconBaseTwo, AssignmentDashboardLayout}
}
</script>

<style scoped>

</style>
