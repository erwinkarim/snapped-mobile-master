<template xmlns="http://www.w3.org/1999/html">
  <dashboard-layout :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
        <!-- HEADER NEW ASSIGNMENT -->
      <page-header-three v-if="showQuestion === false && showDescription === false" class="px-2" :has-scroll-animation="true">
          <template v-slot:leftAction>
              <nav-back class="w-5/7" stroke-color="red-primary"/>
          </template>
          <template v-slot:mini-title>
              New Assignment
          </template>
          <template v-slot:title>
              New Assignments
          </template>
      </page-header-three>
        <!-- HEADER CREATE QUESTION -->
        <page-header-three v-else-if="showQuestion === true && showDescription === false">
          <template v-slot:leftAction>
              <button @click="updateShow" class="w-5/7">Cancel</button>
          </template>
          <template v-slot:mini-title>
              Create Question
          </template>
          <template v-slot:rightAction>
              <router-link :to="{name : 'teacher.assignments.create'}" class="font-bold text-red-primary" @click.native="saveQuestion">
                  Save
              </router-link>
          </template>
      </page-header-three>
        <!-- HEADER MANUAL DESCRIPTION -->
        <page-header-three v-if="showDescription === true">
            <template v-slot:leftAction>
                <button @click="updateShowManualDescription" class="w-5/7">Cancel</button>
            </template>
            <template v-slot:mini-title>
                Manual Description
            </template>
            <template v-slot:rightAction>
                <button @click="updateManualDescription" class="font-bold text-red-primary">
                    Save
                </button>
            </template>
        </page-header-three>
    </template>
    <template v-slot:content>
        <!-- ASSIGNMENT -->
        <div v-if="showQuestion === false && showDescription === false">
            <!-- DESCRIPTION -->
            <div class="w-full break-words px-7 mt-3 text-left text-purple-secondary text-sm leading-snug">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
            </div>

            <!-- FORM ASSIGNMENT-->
            <div class="w-full px-7 mt-3 pb-3">
                <!--       <input v-model="teacherID" class="invisible">-->
                <input v-model="title"
                       class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                       type="text" placeholder="Title" autocomplete="off">

                <select v-model="subject_id"
                        class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                    <option disabled value="">Subject</option>
                    <option v-for="subject in subjects" :value="subject.id">{{subject.name}}</option>
                </select>

                <select v-model="classroom_id"
                        class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                    <option disabled value="">Class</option>
                    <option v-for="classroom in classrooms" :value="classroom.id">{{classroom.name}}</option>
                </select>

<!--                <router-link :to="{name : 'teacher.assignments.question'}" class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary" type="text" tag="button">-->
<!--                    <span v-if="titleQuestionAdded && descriptionAdded">Question</span>-->
<!--                    <span v-else>Create Question</span>-->
<!--                </router-link>-->

                <button @click="updateShow" class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary" type="text" tag="button">
                    <span v-if="titleQuestion">Question</span>
                    <span v-else>Create Question</span>
                </button>

                <div class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                    Set Duration
                </div>

                <textarea v-model="remarks" placeholder="Remarks"
                          class="pl-6 pr-2 py-5 mt-2 h-36  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"/>
            </div>
        </div>
        <!-- FORM QUESTION -->
        <div v-else-if="showQuestion === true && showDescription === false" class="flex-wrap relative top-12">
                <!-- DESCRIPTION -->
                <div class="w-full break-words px-7 mt-26 text-left text-purple-secondary text-sm leading-snug">
                    Fill the question title and select description method
                </div>

                <!-- FORM -->
                <!--        <form @submit.prevent="handleSubmit">-->
                <div class="relative w-full px-7 mt-3 max-h-full">
                    <input v-model="titleQuestion"
                           class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                           type="text" placeholder="Title" autocomplete="off">
                    <div v-if="descriptionQuestion" class="flex mb-4 -mx-1">
                        <button @click="updateShowManualDescription"
                                     class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                                     type="text" autocomplete="off">Edit Description</button>
                    </div>
                    <div v-if="!images.length || !descriptionQuestion" class="flex mb-4 -mx-1">
                        <div class="w-1/2 h-12 px-1">
                            <button @click="updateShowManualDescription"
                                         class="mt-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline">
                                <div class="py-4 row-span-1 col-span-1 flex justify-center">
                                    <icon-base-two class="w-12">
                                        <pen-icon class="w-12" :stroke-color="strokeColor"></pen-icon>
                                    </icon-base-two >
                                </div>
                                <div class="py-2 row-span-2 col-span-1 flex justify-center">
                                    Manual
                                </div>
                            </button>
                        </div>
                        <div class="w-1/2 h-12 px-1">
                            <button class="mt-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline">
                                <div class="py-4 row-span-1 col-span-1 flex justify-center">
                                    <icon-base-two class="w-12">
                                        <camera-icon></camera-icon>
                                    </icon-base-two>
                                </div>
                                <div class="py-2 row-span-2 col-span-1 flex justify-center">
                                    Upload
                                </div>
                            </button>
                        </div>
                    </div>
                    <div v-for="(image, key) in images" class="flex mb-4 -mx-1">
                        <button class="text-left pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                        >
                            <img :src="image" class="preview">
                            View Image
                        </button>
                        <button @click="removeImage(key)">Delete</button>
                    </div>
                    <div class="flex mb-4 -mx-1">
                        <input type="file" multiple @change="onFileSelected">
                    </div>
                    <div class="grid grid-rows-1">
                    </div>
                </div>
                <!--        </form>-->

                <!-- DESCRIPTION -->
                <div class="w-full break-words px-7 mt-20 pt-2 text-left text-purple-secondary text-sm leading-snug">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna.
                </div>
            </div>
        <!-- FORM MANUAL DESCRIPTION -->
        <div v-if="showDescription === true" class="flex-wrap relative top-12">
            <!-- DESCRIPTION -->
            <textarea v-model="descriptionQuestion" class="w-full h-48 form-textarea block break-words px-7 mt-26 text-left text-purple-secondary text-sm leading-snug"
                      placeholder="Enter description"
            />
        </div>

