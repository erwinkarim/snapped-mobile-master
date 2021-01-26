<template>
  <!-- FORM QUESTION -->
  <div class="relative top-12 flex-wrap">

    <!--  INSTRUCTION   -->
    <div v-if="!isCroppingSnappedQuestion"
         class="px-7 w-full text-sm leading-snug text-left break-words mt-18 text-purple-secondary">
      <div v-if="!questionDetails.type"
      >
        Fill the title and select a type of question
      </div>
      <div v-else-if="questionDetails.type === 'written'">
        Fill the title and write your question
      </div>
      <div v-else-if="questionDetails.type === 'snapped'">
        Fill the title or add more photos
      </div>
    </div>

    <div class="relative px-7 mt-5 w-full max-h-full">

      <!-- TITLE -->
      <input v-model="questionDetails.title"
             v-if="!isCroppingSnappedQuestion"
             class="py-5 pr-2 pl-6 mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
             type="text" placeholder="Title" autocomplete="off"
      >

      <div v-if="isSelectingQuestionType" class="flex -mx-1 mb-4">
        <div class="px-1 w-1/2 h-12">
          <button @click="enterWritingQuestionMode"
                  class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <icon-base-two class="w-12">
                <pen-icon class="w-12"/>
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Write
            </div>
          </button>
        </div>
        <label class="px-1 w-1/2 h-12">
          <div
              class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline">
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <icon-base-two class="w-12">
                <camera-icon/>
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Snap
            </div>
            <input class="hidden" type="file" accept='image/*' multiple @change="onSnapQuestion">
          </div>
        </label>
      </div>

      <!-- FORM MANUAL DESCRIPTION -->
      <div v-if="isWritingQuestion" class="relative">
        <!-- DESCRIPTION -->
        <textarea v-model="questionDetails.writtenQuestion"
                  class="block py-5 px-5 mt-4 w-full text-lg leading-snug text-left break-words rounded-md h-half-screen bg-gray-secondary form-textarea focus:outline-none focus:shadow-outline text-purple-secondary placeholder-purple-secondary text-m"
                  placeholder="Enter question"
        />
      </div>

      <!--  If IMAGE HAS BEEN SELECTED  -->
      <div v-if="isSnappingQuestion">
        <div v-for="(image, key) in snappedPreviews"
             class="flex flex-col py-5 px-5 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
        >

          <div class="flex flex-row items-center">
            <div class="w-6/7 text-left text-blue-secondary">
              <button @click="togglePreviewSnappedQuestionMode(key)"
                      class="focus:outline-none"
              >
                {{ image.preview ? 'Hide image' : image.cropping ? 'Return to Preview' : 'Preview Image' }}
              </button>
            </div>
            <div v-if="!image.preview && !image.cropping" class="w-1/7 flex flex-row justify-end">
              <button @click="removeSnappedQuestion(key)" class="w-2/3 focus:outline-none">
                <icon-base-two stroke-color="purple-secondary">
                  <trash-icon/>
                </icon-base-two>
              </button>
            </div>
          </div>

          <div v-if="image.preview" class="mt-5">
            <div class="w-full py-2 flex flex-row justify-center h-full object-cover">
              <img :src="image.source"/>
            </div>
            <div class="flex flex-row items-center mt-2 md:mt-4 ">
              <button @click="removeSnappedQuestion(key)"
                      class="flex flex-row items-center w-1/2  py-3 md:py-5 mr-1 rounded-lg bg-red-primary focus:outline-none">
                <div class="text-white text-sm md:text-lg w-3/4">
                  Remove
                </div>
                <div class="w-1/4">
                  <icon-base-two class="w-1/2">
                    <trash-icon/>
                  </icon-base-two>
                </div>
              </button>
              <button @click="beginCropSnappedQuestion(key)"
                      class="flex flex-row items-center  py-3  md:py-5 w-1/2 ml-1 rounded-lg bg-purple-primary focus:outline-none">
                <div class="text-white text-sm md:text-lg w-3/4">
                  Crop
                </div>
                <div class="w-1/4">
                  <icon-base-two class="w-1/2">
                    <crop-icon/>
                  </icon-base-two>
                </div>
              </button>
            </div>
          </div>

          <div v-if="image.cropping"
               class="mt-5"
          >
            <vue-cropper :ref="`cropper_${key}`"
                         :src="image.source"
                         alt="Source Image"
            >
            </vue-cropper>
            <div class="flex flex-row items-center mt-4 md:mt-4 ">
              <button @click="togglePreviewSnappedQuestionMode(key)"
                      class="flex flex-row items-center w-1/2  py-3 md:py-5 mr-1 rounded-lg bg-red-primary focus:outline-none">
                <div class="text-white text-sm md:text-lg w-full">
                  Cancel
                </div>
              </button>
              <button @click="saveCroppedSnappedQuestion(key)"
                      class="flex flex-row items-center  py-3  md:py-5 w-1/2 ml-1 rounded-lg bg-purple-primary focus:outline-none">
                <div class="text-white text-sm md:text-lg w-3/4">
                  Done
                </div>
                <div class="w-1/4">
                  <icon-base-two class="w-1/2">
                    <crop-icon/>
                  </icon-base-two>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div v-if="questionDetails.snappedQuestions.length" class="flex -mx-1 mb-4">
          <label
              class="py-5 pr-2 pl-6 mt-2 w-full text-lg font-normal leading-tight text-center rounded-md border border-none appearance-none focus:outline-none focus:shadow-outline text-red-primary">
            + Add more photo
            <input class="hidden" type="file" accept="image/*" multiple @change="onSnapQuestion">
          </label>
        </div>
      </div>
    </div>


    <!--  IF EDITING QUESTIONS   -->
    <div v-if="hasSavedQuestion && !isWritingQuestion && !isSnappingQuestion">
      <!-- WRITTEN QUESTION     -->
      <div v-if="hasSavedWrittenQuestion"
           class="flex grid grid-cols-2 py-5 pr-2 pl-6 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
      >
        <div class="place-self-start text-left text-blue-secondary">
          <button @click="enterWritingQuestionMode">
            Edit Description
          </button>
        </div>
        <div class="place-self-end">
          <button @click="resetQuestion">
            <icon-base-two class="float-right mr-3 w-1/7">
              <trash-icon/>
            </icon-base-two>
          </button>
        </div>
      </div>
      <!-- WRITTEN QUESTION     -->
      <div v-if="hasSavedSnappedQuestion" class="flex flex-col">
        <div v-for="(image, key) in snappedPreviews"
             class="flex flex-col py-5 px-5 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
        >

          <div class="flex flex-row items-center">
            <div class="w-6/7 text-left text-blue-secondary">
              <button @click="togglePreviewSnappedQuestionMode(key)"
                      class="focus:outline-none"
              >
                {{ image.preview ? 'Hide image' : image.cropping ? 'Return to Preview' : 'Preview Image' }}
              </button>
            </div>
            <div v-if="!image.preview && !image.cropping" class="w-1/7 flex flex-row justify-end">
              <button @click="removeSnappedQuestion(key)" class="w-2/3 focus:outline-none">
                <icon-base-two stroke-color="purple-secondary">
                  <trash-icon/>
                </icon-base-two>
              </button>
            </div>
          </div>

          <div v-if="image.preview" class="mt-5">
            <div class="w-full py-2 flex flex-row justify-center h-full object-cover">
              <img :src="image.source"/>
            </div>
            <div class="flex flex-row items-center mt-2 md:mt-4 ">
              <button @click="removeSnappedQuestion(key)"
                      class="flex flex-row items-center w-1/2  py-3 md:py-5 mr-1 rounded-lg bg-red-primary focus:outline-none">
                <div class="text-white text-sm md:text-lg w-3/4">
                  Remove
                </div>
                <div class="w-1/4">
                  <icon-base-two class="w-1/2">
                    <trash-icon/>
                  </icon-base-two>
                </div>
              </button>
              <button @click="beginCropSnappedQuestion(key)"
                      class="flex flex-row items-center  py-3  md:py-5 w-1/2 ml-1 rounded-lg bg-purple-primary focus:outline-none">
                <div class="text-white text-sm md:text-lg w-3/4">
                  Crop
                </div>
                <div class="w-1/4">
                  <icon-base-two class="w-1/2">
                    <crop-icon/>
                  </icon-base-two>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div v-if="questionDetails.snappedQuestions.length" class="flex -mx-1 mb-4">
          <label
              class="py-5 pr-2 pl-6 mt-2 w-full text-lg font-normal leading-tight text-center rounded-md border border-none appearance-none focus:outline-none focus:shadow-outline text-red-primary">
            + Add more photo
            <input class="hidden" type="file" accept="image/*" multiple @change="onSnapQuestion">
          </label>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import TrashIcon from "@/components/icons/TrashIcon";
