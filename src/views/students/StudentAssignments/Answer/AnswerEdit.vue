<template>

  <dashboard-layout :content-fills-screen="isEditingWrittenAnswer || isPreviewingSnappedAnswer"
                    :has-custom-bottom-bar="isMainPage"
                    :no-bottom-bar="isEditingWrittenAnswer || isPreviewingSnappedAnswer"
  >


    <template v-slot:pageHeader>
      <page-header-three>

        <template v-slot:leftAction>
          <nav-back v-if="isMainPage" type="cancel"
                    :to="{name: 'student.assignments.show'}"
                    class="w-2/3" stroke-color="red-primary"/>

          <div @click="toggleEditingMode" v-if="isEditingWrittenAnswer" class="pl-3">
            <icon-base-two class="w-2/7" >
              <arrow-back-icon/>
            </icon-base-two>
          </div>

          <div @click="toggleSnappedAnswerPreview" v-if="isPreviewingSnappedAnswer">
            <icon-base-two class="w-2/7 ml-3" >
              <arrow-back-icon/>
            </icon-base-two>
          </div>
        </template>

        <template v-slot:mini-title>
          {{ pageTitle }}
        </template>

        <template v-if="isEditingWrittenAnswer" v-slot:rightAction>
          <div @click="compileWrittenAnswer"
               :class="newAnswer.length > 0 ? 'text-red-primary' : 'text-gray-primary'"
               class="font-bold"
          >
            Save
          </div>
        </template>

      </page-header-three>
    </template>

    <template v-slot:content v-if="isMainPage">


      <!-- OVERLAYS -->
      <div v-if="isShowingModal" @click="toggleModal"
            class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 bg-gray-primary bg-opacity-75 ">
      </div>

      <!-- MODAL -->
      <div v-if="isShowingModal"
          class="fixed left-0 w-full items-center flex flex-col items-center justify-center top-1/4 z-70">
        <modal class="w-4/5 "
               :modal-type="submissionStatus"
               :redirect-route="{name: 'student.assignments.show'}"
               @toggleModal="toggleModal"
        >
          <template slot="message">
            <div v-if="submissionStatus === 'success'" class="w-full">
              Got something to change? Don't worry! You can always edit your published homework
            </div>
          </template>
          <template slot="button">
            Okay
          </template>
        </modal>
      </div>



      <div class="relative pt-7/24 px-6 h-full text-left text-purple-primary">

        <!-- SUBMISSION DETAIL -->
        <div>
          <div>
            Your answer will be submitted to
          </div>
          <div class="font-bold mt-1">
            {{ assignmentDetails ? assignmentDetails.title : '' }}
          </div>
        </div>

        <!-- VIEW STORED ANSWER -->
        <div v-if="isWrittenAnswer" class="mt-10">
          <div>
            Your Written Answer
          </div>
          <div
              class="flex flex-row justify-between mt-5 px-5 py-5 items-center bg-gray-secondary text-blue-secondary rounded-lg">
            <div @click="editWrittenAnswer">
              Edit Answer
            </div>

            <div class="w-1/12">
              <icon-base-two class="w-6/7">
                <trash-icon/>
              </icon-base-two>
            </div>
          </div>

        </div>

        <!-- VIEW SNAPPED ANSWER -->
        <div class="mt-10" v-if="isSnappedAnswer">
          <div class="mb-4">
            Your Snapped Answer
          </div>
          <div class="flex flex-col">
            <div v-for="(answer, index) in newAnswer"
                 class="flex flex-row justify-between mt-3 px-5 py-5 items-center bg-gray-secondary text-blue-secondary rounded-lg">

              <div @click="handleSnappedAnswerPreview(index)">
                View Photo
              </div>

              <div @click="removeSnappedAnswer(index)" class="w-1/12">
                <icon-base-two class="w-6/7">
                  <trash-icon/>
                </icon-base-two>
              </div>
            </div>
          </div>


          <!-- ADD MORE PHOTO -->
          <div class="flex mb-4 -mx-1">
            <label
                class="text-center pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full text-lg font-normal leading-tight focus:outline-none focus:shadow-outline text-red-primary">
              + Add more photo
              <input class="hidden" type="file" multiple @change="onFileSelected">
            </label>
          </div>

        </div>

        <div class="mt-6">
          <div>
            Your remarks
          </div>
          <div class="mt-4 h-36 ">
                    <textarea v-model="remarks"
                              class="resize-y text-purple-primary py-4 px-5 h-full w-full bg-gray-secondary rounded focus:outline-none placeholder-purple-secondary"
                              placeholder="Remarks"></textarea>
          </div>
        </div>

      </div>
    </template>

    <template v-if="isEditingWrittenAnswer" slot="content">
      <div class=" pt-32 px-6 h-full">
        <textarea v-model="newAnswer"
                  class="resize-y text-purple-primary  w-full h-full  rounded focus:outline-none"
        />
      </div>
    </template>

    <template v-if="isPreviewingSnappedAnswer" slot="content">
        <div
            class="w-full h-full object-cover top-0 flex flex-row justify-center items-center absolute">
          <img :src="snappedAnswerPreviews[snappedAnswerPreviewIndex]" />
        </div>
    </template>


    <template v-slot:bottomBar v-if="isMainPage">
      <div class="w-full px-2">
        <button @click="submit"
                class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-4 px-1 flex flex-row justify-center">
          Submit Answer
        </button>
      </div>
    </template>
  </dashboard-layout>

