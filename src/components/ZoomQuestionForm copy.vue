<template>
  <div>
    <!-- FORM: Zoom Question -->
    <div v-if="$store.state.teacherCreateAssignment.states.isCreatingZoomQuestion">

      <!-- Join / leave meeting -->
      <div class="flex -mx-1 mb-4" >
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
                <person-to-door-icon class="w-12"/>
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Leave
            </div>
          </button>
        </div>
      </div>

      <!-- Status Bar -->
      <div class="flex -mx-1 mb-4" >
        <div class="py-2 mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline">
          Status: {{ status }}
        </div>

      </div>

      <!-- video canvas -->
      <div class="flex -mx-1 mb-4" >
        <div id="the-view" class="px-1 w-full">
        </div>
      </div>

      <!-- camera and mic controls -->
      <div class="flex -mx-1 mb-4" >
        <div class="px-1 w-1/3 h-28">
          <button @click="toggleVideoButton"
            class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
            :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting']"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <icon-base-two class="w-12">
                <video-icon v-if="$store.state.teacherCreateAssignment.states.isVideoOn" class="w-12" />
                <video-slash-icon v-else class="w-12" />
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Camera
            </div>
          </button>
        </div>
        <div class="px-1 w-1/3 h-28">
          <button @click="toggleMicButton"
            class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
            :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting']"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <icon-base-two class="w-12">
                <microphone-icon v-if="$store.state.teacherCreateAssignment.states.isMicOn" class="w-12"/>
                <microphone-slash-icon v-else class="w-12"/>
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Microphone 
            </div>
          </button>
        </div>
        <div class="px-1 w-1/3 h-28">
          <button @click="toggleShareScreenButton"
            class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
            :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting']"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <icon-base-two class="w-12">
                <display-icon v-if="$store.state.teacherCreateAssignment.states.isScreenShare" class="w-12" />
                <display-slash-icon v-else class="w-12"/>
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Screen
            </div>
          </button>
        </div>
      </div>

      <!-- recording controls -->
      <div class="flex -mx-1 mb-4" >
        <div class="px-1 w-1/2 h-28">
          <button @click="startRecording"
            class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
            :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting'] || $store.getters['teacherCreateAssignment/hasZoomRecording']"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4" :class="{ 'text-red-500': $store.getters['teacherCreateAssignment/hasZoomRecording'] }">
              <icon-base-two class="w-12">
                <circle-icon class="w-12"/>
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
            :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting'] || !$store.getters['teacherCreateAssignment/hasZoomRecording']"
          >
            <div class="flex col-span-1 row-span-1 justify-center py-4">
              <icon-base-two class="w-12">
                <stop-icon class="w-12"/>
              </icon-base-two>
            </div>
            <div class="flex col-span-1 row-span-2 justify-center py-2">
              Rec Stop
            </div>
          </button>
        </div>
      </div>


      <!-- recording gallery-->
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
        <p>A session by {{ $store.state.authUser.fullname }} ({{ $store.state.authUser.email }}). Session topic: {{ sessionTopic }} / session pasword: {{ sessionPassword }}</p>
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
import ZoomIcon from "@/components/icons/ZoomIcon";
import MicrophoneIcon from "@/components/icons/MicrophoneIcon";
import MicrophoneSlashIcon from "@/components/icons/MicrophoneSlashIcon";
import StopIcon from "@/components/icons/StopIcon";
import CircleIcon from "@/components/icons/CircleIcon";
import PersonToDoorIcon from "@/components/icons/PersonToDoorIcon";
import DisplayIcon from "@/components/icons/DisplayIcon";
import DisplaySlashIcon from "@/components/icons/DisplaySlashIcon";
import VideoIcon from "@/components/icons/VideoIcon";
import VideoSlashIcon from "@/components/icons/VideoSlashIcon";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import ZoomVideo from '@zoom/videosdk';
import KJUR from 'jsrsasign';

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
let stream; // zoom stream
const client = ZoomVideo.createClient(); // zoom client
let canvasHandler = null; // canvas / video tag to be loaded
let mcstream = null; // canvas stream
let mc = null; // local media record to record zoom stream (theorically)
let ms = null; // local media stream representing the canvas/video
let micTrack = null; // local media stream representing user's mic
let chunks = [];
let safariAudioDecode;
let safariAudioEncode;
let sessionTopic = genRanHex(6);
let sessionPassword = genRanHex(6);

