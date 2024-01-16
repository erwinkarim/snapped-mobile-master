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
      <!-- somehow it right clicks??-->
      <input v-model="$store.state.teacherCreateAssignment.creatingQuestionDetails.title"
             v-if="!$store.state.teacherCreateAssignment.states.isCroppingSnappedQuestion"
             class="py-5 pr-2 pl-6 my-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
             type="text"
             placeholder="Question Title"
      >

      <!-- 
        buttons to create the right question
        -- but need to change allow multiple medium of questions
        -- so it will be either or state: either show the preview or button to create the question
        -- when editing, it should have the whole screen 
      -->
      <!-- create zoom question button -->
      <!--div v-if="$store.state.teacherCreateAssignment.states.isSelectingQuestionType && !$store.getters['teacherCreateAssignment/hasEditableQuestion']" class="flex -mx-1 mb-4" -->
      <div v-if="!$store.getters['teacherCreateAssignment/hasZoomQuestionDraft'] && !$store.getters['teacherCreateAssignment/isShowingVideoMenu'] && !$store.getters['teacherCreateAssignment/isEditingZoomQuestion']" class="flex -mx-1 mb-4" >
        <!-- zoom meeting-->
        <!-- 
            to show the video menu instead of the video form, replace click with this one.
            @click="$store.dispatch('teacherCreateAssignment/beginShowingVideoMenu')"
        -->
        <div class="w-full h-32 px-1">
          <button 
            @click="$store.dispatch('teacherCreateAssignment/beginWritingZoomQuestion')"
                  class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <img src="@/assets/img/zoom-with-words.png" width="192" />
              <!--icon-base-two class="w-12">
                <zoom-icon class="w-12"/>
              </icon-base-two-->
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Video
            </div>
          </button>
        </div>
      </div>
      <div v-else-if="!$store.getters['teacherCreateAssignment/hasZoomQuestionDraft'] && $store.getters['teacherCreateAssignment/isShowingVideoMenu'] && !$store.getters['teacherCreateAssignment/isEditingZoomQuestion']">
        <!-- menu to create video or use mysoalan video bank -->
        <!-- disabled for now, but will use when MySoalan video bank start happening -->
        <div class="w-full h-24 px-1">
          <button
            class="mt-2 w-2/3 text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
            @click="$store.dispatch('teacherCreateAssignment/beginRedirectToMySoalanVideo')"
          >
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              MySoalan
            </div>
          </button>
          <button
            class="mt-2 w-2/3 text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
            @click="$store.dispatch('teacherCreateAssignment/beginWritingZoomQuestion')"
          >
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Create Video
            </div>
          </button>
          <button
            class="mt-2 w-2/3 text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
            @click="cancelCreateVideo()"
          >
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Cancel
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
        <NewVideoForm />
        <!--ZoomQuestionForm /-->
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
          <VueMarkdown :source="writtenQuestion" class="w-full text-left" />
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
        <div class="flex flex-row items-center mt-2 mb-2 w-full text-lg font-normal leading-tight border border-none appearance-none text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
          <div @click="$store.dispatch('teacherCreateAssignment/endWritingQuestion')" class="w-1/2 text-center text-blue-secondary mr-2 bg-gray-secondary py-5 rounded-md">
            <button> Cancel </button>
          </div>
          <div @click="$store.dispatch('teacherCreateAssignment/saveWrittenQuestionToDraft')" class="w-1/2 text-center text-blue-secondary ml-2 bg-gray-secondary py-5 rounded-md">
            <button>Save</button>
          </div>
        </div>
      </div>

      <!-- FORM: My soalan-->
      <div v-if="!$store.getters['teacherCreateAssignment/hasMySoalanQuestionDraft'] && !$store.getters['teacherCreateAssignment/isEditingMySoalanQuestion']" class="flex -mx-1 mb-4" >
        <!-- nothing selected, show the button to create -->
        <label class="px-1 w-full h-28">
          <button @click="$store.dispatch('teacherCreateAssignment/beginWritingMySoalanQuestion')"
                  class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <img src="@/assets/img/mysoalan-logo.svg" width="64" />
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              MySoalan
            </div>
          </button>
        </label>
      </div>
      <div v-else-if="!$store.getters['teacherCreateAssignment/hasMySoalanQuestionDraft'] && $store.getters['teacherCreateAssignment/isEditingMySoalanQuestion']" class="flex flex-col -mx-1 mb-4">
        <!-- click on mysoalan button, but no mysoalan question set is chosen yet -->
        <hr />
        <h2 class="pt-2 font text-2xl">MySoalan Redirect</h2>
        <p>Select from the drop down below. You will be redirected to MySoalan site where you will choose you preferred question bank. We will save your work before being redirected, but zoom video unfortunately will be lost. We advise to make your zoom video the last thing to create before publishing your assignment..</p>
        <MySoalanSelector @change="detectChange" select_mysoalan_level select_mysoalan_subject />
        <div class="flex flex-row items-center mt-2 mb-2 w-full text-lg font-normal leading-tight border border-none appearance-none text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
          <div @click="$store.dispatch('teacherCreateAssignment/cancelWritingMySoalanQuestion')" class="w-1/2 text-center text-blue-secondary mr-2 bg-gray-secondary py-5 rounded-md">
            <button> Cancel </button>
          </div>
          <div @click="handleRedirectToMySoalan" :class="{ 'text-grey-secondary': !mySoalanLevelAndSubjectSelected, 'text-blue-secondary': mySoalanLevelAndSubjectSelected } "  class="w-1/2 text-center ml-2 bg-gray-secondary py-5 rounded-md">
            <button>Redirect</button>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col -mx-1 mb-4" >
        <!-- already have mysoalan question set chosen -->
        <hr />
        <div class="py-5 pr-2 pl-6 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
          <p class="text-sm">MySoalan Exercise</p>
          <!--p class="text-3xl">{{ $store.state.teacherCreateAssignment.states.mySoalanInfo.collection.name }}</p-->
          <p class="text-3xl">{{ $store.getters['teacherCreateAssignment/getMySoalanInfo'].collection.name }}</p>
          <!--p>{{ $store.state.teacherCreateAssignment.states.mySoalanInfo.totalObjQuestions }} Question(s)</p-->
          <p>mySoalan ID: {{ $store.state.teacherCreateAssignment.states.mySoalanInfo.uuid }}</p>
        </div>
        <MySoalanSelector @change="detectChange" select_mysoalan_level select_mysoalan_subject />
        <div class="flex flex-row items-center mt-2 mb-2 w-full text-lg font-normal leading-tight border border-none appearance-none text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
          <div @click="handleRedirectToMySoalan" class="w-1/2 text-center text-blue-secondary mr-2 bg-gray-secondary py-5 rounded-md">
            <button>Re-choose Question</button>
          </div>
          <div @click="$store.dispatch('teacherCreateAssignment/removeMySoalanQuestion')" class="w-1/2 text-center text-blue-secondary mr-2 bg-gray-secondary py-5 rounded-md">
            <button>Delete</button>
          </div>
        </div>
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
import VueMarkdown from 'vue-markdown';
import MySoalanSelector from "@/components/MySoalanSelector.vue";
import NewVideoForm from "@/components/NewVideoForm.vue";

