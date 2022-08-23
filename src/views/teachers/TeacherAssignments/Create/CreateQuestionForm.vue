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
        <div class="px-1 w-1/2 h-28">
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
                type="file"
                accept='image/*'
                multiple
                class="hidden"
            >
          </div>
        </label>
      </div>
      <div v-if="$store.state.teacherCreateAssignment.states.isSelectingQuestionType && !$store.getters['teacherCreateAssignment/hasEditableQuestion']"
          class="flex -mx-1"
      >
        <!-- zoom meeting-->
        <div class="px-1 w-full h-12">
          <button @click="$store.dispatch('teacherCreateAssignment/beginWritingZoomQuestion')"
                  class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <icon-base-two class="w-12">
                <camera-icon class="w-12"/>
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Zoom
            </div>
          </button>
        </div>
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

      <!-- FORM: Zoom Question -->
      <div v-if="$store.state.teacherCreateAssignment.states.isCreatingZoomQuestion">
        <div class="flex -mx-1 mb-4" >
          <!-- Join / leave meeting -->
          <div class="px-1 w-1/2 h-28">
            <button @click="createZoomMeeting"
              class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
            >
              <div class="flex col-span-1 row-span-1 justify-center py-4">
                <icon-base-two class="w-12">
                  <phone-icon class="w-12"/>
                </icon-base-two>
              </div>
              <div class="flex col-span-1 row-span-2 justify-center py-2">
                Join
              </div>
            </button>
          </div>
          <div class="px-1 w-1/2 h-28">
            <button @click="leaveZoomMeeting"
                    class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
            >
              <div class="flex col-span-1 row-span-1 justify-center py-4">
                <icon-base-two class="w-12">
                  <trash-icon class="w-12"/>
                </icon-base-two>
              </div>
              <div class="flex col-span-1 row-span-2 justify-center py-2">
                Leave
              </div>
            </button>
          </div>
        </div>

        <div class="flex -mx-1 mb-4" >
          <!-- video canvas -->
          <div class="px-1 w-full">
            <video id="self-view-video" class="h-auto" width="854"></video>
            <canvas class="border-2 border-black h-auto" id="self-view-canvas" height="480" width="854"></canvas>
          </div>
        </div>

        <div class="flex -mx-1 mb-4" >
          <!-- camera and mic controls -->
          <div class="px-1 w-1/2 h-28">
            <button @click="toggleVideoButton"
              class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
              :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting']"
            >
              <div class="flex col-span-1 row-span-1 justify-center py-4">
                <icon-base-two class="w-12">
                  <camera-icon class="w-12"/>
                </icon-base-two>
              </div>
              <div class="flex col-span-1 row-span-2 justify-center py-2">
                Camera On/Off
              </div>
            </button>
          </div>
          <div class="px-1 w-1/2 h-28">
            <button @click="toggleMicButton"
              class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
              :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting']"
            >
              <div class="flex col-span-1 row-span-1 justify-center py-4">
                <icon-base-two class="w-12">
                  <pen-icon class="w-12"/>
                </icon-base-two>
              </div>
              <div class="flex col-span-1 row-span-2 justify-center py-2">
                Mic On/Off
              </div>
            </button>
          </div>
        </div>

        <div class="flex -mx-1 mb-4" >
          <!-- recording controls -->
          <div class="px-1 w-1/2 h-28">
            <button @click="startRecording"
              class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
              :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting']"
            >
              <div class="flex col-span-1 row-span-1 justify-center py-4">
                <icon-base-two class="w-12">
                  <camera-icon class="w-12"/>
                </icon-base-two>
              </div>
              <div class="flex col-span-1 row-span-2 justify-center py-2">
                Rec Start
              </div>
            </button>
          </div>
          <div class="px-1 w-1/2 h-28">
            <button @click="stopRecording"
              class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
              :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting']"
            >
              <div class="flex col-span-1 row-span-1 justify-center py-4">
                <icon-base-two class="w-12">
                  <camera-icon class="w-12"/>
                </icon-base-two>
              </div>
              <div class="flex col-span-1 row-span-2 justify-center py-2">
                Rec Stop
              </div>
            </button>
          </div>
        </div>


        <div class="flex -mx-1 mb-4" >
          <p>recording gallery here</p>
        </div>
        <div id="video-preview-gallery" class="flex -mx-1 mb-4" >
          <div v-if="$store.state.teacherCreateAssignment.creatingQuestionDetails.zoomMeetings">
            <video
              width="854" height="480"
              controls="" :src="$store.state.teacherCreateAssignment.creatingQuestionDetails.zoomMeetings">
            </video>
          </div>
        </div>

        <div class="flex -mx-1 mb-4" >
          <p>Streaming details here:</p>
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
import PhoneIcon from "@/components/icons/PhoneIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import ZoomVideo from '@zoom/videosdk';
import KJUR from 'jsrsasign';

