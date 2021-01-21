<template>
  <dashboard-layout :has-custom-bottom-bar="true">

    <!--  HEADER -->
    <template v-slot:pageHeader>
      <page-header-three class="px-2" :has-scroll-animation="true">
        <template v-slot:leftAction>
          <nav-back class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Edit Assignment
        </template>
        <template v-slot:title>
          Edit Assignment
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>

      <!--  MODAL: SUCCESS   -->
      <div v-if="isShowingSuccessModal" @click.self=""
           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
        <modal :redirect-route="{name: 'teacher.assignments.show'}"
               modal-type="success"
               class="w-4/5 "
        >
          <h3 slot="title" class="text-purple-primary font-bold text-4xl">Published!</h3>
          <p slot="message">
            Assignment updated!
          </p>
          <template slot="button">
            <button class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider">
              Okay
            </button>
          </template>
        </modal>
      </div>

      <!--  MODAL: DELETE   -->
      <div v-if="isShowingDeleteModal" @click.self="toggleDeleteModal"
           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
        <modal
               modal-type="no-icon"
               class="w-4/5 "
        >
          <h3 slot="title" class="text-purple-primary font-bold text-4xl">Delete this assignment</h3>
          <p slot="message">
            Are you sure?
          </p>
          <template slot="button">
            <div @click="deleteAssignment">
              DELETE THIS
            </div>
          </template>
        </modal>
      </div>

      <!--  MODAL: SELECT DUE DATE -->
      <div v-if="isSelectingDueDate" @click.self="closeSetDueDateModal"
           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">
        <modal class="fixed mx-1/24" v-if="isSelectingDueDate" modal-type="no-icon">

          <template v-slot:title>
            <div class="font-bold">
              Set Due Date & Time
            </div>
          </template>

          <template v-slot:message>
            <div class="w-full grid grid-cols-1 divide-y divide-transparent">
              <v-date-picker class="place-self-center" :min-date="new Date()" v-model="due_datetime" mode="dateTime"/>
            </div>
          </template>

          <template v-slot:button>
            <button @click="closeSetDueDateModal"
                    class="font-bold w-full rounded-full px-2 font-bold leading-relaxed tracking-wider"
            >
              Okay
            </button>
          </template>
        </modal>
      </div>

      <!-- INPUTS     -->
      <div class="w-full px-7 mt-3 pb-3">

        <!--  INPUT: SELECT DUE DATE      -->
        <div
            class="flex mb-2 pl-6 pr-2 py-5 mt-2 grid grid-cols-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
          <div class="text-left place-self-start truncate">
            <button @click="isSelectingDueDate = !isSelectingDueDate">
              {{ due_datetime ? getHumanDate(due_datetime) : 'Change Due Date' }}
            </button>
          </div>
          <div>
            <button @click="isSelectingDueDate = !isSelectingDueDate">
              <icon-base-two class="align-center float-right w-1/8 mr-3">
                <clock-icon/>
              </icon-base-two>
            </button>
          </div>
        </div>

      </div>

    </template>

    <template v-slot:bottomBar>
      <button @click="toggleDeleteModal"
              class="w-full font-bold rounded-full text-white text-sm bg-red-primary border-2 border-red-primary py-3 px-1 flex flex-row justify-center mr-2">
        Delete
      </button>
      <button @click="submit"
              class="w-full font-bold rounded-full text-purple-primary text-sm bg-white border-2 border-purple-primary py-3 px-1 flex flex-row justify-center">
        Update
      </button>
    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import Modal from "@/components/Modal";
import IconBaseTwo from "@/components/IconBaseTwo";
import ClockIcon from "@/components/icons/ClockIcon";
import moment from "moment";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import router from "@/router";

export default {
  name: "Index",
  props: {
    assignmentID: [String, Number]
  },
  data() {
    return {

      // states
      isSelectingDueDate: false,
      isShowingSuccessModal: false,
      isShowingDeleteModal: false,
      isDeleted: false,

      // models
      due_datetime: ''
    }
  },
  methods: {

    submit() {

      if (this.due_datetime) {
        AssignmentRepository.update(this.assignmentID, this.format_date(this.due_datetime))
            .then(response => {
              if (response.data.messageType === 'success') {
                this.isShowingSuccessModal = true;
              }
            })
      }
    },

    deleteAssignment () {
      AssignmentRepository.delete(this.assignmentID)
          .then(response => {
            if (response.data.messageType === 'success') {
              this.toggleDeleteModal();
              router.push({ name: 'teacher.assignments'})
            }
          })
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD HH:mm:ss')
      }
    },

    getHumanDate(datetime) {
      return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
    },

    toggleDeleteModal() {
      this.isShowingDeleteModal = !this.isShowingDeleteModal
    },

    closeSetDueDateModal() {
      if (this.durationDay === '') {
        this.durationDay = 0
      }
      if (this.durationHour === '') {
        this.durationHour = 0
      }
      if (this.durationMinute === '') {
        this.durationMinute = 0
      }

      this.isSelectingDueDate = !this.isSelectingDueDate
    },
  },
  components: {ClockIcon, IconBaseTwo, Modal, NavBack, PageHeaderThree, DashboardLayout}
}
</script>

<style scoped>

</style>
