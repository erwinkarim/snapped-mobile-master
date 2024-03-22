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
            :disabled="$store.getters['teacherCreateAssignment/hasZoomMeeting']"
            class="text-red-primary w-5/7">
            Cancel
          </button>
        </template>
        <template v-slot:mini-title>
          Create Question
        </template>
        <template v-slot:rightAction>
          <button @click="$store.dispatch('teacherCreateAssignment/saveQuestion')"
            class="font-bold"
            :disabled="$store.getters['teacherCreateAssignment/hasZoomMeeting']"
          >
            Save
          </button>
        </template>
      </page-header-three>


      <!-- HEADER: Writing Question -->
      <!--page-header-three v-if="$store.state.teacherCreateAssignment.states.isWritingQuestion">
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
      </page-header-three-->
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

					<!--
						- load school (and if teacher is edschool teacher, add eddschool)
						- load classes based on school
						- looking the store, state, SMH
					-->
					<select v-model="$store.state.teacherCreateAssignment.assignmentDetails.school_id"
						class="py-5 pr-2 pl-6 mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
            @change="schoolChanged()"
					>
            <option disabled value="">School</option>
            <option v-for="school in $store.state.teacherCreateAssignment.selectables.schools" :value="school.id">
							{{ school.name  }}
						</option>
					</select>

          <!-- classroom -->
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

          <!-- subject -->
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

          <!-- CREATE/EDIT QUESTION -->
          <div
              class="mt-2 w-full text-lg font-normal leading-tight text-left rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
            <button v-if="$store.getters['teacherCreateAssignment/hasSavedQuestion']"
                    @click="$store.dispatch('teacherCreateAssignment/editSavedQuestion')"
                    class="flex flex-row justify-between w-full py-5 pl-6"
            >
              <div class="w-4/5 text-left">
                Question
              </div>
              <div class="mr-5 w-1/5 text-right text-blue-secondary">
                Edit
              </div>
            </button>
            <button v-else @click="$store.commit('teacherCreateAssignment/toggleCreatingQuestionMode')"
              class="w-full py-5 pl-6 text-left "
            >
              Create Question
            </button>
          </div>


          <!-- due date -->
          <div @click="$store.commit('teacherCreateAssignment/toggleSelectingDurationMode')"
               class="flex flex-row items-center justify-between py-5 pr-2 pl-6 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
          >
            <div class=" w-7/8 text-left text-purple-secondary md:w-9/10">
              {{
                $store.getters['teacherCreateAssignment/hasSavedDueDatetime'] ? $store.getters['teacherCreateAssignment/dueDateTime'] : 'Set Due Date'
              }}
            </div>
            <div class=" w-1/8 pr-2 md:w-1/10">
              <icon-base-two>
                <clock-icon/>
              </icon-base-two>
            </div>
          </div>

          <!-- auto marking option -->
          <div class="py-5 pr-2 pl-6 my-2 w-full text-lg font-normal leading-tight text-left rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
            <!-- auto marking option, should be available if mysoalan is selected -->
            <!-- auto marking is disabled if mysoalan is not selected or this is an exclusive mysoalan question -->
            <input type="checkbox" id="auto-marking-check" name="auto-marking" 
              v-model="$store.state.teacherCreateAssignment.assignmentDetails.auto_marking" 
              @click="$store.commit('teacherCreateAssignment/toggleAutoMarking')" 
              :disabled="!$store.getters['teacherCreateAssignment/hasMySoalanQuestion'] || $store.getters['teacherCreateAssignment/isMySoalanExclusive']"
            />
            <label for="auto-marking-check" class="ml-2"
              :disabled="!$store.getters['teacherCreateAssignment/hasMySoalanQuestion'] || $store.getters['teacherCreateAssignment/isMySoalanExclusive']"
            >Auto-Marking</label>
            <br />
            <sub>Snapped will automatically mark this assignment. Assignment must have MySoalan question type.</sub>
          </div>

          <!-- penalty option -->
          <div class="py-5 pr-2 pl-6 my-2 w-full text-lg font-normal leading-tight text-left rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
            <input type="checkbox" id="penalty-option" name="penalty" 
              v-model="$store.state.teacherCreateAssignment.assignmentDetails.penalty" 
              @click="$store.commit('teacherCreateAssignment/togglePenalty')" 
            />
            <label for="penalty-option" class="ml-2">Penalty</label><br />
            <sub>Late submission will have a 20 point penalty.</sub>
          </div>

          <!-- remarks -->
          <textarea v-model="$store.state.teacherCreateAssignment.assignmentDetails.remarks"
                    class="py-5 pr-2 pl-6 w-full h-36 mb-2 text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                    placeholder="Remarks or Link"
          ></textarea>
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
              <date-picker 
                v-model="date"
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

      <div v-if="$store.state.teacherCreateAssignment.states.isShowingScheduler"
           @click.self="$store.commit('teacherCreateAssignment/toggleShowingSchedulerMode')"
           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
        <modal class="fixed mx-1/24" modal-type="no-icon">
          <template v-slot:title>
            <h3 class="font-bold">Schedule Publish</h3>
          </template>
          <template v-slot:message>
            <div class="w-full grid grid-cols-1 divide-y divide-transparent">
              <div>
                <p class="mb-3">Pick date and time to publish the assignment.</p>
              </div>
              <date-picker 
                class="place-self-center"
                v-model="$store.state.teacherCreateAssignment.assignmentDetails.published_at"
                mode="dateTime"
              />
            </div>
          </template>
          <template v-slot:button>
            <span slot="button">
              <button @click="$store.dispatch('teacherCreateAssignment/sendData')"
                :disabled="$store.state.teacherCreateAssignment.states.isPublishing"
                class="font-bold w-full rounded-full px-2 font-bold leading-relaxed tracking-wider"
              >
                Schedule Publish
              </button>
            </span>
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

      <!--  Modal Published   -->
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

      <error-modal v-if="$store.state.teacherCreateAssignment.states.isShowingError" />
    </template>

    <template v-slot:bottomBar v-if="$store.state.teacherCreateAssignment.states.isMain">
      <div class="flex flex-row w-full max-w-xl">
        <div class="px-2 w-4/7">
          <button @click="$store.commit('teacherCreateAssignment/toggleShowingSchedulerMode')"
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
// import Calendar from "v-calendar/lib/components/calendar.umd";
// import DatePicker from "v-calendar/lib/components/date-picker.umd";
import { ref } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
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

