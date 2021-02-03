<template>
  <dashboard-layout :has-custom-bottom-bar="true">

    <!-------------------
          HEADERS
     --------------------->
    <template v-slot:pageHeader>

      <!-- HEADER: Main -->
      <page-header-three v-if="$store.state.teacherCreateAssignment.states.isMain"
                         :has-scroll-animation="true"
                         class="px-2"
      >
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

      <!-- HEADER: Creating Question -->
      <page-header-three v-else-if="$store.state.teacherCreateAssignment.states.isCreatingQuestion">
        <template v-slot:leftAction>
          <button @click="$store.dispatch('teacherCreateAssignment/cancelCreatingQuestion')"
                  class="text-red-primary w-5/7">
            Cancel
          </button>
        </template>
        <template v-slot:mini-title>
          Create Question
        </template>
        <template v-slot:rightAction>
          <button @click="$store.dispatch('teacherCreateAssignment/saveQuestion')"
                  class="font-bold text-red-primary"
          >
            Save
          </button>
        </template>
      </page-header-three>


      <!-- HEADER: Writing Question -->
      <page-header-three v-if="$store.state.teacherCreateAssignment.states.isWritingQuestion">
        <template v-slot:leftAction>
          <button @click="$store.dispatch('teacherCreateAssignment/endWritingQuestion')"
                  class="text-red-primary w-5/7"
          >
            Cancel
          </button>
        </template>
        <template v-slot:mini-title>
          Write Question
        </template>
        <template v-slot:rightAction>
          <button @click="$store.dispatch('teacherCreateAssignment/saveWrittenQuestionToDraft')"
                  class="font-bold text-red-primary"
          >
            Save
          </button>
        </template>
      </page-header-three>
      <!-- HEADER PREVIEW IMAGE -->
      <!--      <page-header-three v-if="isPreviewing" class="px-2">-->
      <!--        <template v-slot:leftAction>-->
      <!--          <div @click="previewAssignment">-->
      <!--            <icon-base-two class="ml-2 w-2/7">-->
      <!--              <arrow-back-icon stroke-color="purple-primary"/>-->
      <!--            </icon-base-two>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--        <template v-slot:mini-title>-->
      <!--          Preview-->
      <!--        </template>-->
      <!--      </page-header-three>-->
    </template>


    <!-------------------
           BODY
    --------------------->
    <template v-slot:content>

      <!-- ASSIGNMENT -->
      <div v-if="$store.state.teacherCreateAssignment.states.isMain">


        <!-- FORM ASSIGNMENT-->
        <div class="px-7 pb-3 mt-3 w-full">
          <!--       <input v-model="teacherID" class="invisible">-->
          <input v-model="$store.state.teacherCreateAssignment.assignmentDetails.title"
                 class="py-5 pr-2 pl-6 mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                 type="text" placeholder="Title" autocomplete="off">

          <select v-model="$store.state.teacherCreateAssignment.assignmentDetails.subject_id"
                  class="py-5 pr-2 pl-6 mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
          >
            <option disabled value="">Subject</option>
            <option v-for="subject in $store.state.teacherCreateAssignment.selectables.subjects"
                    :value="subject.id"
            >
              {{ subject.name }}
            </option>
          </select>

          <multiselect v-model="$store.state.teacherCreateAssignment.assignmentDetails.classroom_id"
                       :options="$store.state.teacherCreateAssignment.selectables.classrooms"
                       :show-labels="false"
                       :hide-selected="true"
                       :multiple="true"
                       track-by="id"
                       label="name"
                       placeholder="Class"
                       class="mt-2 w-full text-lg font-normal leading-tight text-left rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
          >
            <!--            <option disabled value="">Class</option>-->
            <!--            <option v-for="classroom in classrooms" :value="classroom.id">{{ classroom.name }}</option>-->
          </multiselect>


          <!-- CREATE/EDIT QUESTION -->
          <div
              class="py-5 pr-2 pl-6 mt-2 w-full text-lg font-normal leading-tight text-left rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
            <button v-if="$store.getters['teacherCreateAssignment/hasSavedQuestion']"
                    @click="$store.dispatch('teacherCreateAssignment/editSavedQuestion')"
                    class="flex flex-row justify-between w-full"
            >
              <div class="w-4/5 text-left">
                Question
              </div>
              <div class="mr-5 w-1/5 text-right text-blue-secondary">
                Edit
              </div>
            </button>
            <button v-else @click="$store.commit('teacherCreateAssignment/toggleCreatingQuestionMode')">
              Create Question
            </button>
          </div>


          <div @click="$store.commit('teacherCreateAssignment/toggleSelectingDurationMode')"
               class="flex flex-row items-center justify-between py-5 pr-2 pl-6 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
          >
            <div class=" w-7/8 text-left text-purple-secondary md:w-9/10">
              {{ $store.getters['teacherCreateAssignment/hasSavedDueDatetime'] ? $store.getters['teacherCreateAssignment/dueDateTime'] : 'Set Due Date'  }}
            </div>
            <div class=" w-1/8 pr-2 md:w-1/10">
              <icon-base-two>
                <clock-icon/>
              </icon-base-two>
            </div>
          </div>

          <textarea v-model="$store.state.teacherCreateAssignment.assignmentDetails.remarks"
                    class="py-5 pr-2 pl-6 w-full h-36 text-lg font-normal leading-tight rounded-md border border-none appearance-none mb-26 bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                    placeholder="Remarks"
          />
        </div>
      </div>

      <create-question-form v-if="$store.state.teacherCreateAssignment.states.isCreatingQuestion"/>

      <!--  Modal Duration    -->
      <div v-if="$store.state.teacherCreateAssignment.states.isSelectingDuration"
           @click.self="$store.commit('teacherCreateAssignment/toggleIsSelectingDuration')"
           class="flex fixed top-0 flex-col justify-center items-center w-full h-screen bg-opacity-75 z-70 bg-gray-primary">
        <modal class="fixed mx-1/24" modal-type="no-icon">
          <template v-slot:title>
            <h3 class="font-bold">
              Set Due Date & Time
            </h3>
          </template>

          <template v-slot:message>
            <div class="grid grid-cols-1 w-full divide-y divide-transparent">
              <v-date-picker v-model="$store.state.teacherCreateAssignment.assignmentDetails.due_datetime"
                             mode="dateTime"
                             :min-date="new Date()"
                             class="place-self-center"
              />
            </div>
          </template>
          <template v-slot:button>
            <button @click="$store.commit('teacherCreateAssignment/toggleIsSelectingDuration')"
                    class="px-2 w-full font-bold tracking-wider leading-relaxed rounded-full"
            >
              Okay
            </button>
          </template>
        </modal>
      </div>

      <!--  MODAL: PUBLISHING   -->
      <div v-if="$store.state.teacherCreateAssignment.states.isPublishing"
           @click.self="$store.commit('teacherCreateAssignment/togglePublishingMode')"
           class="flex fixed top-0 flex-col justify-center items-center w-full h-screen bg-opacity-75 z-70 bg-gray-primary">
        <modal modal-type="no-icon"
               :has-button="false"
               class="w-4/5"
        >
          <p slot="message">
            Publishing your assignment.
            <br>
            Please wait...
          </p>
        </modal>
      </div>

      <!--      &lt;!&ndash;  Modal Published   &ndash;&gt;-->
      <div v-if="$store.state.teacherCreateAssignment.states.isPublished"
           @click.self="$store.commit('teacherCreateAssignment/togglePublishedMode')"
           class="flex fixed top-0 flex-col justify-center items-center w-full h-screen bg-opacity-75 z-70 bg-gray-primary">
        <modal modal-type="success"
               :redirect-route="{name: 'teacher.assignments'}"
               class="w-4/5"
        >
          <h3 slot="title" class="text-4xl font-bold text-purple-primary">Published!</h3>
          <p slot="message">
            Got something to change? Don't worry! You can always edit your published homework
          </p>
          <template slot="button">
            <button class="px-2 w-4/5 font-bold tracking-wider leading-relaxed rounded-full">
              Okay
            </button>
          </template>
        </modal>
      </div>

      <error-modal v-if="$store.state.teacherCreateAssignment.states.isShowingError"/>
    </template>

    <template v-slot:bottomBar v-if="$store.state.teacherCreateAssignment.states.isMain">
      <div class="flex flex-row w-full max-w-xl">
        <div class="px-2 w-4/7">
          <button @click="toggleSchedule = !toggleSchedule"
                  class="flex flex-row justify-center items-center py-3 px-1 w-full text-sm font-bold bg-white rounded-full border-2 text-purple-primary border-purple-primary"
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
        <div class="px-2 w-3/7">
          <button @click="$store.dispatch('teacherCreateAssignment/sendData')"
                  :disabled="$store.state.teacherCreateAssignment.states.isPublishing"
                  class="flex flex-row justify-center py-3 px-1 w-full text-sm font-bold rounded-full text-purple-primary bg-yellow-primary">
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
import ErrorModal from "@/views/teachers/TeacherAssignments/Create/Modals/ErrorModal";

Vue.component('v-calendar', Calendar)
Vue.component('v-date-picker', DatePicker)
Vue.component('multiselect', Multiselect)


export default {
  name: "Index",
  props: {
    strokeColor: String,
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    this.$store.commit('teacherCreateAssignment/initialise')
    this.$store.dispatch('teacherCreateAssignment/getClasses')
    this.$store.dispatch('teacherCreateAssignment/getSubjects')

    this.$store.watch(
        (state) => {
          return this.$store.state.teacherCreateAssignment.assignmentDetails.title
        },
        (newValue, oldValue) => {
          let maxCharCount = 255;
          let overLimit = newValue ? newValue.length > maxCharCount : false;

          if (overLimit) {
            this.$store.dispatch('teacherCreateAssignment/setAssignmentTitle', oldValue)
          }
        },
    )
  },
  components: {
    ErrorModal,
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
