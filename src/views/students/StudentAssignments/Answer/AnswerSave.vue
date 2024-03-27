<template>

  <dashboard-layout :content-fills-screen="isPreviewingSnappedAnswer"
                    :has-custom-bottom-bar="isMainPage"
                    :no-bottom-bar=" isPreviewingSnappedAnswer"
  >

    <template v-slot:pageHeader>
      <page-header-three>

        <template v-slot:leftAction>
          <nav-back v-if="isMainPage"
                    type="cancel"
                    :to="{name: 'student.assignments.show'}"
                    class="w-2/7" stroke-color="red-primary"
          />

          <div @click="toggleSnappedAnswerPreview"
               v-if="isPreviewingSnappedAnswer"
          >
            <icon-base-two class="w-2/7 ml-5">
              <arrow-back-icon/>
            </icon-base-two>
          </div>
        </template>

        <template v-slot:mini-title>
          Answer
        </template>

      </page-header-three>
    </template>

    <template v-slot:content v-if="isMainPage">

      <div class="relative pt-40 px-6 h-full text-left text-purple-primary">

        <!-- SUBMISSION DETAIL -->
        <div>
          <div>
            Your answer will be submitted to
          </div>
          <div class="font-bold mt-1">
            {{ assignmentDetails ? assignmentDetails.title : '' }}
          </div>
        </div>

        <!-- VIEW SNAPPED ANSWER -->
        <div class="mt-10" v-if="isSnappedAnswer">
          <div class="mb-4">
            Your Snapped Answer
          </div>
          <div class="flex flex-col">

            <div v-for="(image,key) in snappedAnswerPreviews"
                 class="flex flex-col py-5 px-5 mt-2 mb-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
            >

              <div class="mt-5 w-full">
                {{`cropper_${key}`}}
                <vue-cropper :ref="`cropper_${key}`"
                             :container-style="vueCropperContainerStyle(key)"
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
                      <icon-base-two class="w-1/2">
                        <crop-icon/>
                      </icon-base-two>
                    </div>
                  </button>
                </div>

                <div v-else class="flex flex-row items-center mt-2 md:mt-4 ">
                  <button @click="removeSnappedAnswer(key)"
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


    <template v-slot:bottomBar>
      <div class="w-full md:max-w-xl px-2">
        <button @click="submit"
                :disabled="isSubmitting"
                class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-4 px-1 flex flex-row justify-center">
          Submit Answer
        </button>
      </div>
    </template>
  </dashboard-layout>

</template>

<script>
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import TrashIcon from "@/components/icons/TrashIcon";
import Modal from "@/components/Modal";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
// import router from "@/router";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import CropIcon from "@/components/icons/CropIcon";
// import { UltimateTextToImage } from "ultimate-text-to-image";
import MySoalanRepository from "@/repositories/MySoalanRepository";

// Vue Cropper
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

// FONT AWESOME
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faTrash, faCropAlt} from "@fortawesome/free-solid-svg-icons";

let dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}


