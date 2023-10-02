<template>
  <div>
    <!-- FORM: Zoom Question -->
    <!-- todo
        - preview mode
        - edit mode (current form) and a way to toggle between two
    -->
    <div v-if="$store.state.teacherCreateAssignment.states.isCreatingZoomQuestion">
      <div v-if="$store.state.teacherCreateAssignment.states.isZoomPreview">
        Zoom Preview here
      </div>
      <div v-else>
        <p>Works best in Google Chrome. Some features may not be available in other browsers.</p>

        <!-- Join / leave meeting -->
        <div class="flex -mx-1 mb-4" >
          <div class="px-1 w-1/2 h-28">
            <button @click="createZoomMeeting"
              class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
              :disabled="$store.getters['teacherCreateAssignment/hasZoomMeeting']"
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
              :disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting']"
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
        <p>Video panel</p>
        <div class="flex -mx-1 mb-4" >
          <div id="the-view" class="px-1 w-full">
          </div>
        </div>

        <p>Audio Waveform</p>
        <div class="flex -mx-1 mb-4">
          <canvas id="the-audio" class="px-1 w-full border-2 border-solid"> </canvas>
        </div>

        <!-- screen share  video test -->
        <p>Screen Share Panel</p>
        <div class="flex -mx-1 mb-4">
          <div id="the-screen" class="px-1 w-full">
          </div>
        </div>

        <!-- final render test -->
        <p>Final render test</p>
        <div class="flex -mx-1 mb-4">
          <canvas width="300" height="150" id="canvas-render" class="border-2 border-black h-auto h-20 w-full md:w-screen max-w-xl "></canvas>
        </div>

        <!-- camera and mic controls -->
        <div class="flex -mx-1 mb-4" >
          <div class="px-1 w-1/3 h-28">
            <button @click="toggleVideoButton"
              id="video-button"
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
              id="mic-button"
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
              id="screen-button"
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

        <!-- session info -->
        <div class="flex -mx-1 mb-4" >
          <p>A session by {{ $store.state.authUser.fullname }} ({{ $store.state.authUser.email }}). Session topic: {{ sessionTopic }} / session pasword: {{ sessionPassword }}</p>
        </div>

        <!-- cancel session button-->
        <div class="flex flex-row items-center mt-2 mb-2 w-full text-lg font-normal leading-tight border border-none appearance-none text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
          <div @click="cancelRecording" class="w-1/2 text-center text-blue-secondary mr-2 bg-gray-secondary py-5 rounded-md">
            <button>Cancel</button>
          </div>
          <div @click="saveRecording" class="w-1/2 text-center text-blue-secondary mr-2 bg-gray-secondary py-5 rounded-md">
            <button>Save</button>
          </div>
        </div>

        <hr />
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

let canvasHandler = null; // canvas / video tag to be loaded to show video cam
let screenHandler = null; // canvas / video tag to show screen share
let audioCanvas = null;
let audioCanvasCtx = null;

let mcstream = null; // canvas stream
let mc = null; // local media record to record zoom stream (theorically)
let mcMimeType = !!window.safari ? "video/mp4" : "video/webm";
let ms = null; // local media stream representing the canvas/video
let micTrack = null; // local media stream representing user's mic
let chunks = [];
let safariAudioDecode;
let safariAudioEncode;
let sessionTopic = genRanHex(6);
let sessionPassword = genRanHex(6);

// final rending place
let canvasRenderHandle = null;
let canvasRenderHandleStream = null;
let canvasRenderHandleCtx = null; 

/*
  some issues / features
  1. picture-in-picture when starting zoom & share screen
  2. mic feedback problem on chrome
    - problem when starting recording
  3. scope display when recording only sound
  4. media recorder state, something get lost after a recording session.

  // new plan: rebuilding the mediarecorder and zoom controls
  1. mediarecorder needs streams 
  2. tie video/canvas tag to stream, record anything on that
  3. tie mic as a new stream, record anything on that. (find if can resolve the feedback problem)
*/

