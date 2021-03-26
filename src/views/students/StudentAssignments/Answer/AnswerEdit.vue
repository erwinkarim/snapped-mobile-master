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
                    class="w-2/3 text-left" stroke-color="red-primary"/>

          <div @click="toggleEditingMode" v-if="isEditingWrittenAnswer" class="pl-3">
            <icon-base-two class="w-2/7">
              <arrow-back-icon/>
            </icon-base-two>
          </div>

          <div @click="toggleSnappedAnswerPreview" v-if="isPreviewingSnappedAnswer">
            <icon-base-two class="w-2/7 ml-3">
              <arrow-back-icon/>
            </icon-base-two>
          </div>
        </template>

        <template v-slot:mini-title>
          <div class="truncate">
            {{ pageTitle }}
          </div>
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
            <div v-if="submissionStatus === 'error'" class="w-full">
              Oops! There seems to be an error in your submission.
            </div>
          </template>
          <template slot="button">
            Okay
          </template>
        </modal>

        <modal v-if="errors"
               modal-type="error"
               class="w-4/5 "
               @toggleModal="toggleModal"
        >
          <template slot="message">
            <div>
              {{ errors }}
            </div>
          </template>
          <template slot="button">
            Okay
          </template>
        </modal>
      </div>


      <div class="relative pt-7/24 px-6 h-full w-full text-left text-purple-primary">

        <!-- SUBMISSION DETAIL -->
        <div>
          <div>
            Your answer will be submitted to
          </div>
          <div class="font-bold mt-1 truncate">
            {{ assignmentDetails ? assignmentDetails.title : '' }}
          </div>
        </div>

        <!-- VIEW EXISTING ANSWERS -->
        <div class="mt-10" v-if="isSnappedAnswer && existingSnappedAnswers.length">
          <div class="mb-4">
            Current Answers
          </div>
          <div v-for="(image,key) in existingSnappedAnswers"
               class="flex flex-col py-5 px-5 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
          >
            <div class="mt-5 w-full">
              <img :src="image.path"/>
            </div>

            <div class="flex flex-row items-center mt-2 md:mt-4 ">
              <button @click="removeSnappedAnswer(key, 'existing')"
                      class="flex flex-row items-center w-full py-3 md:py-5 mr-1 rounded-lg bg-red-primary focus:outline-none">
                <div class="text-white text-sm md:text-lg w-3/4">
                  Remove
                </div>
                <div class="w-1/4">
                  <font-awesome-icon class="w-full fa-1x text-white" :icon="icons.trash"/>
                </div>
              </button>
            </div>
          </div>
        </div>


        <!-- VIEW NEW ANSWERS -->
        <div class="mt-10" v-if="isSnappedAnswer">
          <div class="mb-4">
            New Answers
          </div>

          <div v-for="(image,key) in snappedAnswerPreviews"
               class="flex flex-col py-5 px-5 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
          >

            <div class="mt-5 w-full">

              <vue-cropper :ref="`cropper_${key}`"
                           :src="image.source"
                           alt="Source Image"
                           @ready="handleVueCropperReady"
              >
              </vue-cropper>

              <div v-if="image.cropping" class="flex flex-row items-center mt-4 md:mt-4 ">
                <button @click="toggleSnappedCroppingStatus(key)"
                        class="flex flex-row items-center w-1/2  py-3 md:py-5 mr-1 rounded-lg bg-red-primary focus:outline-none">
                  <div class="text-white text-sm md:text-lg w-full">
                    Cancel
                  </div>
                </button>
                <button @click="saveCroppedSnappedAnswer(key)"
                        class="flex flex-row items-center  py-3  md:py-5 w-1/2 ml-1 rounded-lg bg-green-400 focus:outline-none">
                  <div class="text-white text-sm md:text-lg w-3/4">
                    Done
                  </div>
                  <div class="w-1/4">
                    <font-awesome-icon class="w-full fa-1x text-white" :icon="icons.crop"/>
                  </div>
                </button>
              </div>

              <div v-else class="flex flex-row items-center mt-2 md:mt-4 ">
                <button @click="removeSnappedAnswer(key, 'new')"
                        class="flex flex-row items-center w-1/2  py-3 md:py-5 mr-1 rounded-lg bg-red-primary focus:outline-none">
                  <div class="text-white text-sm md:text-lg w-3/4">
                    Remove
                  </div>
                  <div class="w-1/4">
                    <font-awesome-icon class="w-full fa-1x text-white" :icon="icons.trash"/>
                  </div>
                </button>
                <button @click="toggleSnappedCroppingStatus(key)"
                        class="flex flex-row items-center  py-3  md:py-5 w-1/2 ml-1 rounded-lg bg-purple-primary focus:outline-none">
                  <div class="text-white text-sm md:text-lg w-3/4">
                    Crop
                  </div>
                  <div class="w-1/4">
                    <font-awesome-icon class="w-full fa-1x text-white" :icon="icons.crop"/>
                  </div>
                </button>
              </div>
            </div>

          </div>

          <!-- ADD MORE PHOTO -->
          <div class="flex mb-4 -mx-1">
            <label
                class="text-center pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full text-lg font-normal leading-tight focus:outline-none focus:shadow-outline text-red-primary">
              + Add more photo
              <input class="hidden" type="file" accept="image/*" multiple @change="onFileSelected">
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

    <template v-slot:bottomBar v-if="isMainPage">
      <div class="w-full md:max-w-xl px-2">
        <button @click="submit"
                class="w-full font-bold rounded-full bg-yellow-primary text-purple-primary text-sm  py-4 px-1 flex flex-row justify-center">
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