<!--        Modal Calendar-->
        <div v-if="toggleSchedule" class="pin absolute flex items-center justify-center bg-transparent-black">
            <div class="bg-white rounded shadow p-8 m-4 max-w-lg max-h-full text-center overflow-y-scroll">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8" @submit.prevent>
                    <div class="mb-4">
      <span class="block text-gray-600 text-sm text-left font-bold mb-2"
      >Select Range</span
      >
                        <v-date-picker
                                v-model="range"
                                mode="dateTime"
                                :masks="masks"
                                is-range
                        >
                            <template v-slot="{ inputValue, inputEvents, isDragging }">
                                <div class="flex flex-col sm:flex-row justify-start items-center">
                                    <div class="relative flex-grow">
                                        <svg
                                                class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                        >
                                            <path
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                        <input
                                                class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                                                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                                :value="inputValue.start"
                                                v-on="inputEvents.start"
                                        />
                                    </div>
                                    <span class="flex-shrink-0 m-2">
              <svg
                      class="w-4 h-4 stroke-current text-gray-600"
                      viewBox="0 0 24 24"
              >
                <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
                                    <div class="relative flex-grow">
                                        <svg
                                                class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                        >
                                            <path
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                        <input
                                                class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                                                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                                :value="inputValue.end"
                                                v-on="inputEvents.end"
                                        />
                                    </div>
                                </div>
                            </template>
                        </v-date-picker>
                    </div>
                </form>
                <div>
                    <button class="text-black py-2 px-4 rounded">Ok</button>
                </div>
            </div>
        </div>
<!--        End Modal -->
    </template>
    <template v-slot:bottomBar v-if="showQuestion === false & showDescription === false">
      <div class="w-4/7 px-2">
        <button @click="toggleSchedule = !toggleSchedule" class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
          <div class="w-5/7">
            Schedule Publish
          </div>
          <icon-base-two class="w-1/7">
            <calendar-icon/>
          </icon-base-two>
        </button>
      </div>
      <div class="w-3/7 px-2">
        <button @click="sendData"
                class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
          <div class="w-5/7">
            Publish Now
          </div>
        </button>
      </div>
    </template>

  </dashboard-layout>
</template>

<script>
import axios from "axios";
import Vuex from 'vuex'
import Vue from 'vue';
import moment from 'moment'
import IconBaseTwo from "@/components/IconBaseTwo";
import CalendarIcon from "@/components/icons/CalendarIcon";
import PageTitle from "@/components/PageTitle";
import NavBack from "@/components/NavBack";
import PageTitleTwo from "@/components/PageTitleTwo";
import PageHeaderThree from "@/components/PageHeaderThree";
import DashboardLayout from "@/views/layout/DashboardLayout";
import Repository from "@/repositories/Repository";
import TeacherRepository from "@/repositories/TeacherRepository";
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

// Register components in your 'main.js'
Vue.component('v-calendar', Calendar)
Vue.component('v-date-picker', DatePicker)

const token = localStorage.getItem('token')