/*
  some issues / features
  1. picture-in-picture when starting zoom & share screen
  2. mic feedback problem on chrome
    - problem when starting recording
  3. scope display when recording only sound
  4. media recorder state, something get lost after a recording session.

  overall, this code is messy, might consider to redo it all again
*/

export default {
  name: "ZoomQuestionForm",
  data () {
    return { status: 'Ready', sessionTopic, sessionPassword };
  }, 
  updated: () => {
    console.log('ZoomQuestionForm updated');
    /*
      plan: to add canvas or video tag based on browser
    */

    // if there already there, skip checking
    let canvasCheck = document.querySelector('#self-view-canvas');
    let videoCheck = document.querySelector('#self-view-video');

    if(canvasCheck !== null || videoCheck !== null){
      return;
    }

    // add video / canvas tag based on browser
    let theView = document.querySelector('#the-view')
    if(!!window.chrome){
      // it's chrome, add video tag
      canvasHandler = document.createElement('video');
      canvasHandler.id='self-view-video';
    } else {
      canvasHandler = document.createElement('canvas');
      canvasHandler.id='self-view-canvas';
    }
    //canvasHandler.height='480';
    //canvasHandler.width='854';
    canvasHandler.className='border-2 border-black h-auto h-20 w-full md:w-screen max-w-xl';
    theView.textContent = '';
    theView.appendChild(canvasHandler);
  },
  methods: {
    async createZoomMeeting(e) {
      //happens when create a zoom meeting clicked

      console.log('create a zoom meeting');
      this.status = "Joining meeting ..."
      client.init('en-US', 'CDN');

      //create session
      // 1. generate jwt

      //console.log('generate jwt');
      const iat = Math.round((new Date().getTime() - 30000) / 1000)
      const exp = iat + 60 * 60 * 2

      const oHeader = { alg: 'HS256', typ: 'JWT' }

      const oPayload = {
        app_key: process.env.VUE_APP_ZOOM_VIDEO_SDK_KEY,
        tpc: sessionTopic,
        version: 1,
        role_type: 1,
        iat: iat,
        exp: exp,
        pwd: sessionPassword,
      }

      const sHeader = JSON.stringify(oHeader)
      const sPayload = JSON.stringify(oPayload)
      const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.VUE_APP_ZOOM_VIDEO_SDK_SECRET);
      //console.log('signature:', signature);

      // 2. actually create the session
      console.log('create a zoom session');
      // await client.join('session', signature, 'erwinkarim@gmail.com', 'password').then((res) => {
      await client.join(sessionTopic, signature, this.$store.state.authUser.email, sessionPassword).then((res) => {
        stream = client.getMediaStream();
        console.log('res', res);
        this.status = `Join sucessful. Session ID: ${sessionTopic}, Password: ${sessionPassword}`;

        /*
        console.log('stream', stream);
        console.log('client', client);
        console.log('sessionInfo', client.getSessionInfo());
        console.log('clientinfo', client.getCurrentUserInfo().userId);
        */
      }).catch((error) => {
        this.status = "Join Failed";
        console.log('join failed; check connection or ad-blocks');
        console.log(error)
      })

      // event listener to see when desktop Safari audio has been initialized
      client.on('media-sdk-change', (payload) => {
        if (payload.type === 'audio' && payload.result === 'success') {
          if (payload.action === 'encode') {
            // encode for sending audio stream (speak)
            safariAudioEncode = true
          } else if (payload.action === 'decode') {
            // decode for receiving audio stream (hear)
            safariAudioDecode = true
          }
        };

        if(window.safari !== undefined) {
          // desktop Safari, check if desktop Safari audio has been initialized
          if (safariAudioEncode && safariAudioDecode) {
            // desktop Safari audio has been initialized
            try {
              // try to start audio automatically in Safari
              stream.startAudio({ autoStartAudioInSafari: true })
            } catch (error) {
              // starting audio automatically in Safari failed, retry or handle error
              console.log(error)
            }
          } else {
            // desktop Safari audio has not been initialized, retry or handle error
            console.log('safari audio has not finished initializing')
          }
        };
      })

      console.log('join success');
      this.$store.commit('teacherCreateAssignment/toggleIsInZoomMeeting');
    },
    leaveZoomMeeting(e) {
      // switch off camera, mic and screen share if they are on
      if(this.$store.state.teacherCreateAssignment.states.isVideoOn){
          this.stopZoomVideo(e);
      }
      if(this.$store.state.teacherCreateAssignment.states.isMicOn){
        this.toggleMicButton();
      }
      if(this.$store.state.teacherCreateAssignment.states.isScreenShare){
        this.toggleShareScreenButton();
      }

      // leave zoom meeting
      client.leave(true);

      console.log('leave success');
      this.status = "Left the meeting.";
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
    async toggleShareScreenButton(e) {
      console.log('toggle share screen button pressed');

      var screenShareState = this.$store.state.teacherCreateAssignment.states.isScreenShare;

      if (screenShareState) {
        // share screen is on, turn it off
        stream.stopShareScreen();

        //reset canvas to normal height?
        canvasHandler.width=854;
        canvasHandler.height=480;
        
        // if video on, reset the video thing
        if(this.$store.state.teacherCreateAssignment.states.isVideoOn){
          await stream.renderVideo(
            canvasHandler,
            client.getCurrentUserInfo().userId,
            854, 480, 0, 0, 3
          );
        }

      } else {
        // share screen is off, turn it on

        stream.startShareScreen(canvasHandler);
        /*
        if(!!window.chrome) {
          // if desktop Chrome and Edge (Chromium)
          stream.startShareScreen(canvasHandler);
        } else {
          // all other browsers
          stream.startShareScreen(canvasHandler);
          
        }
        */

        // if video is on, re-render the video to be part of it
        if(this.$store.state.teacherCreateAssignment.states.isVideoOn){
          await stream.renderVideo(
            document.querySelector('#self-view-canvas'),
            client.getCurrentUserInfo().userId,
            107, 60, 747, 400, 3
          );
        }
      }

      // toggle share screen state
      this.$store.commit('teacherCreateAssignment/toggleShareScreen');

    },
    async startZoomVideo(e) {
      var mcstream = null;

      try {
        console.log('video start');
        this.status = "Starting video ...";
        // await stream.startVideo();

        // from zoom sdk docs
        if(!!window.chrome && !(typeof SharedArrayBuffer === 'function')) {
          console.log('video started in chrome');
          // if desktop Chrome or Edge (Chromium) with SharedArrayBuffer enabled
          await stream.startVideo({
            videoElement: canvasHandler
          });
        } else {
          // all other browsers and desktop Chrome or Edge (Chromium) with SharedArrayBuffer not enabled
          console.log('video started in firefox');
          console.log('canvasHandler', canvasHandler);

          // get canvas width and height and project it

          // await stream.startVideo();
          await stream.startVideo({
            videoElement: canvasHandler
          });
          await stream.renderVideo(
            canvasHandler,
            client.getCurrentUserInfo().userId,
            canvasHandler.width, canvasHandler.height, 0, 0, 3
          );
        }


        console.log('successfully rendered video');
        this.status = "Video Started";
        this.$store.commit('teacherCreateAssignment/toggleVideo');

      } catch (e) {
        console.log('error starting video', e);
        this.status = "Error starting video";
      }

    },
    stopZoomVideo(e) {

      this.status = "Stopping video ...";
      stream.stopVideo();

      //stream.clearVideoCanvas(document.querySelector('#self-view-canvas'));
      stream.clearVideoCanvas(canvasHandler);

      this.status = "Video stopped.";
      this.$store.commit('teacherCreateAssignment/toggleVideo');

    },
    async toggleMicButton(e){
      console.log('toggle the mic');

      var micState = this.$store.state.teacherCreateAssignment.states.isMicOn;

      if (micState) {
        // mic is on, turn off
        stream.stopAudio();

        //destory the mic track and remove the mic track from the current streamer
        console.log('micTrack', micTrack);
        micTrack[0].stop();

        if (mcstream !== null) {
          let mcstreamAudioTrack = mcstream.getAudioTracks()
          mcstreamAudioTrack[0].stop();
        }

        console.log('stop Audio');
        this.status = "Mic stopped.";
      } else {
        this.status = "Starting microphone ...";

        // mic is off, turn on
        // additional steps for safari
        var isSafari = window.safari !== undefined

        if(isSafari) {
          // desktop Safari, check if desktop Safari audio has been initialized
          if(safariAudioEncode && safariAudioDecode){
            // desktop Safari audio has been initialized, continue to start audio
            stream.startAudio()
          } else {
            // desktop Safari audio has not been initialized, retry or handle error
            console.log('safari audio has not finished initializing')
            this.status = 'Safari audio has not finished initializing. Please try again.';
          }
        } else {
          // not desktop Safari, continue to start audio
          stream.startAudio()
        }
        // stream.startAudio();
        
        // get audio track to tack it on mcstream
        let mic = await navigator.mediaDevices.getUserMedia({ audio: true });
        micTrack = mic.getAudioTracks();

        //should attach the stream to current media recorder??
        console.log('start Audio', micTrack);
        this.status = "Microphone started.";
      }
      this.$store.commit('teacherCreateAssignment/toggleMic');
    },
    async startRecording(){
      if (mc === null){
       this.startMediaRecorder();
      };

      console.log('start record');
      mc.start();
    },
    stopRecording(){
      console.log('stop record');
      mc.stop();
    },
    async startMediaRecorder() {
      this.status = "Start Recording ...";

      // start media recorder
      console.log ('startMediaRecorder');

      var mcstream = null;

      //build up the media recorder
      console.log('building media recorder');

      // have to adjust this so weather to add video, audio or screen on the fly
      //mcstream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if(!!window.chrome) {} else {
        canvasHandler.getContext('bitmaprenderer'); // somehow firefox need to specify context
      }
      mcstream = canvasHandler.captureStream(30);
      console.log('mcstream', mcstream);

      // if the mic is on, capture audio too
      // this causes feedback in chrome
      if(this.$store.state.teacherCreateAssignment.states.isMicOn){
        console.log('adding audio track to mcstream');
        mcstream.addTrack(micTrack[0]);
        console.log('audio track added');
      }

      // create new media recorder and associated actions
      console.log('creating a media recorder with the following tracks', mcstream.getTracks())
      mc = new MediaRecorder(mcstream);
      this.status = "Recording Device is ready";
      console.log('mediarecorder started', mc);

      mc.onstart = (e) => { 
        this.status = "Recording ...";
        console.log('mc onstart'); 
        this.$store.commit('teacherCreateAssignment/toggleRecording');
      };
      mc.onstop = (e) => {
        console.log('mc onstop');

        //collect all data and dump it
        const blob = new Blob(chunks, {type: 'video/webm'});
        //const blob = new Blob(chunks);
        chunks = [];

        //put the blob in a video gallery
        var url = URL.createObjectURL(blob);
        console.log('url', url);
        var videoTag = document.createElement('video');
        videoTag.autoplay = true;
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

        // for debug, video content for debugging
        console.log('record url dump', url);
        this.status = "Recording stopped. New video dumped in gallery";
        this.$store.commit('teacherCreateAssignment/toggleRecording');
      };
      mc.ondataavailable = (e) => {
        console.log('mc ondataavailable');

        //pump data in the chunks array.
        chunks.push(e.data);

        // after stop `dataavilable` event run one more time
        if (mc.state === 'recording') {
            mc.stop();
        }
        this.status = "Recording. Pushing data to cache ...";
      };

      console.log('mc creation successful and ready');
    },
  },
  components: {
    CropIcon, PenIcon, CameraIcon, TrashIcon, IconBaseTwo,
    VueCropper, PhoneIcon, PlusIcon, ArrowRightIcon, ZoomIcon,
    MicrophoneIcon, MicrophoneSlashIcon, StopIcon, CircleIcon, PersonToDoorIcon, 
    DisplayIcon, DisplaySlashIcon, VideoIcon, VideoSlashIcon,
  },

};

</script>

<style scoped>

</style>
