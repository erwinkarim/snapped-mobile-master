<template>
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
      <page-header-three v-else-if="isCreatingQuestion">
        <template v-slot:leftAction>
          <button @click="cancelQuestion" class="text-red-primary w-5/7">Cancel</button>
        </template>
        <template v-slot:mini-title>
          Create Question
        </template>
        <template v-slot:rightAction>
          <router-link :to="{name : 'teacher.assignments.create'}" class="font-bold text-red-primary"
                       @click.native="saveQuestion">
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
            <icon-base-two class="w-2/7 ml-2">
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


        <!-- FORM ASSIGNMENT-->
        <div class="w-full px-7 mt-3 pb-3">
          <!--       <input v-model="teacherID" class="invisible">-->
          <input v-model="title"
                 class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                 type="text" placeholder="Title" autocomplete="off">

          <select v-model="subject_id"
                  class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
            <option disabled value="">Subject</option>
            <option v-for="subject in subjects" :value="subject.id">{{ subject.name }}</option>
          </select>

          <multiselect placeholder="Class" v-model="classroom_id" :show-labels="false" :hide-selected="true"
                       :options="classrooms" label="name" track-by="id" :multiple="true" :taggable="true" @tag="addTag"
                       class="text-left mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
            <!--            <option disabled value="">Class</option>-->
            <!--            <option v-for="classroom in classrooms" :value="classroom.id">{{ classroom.name }}</option>-->
          </multiselect>

          <button @click="toggleCreatingQuestionMode"
                  class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
          >
                    <span v-if="hasSavedQuestion" class="grid grid-cols-2">
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

          <div v-if="due_datetime" @click="toggleDuration = !toggleDuration"
               class="flex mb-2 pl-6 pr-2 py-5 mt-2 grid grid-cols-3 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
            <div class="w-2 text-purple-secondary">
              <!--              <button @click="toggleDuration = !toggleDuration" type="text" autocomplete="off">-->
              <!--                {{ duration || '' }}-->
              <p>{{ format_date2(due_datetime) }}</p>
              <!--              </button>-->
            </div>
            <div class="w-2 text-purple-secondary">
              <p>{{ format_time(due_datetime) }}</p>
            </div>
            <div>
              <button>
                <icon-base-two class="align-center float-right w-1/5 mr-3">
                  <clock-icon/>
                </icon-base-two>
              </button>
            </div>
          </div>

          <div v-if="!due_datetime"
               class="flex mb-2 pl-6 pr-2 py-5 mt-2 grid grid-cols-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
            <div class="text-left place-self-start">
              <button @click="toggleDuration = !toggleDuration" type="text" autocomplete="off">
                Set Due Date
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

      <create-question-form v-if="isCreatingQuestion"
                            v-on:questionDetails="handleQuestionDetails"
                            :saved-question-details="questionDetails"
      />
      <!-- TODO: REFACTOR AND IMPLEMENT CROP PHOTO      -->
      <!--      &lt;!&ndash; FORM QUESTION &ndash;&gt;-->
      <!--      <div v-if="isCreatingQuestion" class="flex-wrap relative top-12">-->
      <!--        &lt;!&ndash; DESCRIPTION &ndash;&gt;-->
      <!--        <div class="w-full break-words px-7 mt-26 text-left text-purple-secondary text-sm leading-snug">-->
      <!--          Fill the question title and select description method-->
      <!--        </div>-->
      <!--        <div class="relative w-full px-7 mt-3 max-h-full">-->
      <!--          <input v-model="titleQuestion"-->
      <!--                 class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"-->
      <!--                 type="text" placeholder="Title" autocomplete="off">-->
      <!--          <div v-if="descriptionQuestion"-->
      <!--               class="flex mb-2 pl-6 pr-2 py-5 mt-2 grid grid-cols-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">-->
      <!--            <div class="text-left text-blue-secondary place-self-start">-->
      <!--              <button @click="updateShowManualDescription" type="text" autocomplete="off">-->
      <!--                Edit Description-->
      <!--              </button>-->
      <!--            </div>-->
      <!--            <div class="place-self-end">-->
      <!--              <button @click="removeDescription()">-->
      <!--                <icon-base-two class="float-right w-1/7 mr-3">-->
      <!--                  <trash-icon/>-->
      <!--                </icon-base-two>-->
      <!--              </button>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div v-if="!showQuestionOptions" class="flex mb-4 -mx-1">-->
      <!--            <div class="w-1/2 h-12 px-1">-->
      <!--              <button @click="updateShowManualDescription"-->
      <!--                      class="mt-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline">-->
      <!--                <div class="py-4 row-span-1 col-span-1 flex justify-center">-->
      <!--                  <icon-base-two class="w-12">-->
      <!--                    <pen-icon class="w-12" :stroke-color="strokeColor"></pen-icon>-->
      <!--                  </icon-base-two>-->
      <!--                </div>-->
      <!--                <div class="py-2 row-span-2 col-span-1 flex justify-center">-->
      <!--                  Manual-->
      <!--                </div>-->
      <!--              </button>-->
      <!--            </div>-->
      <!--            <label class="w-1/2 h-12 px-1">-->
      <!--              <div-->
      <!--                  class="mt-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline">-->
      <!--                <div class="py-4 row-span-1 col-span-1 flex justify-center">-->
      <!--                  <icon-base-two class="w-12">-->
      <!--                    <camera-icon></camera-icon>-->
      <!--                  </icon-base-two>-->
      <!--                </div>-->
      <!--                <div class="py-2 row-span-2 col-span-1 flex justify-center">-->
      <!--                  Upload-->
      <!--                </div>-->
      <!--                <input class="hidden" type="file" accept='image/*' multiple @change="onFileSelected">-->
      <!--              </div>-->
      <!--            </label>-->
      <!--          </div>-->
      <!--          &lt;!&ndash;  If IMAGE HAS BEEN SELECTED  &ndash;&gt;-->
      <!--          <div v-for="(image, key) in images"-->
      <!--               class="flex mb-2 pl-6 pr-2 py-5 mt-2 grid grid-cols-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">-->

      <!--&lt;!&ndash;            <vue-cropper ref="cropper"&ndash;&gt;-->
      <!--&lt;!&ndash;                         :src="selectedFile"&ndash;&gt;-->
      <!--&lt;!&ndash;                         alt="Source Image"&ndash;&gt;-->
      <!--&lt;!&ndash;            >&ndash;&gt;-->
      <!--&lt;!&ndash;            </vue-cropper>&ndash;&gt;-->


      <!--            <div class="text-left text-blue-secondary place-self-start">-->
      <!--              <button @click="previewAssignment(key)">-->
      <!--                View Image-->
      <!--              </button>-->
      <!--            </div>-->
      <!--            <div class="place-self-end">-->
      <!--              <button @click="removeImage(key)">-->
      <!--                <icon-base-two class="float-right w-1/7 mr-3">-->
      <!--                  <trash-icon/>-->
      <!--                </icon-base-two>-->
      <!--              </button>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div v-if="images.length" class="flex mb-4 -mx-1">-->
      <!--            <label-->
      <!--                class="text-center pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full text-lg font-normal leading-tight focus:outline-none focus:shadow-outline text-red-primary">-->
      <!--              + Add more photo-->
      <!--              <input class="hidden" type="file" accept="image/*" multiple @change="onFileSelected">-->
      <!--            </label>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="pb-16/9 mt-6 bg-white" v-if="isPreviewing">
        <div
            class="w-full h-full object-cover top-0 flex flex-row justify-center items-center absolute">
          <img :src="previewImage"/>
        </div>
      </div>

      <!--  Modal Schedule    -->
      <div v-if="toggleSchedule" @click.self="toggleSchedule = !toggleSchedule"
           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
        <modal class="fixed mx-1/24" v-if="toggleSchedule" modal-type="no-icon">
          <h3 slot="title" class="font-bold">Schedule Publish</h3>
          <div slot="message" class="w-full grid grid-cols-1 divide-y divide-transparent">
            <div>
              <p class="mb-3">Pick date and time to publish the assignment.</p>
            </div>
            <v-date-picker class="place-self-center" v-model="published_at" mode="dateTime"/>
          </div>
          <span slot="button">
                    <button @click="sendData"
                            :disabled="isPublishing"
                            class="font-bold w-full rounded-full px-2 font-bold leading-relaxed tracking-wider"
                    >
                      Schedule Publish
                    </button>
                </span>
        </modal>
      </div>

      <!--  Modal Duration    -->
      <div v-if="toggleDuration" @click.self="closeToggleDuration"
           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
        <modal class="fixed mx-1/24" v-if="toggleDuration" modal-type="no-icon">
          <h3 slot="title" class="font-bold">Set Due Date & Time</h3>
          <div slot="message" class="w-full grid grid-cols-1 divide-y divide-transparent">
            <v-date-picker class="place-self-center" :min-date="new Date()" v-model="due_datetime" mode="dateTime"/>
          </div>
          <span slot="button">
                    <button class="font-bold w-full rounded-full px-2 font-bold leading-relaxed tracking-wider"
                            @click="closeToggleDuration">Okay</button>
                </span>
        </modal>
      </div>
      <!--      Commented out Days, Hours, Minute-->
      <!--      <div v-if="toggleDuration" @click.self="closeToggleDuration"-->
      <!--           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">-->
      <!--        <modal class="fixed mx-1/24" v-if="toggleDuration" modal-type="no-icon">-->
      <!--          <h3 slot="title" class="font-bold">Set Duration</h3>-->
      <!--          <div slot="message" class="grid grid-cols-3 divide-x divide-transparent gap-1">-->
      <!--            <div>-->
      <!--              <label class="text-lg font-bold">Day</label>-->
      <!--              <input v-model="durationDay" type="number" min="0" max="100"-->
      <!--                     class="text-lg text-center border rounded-md border-none w-full bg-gray-secondary"-->
      <!--                     name="custom-input-number" value="0">-->
      <!--            </div>-->
      <!--            <div>-->
      <!--              <label class="text-lg font-bold">Hour</label>-->
      <!--              <input v-model="durationHour" type="number" min="0" max="100"-->
      <!--                     class="text-lg text-center border rounded-md border-none w-full bg-gray-secondary"-->
      <!--                     name="custom-input-number" value="0">-->
      <!--            </div>-->
      <!--            <div>-->
      <!--              <label class="text-lg font-bold">Minute</label>-->
      <!--              <input v-model="durationMinute" type="number" min="0" max="100" placeholder="0"-->
      <!--                     class="text-lg text-center border rounded-md border-none w-full bg-gray-secondary"-->
      <!--                     name="custom-input-number" value="0">-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <span slot="button">-->
      <!--                    <button class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider"-->
      <!--                            @click="closeToggleDuration">Okay</button>-->
      <!--                </span>-->
      <!--        </modal>-->
      <!--      </div>-->


      <!--  MODAL: PUBLISHING   -->
      <div v-if="isPublishing" @click.self="isPublishing = !isPublishing"
           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
        <modal v-if="isPublishing"
               modal-type="no-icon"
               :has-button="false"
               class="w-4/5 "
        >
          <p slot="message">
            Publishing your assignment.
            <br>
            Please wait...
          </p>
        </modal>
      </div>

      <!--  Modal Published   -->
      <div v-if="published" @click.self="published = !published"
           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
        <modal v-if="published"
               modal-type="success"
               :redirect-route="{name: 'teacher.assignments'}"
               class="w-4/5 "
        >
          <h3 slot="title" class="text-purple-primary font-bold text-4xl">Published!</h3>
          <p slot="message">
            Got something to change? Don't worry! You can always edit your published homework
          </p>
          <template slot="button">
            <button class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider">
              Okay
            </button>
          </template>
        </modal>
      </div>

      <!--   Modal Error   -->
      <div v-if="error" @click.self="error = !error"
           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
        <modal class="w-4/5 " v-if="error" modal-type="error">
          <div slot="message">
            <p>
              <b>Please ensure that you have entered all the important inputs</b>
            </p>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </div>
          <template slot="button">
            <button @click="error = !error"
                    class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider"
            >
              Okay
            </button>
          </template>
        </modal>
      </div>
      <!--  End Modal     -->
    </template>

    <template v-slot:bottomBar v-if="showAssignment">
      <div class="flex flex-row w-full max-w-xl">
        <div class="w-4/7 px-2">
          <button @click="toggleSchedule = !toggleSchedule"
                  class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row items-center justify-center"
          >
            <div class="w-full md:w-5/7">
              Schedule Publish
            </div>
            <div class="hidden md:block md:w-1/7">
              <icon-base-two class="w-3/4 md:w-1/2">
                <calendar-icon/>
              </icon-base-two>
            </div>
          </button>
        </div>
        <div class="w-3/7 px-2">
          <button @click="sendData"
                  :disabled="isPublishing"
                  class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
            <div class="w-5/7">
              Publish Now
            </div>
          </button>
        </div>
      </div>

    </template>
  </dashboard-layout>
