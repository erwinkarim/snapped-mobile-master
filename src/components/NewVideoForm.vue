<template>
	<div>
		<!-- camera and mic controls -->
		<div class="flex flex-row -mx-1 mb-4" >
			<div class="px-1 w-1/3 h-32">
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
			<div class="px-1 w-1/3 h-32">
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
			<div class="px-1 w-1/3 h-32">
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

		<div class="flex flex-row items-center mt-2 mb-2 w-full text-lg font-normal leading-tight border border-none appearance-none text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
			Canvas Here. Appear and disappear based on camera/screen controls.
		</div>

		<!-- recording controls -->
		<!-- show appear/disappear when camera/mic/screen is toggled-->
		<div class="flex flex-row -mx-1 mb-4" >
			<div class="px-1 w-full h-28">
				<button @click="toggleRecording"
					class="mt-2 w-full text-lg font-normal leading-tight rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline"
					:disabled="!$store.getters['teacherCreateAssignment/hasZoomMeeting'] || $store.getters['teacherCreateAssignment/hasZoomRecording']"
				>
					<div class="flex col-span-1 row-span-1 justify-center py-4" :class="{ 'text-red-500': $store.getters['teacherCreateAssignment/hasZoomRecording'] }">
						<icon-base-two class="w-12">
							<circle-icon class="w-12"/>
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

export default {
	name: "NewVideoForm", 
	methods: {
		cancelRecording: function() {
			console.log('cancel recording, reset' );
      this.$store.dispatch('teacherCreateAssignment/endShowingVideoMenu');
      this.$store.commit('teacherCreateAssignment/cancelZoomEditMode');
		}, 
		saveRecording: () => {
			console.log('save recording');
		}, 
		toggleVideoButton: () => {
			console.log('start/stop camera');

		}, 
		toggleMicButton: () => {
			console.log('start/stop mic');
		}, 
		toggleShareScreenButton: () => {
			console.log('start/stop share screen')
		}, 
		toggleRecording: () => {
			console.log('start/stop record canvas');
		}, 
	}, 
	components: {
		IconBaseTwo, 
		MicrophoneIcon, MicrophoneSlashIcon, DisplayIcon, DisplaySlashIcon, VideoIcon, VideoSlashIcon, 
		StopIcon, CircleIcon,
	}
}
</script>