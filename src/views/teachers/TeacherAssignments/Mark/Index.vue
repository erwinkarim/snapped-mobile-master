<template>
  <div :class="containerClass"
       class="h-full md:max-w-xl mx-auto"
  >

    <!---------------------
            OVERLAYS
     --------------------->
    <div v-if="$store.state.teacherMarking.states.isShowingModal" @click="toggleModalMode()"
         class="fixed w-full bg-black-primary bg-opacity-25 h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 ">
    </div>
    <div v-if="$store.state.teacherMarking.states.isSelectingSticker" @click="toggleStickerBar"
         class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 ">
    </div>


    <!---------------------
            MODAL
     --------------------->
    <div v-if="$store.state.teacherMarking.states.isShowingModal"
         class="fixed left-0 w-full items-center flex flex-col items-center justify-center top-1/4 z-70">
      <modal modal-type="error"
             @toggleModal="toggleModalMode()"
             class="w-4/5 "
      >
        <template slot="message" v-if="$store.state.teacherMarking.nowShowingModal === 'no_mark'">
          You must add mark for this assignment.
        </template>
        <template slot="button">
          Okay
        </template>
      </modal>
    </div>

    <div
        v-if="$store.state.teacherMarking.states.isShowingModal && $store.state.teacherMarking.nowShowingModal === 'is_submitting'"
        class="fixed left-0 w-full items-center flex flex-col items-center justify-center top-1/4 z-70">
      <modal @toggleModal="toggleModalMode()"
             :has-button="false"
             class="w-4/5 "
      >
        <template slot="message">
          Submitting marking...
        </template>
      </modal>
    </div>

    <!-- HEADER -->
    <page-header/>

    <!-- CONTENT -->
    <div class="relative">
      <router-view/>
    </div>

    <!-- BOTTOM -->
    <bottom-bar v-if="showBottomBar"/>

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
import UndoIcon from "@/components/icons/UndoIcon";
import PageHeader from "@/views/teachers/TeacherAssignments/Mark/Components/PageHeader";

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
      let value = 'bg-white mb-40 ';

      if (this.$store.state.teacherMarking.states.isMarking) {
        value = 'bg-black-primary';
      }

      return value;
    },

    showBottomBar() {
      console.log(`Show bottom bar: ${!this.$store.state.teacherMarking.states.isLoading} | ${!this.$store.getters["teacherMarking/isPreparingCanvas"]}`)
      return !this.$store.state.teacherMarking.states.isLoading || !this.$store.getters["teacherMarking/isPreparingCanvas"]
    }


  },
  methods: {
    handleRouteChange() {

      this.scrollToTop();


      let path = this.$route.name;

      if (path === 'teacher.assignments.marking.details' && !this.$store.state.teacherMarking.states.isPreviewing) {
        this.$store.commit('teacherMarking/setMainMode')
      }

      if (path === 'teacher.assignments.marking.feedback') {
        this.$store.commit('teacherMarking/setWritingFeedbackMode')
      }
    },

    toggleStickerBar() {
      this.$store.commit("teacherMarking/toggleStickerBar")
    },

    toggleModalMode() {
      this.$store.commit('teacherMarking/toggleModalMode')
    },

    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
  },
  mounted() {
    console.log('mounted marking page')
    this.$store.commit('teacherMarking/setOriginalState')
    this.$store.dispatch('teacherMarking/fetchData', this.submissionID)
  },
  destroyed() {
    // TODO: Reset teacherMarking.js
  },
  components: {
    PageHeader,
    UndoIcon, Modal, BottomBar, ExpandImageIcon, ArrowBackIcon, IconBaseTwo, NavBack, PageHeaderThree
  },

}
</script>

<style scoped>

</style>
