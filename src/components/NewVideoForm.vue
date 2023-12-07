<template>
	<div>
		<!-- camera and mic controls -->
		<div class="flex flex-row -mx-1 mb-4" >
			<div class="px-1 w-1/3 h-32">
				<button @click="toggleVideoButton"
					id="video-button"
					class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
				>
					<div class="flex col-span-1 row-span-1 justify-center py-4">
						<icon-base-two class="w-12">
							<video-icon v-if="this.videoOn" class="w-12" />
							<video-slash-icon v-else class="w-12" />
						</icon-base-two>
					</div>
					<div class="flex col-span-1 row-span-2 justify-center py-2">
						Camera
					</div>
				</button>
			</div>
			<div class="px-1 w-1/3 h-32">
				<button @click="toggleMicButton"
					id="mic-button"
					class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
				>
					<div class="flex col-span-1 row-span-1 justify-center py-4">
						<icon-base-two class="w-12">
							<microphone-icon v-if="this.audioOn" class="w-12"/>
							<microphone-slash-icon v-else class="w-12"/>
						</icon-base-two>
					</div>
					<div class="flex col-span-1 row-span-2 justify-center py-2">
						Microphone 
					</div>
				</button>
			</div>
			<div class="px-1 w-1/3 h-32">
				<button @click="toggleShareScreenButton"
					id="screen-button"
					class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
				>
					<div class="flex col-span-1 row-span-1 justify-center py-4">
						<icon-base-two class="w-12">
							<display-icon v-if="this.screenShare" class="w-12" />
							<display-slash-icon v-else class="w-12"/>
						</icon-base-two>
					</div>
					<div class="flex col-span-1 row-span-2 justify-center py-2">
						Screen
					</div>
				</button>
			</div>
		</div>

		<div class="flex flex-col items-center mt-2 mb-2 w-full text-lg font-normal leading-tight border border-none appearance-none text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
			<div class="w-full border-1">
				<video autoplay ref="videoElm" id="video"></video>
			</div>
			<div class="w-full">
				Canvas Here. Appear and disappear based on camera/screen controls.
			</div>
		</div>

		<!-- recording controls -->
		<!-- show appear/disappear when camera/mic/screen is toggled-->
		<div class="flex flex-row -mx-1 mb-4" >
			<div class="px-1 w-full h-28">
				<button @click="toggleRecording"
					class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
				>
					<div class="flex col-span-1 row-span-1 justify-center py-4" :class="{ 'text-red-500': $store.getters['teacherCreateAssignment/hasZoomRecording'] }">
						<icon-base-two class="w-12">
							<stop-icon v-if="this.recording" class="w-12"/>
							<circle-icon v-else />
						</icon-base-two>
					</div>
					<div class="flex col-span-1 row-span-2 justify-center py-2">
						Rec Start/Stop
					</div>
				</button>
			</div>
		</div>

		<!-- cancel session button-->
		<div class="flex flex-row -mx-1 mb-4" >
			<div @click="cancelRecording" class="w-1/2 text-center text-blue-secondary mr-2 bg-gray-secondary py-5 rounded-md">
				<button>Cancel</button>
			</div>
			<div @click="saveRecording" class="w-1/2 text-center text-blue-secondary bg-gray-secondary py-5 rounded-md">
				<button>Save</button>
			</div>
		</div>
	</div>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import MicrophoneIcon from "@/components/icons/MicrophoneIcon";
import MicrophoneSlashIcon from "@/components/icons/MicrophoneSlashIcon";
import DisplayIcon from "@/components/icons/DisplayIcon";
import DisplaySlashIcon from "@/components/icons/DisplaySlashIcon";
import VideoIcon from "@/components/icons/VideoIcon";
import VideoSlashIcon from "@/components/icons/VideoSlashIcon";
import StopIcon from "@/components/icons/StopIcon";
import CircleIcon from "@/components/icons/CircleIcon";

let cameraStream, audioStream, screenStream = null;
let videoElm = null;
let mediaRecorder = null;
let blobs = [];

export default {
	name: "NewVideoForm", 
	data(){
		return {
			videoOn: false, 
			audioOn: false, 
			screenShare: false, 
			recording: false,
		};
	},
	mounted: function(){
		console.log('setup media recorder and streamer');
		videoElm = document.querySelector('#video');
		
	}, 
	methods: {
		cancelRecording: function() {
			console.log('cancel recording, reset' );
      this.$store.dispatch('teacherCreateAssignment/endShowingVideoMenu');
      this.$store.commit('teacherCreateAssignment/cancelZoomEditMode');
		}, 
		saveRecording: () => {
			console.log('save recording');
		}, 
		toggleVideoButton: async function (){
			if(this.videoOn){
				console.log('stop camera');
				let tracks = cameraStream.getTracks();

				for(var i=0; i < tracks.length; i++){
					tracks[i].stop();
				}
				video.srcObject = null;

				/*
					kill video feed.
				*/
			} else {
				console.log('start camera')
				/*
					- start video media stream and push to canvas/video elm
				*/
				cameraStream = await navigator.mediaDevices.getUserMedia({ video: true })
				console.log('videoElm', videoElm);
				videoElm.srcObject = cameraStream;
			}

			this.videoOn = !this.videoOn;

		}, 
		toggleMicButton: function() {
			if(this.audioOn){
				console.log('stop mic');
			} else {
				console.log('start mic')
				/*
					if videoOn is false, put a audio graphics on video/canvas elm
				*/
			}
			this.audioOn = !this.audioOn;
		}, 
		toggleShareScreenButton: function() {
			if(this.screenShare){
				console.log('stop share screen');
			} else {
				console.log('start share screen')
			}
			this.screenShare = !this.screenShare;
		}, 
		toggleRecording: function(){
			if(this.recording){
				console.log('stop recording');
			} else {
				console.log('start recording')
			}
			this.recording = !this.recording;
		}, 
	}, 
	components: {
		IconBaseTwo, 
		MicrophoneIcon, MicrophoneSlashIcon, DisplayIcon, DisplaySlashIcon, VideoIcon, VideoSlashIcon, 
		StopIcon, CircleIcon,
	}
}
</script>