</template>

<script>


// Register components in your 'main.js'
import Vue from "vue";
import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import Multiselect from "vue-multiselect";
import TeacherRepository from "@/repositories/TeacherRepository";
import moment from "moment";
import Repository from "@/repositories/Repository";
import ClockIcon from "@/components/icons/ClockIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import Modal from "@/components/Modal";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import CameraIcon from "@/components/icons/CameraIcon";
import PenIcon from "@/components/icons/PenIcon";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
import PageTitle from "@/components/PageTitle";
import CalendarIcon from "@/components/icons/CalendarIcon";
import IconBaseTwo from "@/components/IconBaseTwo";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import CreateQuestionForm from "@/views/teachers/TeacherAssignments/Create/CreateQuestionForm";

Vue.component('v-calendar', Calendar)
Vue.component('v-date-picker', DatePicker)
Vue.component('multiselect', Multiselect)


export default {
  name: "Index",
  props: {
    strokeColor: String,
  },
  data() {
    return {

      /***********
       * STATES *
       ***********/
      disabled: false,
      //show page
      showAssignment: true,
      isCreatingQuestion: false,
      showDescription: false,
      //toggle modal duration or schedule
      toggleDuration: false,
      toggleSchedule: false,
      //toggle preview gambar
      isPreviewing: false,
      isPublishing: false,
      //toggle modal success assignment
      published: false,
      //toggle modal error assignment
      error: false,
      errors: [],

      //assignment page data
      teacherID: localStorage.getItem('teacherID'),
      title: '',
      subject_id: '',
      classroom_id: [],
      subjects: '',
      classrooms: [],
      //schedule publish
      published_at: new Date,
      masks: {
        input: 'DD-MM-YYYY h:mm A',
      },
      today: new Date,
      due_datetime: '',
      durationDay: 0,
      durationHour: 0,
      durationMinute: 0,
      remarks: '',


      // Question Details
      questionDetails: {
        type: null,
        title: null,
        writtenQuestion: null,
      },

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
  computed: {
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
    duration: function () {
      const dayInHour = this.durationDay * 24
      let hours = parseInt(this.durationHour) + parseInt(dayInHour)
      let minutes = parseInt(this.durationMinute)

      if (hours < 10) {
        hours = '0' + hours
      }

      if (minutes < 10) {
        minutes = '0' + minutes
      }

      let duration = hours + ':' + minutes + ':00'

      return duration;
    },

    hasSavedQuestion() {
      return this.questionDetails.type && this.questionDetails.writtenQuestion;
    },
  },
  watch: {},
  methods: {
    //MULTISELECT
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    // MODE: MODAL
    closeToggleDuration() {
      if (this.durationDay === '') {
        this.durationDay = 0
      }
      if (this.durationHour === '') {
        this.durationHour = 0
      }
      if (this.durationMinute === '') {
        this.durationMinute = 0
      }

      this.toggleDuration = !this.toggleDuration
    },
    getSubjects() {
      TeacherRepository.getTeacherSubjects()
          .then(response => {

            if (response.data.success) {
              const data = response.data.data

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
            }

          })
    },
    getClasses() {
      TeacherRepository.getTeacherClasses()
          .then(response => {

            const data = response.data.data

            this.numOfClasses = data.length;

            this.classrooms = []
            for (let i = 0; i < data.length; i++) {

              let item = data[i];

              let classDetail = {
                id: item.class_id,
                name: item.class_name,
                numOfStudents: item.num_of_students,
                isHomeroom: item.homeroom
              }

              this.classrooms.push(classDetail)
            }
          })
    },
    toggleCreatingQuestionMode() {
      this.isCreatingQuestion = !this.isCreatingQuestion;
      this.showAssignment = !this.showAssignment;
    },
    // updateShowManualDescription() {
    //   this.showDescription = !this.showDescription
    //   this.isCreatingQuestion = !this.isCreatingQuestion;
    // },

    handleQuestionDetails(details) {
      console.log(`Updated question details`)
      this.questionDetails = details;
    },
    saveQuestion() {
      if (this.questionDetails.type) {

        if (this.questionDetails.title) {
          if (this.questionDetails.type === 'written' && this.questionDetails.writtenQuestion) {
            console.log(this.questionDetails)
            this.toggleCreatingQuestionMode()
          } else {
            console.log('please write something')
          }
        } else {
          console.log('please fill in title')
        }

      } else {
        console.log('please fill in details!')
      }
      // if (this.titleQuestion && (this.descriptionQuestion || this.images.length)) {
      //   this.titleQuestionConfirmed = this.titleQuestion
      //   this.descriptionConfirmed = this.descriptionQuestion
      //
      //   for (var i = 0; i < this.images.length; i++) {
      //     this.imagesConfirmed.push(this.images[i])
      //   }
      //
      //   for (var i = 0; i < this.snappedQuestions.length; i++) {
      //     this.snappedQuestionsConfirmed.push(this.snappedQuestions[i])
      //   }
      //   this.toggleCreatingQuestionMode()
      // } else {
      //   this.error = !this.error
      // }
    },
    cancelQuestion() {
      if (this.titleQuestionConfirmed && (this.descriptionConfirmed || this.imagesConfirmed)) {
        this.titleQuestion = this.titleQuestionConfirmed
        this.descriptionQuestion = this.descriptionConfirmed
        this.images = []
        for (var i = 0; i < this.imagesConfirmed.length; i++) {
          this.images.push(this.imagesConfirmed[i])
        }

        this.snappedQuestions = []
        for (var i = 0; i < this.snappedQuestionsConfirmed.length; i++) {
          this.snappedQuestions.push(this.snappedQuestionsConfirmed[i])
        }
      } else {
        this.titleQuestion = ''
        this.descriptionQuestion = ''
        this.images = []
        this.snappedQuestions = []
      }

      this.toggleCreatingQuestionMode()
    },
    updateManualDescription() {
      if (this.descriptionQuestion) {
        this.descriptionConfirmed = this.descriptionQuestion
        this.updateShowManualDescription()
      } else {
        this.error = !this.error
      }
    },
    cancelManual() {
      if (this.descriptionConfirmed) {
        this.descriptionQuestion = this.descriptionConfirmed
      } else {
        this.descriptionQuestion = ''
      }
      this.updateShowManualDescription()
    },
    removeDescription() {
      this.descriptionQuestion = ''
    },
    // onFileSelected(e) {
    //   var files = e.target.files || e.dataTransfer.files
    //
    //   if (!files.length) {
    //     return
    //   }
    //
    //   for (var i = 0; i < files.length; i++) {
    //     this.snappedQuestions.push(files[i])
    //   }
    //
    //   let fileList = Array.prototype.slice.call(e.target.files);
    //   fileList.forEach(f => {
    //
    //     if (!f.type.match("image.*")) {
    //       return;
    //     }
    //
    //     let reader = new FileReader();
    //     let that = this;
    //
    //     reader.onload = function (e) {
    //       that.images.push(e.target.result);
    //       that.selectedFile = event.target.result
    //       that.$refs.cropper.replace(this.selectedFile)
    //     }
    //     reader.readAsDataURL(f);
    //   });
    // },
    previewAssignment(key) {
      this.previewImage = this.images[key]
      this.isCreatingQuestion = !this.isCreatingQuestion
      this.isPreviewing = !this.isPreviewing
    },
    removeImage(key) {
      this.images.splice(key, 1);
      this.snappedQuestions.splice(key, 1);
    },
    format_date2(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    format_time(value) {
      if (value) {
        return moment(String(value)).format('HH:mm')
      }
    },
    checkForm() {
      // if (this.title && this.subject_id && this.classroom_id && this.titleQuestion
      //     && (this.snappedQuestions.length || this.descriptionQuestion) && !this.due_datetime) {
      //   return (true);
      // }

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
      if (!this.due_datetime) {
        this.errors.push('Due date required');
      }

      // e.preventDefault();
    },
    sendData(e) {

      this.checkForm();
      if (this.errors.length === 0) {

        var ctr = 0;

        this.classroom_id.forEach((value, index) => {

          let formData = new FormData();

          // let dayInMinute = this.durationDay * 1440
          // let hourInMinute = this.durationHour * 60
          // //in minutes
          // let totalDuration = dayInMinute + hourInMinute + this.durationMinute
          //
          // let due_datetime = moment(this.published_at).add(totalDuration, 'm').toDate();

          formData.append('teacher_id', this.teacherID);
          formData.append('subject_id', this.subject_id);
          formData.append('class_id', value.id);
          formData.append('title', this.title);
          formData.append('written_question_title', this.titleQuestion);
          formData.append('written_description', this.descriptionQuestion);
          formData.append('due_datetime', this.format_date(this.due_datetime));
          formData.append('published_at', this.format_date(this.published_at));
          formData.append('remarks', this.remarks);

          for (var i = 0; i < this.snappedQuestions.length; i++) {
            let file = this.snappedQuestions[i];

            formData.append('snap_question[' + i + ']', file);
          }

          if (this.toggleSchedule) {
            this.toggleSchedule = !this.toggleSchedule
          }

          this.isPublishing = true;

          Repository.post('/assignments/store',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then(response => {

                this.isPublishing = false;

                if (response.data.success) {
                  ctr++;
                  if (ctr === this.classroom_id.length) {
                    this.published = !this.published
                  }
                } else {
                  ctr++;
                  if (ctr === this.classroom_id.length) {
                    this.error = !this.error
                  }
                }
              })
              .catch(error => {
                // error.push("error");
                this.isPublishing = false;

                this.error = !this.error
              });
        });
      } else {
        this.error = !this.error
      }
    },
    getDetails: function () {
      TeacherRepository.getTeacherDetails()
          .then(response => {

            if (response.data.success) {

              const data = response.data.data[0]

              let teacherDetail = {
                id: data.id,
              }

              localStorage.setItem('teacherID', teacherDetail.id)
            }
          })
    },
  },
  mounted() {
    this.getDetails()
    this.getSubjects()
    this.getClasses()
  },
  components: {
    CreateQuestionForm,
    VueCropper,
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.multiselect__placeholder {
  color: #7B7F9E;
}

.multiselect__input {
  font-weight: 400;
  background: #F1F3F6;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #7B7F9E;
}

.multiselect__select {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}

.multiselect__tags {
  background: #F1F3F6;
  font-weight: 400;
  min-height: 0;
  padding-top: 1.25rem;
  padding-left: 1.5rem;
  padding-bottom: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.multiselect__tag {
  background-color: #7B7F9E;
}

.multiselect__option--disabled {
  background: purple;
  color: white;
  font-style: italic;
}

.multiselect__option--highlight {
  background: #bfbfbf;
}
</style>