export default {
  name: "AnswerSave",
  props: {
    // answer: Object,
    // assignmentDetails: Object,
  },
  data() {
    return {

      // States
      isMainPage: true,
      isPreviewingSnappedAnswer: false,
      isSubmitting: false,
      isShowingModal: false,
      submissionStatus: null,

      snappedAnswerPreviews: [],

      remarks: '',

      snappedAnswers: [],

      // Icons
      icons: {
        crop: faCropAlt,
        trash: faTrash
      },
      imageData: null,

      assignmentDetails:{},
      answer: {},
    }
  },
  computed: {
    hasAnswerContent() {
      return this.answer.type !== null && this.answer.content !== '';
    },
    isWrittenAnswer() {
      return this.answer.type === 'written';
    },
    isSnappedAnswer() {
      return this.answer.type === 'snapped';
    },
    hasImageData(){
      return this.imageData != null;
    }
  },
  methods: {

    toggleSnappedAnswerPreview() {
      if (this.isPreviewingSnappedAnswer) {
        this.isMainPage = true;
        this.isPreviewingSnappedAnswer = false;
      } else {
        this.isMainPage = false;
        this.isPreviewingSnappedAnswer = true;
      }
    },

    onFileSelected(e) {
      console.log('onFileSelected fired');

      let files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      if (files[0].type.match("image.*")) {
        console.log('this is an array', files);
        this.generateSnappedAnswerPreview(files)
      }

      e.target.value = ''

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
          this.snappedAnswers.push(blob)
        },'image/jpeg');
      }


    },

    generateSnappedAnswerPreview(files) {
      console.log('inside generateSnappedAnswer', files);

      Array.from(files).forEach(f => {

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

    toggleSnappedCroppingStatus(key) {
      this.snappedAnswerPreviews[key].cropping = !this.snappedAnswerPreviews[key].cropping;

      let cropperKey = `cropper_${key}`
      let cropper = this.$refs[cropperKey][0];

      // If cropping, enable
      if (this.snappedAnswerPreviews[key].cropping) {
        cropper.enable();
      } else{
        cropper.clear();
        cropper.disable();
      }
    },

    vueCropperContainerStyle(key) {
      let style = {
        width: '100%',
        // display: 'none'
      }

      if (this.snappedAnswerPreviews[key].cropping) {
        style.display = 'flex'
      }
      return  style;
    },

    saveCroppedSnappedAnswer(key) {
      let cropperKey = `cropper_${key}`

      let cropper = this.$refs[cropperKey][0];

      let cropped =  cropper.getCroppedCanvas({
        maxWidth: 720,
        maxHeight: 720,
        fillColor: '#fff'
      });

      let dataURL = cropped.toDataURL("image/jpeg");
      cropper.replace(dataURL);
      this.snappedAnswerPreviews[key].source = dataURL;

      cropped.toBlob((blob) => {
              this.snappedAnswers[key] = blob;
            },'image/jpeg');

      this.toggleSnappedCroppingStatus(key)

    },

    removeSnappedAnswer(key) {

      let cropperKey = `cropper_${key}`

      let cropper = this.$refs[cropperKey][0];
      cropper.destroy();

      this.snappedAnswers.splice(key, 1);
      this.snappedAnswerPreviews.splice(key, 1);
    },

    submit() {
      /*
        if this is a mysoalan redirect, need to capture extra data like
        result_uuid and assign_paper 
      */

      if (this.isSnappedAnswer) {
        if (this.snappedAnswers.length > 0) {
          this.$emit('snappedAnswer', this.snappedAnswers)
          this.$emit('submit', this.remarks)
        } else {
          this.$emit('error', {
            status: true,
            message: 'Please snap an answer!'
          })
        }
      }

      if (this.isWrittenAnswer) {
        this.$emit('submit', this.remarks)
      }

    },


  },
  mounted() {
    //load answers from query
    // console.log(this.$route.query['answer']);
    // this.answer = this.$route.query['answer'];

    if (this.isSnappedAnswer) {
      this.generateSnappedAnswerPreview(this.answer.content)
    }

  },
  async created() {
    // load from store
    this.answer = this.$store.getters['studentAssignment/answer'];
    this.assignmentDetails = this.$store.getters['studentAssignment/assignmentDetails'];

    // console.log('should check if query has correct_question');
    // this come from mysoalan redirection
    if(this.$route.query['correct_questions']){
      // console.log("redirected from mysoalan, generate image file");
      // this.answer.type = 'snapped';

			const textToImage = new UltimateTextToImage(
        `MySoalan: 
        ${this.$route.query['correct_questions']} / ${this.$route.query['total_questions']}`, {
          width: 400, height: 400, fontColor:"F1F6F9", backgroundColor: "394867", align: "center", valign: "middle", fontSize: 72, textAlign: "center",
        }).render().toDataUrl();
      // this.answer.content.push("")

      this.imageData = textToImage;

      // convert dtaURL to blob and push to this.answer.content
      // also this.answer.type = snapped
      this.answer.type = 'snapped';
      this.answer.content = [dataURLtoBlob(textToImage)];
      this.answer.mysoalan_correct = this.$route.query['correct_questions'];
      this.answer.mysoalan_all = this.$route.query['total_questions'];
      this.answer.mysoalan_result_uuid = this.$route.query['result_uuid'];

      // capture result from mySoalan and put results in local answer object
			let token = '';

			await MySoalanRepository.getAccessToken(this.$store.getters['getAuthEmail'], this.$store.getters['getAuthUserRole']).then((res) => {
				token = res.data.accessToken;
			});

      await MySoalanRepository.getResultSubmission(this.$route.query.result_uuid, token).then(e => {
        console.log('resultSubmission from mysoalan', e);
        this.answer.mysoalan_result = e.data;
        console.log('mysoalan_result', JSON.stringify(this.answer.mysoalan_result) );
      });
    }

    if (!this.hasAnswerContent) {
      console.log('no answer content');
      // this.$router.push({name: 'student.assignments.show'})
    }
  },
  components: {
    FontAwesomeIcon,
    faCropAlt,
    faTrash,
    VueCropper,
    ArrowBackIcon,
    CropIcon,
    PageHeaderThree,
    DashboardLayout, 
    // UltimateTextToImage,
    Modal, 
    TrashIcon, 
    IconBaseTwo, 
    NavBack, 
    PageTitleTwo,
  }
}

</script>

<style>
</style>