let stream; // zoom stream
const client = ZoomVideo.createClient(); // zoom client
let mc = null; // local media record to record zoom stream (theorically)
let ms = null;
let chunks = [];
let mediaStream = null;

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
    async createZoomMeeting(e) {
      //happens when create a zoom meeting clicked

      console.log('create a zoom meeting');
      client.init('en-US', 'CDN');

      //create session
      // 1. generate jwt

      //console.log('generate jwt');
      const iat = Math.round((new Date().getTime() - 30000) / 1000)
      const exp = iat + 60 * 60 * 2

      const oHeader = { alg: 'HS256', typ: 'JWT' }

      const oPayload = {
        app_key: process.env.VUE_APP_ZOOM_VIDEO_SDK_KEY,
        tpc: 'session',
        version: 1,
        role_type: 1,
        iat: iat,
        exp: exp,
        pwd: 'password'
      }

      const sHeader = JSON.stringify(oHeader)
      const sPayload = JSON.stringify(oPayload)
      const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.VUE_APP_ZOOM_VIDEO_SDK_SECRET);
      //console.log('signature:', signature);

      // 2. actually create the session
      console.log('create a zoom session');
      await client.join('session', signature, 'erwinkarim@gmail.com', 'password').then(() => {
        stream = client.getMediaStream()

        /*
        console.log('stream', stream);
        console.log('client', client);
        console.log('sessionInfo', client.getSessionInfo());
        console.log('clientinfo', client.getCurrentUserInfo().userId);
        */
      }).catch((error) => {
        console.log('join failed; check connection or ad-blocks');
        console.log(error)
      })

      console.log('join success');
      this.$store.commit('teacherCreateAssignment/toggleIsInZoomMeeting');
    },
    leaveZoomMeeting(e) {
      // switch off camera and mic if on
      if(this.$store.state.teacherCreateAssignment.states.isVideoOn){
          this.stopZoomVideo(e);
      }

      // leave zoom meeting
      client.leave(true);

      console.log('leave success');
      this.$store.commit('teacherCreateAssignment/toggleIsInZoomMeeting');
    },
    async toggleVideoButton(e) {
      var videoState = this.$store.state.teacherCreateAssignment.states.isVideoOn;

      if (videoState){
        // video is on, stop video
        this.stopZoomVideo(e);
      } else {
        // video is off, start video
        this.startZoomVideo(e);
      }
    },
    async startZoomVideo(e) {
      var mcstream = null;

      try {
        console.log('video start');
        // await stream.startVideo();

        // from zoom sdk docs
        if(!!window.chrome && !(typeof SharedArrayBuffer === 'function')) {
          console.log('video started in chrome');
          // if desktop Chrome or Edge (Chromium) with SharedArrayBuffer not enabled
          await stream.startVideo({
            videoElement: document.querySelector('#self-view-video')
          });
        } else {
          // all other browsers and desktop Chrome or Edge (Chromium) with SharedArrayBuffer enabled
          console.log('video started in firefox');
          /*
          await stream.startVideo(() => {
            stream.renderVideo(
              document.querySelector('#self-view-canvas'),
              client.getCurrentUserInfo().userId,
              854, 480, 0, 0, 3)
          });
          */
          await stream.startVideo();
          await stream.renderVideo(
            document.querySelector('#self-view-canvas'),
            client.getCurrentUserInfo().userId,
            854, 480, 0, 0, 3
          );
        }

        /*
        await stream.renderVideo(
          document.querySelector('#self-view-canvas'),
          //document.querySelector('#self-view-video'),
          client.getCurrentUserInfo().userId,
          854, 480, 0, 0, 3
        );
        */

        console.log('successfully rendered video');
        this.$store.commit('teacherCreateAssignment/toggleVideo');

        //build up the media recorder
        console.log('building media recorder');

        mcstream = await navigator.mediaDevices.getUserMedia({ video: true });

        mc = new MediaRecorder(mcstream, {
          audioBitsPerSecond : 128000, videoBitsPerSecond : 2500000, mimeType : 'video/webm;codecs=vp8'
        });

        mc.onstart = (e) => { console.log('mc onstart'); };
        mc.onstop = (e) => {
          console.log('mc onstop');

          //collect all data and dump it
          const blob = new Blob(chunks, {type: 'video/webm'});
          chunks = [];

          //put the blob in a video gallery
          var url = URL.createObjectURL(blob);
          console.log('url', url);
          var videoTag = document.createElement('video');
          videoTag.autoplay = false;
          videoTag.controls = true;
          videoTag.height = 480;
          videoTag.width = 854;
          videoTag.src = url;

          //always replace what's ever in the preview gallery
          document.querySelector('#video-preview-gallery').textContent = '';
          document.querySelector('#video-preview-gallery').appendChild(videoTag);


          //trigger to push video content to questionDetails.zoomMeetings
          this.$store.dispatch('teacherCreateAssignment/handleZoomQuestion', url);
          // URL.revokeObjectURL(url);
        };
        mc.ondataavailable = (e) => {
          console.log('mc ondataavailable');

          //pump data in the chunks array.
          chunks.push(e.data);

          // after stop `dataavilable` event run one more time
          if (mc.state === 'recording') {
              mc.stop();
          }
        };

        console.log('mc creation successful');
        mcstream = null;

      } catch (e) {
        console.log('error starting video', e);
      }

    },
    stopZoomVideo(e) {
      // have to kill mc, because keeps the camera on for some reason

      //stop video for now; destory mc
      stream.stopVideo();

      // have to check mc status or try catch to be safe.
      if (mc.state ==="recording") {
        mc.stop();
      };

      mc = null;

      //clear canvas
      //stream.clearVideoCanvas(document.querySelector('#self-view-canvas'));
      stream.clearVideoCanvas(document.querySelector('#self-view-video'));

      this.$store.commit('teacherCreateAssignment/toggleVideo');

    },
    toggleMicButton(e){
      console.log('toggle the mic');
    },
    startRecording(){
      console.log('start record');
      mc.start();
    },
    stopRecording(){
      console.log('stop record');

      mc.stop();
    }
  },
  components: {
    CropIcon, PenIcon, CameraIcon, TrashIcon, IconBaseTwo,
    VueCropper, PhoneIcon, PlusIcon, ArrowRightIcon
  }
}
</script>

<style scoped>

</style>