export default {
  name: "ZoomQuestionForm",
  data () {
    return { status: 'Ready', sessionTopic, sessionPassword };
  }, 
  async mounted() { 
    // called everytime the form gets updated. wanted to do mounted, but that will only called once.

    console.log('ZoomQuestionForm mounted');
    console.log(`Using Zoom VIDEO SDK version ${ZoomVideo.VERSION}`);

    /*
      plan: 
      - check if canvas is there; if not there:
      - to add canvas(es) or video tag based on browser
      - setup audio waveform draw fn
      - setup composite draw fn
      - setup media recorder to record the composite canvas / mic
    */

    // if there already there, skip checking
    let canvasCheck = document.querySelector('#self-view-canvas');
    let videoCheck = document.querySelector('#self-view-video');


    // check if canvas is already there, if already there, skip the rest of the step 
    if(canvasCheck !== null || videoCheck !== null){
      return;
    }

    // ---- SETUP THE CANVAS / MEDIA RECORDER IF IT'S NOT THERE ----

    // setup the composite canvas , which will be later use for recording.
    canvasRenderHandle = document.querySelector('#canvas-render');
    canvasRenderHandleCtx = canvasRenderHandle.getContext('2d');
    canvasRenderHandleStream = canvasRenderHandle.captureStream();

    // add video / canvas tag based on browser and there's shared array buffer disabled
    let theView = document.querySelector('#the-view')
    //if(!!window.chrome && !(typeof SharedArrayBuffer === 'function')){
    /*
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
      // debug: trying to force firefox to use canvas
      canvasHandler = document.createElement('canvas');
      canvasHandler.id='self-view-canvas';
    } else if(typeof SharedArrayBuffer === 'function'){
    */

    // should  add the video element after loging in. 
    if(typeof SharedArrayBuffer === 'function'){
      // have shared array buffer enabled
      canvasHandler = document.createElement('canvas');
      canvasHandler.id='self-view-canvas';
    } else {
      // doesn't have shared array buffer enable (like chrome)
      canvasHandler = document.createElement('video');
      canvasHandler.id='self-view-video';
    }
    canvasHandler.height='325';
    canvasHandler.width='576';
    canvasHandler.className='border-2 border-black h-auto h-20 w-full md:w-screen max-w-xl';
    theView.textContent = '';
    theView.appendChild(canvasHandler);

    // add video / canvas tag for the screen share based on browser
    let theScreen = document.querySelector('#the-screen');
    if(!!window.chrome){
      screenHandler = document.createElement('video');
      screenHandler.id = 'screen-share-video';
    } else {
      screenHandler = document.createElement('canvas');
      screenHandler.id = 'screen-share-canvas';
      screenHandler.onplay = () => {
        console.log('screen share detected');
      }
    }
    screenHandler.className='border-2 border-black h-auto h-20 w-full md:w-screen max-w-xl';
    theScreen.appendChild(screenHandler);

    // test: capture everything from share screen video / canvas
    // canvasRenderHandleStream = screenHandler.captureStream();

    // capture the mic, and put it in a audioContext, so we can analyse and draw
    // also, put the stream in the final render stream, so can record things. 
    const audioContext = new AudioContext();
    micTrack = await navigator.mediaDevices.getUserMedia({ audio: true });
    micTrack.getAudioTracks()[0].enabled = false;
    canvasRenderHandleStream.addTrack(micTrack.getAudioTracks()[0]);

    const source = audioContext.createMediaStreamSource(micTrack)
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    // Connect the source to be analysed
    source.connect(analyser);

    // canvas to draw the sound
    audioCanvas = document.querySelector('#the-audio');
    audioCanvasCtx = audioCanvas.getContext('2d');

    // debug, check audio Context
    // console.log('audioContext', audioContext);

    // draw the waveform
    function draw() {
      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      audioCanvasCtx.fillStyle = "rgb(200, 200, 200)";
      audioCanvasCtx.fillRect(0, 0, audioCanvas.width, audioCanvas.height);

      audioCanvasCtx.lineWidth = 2;
      audioCanvasCtx.strokeStyle = "rgb(0, 0, 0)";

      audioCanvasCtx.beginPath();

      const sliceWidth = (audioCanvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * audioCanvas.height) / 2;

        if (i === 0) {
          audioCanvasCtx.moveTo(x, y);
        } else {
          audioCanvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      audioCanvasCtx.lineTo(audioCanvas.width, audioCanvas.height / 2);
      audioCanvasCtx.stroke();
    }
    draw();

    // draw composite based on source canvas/video
    let drawComposite = () => {
      //requestAnimationFrame(drawComposite);

      let micOn = this.$store.state.teacherCreateAssignment.states.isMicOn;
      let videoOn = this.$store.state.teacherCreateAssignment.states.isVideoOn;
      let screenShareOn = this.$store.state.teacherCreateAssignment.states.isScreenShare;

      // clear the picture first
      //canvasRenderHandleCtx.clearRect(0,0, canvasRenderHandle.width, canvasRenderHandle.height);

      if (videoOn && !screenShareOn) {
        // camera on, but not screen share
        canvasRenderHandleCtx.drawImage(canvasHandler, 0,0, 
          canvasRenderHandle.width, canvasRenderHandle.height);
      } else if (!videoOn && screenShareOn) {
        // camera off, but screen is shared
        // need to figure out a way that doesn't produced clipping when recording
        // canvasRenderHandleCtx.drawImage(screenHandler, 0,0 , canvasRenderHandle.width, canvasRenderHandle.height)
        //canvasRenderHandleCtx.drawImage(screenHandler, 0, 0);
        canvasRenderHandleCtx.drawImage(screenHandler, 0,0 ,
          canvasRenderHandle.width, canvasRenderHandle.height);
      } else if (videoOn && screenShareOn) {
        // both video and screen share is on, do PiP
        // canvasRenderHandleCtx.clearRect(0,0, canvasRenderHandle.width, canvasRenderHandle.height);
        canvasRenderHandleCtx.drawImage(screenHandler, 0,0 ,
          canvasRenderHandle.width, canvasRenderHandle.height);
        canvasRenderHandleCtx.drawImage(canvasHandler, 
          0,0, canvasHandler.width, canvasHandler.height,
          canvasRenderHandle.width*3/4, canvasRenderHandle.height*3/4,
          canvasRenderHandle.width/4, canvasRenderHandle.height/4
        );
      } else if (micOn && !videoOn && !screenShareOn) {
        // only the mic is on
        canvasRenderHandleCtx.drawImage(audioCanvas, 
          0,0, canvasRenderHandle.width, canvasRenderHandle.height
        );
      } else {
        // default, no input
        canvasRenderHandleCtx.fillText("NO INPUT", canvasRenderHandle.width/2, canvasRenderHandle.height/2);
      }
    }; 
    // drawComposite();
    // redraw the composite canvas 60 times / second. would like to use requestAnimationFrame, 
    // but it pauses if the browser is off focus. 
    setInterval(drawComposite, 1000/60);

    // start building the media recorder
    // capture what's going on in the render canvas and the mic
    mc = new MediaRecorder(canvasRenderHandleStream, { type: mcMimeType });
    mc.onstart = () => {
      // start recording
      console.log('mc onstart');
    }
    mc.onstop = (e) => {
      console.log('mc onstop');

      //collect all data and dump it
      //const blob = new Blob(chunks, {type: 'video/webm'});
      // each browser has different idea what mimeType is supported. so safari: video/mp4, firefox & chrome: video/webm
      const blob = new Blob(chunks, { type: mcMimeType });
      chunks = [];

      //put the blob in a video gallery
      console.log('pushing new blob with memeType', mcMimeType );
      var url = URL.createObjectURL(blob);
      // console.log('url', url);
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
      // console.log('record url dump', url);
    }
    mc.ondataavailable = (e) => {
      // move data from buffer to array
      console.log('mc ondataavailable');

      //pump data in the chunks array.
      chunks.push(e.data);

      // after stop `dataavilable` event run one more time
      if (mc.state === 'recording') {
          mc.stop();
      }
      this.status = "Recording. Pushing data to cache ...";
    }

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
        this.status = `Join successful. Session ID: ${sessionTopic}, Password: ${sessionPassword}`;

        /*
        console.log('stream', stream);
        console.log('client', client);
        console.log('sessionInfo', client.getSessionInfo());
        console.log('clientinfo', client.getCurrentUserInfo().userId);
        */
      }).catch((error) => {
        this.status = "Join Failed. Check if ad-blocker is active.";
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

      // detect 'stop sharing' controlled by the browser
      client.on('passively-stop-share', (payload) => {
        console.log('detected screen share is off', payload);
        this.toggleShareScreenButton();
      });

    },
    leaveZoomMeeting(e) {
      // switch off camera, mic, screen share and recording if they are on
      if(this.$store.state.teacherCreateAssignment.states.isVideoOn){
          this.toggleVideoButton();
      }
      if(this.$store.state.teacherCreateAssignment.states.isMicOn){
        this.toggleMicButton();
      }
      if(this.$store.state.teacherCreateAssignment.states.isScreenShare){
        this.toggleShareScreenButton();
      }
      if(this.$store.state.teacherCreateAssignment.states.isRecording){
        this.stopRecording();
      }

      // leave zoom meeting
      client.leave(true);

      console.log('leave success');
      this.status = "Left the meeting.";
      this.$store.commit('teacherCreateAssignment/toggleIsInZoomMeeting');
    },
    async toggleVideoButton() {
      console.log('video button toggled');
      var videoState = this.$store.state.teacherCreateAssignment.states.isVideoOn;

      if (videoState){
        // video is on, stop video
        this.status = 'Camera turned off';
        stream.stopVideo();
        canvasRenderHandleCtx.clearRect(0,0, canvasRenderHandle.width, canvasRenderHandle.height);
      } else {
        // video is off, start video
        this.status = 'Camera turned on';
        console.log('isRenderSelfView', stream.isRenderSelfViewWithVideoElement() );

        console.log('checking SharedArrayBuffer', typeof SharedArrayBuffer);
        if(!!window.chrome && !(typeof SharedArrayBuffer === 'function')) {
        // if(!(typeof SharedArrayBuffer === 'function')) {
          // if desktop Chrome or Edge (Chromium) with SharedArrayBuffer not enabled
          console.log('site is chrome and w/o SharedArrayBuffer');
          console.log('trying to put video on ', canvasHandler);

          stream.startVideo({ videoElement: canvasHandler });

        } else {
          // all other browsers and desktop Chrome or Edge (Chromium) with SharedArrayBuffer enabled

          console.log('other browsers or chrome w/ SharedArrayBuffer')
          console.log('trying to put video on ', canvasHandler);

          /*
          stream.startVideo(() => {
            stream.renderVideo(canvasHandler, client.getCurrentUserInfo().userId, 300, 200, 0, 0, 3);
          })
          */
         stream.startVideo().then(() => {
          stream.renderVideo(canvasHandler, client.getCurrentUserInfo().userId,
            canvasHandler.width, canvasHandler.height, 0, 0, 3
          ).then(() => {
            console.log('succesfully rendered video');
          }).catch((e) => {
            console.log('error render video', e);
          });
         })
        }

        canvasRenderHandle.width = canvasHandler.width;
        canvasRenderHandle.height = canvasHandler.height;
      }
      this.$store.commit('teacherCreateAssignment/toggleVideo');
    },
    async toggleShareScreenButton(e) {
      /*
        have to figure out how to do PiP when starting both video and share screen.
        - see if i can use renderVideo fn to do this.
      */
      console.log('toggle share screen button pressed');

      var screenShareState = this.$store.state.teacherCreateAssignment.states.isScreenShare;

      if (screenShareState) {
        console.log('turning screen share off');
        // screen share is on, toggle off
        stream.stopShareScreen();
        canvasRenderHandleCtx.clearRect(0,0, canvasRenderHandle.width, canvasRenderHandle.height);
        this.status = 'Screen share turned off';
      } else {
        // screen share is off, toggle on
        console.log('starting screen share on', screenHandler);
        stream.startShareScreen(screenHandler).then(() => {
          console.log(`setting the render screen to ${screenHandler.width} x ${screenHandler.height}`)
          if(screenHandler.width == 0) {
            canvasRenderHandle.width=1024;
            canvasRenderHandle.height=800;

          } else {
            canvasRenderHandle.width = screenHandler.width;
            canvasRenderHandle.height = screenHandler.height;
          }
        }).catch((e) => {
          console.log('error sharing screen', e);
        });
        this.status = 'Screen share turned on';

      }

      // update the toggle state
      this.$store.commit('teacherCreateAssignment/toggleShareScreen');

    },
    async toggleMicButton(e){
      console.log('toggle the mic');

      var micState = this.$store.state.teacherCreateAssignment.states.isMicOn;

      if (micState) {
        // mic is on, turn it off
        stream.stopAudio();
        micTrack.getAudioTracks()[0].enabled = false;
        canvasRenderHandleCtx.clearRect(0,0, canvasRenderHandle.width, canvasRenderHandle.height);
        this.status = 'Microphone is turned off';
      } else {
        // mic is off, turn it on
        stream.startAudio();
        micTrack.getAudioTracks()[0].enabled = true;
        this.status = 'Microphone is turned on';
      }

      // toggle the mic state
      this.$store.commit('teacherCreateAssignment/toggleMic');
    },
    async startRecording(){
      console.log('start record');

      mc.start();

      this.$store.commit('teacherCreateAssignment/toggleRecording');
      this.status = 'Recording started';
    },
    stopRecording(){
      console.log('stop record');

      mc.stop();

      this.$store.commit('teacherCreateAssignment/toggleRecording');
      this.status = 'Recording stopped';
    },
    cancelRecording(){
      // switch off the recording menu, back to create zoom button
      this.leaveZoomMeeting();
      this.$store.commit('teacherCreateAssignment/cancelZoomEditMode');
      if(this.$store.getters['teacherCreateAssignment/hasZoomMeeting']){
        this.$store.commit('teacherCreateAssignment/cancelZoomMeeting');
      }
    },
    saveRecording(){
      console.log('saving recording');
      this.$store.dispatch('teacherCreateAssignment/saveZoomQuestionToDraft')
      this.leaveZoomMeeting();
      if(this.$store.getters['teacherCreateAssignment/hasZoomMeeting']){
        this.$store.commit('teacherCreateAssignment/cancelZoomMeeting');
      }
    }
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
