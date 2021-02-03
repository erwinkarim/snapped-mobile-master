<template>
  <!-- FORM QUESTION -->
  <div class="relative top-12 flex-wrap">

    <!--  INSTRUCTION   -->
    <div v-if="!$store.state.teacherCreateAssignment.states.isCroppingSnappedQuestion"
         class="px-7 w-full text-sm leading-snug text-left break-words mt-18 text-purple-secondary">
      <div v-if="!$store.getters['teacherCreateAssignment/creatingQuestionType']"
      >
        Fill the title and select a type of question
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
    <div class="relative px-7 mt-5 w-full max-h-full">

      <!-- TITLE -->
      <input v-model="$store.state.teacherCreateAssignment.creatingQuestionDetails.title"
             v-if="!$store.state.teacherCreateAssignment.states.isCroppingSnappedQuestion"
             class="py-5 pr-2 pl-6 mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
             type="text"
             placeholder="Title"
             autocomplete="off"
      >

      <div v-if="$store.state.teacherCreateAssignment.states.isSelectingQuestionType && !$store.getters['teacherCreateAssignment/hasEditableQuestion']"
          class="flex -mx-1 mb-4"
      >
        <div class="px-1 w-1/2 h-12">
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
            <input
                @change="handleSnappedQuestion"
                type="file" accept='image/*' multiple
                class="hidden"
            >
          </div>
        </label>
      </div>

      <!-- FORM: Written Question -->
      <div v-if="$store.state.teacherCreateAssignment.states.isWritingQuestion" class="relative">
        <!-- DESCRIPTION -->
        <textarea v-model="$store.state.teacherCreateAssignment.creatingQuestionDetails.writtenQuestion"
                  class="block py-5 px-5 mt-4 w-full text-lg leading-snug text-left break-words rounded-md h-half-screen bg-gray-secondary form-textarea focus:outline-none focus:shadow-outline text-purple-secondary placeholder-purple-secondary text-m"
                  placeholder="Enter question"
        />
      </div>

      <!--  If IMAGE HAS BEEN SELECTED  -->
      <div v-if="$store.state.teacherCreateAssignment.states.isSnappingQuestion">
        <div v-for="(image, key) in $store.state.teacherCreateAssignment.creatingQuestionDetails.snappedPreviews"
             class="flex flex-col py-5 px-5 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
        >

          <div class="flex flex-row items-center">
            <div class="w-6/7 text-left text-blue-secondary">
              <button @click="$store.commit('teacherCreateAssignment/toggleSnappedQuestionPreviewStatus', key)"
                      class="focus:outline-none"
              >
                {{ image.preview ? 'Hide image' : image.cropping ? `Return to Preview ` : 'Preview Image' }}
              </button>
            </div>
            <div v-if="!image.preview && !image.cropping" class="w-1/7 flex flex-row justify-end">
              <button @click="$store.dispatch('teacherCreateAssignment/removeSnappedQuestion', key)"
                      class="w-2/3 focus:outline-none">
                <icon-base-two stroke-color="purple-secondary">
                  <trash-icon/>
                </icon-base-two>
              </button>
            </div>
          </div>

          <div v-if="image.preview" class="mt-5">
            <div class="w-full py-2 h-full object-cover">
              <img :src="image.source"/>
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
    </div>


    <!-----------------------
        EDITING QUESTIONS
     ------------------------>
    <div v-if="$store.getters['teacherCreateAssignment/hasEditableQuestion']"
         class="px-7"
    >
      <!-- WRITTEN QUESTION     -->
      <div v-if="$store.getters['teacherCreateAssignment/hasWrittenQuestionDraft']"
           class="flex flex-row items-center py-5 pr-2 pl-6 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
      >
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
  computed: {},
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
    }
  },
  components: {CropIcon, PenIcon, CameraIcon, TrashIcon, IconBaseTwo, VueCropper}
}
</script>

<style scoped>

</style>
