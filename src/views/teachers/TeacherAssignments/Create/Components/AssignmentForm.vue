<template xmlns="http://www.w3.org/1999/html">
  <dashboard-layout :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
        <!-- HEADER NEW ASSIGNMENT -->
        <page-header-three v-if="showAssignment" class="px-2" :has-scroll-animation="true">
          <template v-slot:leftAction>
              <nav-back class="w-5/7" stroke-color="red-primary"/>
          </template>
          <template v-slot:mini-title>
              New Assignment
          </template>
          <template v-slot:title>
              New Assignment
          </template>
        </page-header-three>
        <!-- HEADER CREATE QUESTION -->
        <page-header-three v-else-if="showQuestion">
          <template v-slot:leftAction>
              <button @click="cancelQuestion" class="w-5/7">Cancel</button>
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
        <page-header-three v-if="showDescription">
            <template v-slot:leftAction>
                <button @click="cancelManual" class="w-5/7">Cancel</button>
            </template>
            <template v-slot:mini-title>
                Manual Description
            </template>
            <template v-slot:rightAction>
                <button type="submit" @click="updateManualDescription" class="font-bold text-red-primary">
                    Save
                </button>
            </template>
        </page-header-three>
        <!-- HEADER PREVIEW IMAGE -->
        <page-header-three v-if="isPreviewing" class="px-2">
            <template v-slot:leftAction>
                <div @click="previewAssignment">
                    <icon-base-two class="w-2/3">
                        <arrow-back-icon stroke-color="purple-primary"/>
                    </icon-base-two>
                </div>
            </template>
            <template v-slot:mini-title>
                Preview
            </template>
        </page-header-three>
    </template>
    <template v-slot:content>
        <!-- ASSIGNMENT -->
        <div v-if="showAssignment">
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

                <button @click="updateShow" class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary" type="text" tag="button">
                    <span v-if="titleQuestion && descriptionQuestion">Question</span>
                    <span v-else>Create Question</span>
                </button>

                <button @click="toggleSchedule = !toggleSchedule" class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                    Set Duration
                </button>

                <textarea v-model="remarks" placeholder="Remarks"
                          class="pl-6 pr-2 py-5 mt-2 h-36  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"/>
            </div>
        </div>
        <!-- FORM QUESTION -->
        <div v-if="showQuestion" class="flex-wrap relative top-12">
                <!-- DESCRIPTION -->
                <div class="w-full break-words px-7 mt-26 text-left text-purple-secondary text-sm leading-snug">
                    Fill the question title and select description method
                </div>
                    <div class="relative w-full px-7 mt-3 max-h-full">
                        <input v-model="titleQuestion"
                               class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                               type="text" placeholder="Title" autocomplete="off">
                        <div v-if="descriptionQuestion" class="flex mb-2 pl-6 pr-2 py-5 mt-2 grid grid-cols-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                            <div class="text-left place-self-start">
                               <button @click="updateShowManualDescription" type="text" autocomplete="off">
                                   Edit Description
                               </button>
                            </div>
                            <div class="place-self-end">
                                <button @click="removeDescription()">Delete</button>
                            </div>
                        </div>
                        <div v-if="!showQuestionOptions" class="flex mb-4 -mx-1">
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
                            <label class="w-1/2 h-12 px-1">
                                <div class="mt-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline">
                                    <div class="py-4 row-span-1 col-span-1 flex justify-center">
                                        <icon-base-two class="w-12">
                                            <camera-icon></camera-icon>
                                        </icon-base-two>
                                    </div>
                                    <div class="py-2 row-span-2 col-span-1 flex justify-center">
                                        Upload
                                    </div>
                                    <input class="hidden" type="file" accept='image/*' multiple @change="onFileSelected">
                                </div>
                            </label>
                        </div>
                        <!--  If IMAGE HAS BEEN SELECTED  -->
                        <div v-for="(image, key) in images" class="flex mb-2 pl-6 pr-2 py-5 mt-2 grid grid-cols-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                            <div class="text-left place-self-start">
                                <button @click="previewAssignment(key)">
                                    View Image
                                </button>
                            </div>
                            <div class="place-self-end">
                                <button @click="removeImage(key)">Delete</button>
                            </div>
                        </div>
                        <div v-if="images.length" class="flex mb-4 -mx-1">
                            <label class="text-center pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full text-lg font-normal leading-tight focus:outline-none focus:shadow-outline text-red-primary">
                                + Add more photo
                                <input class="hidden" type="file" multiple @change="onFileSelected">
                            </label>
                        </div>
                        <!-- DESCRIPTION -->
                        <div class="w-full break-words mt-20 pt-2 text-left text-purple-secondary text-sm leading-snug">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna.
                        </div>
                    </div>
                </div>

        <!-- PREVIEW IMAGE -->
        <div class="bg-white px-6 pb-16 pt-4 flex content-center" v-if="isPreviewing">
             <div class="flex content-center mt-20">
                 <img :src="previewImage" class="preview top-12">
             </div>
        </div>

        <!-- FORM MANUAL DESCRIPTION -->
        <div v-if="showDescription === true" class="flex-wrap relative top-12">
            <!-- DESCRIPTION -->
            <textarea v-model="descriptionQuestion" class="w-full h-48 form-textarea block break-words px-7 mt-26 text-left text-purple-secondary text-sm leading-snug"
                      placeholder="Enter description"
            />
        </div>

        <!--  Modal Calendar    -->
        <modal v-if="toggleSchedule">
            <h3 slot="header">Set Duration</h3>
            <v-date-picker slot="body"
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
            <span slot="footer">
                <button @click="toggleSchedule = !toggleSchedule" class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">Okay</button>
            </span>
        </modal>

        <!--  Modal Published   -->
        <modal v-if="published">
            <h3 slot="header" class="text-primary-purple">Published!</h3>
            <p slot="body">
                Got something to change? Don't worry! You can always edit your published homework
            </p>
            <span slot="footer">
                <button @click="reload" class="w-full font-bold rounded-full bg-yellow-primary text-purple-primary text-sm border-2 bg-white py-3 px-1 flex flex-row justify-center">
                    Okay
                </button>
            </span>
        </modal>

        <!--   Modal Error   -->
        <modal v-if="error" @close="error = !error">
            <h3 slot="header" class="text-red-primary">Error!</h3>
            <p slot="body">
                Please ensure that you have entered all the important inputs
            </p>
            <span slot="footer">
                <button @click="error = !error" class="w-full font-bold rounded-full bg-yellow-primary text-sm border-2 border-yellow-primary bg-white py-3 px-1 flex flex-row justify-center">Okay</button>
            </span>
        </modal>
        <!--  End Modal     -->
    </template>



    <template v-slot:bottomBar v-if="showAssignment">
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
import PenIcon from "@/components/icons/PenIcon";
import CameraIcon from "@/components/icons/CameraIcon";
import ArrowBackIcon from "../../../../../components/icons/ArrowBackIcon";
import Modal from "@/components/Modal";

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
        disabled: false,
        //show page
        showAssignment: true,
        showQuestion: false,
        showDescription: false,
        //toggle modal duration or schedule
        toggleSchedule: false,
        //toggle preview gambar
        isPreviewing:  false,
        //toggle modal success assignment
        published: false,
        //toggle modal error assignment
        error: false,

        //assignment page data
        teacherID: localStorage.getItem('teacherID'),
        title: '',
        subject_id: '',
        classroom_id: '',
        subjects: '',
        classrooms: '',
        range: {
            start: new Date(2020, 0, 6),
            end: new Date(2020, 0, 23),
        },
        masks: {
            input: 'DD-MM-YYYY h:mm A',
        },
        duration: '',
        remarks: '',

        //question page data
        //title question
        titleQuestion: '',
        titleQuestionConfirmed: '',
        //description question
        descriptionQuestion: '',
        descriptionConfirmed: '',
        // images data (untuk display gambar)
        images: [],
        imagesConfirmed: [],
        // images details to be uploaded to backed
        snappedQuestions: [],
        snappedQuestionsConfirmed: [],
        //untuk view image one by one (preview page)
        previewImage: [],
    }
  },
  computed:{
        showQuestionOptions: function () {
            this.images.length;
            this.descriptionQuestion;
            return this.images.length || this.descriptionQuestion;
        },
  },
  watch: {
  },
  methods:{
    reload(){
      window.location.reload()
    },
    getSubjects(){
      TeacherRepository.getTeacherSubjects()
          .then(response => {
              const data = response.data.subjects

              const numOfSubjects = data.length

              console.log(numOfSubjects)

              this.subjects = []
              for (let i = 0; i < numOfSubjects; i++) {

                  let item = data[i];

                  let subjectDetail = {
                      id: item.subject_id,
                      name: item.subject_name
                  }

                  this.subjects.push(subjectDetail)
              }
          })
    },
    getClasses(){
      TeacherRepository.getTeacherClasses()
          .then(response => {

              const data = response.data.data

              this.numOfClasses = data.length;

              this.classrooms=[]
              for (let i = 0; i < data.length; i++) {

                  let item = data[i];

                  let classDetail = {
                      id : item.class_id,
                      name: item.class_name,
                      numOfStudents: item.num_of_students,
                      isHomeroom: item.homeroom
                  }

                  this.classrooms.push(classDetail)
              }
          })
    },
    updateShow() {
        this.showQuestion = !this.showQuestion;
        this.showAssignment = !this.showAssignment;
    },
    updateShowManualDescription(){
      this.showDescription = !this.showDescription
      this.showQuestion = !this.showQuestion;
    },
    saveQuestion() {
        if(this.titleQuestion && (this.descriptionQuestion || this.images)) {
            this.titleQuestionConfirmed = this.titleQuestion
            this.descriptionConfirmed = this.descriptionQuestion

            for (var i = 0; i < this.images.length; i++) {
                this.imagesConfirmed.push(this.images[i])
            }

            for (var i = 0; i < this.snappedQuestions.length; i++) {
                this.snappedQuestionsConfirmed.push(this.snappedQuestions[i])
            }
            this.updateShow()
        }
        else{
            this.error = !this.error
        }
    },
    cancelQuestion(){
        if(this.titleQuestionConfirmed && (this.descriptionConfirmed || this.imagesConfirmed)) {
            this.titleQuestion = this.titleQuestionConfirmed
            this.descriptionQuestion = this.descriptionConfirmed
            this.images = []
            for (var i=0; i < this.imagesConfirmed.length; i++) {
                this.images.push(this.imagesConfirmed[i])
            }

            this.snappedQuestions = []
            for (var i=0; i < this.snappedQuestionsConfirmed.length; i++) {
                this.snappedQuestions.push(this.snappedQuestionsConfirmed[i])
            }
        }else{
            this.titleQuestion = ''
            this.descriptionQuestion = ''
            this.images = []
            this.snappedQuestions = []
        }

        this.updateShow()
    },
    updateManualDescription(){
        if (this.descriptionQuestion) {
            this.descriptionConfirmed = this.descriptionQuestion
            this.updateShowManualDescription()
        }
        else{
            this.error = !this.error
        }
    },
    cancelManual(){
        if(this.descriptionConfirmed) {
            this.descriptionQuestion = this.descriptionConfirmed
        }else{
            this.descriptionQuestion = ''
        }
        this.updateShowManualDescription()
    },
    removeDescription(){
        this.descriptionQuestion = ''
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
    previewAssignment(key){
      this.previewImage = this.images[key]

      console.log(this.previewImage)
      this.showQuestion =! this.showQuestion
      this.isPreviewing = !this.isPreviewing
    },
    removeImage(key){
        this.images.splice(key,1);
        this.snappedQuestions.splice(key,1);

        // if(!this.images.length){
        //     this.$refs.im.value = '';
        // }
    },
      format_date(value){
          if (value) {
              return moment(String(value)).format('YYYY-MM-DD hh:mm:ss')
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
      .then(
          response => {
              const data = response.data.messageType

              if(data === 'success'){
                  this.published = !this.published
              }else{
                  this.error = !this.error
              }

          })
      .catch(error => {
          this.error = !this.error
      });

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
      // window.onpopstate = function(event) {
          // alert("location: " + document.location + ", state: " + JSON.stringify(event.state));

      //     this.images = this.imagesConfirmed
      //
      // },
    this.titleQuestion = localStorage.getItem('titleQuestion'),
    this.descriptionQuestion = localStorage.getItem('descriptionQuestion'),
    this.getDetails()
    this.getSubjects()
    this.getClasses()
  },
  components: {
    Modal,
    ArrowBackIcon,
    CameraIcon,
    PenIcon,
    DashboardLayout,
    PageHeaderThree, PageTitleTwo, NavBack, PageTitle, CalendarIcon, IconBaseTwo
    }
}
</script>

<style scoped>
</style>
