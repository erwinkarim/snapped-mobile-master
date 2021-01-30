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
      <!--            <icon-base-two class="w-2/7 ml-2">-->
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
        <div class="w-full px-7 mt-3 pb-3">
          <!--       <input v-model="teacherID" class="invisible">-->
          <input v-model="$store.state.teacherCreateAssignment.assignmentDetails.title"
                 class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                 type="text" placeholder="Title" autocomplete="off">

          <select v-model="$store.state.teacherCreateAssignment.assignmentDetails.subject_id"
                  class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
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
                       class="text-left mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
          >
            <!--            <option disabled value="">Class</option>-->
            <!--            <option v-for="classroom in classrooms" :value="classroom.id">{{ classroom.name }}</option>-->
          </multiselect>


          <!-- CREATE/EDIT QUESTION -->
          <div
              class="pl-6 pr-2 py-5 mt-2 text-left appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
            <button v-if="$store.getters['teacherCreateAssignment/hasSavedQuestion']"
                    @click="$store.dispatch('teacherCreateAssignment/editSavedQuestion')"
                    class="flex flex-row w-full justify-between"
            >
              <div class=" text-left w-4/5">
                Question
              </div>
              <div class="w-1/5 text-blue-secondary text-right mr-5">
                Edit
              </div>
            </button>
            <button v-else @click="$store.commit('teacherCreateAssignment/toggleCreatingQuestionMode')">
              Create Question
            </button>
          </div>


          <div @click="$store.commit('teacherCreateAssignment/toggleSelectingDurationMode')"
               class="flex mb-2 pl-6 pr-2  py-5 mt-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
          >

            <div v-if="$store.getters['teacherMarking/hasSavedDueDatetime']">
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

            <div v-else class="flex flex-row w-full items-center justify-between">
              <div class="text-left w-4/5">
                <button>
                  Set Due Date
                </button>
              </div>
              <div class="w-1/5">
                <icon-base-two class=" w-1/2 mr-3">
                  <clock-icon/>
                </icon-base-two>
              </div>
            </div>

          </div>

          <textarea v-model="$store.state.teacherCreateAssignment.assignmentDetails.remarks" placeholder="Remarks"
                    class="pl-6 pr-2 py-5 h-36 mb-26 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"/>
        </div>
      </div>

      <create-question-form v-if="$store.state.teacherCreateAssignment.states.isCreatingQuestion"/>


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

      <!--      <div class="pb-16/9 mt-6 bg-white" v-if="isPreviewing">-->
      <!--        <div-->
      <!--            class="w-full h-full object-cover top-0 flex flex-row justify-center items-center absolute">-->
      <!--          <img :src="previewImage"/>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--  Modal Schedule    -->
      <!--      <div v-if="toggleSchedule" @click.self="toggleSchedule = !toggleSchedule"-->
      <!--           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">-->
      <!--        <modal class="fixed mx-1/24" v-if="toggleSchedule" modal-type="no-icon">-->
      <!--          <h3 slot="title" class="font-bold">Schedule Publish</h3>-->
      <!--          <div slot="message" class="w-full grid grid-cols-1 divide-y divide-transparent">-->
      <!--            <div>-->
      <!--              <p class="mb-3">Pick date and time to publish the assignment.</p>-->
      <!--            </div>-->
      <!--            <v-date-picker class="place-self-center" v-model="published_at" mode="dateTime"/>-->
      <!--          </div>-->
      <!--          <span slot="button">-->
      <!--                    <button @click="sendData"-->
      <!--                            :disabled="isPublishing"-->
      <!--                            class="font-bold w-full rounded-full px-2 font-bold leading-relaxed tracking-wider"-->
      <!--                    >-->
      <!--                      Schedule Publish-->
      <!--                    </button>-->
      <!--                </span>-->
      <!--        </modal>-->
      <!--      </div>-->

      <!--      &lt;!&ndash;  Modal Duration    &ndash;&gt;-->
      <!--      <div v-if="toggleDuration" @click.self="closeToggleDuration"-->
      <!--           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">-->
      <!--        <modal class="fixed mx-1/24" v-if="toggleDuration" modal-type="no-icon">-->
      <!--          <h3 slot="title" class="font-bold">Set Due Date & Time</h3>-->
      <!--          <div slot="message" class="w-full grid grid-cols-1 divide-y divide-transparent">-->
      <!--            <v-date-picker class="place-self-center" :min-date="new Date()" v-model="due_datetime" mode="dateTime"/>-->
      <!--          </div>-->
      <!--          <span slot="button">-->
      <!--                    <button class="font-bold w-full rounded-full px-2 font-bold leading-relaxed tracking-wider"-->
      <!--                            @click="closeToggleDuration">Okay</button>-->
      <!--                </span>-->
      <!--        </modal>-->
      <!--      </div>-->
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
      <!--      <div v-if="isPublishing" @click.self="isPublishing = !isPublishing"-->
      <!--           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">-->
      <!--        <modal v-if="isPublishing"-->
      <!--               modal-type="no-icon"-->
      <!--               :has-button="false"-->
      <!--               class="w-4/5 "-->
      <!--        >-->
      <!--          <p slot="message">-->
      <!--            Publishing your assignment.-->
      <!--            <br>-->
      <!--            Please wait...-->
      <!--          </p>-->
      <!--        </modal>-->
      <!--      </div>-->

<!--      &lt;!&ndash;  Modal Published   &ndash;&gt;-->
<!--      <div v-if="published" @click.self="published = !published"-->
<!--           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">-->
<!--        <modal v-if="published"-->
<!--               modal-type="success"-->
<!--               :redirect-route="{name: 'teacher.assignments'}"-->
<!--               class="w-4/5 "-->
<!--        >-->
<!--          <h3 slot="title" class="text-purple-primary font-bold text-4xl">Published!</h3>-->
<!--          <p slot="message">-->
<!--            Got something to change? Don't worry! You can always edit your published homework-->
<!--          </p>-->
<!--          <template slot="button">-->
<!--            <button class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider">-->
<!--              Okay-->
<!--            </button>-->
<!--          </template>-->
<!--        </modal>-->
<!--      </div>-->

      <error-modal v-if="$store.state.teacherCreateAssignment.states.isShowingError"/>
    </template>

    <template v-slot:bottomBar v-if="$store.state.teacherCreateAssignment.states.isMain">
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
          <button @click="$store.dispatch('teacherCreateAssignment/sendData')"
                  :disabled="$store.state.teacherCreateAssignment.states.isPublishing"
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
    this.$store.dispatch('teacherCreateAssignment/getClasses')
    this.$store.dispatch('teacherCreateAssignment/getSubjects')
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