const VueCropper = () => import('vue-cropperjs');
// import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import ZoomQuestionForm from '@/components/ZoomQuestionForm';



export default {
  name: "CreateQuestionForm",
  data() {
    return {
      select_mysoalan_level: "",
      select_mysoalan_subject: "",
    };
  },
  computed: {
    writtenQuestion: function() {
      return this.$store.state.teacherCreateAssignment.questionDraft.writtenQuestion;
    },
    mySoalanLevelAndSubjectSelected: function(){
      return this.select_mysoalan_level != '' && this.select_mysoalan_subject != '';
    }
  },
  methods: {
    detectChange(e) {
      console.log('detectChange', e);
      if(e.key == 'select_mysoalan_level'){
        this.select_mysoalan_level = e.value;
      } else {
        this.select_mysoalan_subject = e.value;
      }
    },
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
    handleRedirectToMySoalan(){
      // if level / subject not selected, don't
      if(!this.mySoalanLevelAndSubjectSelected){
        console.log('mysoalan level or subject is not selected')
        return;
      }

      // save local selection
      sessionStorage.setItem("mysoalan_level", this.select_mysoalan_level);
      sessionStorage.setItem("mysoalan_subject", this.select_mysoalan_subject);


      // then redirect to mysoalan
      this.$store.dispatch('teacherCreateAssignment/redirectToMySoalanSite', 
        {
          level: this.select_mysoalan_level, 
          subject: this.select_mysoalan_subject,
          email: this.$store.state.authUser.email,
        }
      );
    }, 
    cancelCreateVideo(){
      console.log('reset video menu');
      this.$store.dispatch('teacherCreateAssignment/endShowingVideoMenu');
    }
  },
  async mounted() {
    /*
    if query got assign_paper, load the uuid in the question draft remove it from the query.
    - this is done to handle redirected from mysoalan site
    - should do it for the first time only, since deleting it will make it pop up again.
    - also, check if the assignment paper id changed. usually happen when user goes back and forth using 
      the browser buttons
    */
    if(this.$route.query.assign_paper){
      console.log('create q: assign_paper detected');

      // check if this info needs to be loaded
      let mySoalanLoaded = Boolean(sessionStorage.getItem('loadedMySoalan'));
      let mySoalanPaperChanged = this.$route.query.assign_paper != sessionStorage.getItem('mysoalanPaperID');

      // if not loaded, load mysoalan and set sessionStorage to true
      if(!mySoalanLoaded || mySoalanPaperChanged){
        console.log('mysoalan have not loaded before');
        console.log('assign_paper', this.$route.query.assign_paper);
        console.log('teacherCreateAssignment.states.mySoalanInfo', this.$store.state.teacherCreateAssignment.states.mySoalanInfo);

        //setMySoalanAssignID 
        this.$store.dispatch('teacherCreateAssignment/setMySoalanAssignID', this.$route.query.assign_paper);

        // load basic info about the paper from mysoalan
        // this done by getting info
        await this.$store.dispatch('teacherCreateAssignment/getMySoalanInfo');

        // load the mysoalan level/subject once and delete the items from sessionStorage
        if(sessionStorage.getItem("mysoalan_level")){
          // console.log('loading mysoalan_level/subject from session data');
          this.select_mysoalan_level = sessionStorage.getItem("mysoalan_level");
          this.select_mysoalan_subject = sessionStorage.getItem("mysoalan_subject");
        }

        sessionStorage.setItem('loadedMySoalan', '1');
        sessionStorage.setItem('mysoalanPaperID', this.$route.query.assign_paper);

      }

      // push router to remove query
      // this.$router.push({path: '/teacher/assignments/create'});
    };

    // if session storage have values for select_mysoalan_level and subject, should populate them too
    if(sessionStorage.getItem('mysoalan_level')){
      this.select_mysoalan_level = sessionStorage.getItem('mysoalan_level');
    }
    if(sessionStorage.getItem('mysoalan_subject')){
      this.select_mysoalan_subject = sessionStorage.getItem('mysoalan_subject');
    }
  },
  components: {
    CropIcon, PenIcon, CameraIcon, TrashIcon, IconBaseTwo,
    VueCropper, PhoneIcon, PlusIcon, ArrowRightIcon, ZoomIcon,
    MicrophoneIcon, ZoomQuestionForm, VueMarkdown, MySoalanSelector,
    NewVideoForm,
  }
}
</script>

<style scoped>

</style>