// Vue Cropper
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

// FONT AWESOME
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faTrash, faCropAlt} from "@fortawesome/free-solid-svg-icons";

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

      backendStoragePath: `${process.env.VUE_APP_BACKEND_STORAGE}/submissions/`,

      snappedAnswers: [],
      snappedAnswerPreviews: [],

      isPreviewingPath: null,

      // Existing snapped answers
      existingSnappedAnswers: [],
      removedSnappedAnswers: [],
      addedSnappedAnswers: [],

      // Compiled answer
      answer: {
        type: null,
        content: null
      },

      assignmentDetails: {
        id: null,
        title: null
      },

      newAnswer: [],
      remarks: null,

      // Icons
      icons: {
        crop: faCropAlt,
        trash: faTrash
      },

      // Catch error
      errors: null
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

    handleLoadedExistingAnswers(key) {

      let answerKey = `answer_${key}`;
      let image = this.$refs[answerKey];

      this.$refs[`cropper_${key}`].replace(image)
    },

    fetchData() {

      SubmissionRepository.find(this.submissionID)
          .then(response => {

            if (response.data.success) {

              const data = response.data.data;

              // Assignment details
              this.assignmentDetails.id = data.assignment_id;
              this.assignmentDetails.title = data.assignment_title;

              // Processing existing Snapped Answer
              if (data.snap_answer) {
                this.answer.type = 'snapped';

                let existingAnswerFileNames = data.snap_answer.split(',');
                let existingAnswerFilePaths = data.snap_answer_url.split(',');

                for (let i = 0; i < existingAnswerFileNames.length; i++) {
                  this.existingSnappedAnswers.push({
                    name: existingAnswerFileNames[i],
                    path: existingAnswerFilePaths[i]
                  })
                }

              }

              if (data.written_answer) {
                this.answer.type = 'written';
                this.answer.content = data.written_answer;
              }

              this.remarks = data.remarks;
            }

          })
    },

    handleVueCropperReady(e) {
      let cropper = e.target.cropper;

      cropper.autoCrop = false;

      cropper.clear();
      cropper.disable();

      // If this is new photo uploaded, add image to snapped answers array
      if (!cropper.replaced) {

        cropper.getCroppedCanvas({
          maxWidth: 720,
          maxHeight: 720,
          fillColor: '#fff'
        }).toBlob((blob) => {
          this.addedSnappedAnswers.push(blob)
        }, 'image/jpeg');
      }
    },

    toggleSnappedCroppingStatus(key) {
      this.snappedAnswerPreviews[key].cropping = !this.snappedAnswerPreviews[key].cropping;

      let cropperKey = `cropper_${key}`
      let cropper = this.$refs[cropperKey][0];

      // If cropping, enable
      if (this.snappedAnswerPreviews[key].cropping) {
        cropper.enable();
        // cropper.crop();
      } else {
        cropper.clear();
        cropper.disable();
      }
    },

    saveCroppedSnappedAnswer(key) {
      let cropperKey = `cropper_${key}`

      let cropper = this.$refs[cropperKey][0];

      let cropped = cropper.getCroppedCanvas({
        maxWidth: 720,
        maxHeight: 720,
        fillColor: '#fff'
      });

      let dataURL = cropped.toDataURL("image/jpeg");
      cropper.replace(dataURL);
      this.snappedAnswerPreviews[key].source = dataURL;

      cropped.toBlob((blob) => {
        this.addedSnappedAnswers[key] = blob;
      }, 'image/jpeg');

      this.toggleSnappedCroppingStatus(key)

    },

    submit() {

      // Compile Snapped Answers, to remove and newly added.
      let data = {
        toRemove: this.removedSnappedAnswers,
        toAdd: this.addedSnappedAnswers
      }

      SubmissionRepository.update(
          {
            submissionID: this.submissionID,
            assignmentID: this.assignmentDetails.id,
            answerType: this.answer.type,
            answerContent: data,
            remarks: this.remarks,
          })
          .then(response => {
            if (response.data.success) {
              this.submissionStatus = 'success';
              this.toggleModal();
            } else {
              this.submissionStatus = 'error';
              this.toggleModal()
            }
          })
          .catch(error => {
                this.errors = error
              }
          )
    },

    editWrittenAnswer() {
      this.toggleEditingMode();
      this.newAnswer = this.answer.content;
    },

    compileWrittenAnswer() {
      if (this.newAnswer.length > 0) {
        this.answer.content = this.newAnswer;
        this.toggleEditingMode();
      }
    },

    handleSnappedAnswerPreview(index, type) {

      this.isPreviewingPath = this.snappedAnswerPreviews[type][index];
      this.toggleSnappedAnswerPreview();
    },

    onFileSelected(e) {

      let files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      if (files[0].type.match("image.*")) {
        this.generateSnappedAnswerPreview(files)
      }

      e.target.value = ''
    },

    generateSnappedAnswerPreview(files) {
      files.forEach(f => {

        if (!f.type.match("image.*")) {
          return;
        }

        let reader = new FileReader();
        let that = this;

        reader.onload = function (e) {

          that.snappedAnswerPreviews.push({
            source: e.target.result,
            cropping: false
          });
        }

        reader.readAsDataURL(f);
      });
    },

    removeSnappedAnswer(index, type) {

      if (type === 'existing') {
        this.removedSnappedAnswers.push(this.existingSnappedAnswers[index].name)
        this.existingSnappedAnswers.splice(index, 1);
      }

      if (type === 'new') {

        let cropperKey = `cropper_${index}`

        let cropper = this.$refs[cropperKey][0];
        cropper.destroy();


        this.addedSnappedAnswers.splice(index, 1);
        this.snappedAnswerPreviews.splice(index, 1);
      }

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
  components: {
    Modal, ArrowBackIcon, TrashIcon, IconBaseTwo, NavBack, PageHeaderThree, DashboardLayout,
    VueCropper,
    FontAwesomeIcon
  }
}
</script>

<style scoped>

</style>
