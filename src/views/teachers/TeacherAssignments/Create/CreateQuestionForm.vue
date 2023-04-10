<template>
  <!-- FORM QUESTION -->
  <div class="relative top-12 flex-wrap w-full">

    <!--  INSTRUCTION   -->
    <div v-if="!$store.state.teacherCreateAssignment.states.isCroppingSnappedQuestion"
         class="px-7 w-full text-sm leading-snug text-left break-words mt-18 text-purple-secondary">
      <div v-if="!$store.getters['teacherCreateAssignment/creatingQuestionType']"
      >
        Fill the title and select a type of question. Test
      </div>
      <div v-else-if="$store.getters['teacherCreateAssignment/creatingQuestionType'] === 'written'">
        Fill the title and write your question
      </div>
      <div v-else-if="$store.getters['teacherCreateAssignment/creatingQuestionType'] === 'snapped'">
        Fill the title or add more photos
      </div>
    </div>


    <!-----------------------
       CREATING QUESTIONS
    ------------------------>
    <div class="relative px-3 mt-5 w-full max-h-full">

      <!-- TITLE -->
      <input v-model="$store.state.teacherCreateAssignment.creatingQuestionDetails.title"
             v-if="!$store.state.teacherCreateAssignment.states.isCroppingSnappedQuestion"
             class="py-5 pr-2 pl-6 my-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
             type="text"
             placeholder="Title"
             autocomplete="off"
      >

      <!-- 
        buttons to create the right question
        -- but need to change allow multiple medium of questions
        -- so it will be either or state: either show the preview or button to create the question
        -- when editing, it should have the whole screen 
      -->
      <!-- create zoom question button -->
      <!--div v-if="$store.state.teacherCreateAssignment.states.isSelectingQuestionType && !$store.getters['teacherCreateAssignment/hasEditableQuestion']" class="flex -mx-1 mb-4" -->
      <div v-if="!$store.getters['teacherCreateAssignment/hasZoomQuestionDraft'] && !$store.getters['teacherCreateAssignment/isEditingZoomQuestion']" class="flex -mx-1 mb-4" >
        <!-- zoom meeting-->
        <div class="w-full h-28 px-1">
          <button @click="$store.dispatch('teacherCreateAssignment/beginWritingZoomQuestion')"
                  class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <icon-base-two class="w-12">
                <zoom-icon class="w-12"/>
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Zoom
            </div>
          </button>
        </div>
      </div>
      <div v-else-if="$store.getters['teacherCreateAssignment/hasZoomQuestionDraft'] && !$store.getters['teacherCreateAssignment/isEditingZoomQuestion']" class="flex flex-col -mx-1 mb-1" >
        <video class="flex" autoplay controls height="640" width="854" crossorigin>
          <!-- must ensure all recordings are in mp4 format -->

          <source :src="$store.state.teacherCreateAssignment.questionDraft.zoomMeetings" type="video/mp4" />
          Your browser don't support video tag.
        </video>
        <div class="flex flex-row">
          <div class="pr-1 w-1/2 h-16">
            <button 
              class="mt-2 py-1 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-red-primary  focus:outline-none focus:shadow-outline"
            >
              <div class="flex col-span-1 row-span-2 justify-center py-2" 
                @click="$store.commit('teacherCreateAssignment/deleteZoomVideo')"
              >
                <div class="text-white text-sm md:text-lg w-3/4">
                  Remove
                </div>
                <div class="w-1/4">
                  <icon-base-two class="w-1/2">
                    <trash-icon/>
                  </icon-base-two>
                </div>
              </div>
            </button>
          </div>
          <div class="pl-1 w-1/2 h-16">
            <button @click="$store.dispatch('teacherCreateAssignment/beginWritingZoomQuestion')"
              class="mt-2 py-1 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-purple-primary  focus:outline-none focus:shadow-outline"
            >
              <div class="flex col-span-1 row-span-2 justify-center py-2">
                <div class="text-white text-sm md:text-lg w-3/4">
                  Retake Video
                </div>
                <div class="w-1/4">
                  <icon-base-two class="w-1/2">
                    <crop-icon/>
                  </icon-base-two>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- FORM: Zoom Question 
          should add a preview / trash icon so can either edit  or preview the video
        -->
        <ZoomQuestionForm />
      </div>

      <!--div v-if="$store.state.teacherCreateAssignment.states.isSelectingQuestionType && !$store.getters['teacherCreateAssignment/hasEditableQuestion']" class="flex -mx-1 mb-4" -->
      <div v-if="!$store.getters['teacherCreateAssignment/hasSnappedQuestionDraft']" class="flex -mx-1 mb-4" >
        <!-- create snap question button -->
        <label class="px-1 w-full h-28">
          <div class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline">
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <icon-base-two class="w-12">
                <camera-icon/>
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Snap
            </div>
            <input
                @change="handleSnappedQuestion"
                type="file"
                accept='image/*'
                multiple
                class="hidden"
            >
          </div>
        </label>
      </div>
      <!--div v-if="$store.state.teacherCreateAssignment.states.isSnappingQuestion"-->
      <div v-else>
        <!-- display the images-->
        <hr class="mb-4" />
        <div v-for="(image, key) in $store.state.teacherCreateAssignment.creatingQuestionDetails.snappedPreviews"
             class="flex flex-col mt-1 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
        >

          <div v-if="image.preview" class="">
            <div class="w-full h-full object-cover">
              <img :src="image.source" class="mx-auto"/>
            </div>
            <div class="flex flex-row items-center mt-2 md:mt-4 ">
              <button @click="$store.dispatch('teacherCreateAssignment/removeSnappedQuestion', key)"
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
              <button @click="$store.commit('teacherCreateAssignment/toggleCroppingSnappedQuestionMode', key)"
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
              <button @click="$store.commit('teacherCreateAssignment/toggleSnappedQuestionPreviewStatus', key)"
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

        <!-- Add More Photo Button       -->
        <div class="flex -mx-1 mb-4">
          <label
              class="py-5 pr-2 pl-6 mt-2 w-full text-lg font-normal leading-tight text-center rounded-md border border-none appearance-none focus:outline-none focus:shadow-outline text-red-primary">
            + Add more photo
            <input class="hidden" type="file" accept="image/*" multiple @change="handleSnappedQuestion">
          </label>
        </div>
      </div>


      <!-- create written question button 
        - toggle between creating the question, writing the question and previewing the question
      -->
      <!--div v-if="$store.state.teacherCreateAssignment.states.isSelectingQuestionType && !$store.getters['teacherCreateAssignment/hasEditableQuestion']" class="flex -mx-1 mb-4"-->
      <div v-if="!$store.getters['teacherCreateAssignment/hasWrittenQuestionDraft'] && !$store.getters['teacherCreateAssignment/isEditingWrittenQuestion']" class="flex -mx-1 mb-4" >
        <!-- nothing written, so show the button to create -->
        <div class="px-1 w-full h-28">
          <button @click="$store.dispatch('teacherCreateAssignment/beginWritingQuestion')"
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
      </div>
      <!--div v-if="$store.getters['teacherCreateAssignment/hasWrittenQuestionDraft']"-->
      <div v-else>
        <!-- something already written, so display the preview -->
        <hr />
        <div v-if="$store.getters['teacherCreateAssignment/hasWrittenQuestionDraft']" class="flex flex-row items-center py-5 pr-2 pl-6 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
          <div class="w-full text-left">{{ $store.state.teacherCreateAssignment.questionDraft.writtenQuestion }}</div>
        </div>
        <div v-if="!$store.getters['teacherCreateAssignment/isEditingWrittenQuestion']" class="flex flex-row items-center py-5 pr-2 pl-6 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
          <div class="w-4/5 text-left text-blue-secondary">
            <button @click="$store.commit('teacherCreateAssignment/beginEditingWrittenQuestionMode')">
              Edit Question
            </button>
          </div>
          <div class="w-1/5">
            <button @click="$store.dispatch('teacherCreateAssignment/removeWrittenQuestionDraft')">
              <icon-base-two class="float-right mr-3 w-1/2" stroke-color="purple-secondary">
                <trash-icon/>
              </icon-base-two>
            </button>
          </div>
        </div>
      </div>

      <!-- FORM: Written Question -->
      <div v-if="$store.state.teacherCreateAssignment.states.isWritingQuestion" class="relative">
        <!-- DESCRIPTION -->
        <textarea v-model="$store.state.teacherCreateAssignment.creatingQuestionDetails.writtenQuestion"
                  class="block py-5 px-5 mt-4 w-full text-lg leading-snug text-left break-words rounded-md h-half-screen bg-gray-secondary form-textarea focus:outline-none focus:shadow-outline text-purple-secondary placeholder-purple-secondary text-m"
                  placeholder="Enter question"
        ></textarea>
      </div>

    </div>


    <!-----------------------
        EDITING QUESTIONS
     ------------------------>
    <div v-if="$store.getters['teacherCreateAssignment/hasEditableQuestion']"
         class="px-7"
    >

    </div>

    <!-- preview question contents -->

  </div>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import TrashIcon from "@/components/icons/TrashIcon";
