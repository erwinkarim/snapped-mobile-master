<template xmlns="http://www.w3.org/1999/html">
  <dashboard-layout :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
        <!-- HEADER NEW ASSIGNMENT -->
        <page-header-three v-if="showAssignment" class="px-2" :has-scroll-animation="true">
          <template v-slot:leftAction>
              <nav-back class="w-2/7" stroke-color="red-primary"/>
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
              <button @click="cancelQuestion" class="text-red-primary w-5/7">Cancel</button>
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
                <button @click="cancelManual" class="text-red-primary w-5/7">Cancel</button>
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
                    <span v-if="titleQuestion && showQuestionOptions" class="grid grid-cols-2">
                        <div>
                            Question
                        </div>
                        <div class="text-blue-secondary place-self-end mr-5">
                            Edit
                        </div>
                    </span>
                    <span v-else>
                        Create Question
                    </span>
                </button>

                <div v-if="!noDuration" class="flex mb-2 pl-6 pr-2 py-5 mt-2 grid grid-cols-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                    <div class="text-left text-purple-secondary place-self-start">
                        <button @click="toggleDuration = !toggleDuration" type="text" autocomplete="off">
                            {{ duration || '' }}
                        </button>
                    </div>
                    <div>
                        <button @click="toggleDuration = !toggleDuration">
                            <icon-base-two class="align-center float-right w-1/8 mr-3">
                                <clock-icon/>
                            </icon-base-two>
                        </button>
                    </div>
                </div>

                <div v-if="noDuration" class="flex mb-2 pl-6 pr-2 py-5 mt-2 grid grid-cols-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                    <div class="text-left place-self-start">
                        <button @click="toggleDuration = !toggleDuration" type="text" autocomplete="off">
                            Set Duration
                        </button>
                    </div>
                    <div>
                        <button @click="toggleDuration = !toggleDuration">
                            <icon-base-two class="align-center float-right w-1/8 mr-3">
                                <clock-icon/>
                            </icon-base-two>
                        </button>
                    </div>
                </div>

                <textarea v-model="remarks" placeholder="Remarks"
                          class="pl-6 pr-2 py-5 h-36 mb-26 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"/>
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
                            <div class="text-left text-blue-secondary place-self-start">
                               <button @click="updateShowManualDescription" type="text" autocomplete="off">
                                   Edit Description
                               </button>
                            </div>
                            <div class="place-self-end">
                                <button @click="removeDescription()">
                                    <icon-base-two class="float-right w-1/7 mr-3">
                                        <trash-icon/>
                                    </icon-base-two>
                                </button>
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
                            <div class="text-left text-blue-secondary place-self-start">
                                <button @click="previewAssignment(key)">
                                    View Image
                                </button>
                            </div>
                            <div class="place-self-end">
                                <button @click="removeImage(key)">
                                    <icon-base-two class="float-right w-1/7 mr-3">
                                        <trash-icon/>
                                    </icon-base-two>
                                </button>
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
            <textarea v-model="descriptionQuestion" class="w-full h-screen form-textarea block break-words px-7 mt-20 text-left text-purple-primary text-m leading-snug"
                      placeholder="Enter description"
            />
        </div>

        <!--  Modal Schedule    -->
        <div v-if="toggleSchedule" @click.self="toggleSchedule = !toggleSchedule"
             class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
            <modal class="fixed" v-if="toggleSchedule" modal-type="no-icon" :redirect-route="{}">
                <h3 slot="title" class="font-bold">Schedule Publish</h3>
                <div slot="message" class="w-full grid grid-cols-1 divide-y divide-transparent">
                    <div>
                        <p class="mb-3">Pick date and time to publish the assignment.</p>
                    </div>
                        <v-date-picker class="place-self-center" v-model="published_at" mode="dateTime" />
                </div>
                <span slot="button">
                    <button class="font-bold w-full rounded-full px-2 font-bold leading-relaxed tracking-wider" @click="sendData">Schedule Publish</button>
                </span>
            </modal>
        </div>

        <!--  Modal Duration    -->
        <div v-if="toggleDuration" @click.self="closeToggleDuration"
             class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
            <modal class="fixed mx-1/24" v-if="toggleDuration" modal-type="no-icon" :redirect-route="{}">
                <h3 slot="title" class="font-bold">Set Duration</h3>
                <div slot="message" class="grid grid-cols-3 divide-x divide-transparent gap-1">
                    <div>
                        <label class="text-lg font-bold">Day</label>
                        <input v-model="durationDay" type="number" min="0" class="text-lg text-center border rounded-md border-none w-full bg-gray-secondary" name="custom-input-number" value="0">
                    </div>
                    <div>
                        <label class="text-lg font-bold">Hour</label>
                        <input v-model="durationHour" type="number" min="0" class="text-lg text-center border rounded-md border-none w-full bg-gray-secondary" name="custom-input-number" value="0">
                    </div>
                    <div>
                        <label class="text-lg font-bold">Minute</label>
                        <input v-model="durationMinute" type="number" min="0" placeholder="0" class="text-lg text-center border rounded-md border-none w-full bg-gray-secondary" name="custom-input-number" value="0">
                    </div>
                </div>
                <span slot="button">
                    <button class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider" @click="closeToggleDuration">Okay</button>
                </span>
            </modal>
        </div>

        <!--  Modal Published   -->
        <div v-if="published" @click.self="published = !published"
             class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
            <modal class="w-4/5 " v-if="published" modal-type="success" :redirect-route="{}">
                <h3 slot="title" class="text-purple-primary font-bold text-4xl">Published!</h3>
                <p slot="message">
                    Got something to change? Don't worry! You can always edit your published homework
                </p>
                <template slot="button">
                    <button class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider" @click="reload">
                        Okay
                    </button>
                </template>
            </modal>
        </div>

        <!--   Modal Error   -->
        <div v-if="error" @click.self="error = !error"
             class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
            <modal class="w-4/5 " v-if="error" modal-type="error" :redirect-route="{}">
            <div slot="message">
                <p>
                    <b>Please ensure that you have entered all the important inputs</b>
                </p>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
            <template slot="button">
                <button class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider" @click="error = !error">Okay</button>
            </template>
        </modal>
        </div>
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
import TrashIcon from "../../../../../components/icons/TrashIcon";
import ClockIcon from "../../../../../components/icons/ClockIcon";

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
        toggleDuration: false,
        toggleSchedule: false,
        //toggle preview gambar
        isPreviewing:  false,
        //toggle modal success assignment
        published: false,
        //toggle modal error assignment
        error: false,
        errors:[],

        //assignment page data
        teacherID: localStorage.getItem('teacherID'),
        title: '',
        subject_id: '',
        classroom_id: '',
        subjects: '',
        classrooms: '',
        //schedule publish
        published_at: new Date,
        masks: {
            input: 'DD-MM-YYYY h:mm A',
        },
        durationDay: 0,
        durationHour: 0,
        durationMinute : 0,
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
    noDuration: function () {
        this.durationDay;
        this.durationHour;
        this.durationMinute;
        return this.durationDay <= 0 && this.durationHour <= 0 && this.durationMinute <= 0;
    },
    duration:function (){
        const dayInHour = this.durationDay*24
        let hours = parseInt(this.durationHour) + parseInt(dayInHour)
        let minutes = parseInt(this.durationMinute)

        if (hours<10){
            hours = '0'+hours
        }

        if (minutes<10){
            minutes = '0'+minutes
        }

        let duration = hours+':'+minutes+':00'

        return duration;
    }
  },
  watch: {
  },
  methods:{
    // MODE: MODAL
    closeToggleDuration() {
        if (this.durationDay === ''){
            this.durationDay = 0
        }
        if (this.durationHour === ''){
            this.durationHour = 0
        }
        if (this.durationMinute === ''){
            this.durationMinute = 0
        }

        this.toggleDuration = !this.toggleDuration
    },
    reload(){
      window.location.reload()
    },
    getSubjects(){
      TeacherRepository.getTeacherSubjects()
          .then(response => {
              const data = response.data.subjects

              const numOfSubjects = data.length

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
        if(this.titleQuestion && (this.descriptionQuestion || this.images.length)) {
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
        this.showQuestion =! this.showQuestion
        this.isPreviewing = !this.isPreviewing
    },
    removeImage(key){
        this.images.splice(key,1);
        this.snappedQuestions.splice(key,1);
    },
      format_date(value){
          if (value) {
              return moment(String(value)).format('YYYY-MM-DD hh:mm:ss')
          }
      },
      format_time(value){
          if (value) {
              return moment(String(value)).format('hh:mm:ss')
          }
      },
      checkForm: function (e) {
          if (this.title && this.subject_id && this.classroom_id && this.titleQuestion
              && (this.snappedQuestions.length || this.descriptionQuestion) && !this.noDuration) {
              return true;
          }

          this.errors = [];

          if (!this.title) {
              this.errors.push('Title required.');
          }
          if (!this.subject_id) {
              this.errors.push('Subject required.');
          }
          if (!this.classroom_id) {
              this.errors.push('Classroom required.');
          }
          if (!this.titleQuestion && !(this.snappedQuestions.length || this.descriptionQuestion)) {
              this.errors.push('Question required.');
          }
          if(this.noDuration){
              this.errors.push('Duration required');
          }

          // e.preventDefault();
      },
    sendData(e){
        this.checkForm();
        let formData = new FormData();

        let dayInMinute = this.durationDay*1440
        let hourInMinute = this.durationHour*60
        //in minutes
        let totalDuration = dayInMinute + hourInMinute + this.durationMinute

        let due_datetime = moment(this.published_at).add(totalDuration,'m').toDate();

        formData.append('teacher_id', this.teacherID);
        formData.append('subject_id', this.subject_id);
        formData.append('class_id', this.classroom_id);
        formData.append('title', this.title);
        formData.append('written_question_title', this.titleQuestion);
        formData.append('written_description', this.descriptionQuestion);
        formData.append('due_datetime', this.format_date(due_datetime));
        formData.append('published_at', this.format_date(this.published_at));
        formData.append('remarks', this.remarks);

        for( var i = 0; i < this.snappedQuestions.length; i++ ){
            let file = this.snappedQuestions[i];

            formData.append('snap_question[' + i + ']', file);
        }

        if (this.toggleSchedule){
            this.toggleSchedule = !this.toggleSchedule
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
              const messageType = response.data.messageType

              if(messageType === 'success'){
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
    this.getDetails()
    this.getSubjects()
    this.getClasses()
  },
  components: {
      ClockIcon,
      TrashIcon,
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