</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import TrashIcon from "@/components/icons/TrashIcon";
import SubmissionRepository from "@/repositories/SubmissionRepository";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import Modal from "@/components/Modal";

export default {
  name: "AnswerEdit",
  props: {
    submissionID: [String, Number]
  },
  data() {
    return {

      // States
      isMainPage: true,
      isEditingWrittenAnswer: false,
      isPreviewingSnappedAnswer: false,
      isShowingModal: false,
      submissionStatus: null,

      snappedAnswerPreviews: [],
      snappedAnswerPreviewIndex : null,

      assignmentDetails: {
        id: null,
        title: null
      },
      answer: {
        type: null,
        content: null
      },
      newAnswer: '',
      remarks: null
    }
  },
  computed: {
    hasAnswer() {
      return this.answer.type !== null && this.answer.content !== '';
    },
    isWrittenAnswer() {
      return this.answer.type === 'written';
    },
    isSnappedAnswer() {
      return this.answer.type === 'snapped';
    },
    pageTitle() {
      if (this.isMainPage) return 'Answer';
      if (this.isEditingWrittenAnswer) return 'Edit Answer'
    },
  },
  methods: {
    fetchData() {

      SubmissionRepository.find(this.submissionID)
          .then(response => {

            const data = response.data.submission_details;

            // Assignment details
            this.assignmentDetails.id = data.assignment_id;
            this.assignmentDetails.title = data.assignment_title;

            // Answer
            if (data.snap_answer) {
              this.answer.type = 'snapped';
              this.answer.content = data.snap_answer;

              this.newAnswer = data.snap_answer_url.split('|');
              this.snappedAnswerPreviews = data.snap_answer_url.split('|');
            }

            if (data.written_answer) {
              this.answer.type = 'written';
              this.answer.content = data.written_answer;
            }

            this.remarks = data.remarks;
          })
    },

    submit() {

      SubmissionRepository.update(
          {
            submissionID: this.submissionID,
            assignmentID: this.assignmentDetails.id,
            answerType: this.answer.type,
            answerContent: this.newAnswer,
            remarks: this.remarks,
          })
          .then(response => {
            let content = response.data;
            let type = content.messageType;

            if (type === 'success') {
              this.submissionStatus = type;
              this.toggleModal();
            }
          })
    },

    editWrittenAnswer() {
      this.toggleEditingMode();
      this.newAnswer = this.answer.content;
    },

    compileWrittenAnswer() {
      this.answer.content = this.newAnswer;
      this.toggleEditingMode();
    },

    handleSnappedAnswerPreview(index) {
      this.snappedAnswerPreviewIndex = index;
      this.toggleSnappedAnswerPreview();
    },

    onFileSelected(e) {
      let files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      if (files[0].type.match("image.*")) {
        this.newAnswer.push(files[0]);
        this.generateSnappedAnswerPreview(files)
      }
    },

    generateSnappedAnswerPreview(files) {
      files.forEach(f => {

        if (!f.type.match("image.*")) {
          return;
        }

        let reader = new FileReader();
        let that = this;

        reader.onload = function (e) {
          that.snappedAnswerPreviews.push(e.target.result);
        }

        reader.readAsDataURL(f);
      });
    },

    removeSnappedAnswer(index) {
      this.newAnswer.splice(index, 1);
      this.snappedAnswerPreviews.splice(index, 1);
    },

    toggleSnappedAnswerPreview() {

      if (this.isPreviewingSnappedAnswer) {
        this.isMainPage = true;
        this.isEditingWrittenAnswer = false;
        this.isPreviewingSnappedAnswer = false;
      } else {
        this.isMainPage = false;
        this.isEditingWrittenAnswer = false;
        this.isPreviewingSnappedAnswer = true;
      }
    },

    toggleEditingMode() {

      if (this.isEditingWrittenAnswer) {
        this.isMainPage = true;
        this.isEditingWrittenAnswer = false;
        this.isPreviewingSnappedAnswer = false;
      } else {
        this.isMainPage = false;
        this.isEditingWrittenAnswer = true;
        this.isPreviewingSnappedAnswer = false;
      }

    },

    toggleModal() {
      this.isShowingModal = !this.isShowingModal;
    }
  },
  mounted() {
    this.fetchData();
  },
  components: {Modal, ArrowBackIcon, TrashIcon, IconBaseTwo, NavBack, PageHeaderThree, DashboardLayout}
}
</script>

<style scoped>

</style>
