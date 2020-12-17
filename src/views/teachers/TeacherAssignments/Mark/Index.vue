<template>
  <div :class="containerClass" class="h-screen">

    <!-- OVERLAYS -->
    <div v-if="$store.state.teacherMarking.states.isShowingModal" @click="toggleModalMode()"
         class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 bg-gray-primary bg-opacity-75 ">
    </div>
    <div v-if="$store.state.teacherMarking.states.isSelectingSticker" @click="toggleStickerBar"
         class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 bg-filter-blue bg-opacity-40 ">
    </div>


    <!-- MODAL -->
    <div v-if="$store.state.teacherMarking.states.isShowingModal"
         class="fixed left-0 w-full items-center flex flex-col items-center justify-center top-1/4 z-70">
      <modal modal-type="error"
             @toggleModal="toggleModalMode()"
             :redirect-route="{name: 'teacher.assignments.marking.add_mark'}"
             class="w-4/5 "
      >
        <template slot="message">
          You must add mark for this assignment.
        </template>
        <template slot="button">
          Okay
        </template>
      </modal>
    </div>


    <!-- HEADER -->
    <page-header-three :background-color="headerBackgroundColor"
                       :bottom-padding="8"
    >

      <template v-slot:leftAction>
        <nav-back v-if="$store.state.teacherMarking.states.isMain"
                  :to="{name: 'teacher.assignments.show'}"
                  class="w-1/4"
                  :stroke-color="navBackColor"
        />

        <div @click="togglePreviewMode" v-if="$store.state.teacherMarking.states.isPreviewing">
          <icon-base-two class="w-1/4 ml-6">
            <arrow-back-icon :stroke-color="navBackColor"/>
          </icon-base-two>
        </div>
      </template>

      <template v-slot:title v-if="$store.state.teacherMarking.states.isPreviewing">
        Answer Preview
      </template>

      <template v-slot:rightAction>
        <div v-if="$store.state.teacherMarking.states.isMain" class="flex flex-row justify-end items-center mr-5">
          <div @click="togglePreviewMode" :to="{name: 'student.class.classmates'}" class="w-2/7 ">
            <icon-base-two>
              <expand-image-icon/>
            </icon-base-two>
          </div>
        </div>
      </template>

    </page-header-three>

    <!-- CONTENT -->
    <div class="relative">
      <router-view/>
    </div>

    <bottom-bar/>

  </div>
</template>

<script>
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import ExpandImageIcon from "@/components/icons/ExpandImageIcon";
import BottomBar from "@/views/teachers/TeacherAssignments/Mark/Components/BottomBar";
import SubmissionRepository from "@/repositories/SubmissionRepository";
import Modal from "@/components/Modal";
import MarksRepository from "@/repositories/teachers/MarksRepository";
import router from "@/router";
import moment from "moment";

export default {
  name: "Index",
  props: {
    submissionID: [String, Number],
    markID: [String, Number],
  },

  watch: {
    '$route': 'handleRouteChange',
  },
  computed: {

    containerClass: function () {
      let value = 'bg-white';

      if (this.$store.state.teacherMarking.states.isMarking) {
        value = 'bg-black-primary';
      }

      return value;
    },

    headerBackgroundColor: function () {

      let value = 'bg-black-primary';

      if (this.$store.state.teacherMarking.states.isPreviewing || this.$store.state.teacherMarking.states.isWritingFeedback) {
        value = 'bg-white'
      }
      return value;
    },

    navBackColor: function () {
      if (this.$store.state.teacherMarking.states.isPreviewing) {
        return 'purple-primary'
      } else {
        return 'white'
      }
    },
  },
  methods: {
    handleRouteChange() {

      let path = this.$route.name;

      if (path === 'teacher.assignments.marking.details') {
        this.$store.commit('teacherMarking/setMainMode')
      }

      if (path === 'teacher.assignments.marking.feedback') {
        this.$store.commit('teacherMarking/setWritingFeedbackMode')
      }
    },

    // MODE: PREVIEW
    togglePreviewMode() {
      this.$store.commit('teacherMarking/togglePreviewMode')
    },

    toggleStickerBar() {
      this.$store.commit("teacherMarking/toggleStickerBar")
    },

    toggleModalMode() {
      this.$store.commit('teacherMarking/toggleModalMode')
    }
  },
  mounted() {
    this.$store.commit('teacherMarking/setOriginalState')
    this.$store.dispatch('teacherMarking/fetchData', this.submissionID)
  },
  components: {Modal, BottomBar, ExpandImageIcon, ArrowBackIcon, IconBaseTwo, NavBack, PageHeaderThree},

}
</script>

<style scoped>

</style>