export default {
    name: "AssignmentForm",
    props: {
        strokeColor: String,
    },
  data() {
    return {
        showQuestion: false,
        showDescription: false,
        // MODELS
        teacherID: localStorage.getItem('teacherID'),
        title: '',
        subject_id: '',
        classroom_id: '',
        duration: '',
        remarks: localStorage.getItem('remarks'),
        titleQuestionAdded: '',
        descriptionAdded: '',
        // questionSnapped: '',
        images: [],
        snappedQuestions: [],
        imagesConfirmed: [],
        snappedQuestionsConfirmed: [],
        titleQuestion: '',
        descriptionQuestion: localStorage.getItem('description'),
        // DATA
        toggleSchedule:false,
        range: {
            start: new Date(2020, 0, 6),
            end: new Date(2020, 0, 23),
        },
        masks: {
            input: 'YYYY-MM-DD h:mm A',
        },
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
    // computed:{
    //   images: function () {
    //     return this.imagesConfirmed
    //   },
    //     snappedQuestions:function () {
    //         return this.snappedQuestionsConfirmed
    //     }
    // },
  watch: {
    title(newTitleName) {
      localStorage.setItem('title', newTitleName)
    },
    remarks(newRemark) {
      localStorage.setItem('remarks', newRemark)
    },
    subject_id(subject_id){
      localStorage.setItem('subject_id', subject_id)
    },
    classroom_id(classroom_id){
      localStorage.setItem('classroom_id', classroom_id)
    },
// question_form
    titleQuestion(titleQuestion){
      localStorage.setItem('title', titleQuestion)
    },
    description(descriptionQuestion){
      localStorage.setItem('description', descriptionQuestion)
    }
  },
  methods:{
      showModal(type = 'default') {
          return vueModal().title(this.titleModal).text(this.body).appearance(type).show();
      },
    updateShow() {
        this.showQuestion = this.showQuestion !== true;
    },
    updateShowManualDescription(){
      this.showDescription = this.showDescription !== true;
    },
    updateManualDescription(){
        this.updateShowManualDescription()
    },
    onFileSelected(e){
        var files = e.target.files || e.dataTransfer.files

        if(!files.length){
            return
        }

        for (var i=0; i < files.length; i++) {
            this.snappedQuestions.push(files[i])
        }

        let fileList = Array.prototype.slice.call(e.target.files);
        fileList.forEach(f => {

            if(!f.type.match("image.*")) {
                return;
            }

            let reader = new FileReader();
            let that = this;

            reader.onload = function (e) {
                that.images.push(e.target.result);
            }
            reader.readAsDataURL(f);
        });
    },
    removeImage(key){
        this.images.splice(key,1);
        this.snappedQuestions.splice(key,1);

        if(!this.images.length){

            this.$refs.im.value = '';

        }

        console.log(this.snappedQuestions)
    },
    saveQuestion() {
      // localStorage.titleQuestion = this.title;
      // localStorage.setItem("questionImages", JSON.stringify(this.images))
        this.imagesConfirmed = this.images
        console.log(this.snappedQuestions)
        this.updateShow()
    },
      format_date(value){
          if (value) {
              return moment(String(value)).format('YYYYMMDD')
          }
      },
    sendData(e){
        let formData = new FormData();

        formData.append('teacher_id', this.teacherID);
        formData.append('subject_id', this.subject_id);
        formData.append('class_id', this.classroom_id);
        formData.append('title', this.title);
        formData.append('written_question_title', this.titleQuestion);
        formData.append('written_description', this.descriptionQuestion);
        formData.append('due_datetime', this.format_date(this.range.end));
        formData.append('remarks', this.remarks);


        for( var i = 0; i < this.snappedQuestions.length; i++ ){
            let file = this.snappedQuestions[i];

            formData.append('snap_question[' + i + ']', file);
        }

        Repository.post('/assignments/store',
            formData,
        {
            headers: {
                'Content-Type':'multipart/form-data'
            }
      })
      .then(response => this.responseData = response.data)
      .catch(error => {});

        console.log(this.snappedQuestions)

        let keysToRemove = ["title", "subject_id", "classroom_id", "remarks","titleQuestion","description","result0"];

        keysToRemove.forEach(k => localStorage.removeItem(k))
    },
    getDetails: function() {
      TeacherRepository.getTeacherDetails()
              .then(response => {

                const data = response.data.success

                  let teacherDetail = {
                    id: data.id,
                  }

                  localStorage.setItem('teacherID',teacherDetail.id)
                // }

              })
    },
  },
  mounted() {
      window.onpopstate = function(event) {
          alert("location: " + document.location + ", state: " + JSON.stringify(event.state));

          this.images = this.imagesConfirmed

      },
          this.titleQuestion = localStorage.getItem('titleQuestion'),
    this.descriptionQuestion = localStorage.getItem('descriptionQuestion'),
    this.getDetails()
  },
  components: {
    DashboardLayout,
    PageHeaderThree, PageTitleTwo, NavBack, PageTitle, CalendarIcon, IconBaseTwo}
}
</script>

<style scoped>

</style>