/*
Vue.component('v-calendar', Calendar)
Vue.component('v-date-picker', DatePicker)
Vue.component('multiselect', Multiselect)
*/

import 'v-calendar/style.css';

export default {
  name: "Index",
  props: {
    strokeColor: String,
  },
  data() {
    return {
      date: new Date(),
      startDate: ref(new Date()),
    }
  },
  computed: {},
  watch: {},
  methods: {
    schoolChanged(){
      console.log('fire schoolChanged');
      this.$store.dispatch('teacherCreateAssignment/getClasses')
    },
  },
  mounted() {
    console.log('mounted teacher/create/assignment/index');
    
    this.$store.commit('teacherCreateAssignment/initialise')
		this.$store.dispatch('teacherCreateAssignment/getSchools');
    // get classes based on school
    // this.$store.dispatch('teacherCreateAssignment/getClasses')
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

    /*
      if got assign_paper in the query, 
        - need to open up the create question form with the mysoal uuid
        - load up session data and put into teacherCreateAssignment.assignmentDetail
        - load local selection too.
    */
    if(this.$route.query.assign_paper){
      // console.log('assign paper detected, open the question form');
      // go into CreateQuestionMode
      // this.$store.commit('teacherCreateAssignment/toggleCreatingQuestionMode');

      // load assignmentDetail from Session Storage
      // this.$store.commit('teacherCreateAssignment/loadAssignmentDetailFromSessionStorage');

      console.log('load session data');
      
      this.$store.dispatch('teacherCreateAssignment/loadSessionData');
    }
  },
  components: {
    ErrorModal, CreateQuestionForm, VueCropper, ClockIcon, TrashIcon, Modal, ArrowBackIcon, CameraIcon, PenIcon, DashboardLayout, PageHeaderThree, PageTitleTwo, NavBack, PageTitle, 
    CalendarIcon, IconBaseTwo,
    Calendar, DatePicker,  Multiselect,
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
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