import CameraIcon from "@/components/icons/CameraIcon";
import PenIcon from "@/components/icons/PenIcon";
import CropIcon from "@/components/icons/CropIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ZoomIcon from "@/components/icons/ZoomIcon";
import MicrophoneIcon from "@/components/icons/MicrophoneIcon";

const VueCropper = () => import('vue-cropperjs');
// import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import ZoomQuestionForm from '@/components/ZoomQuestionForm';



export default {
  name: "CreateQuestionForm",
  computed: { },
  methods: {
    handleSnappedQuestion(e) {
      this.$store.dispatch('teacherCreateAssignment/beginSnappingQuestion')
      this.$store.dispatch('teacherCreateAssignment/handleSnapQuestion', e)
    },
    saveCroppedSnappedQuestion(key) {
      let cropper = `cropper_${key}`

      let payload = {
        key: key,
        dataURL: this.$refs[cropper][0].getCroppedCanvas().toDataURL()
      }

      this.$store.dispatch('teacherCreateAssignment/saveCroppedSnappedQuestion', payload)
    },
  },
  components: {
    CropIcon, PenIcon, CameraIcon, TrashIcon, IconBaseTwo,
    VueCropper, PhoneIcon, PlusIcon, ArrowRightIcon, ZoomIcon,
    MicrophoneIcon, ZoomQuestionForm,
  }
}
</script>

<style scoped>

</style>