import CameraIcon from "@/components/icons/CameraIcon";
import PenIcon from "@/components/icons/PenIcon";
import CropIcon from "@/components/icons/CropIcon";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: "CreateQuestionForm",
  props: {
    savedQuestionDetails: Object
  },
  data() {
    return {

      // STATES
      isSelectingQuestionType: !this.savedQuestionDetails.type,
      isWritingQuestion: false,
      isSnappingQuestion: false,
      isCroppingSnappedQuestion: false,
      isResettingQuestion: false,

      snappedPreviews: [],

      questionDetails: {
        type: null,
        title: null,
        writtenQuestion: null,
        snappedQuestions: []
      },
    }
  },
  watch: {
    'questionDetails.title': 'emitQuestionDetails',
    'questionDetails.writtenQuestion': 'emitQuestionDetails',
    'questionDetails.snappedQuestions.length': 'emitQuestionDetails',
  },
  computed: {
    hasSavedQuestion() {
      return this.savedQuestionDetails.type && (this.savedQuestionDetails.writtenQuestion || this.savedQuestionDetails.snappedQuestions.length);
    },
    hasSavedWrittenQuestion() {
      return this.savedQuestionDetails.type ? this.savedQuestionDetails.type === 'written' && this.savedQuestionDetails.writtenQuestion : false;
    },
    hasSavedSnappedQuestion() {

      console.log(`hasSavedSnapped: ${this.savedQuestionDetails.type ? this.savedQuestionDetails.type === 'snapped' && this.savedQuestionDetails.snappedQuestions.length : false}`)
      console.log(`previews: ${this.snappedPreviews.length}`)
      return this.savedQuestionDetails.type ? this.savedQuestionDetails.type === 'snapped' && this.savedQuestionDetails.snappedQuestions.length : false;
    }
  },
  methods: {

    emitQuestionDetails() {
      if (this.questionDetails.type || this.isResettingQuestion) {
        this.$emit('questionDetails', {
          type: this.questionDetails.type,
          title: this.questionDetails.title,
          writtenQuestion: this.questionDetails.writtenQuestion,
          snappedQuestions: this.questionDetails.snappedQuestions
        })
      }
    },

    selectQuestionType(type) {

      if (type === 'written') {
        this.isWritingQuestion = true;
        this.isSelectingQuestionType = false;
        this.questionDetails.type = 'written'
      }

      if (type === 'snapped') {
        this.isSnappingQuestion = true;
        this.isSelectingQuestionType = false;
        this.questionDetails.type = 'snapped';
      }
    },

    enterWritingQuestionMode() {

      this.selectQuestionType('written');

      if (this.hasSavedWrittenQuestion) {
        this.questionDetails.title = this.savedQuestionDetails.title;
        this.questionDetails.writtenQuestion = this.savedQuestionDetails.writtenQuestion;
      }
    },

    enterSnapQuestionMode() {

      this.selectQuestionType('snapped');

      // if (this.hasSavedWrittenQuestion) {
      //   this.questionDetails.title = this.savedQuestionDetails.title;
      //   this.questionDetails.writtenQuestion = this.savedQuestionDetails.writtenQuestion;
      // }
    },

    onSnapQuestion(e) {

      this.enterSnapQuestionMode();

      let files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      for (let i = 0; i < files.length; i++) {
        this.questionDetails.snappedQuestions.push(files[i])
      }

      let fileList = Array.prototype.slice.call(e.target.files);
      fileList.forEach(f => {

        if (!f.type.match("image.*")) {
          return;
        }

        let reader = new FileReader();
        let that = this;

        reader.onload = function (e) {
          that.snappedPreviews.push({
            source: e.target.result,
            preview: false,
            cropping: false
          });
        }

        reader.readAsDataURL(f);
      });
    },


    togglePreviewSnappedQuestionMode(key) {
      this.snappedPreviews[key].preview = !this.snappedPreviews[key].preview;
      this.snappedPreviews[key].cropping = false;
    },

    beginCropSnappedQuestion(key) {
      this.snappedPreviews[key].preview = false;
      this.snappedPreviews[key].cropping = true;
    },
    saveCroppedSnappedQuestion(key) {


      let cropper = `cropper_${key}`
      this.snappedPreviews[key].source = this.$refs[cropper][0].getCroppedCanvas().toDataURL()
      this.questionDetails.snappedQuestions[key] = this.$refs[cropper][0].getCroppedCanvas().toDataURL()

      this.snappedPreviews[key].preview = true;
      this.snappedPreviews[key].cropping = false;
    },

    removeSnappedQuestion(key) {
      this.questionDetails.snappedQuestions.splice(key, 1);
      this.snappedPreviews.splice(key, 1);

      if (!this.questionDetails.snappedQuestions.length) {
        this.resetQuestion();
      }

    },

    resetQuestion() {

      this.isResettingQuestion = true;

      this.questionDetails.title = null;
      this.questionDetails.type = null;
      this.questionDetails.writtenQuestion = null;
      this.questionDetails.snappedQuestions = [];

      this.isSelectingQuestionType = true;
    },

    loadSavedQuestionDetails() {
      if (this.hasSavedQuestion) {
        this.questionDetails.title = this.savedQuestionDetails.title;
      }
    }
  },
  mounted() {
    this.loadSavedQuestionDetails();
  },
  components: {CropIcon, PenIcon, CameraIcon, TrashIcon, IconBaseTwo, VueCropper}
}
</script>

<style scoped>

</style>
