<template>
	<div>
		<p>New Video Template Here</p>

		<!-- cancel session button-->
		<div class="flex flex-row items-center mt-2 mb-2 w-full text-lg font-normal leading-tight border border-none appearance-none text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
			<div @click="cancelRecording" class="w-1/2 text-center text-blue-secondary mr-2 bg-gray-secondary py-5 rounded-md">
				<button>Cancel</button>
			</div>
			<div @click="saveRecording" class="w-1/2 text-center text-blue-secondary mr-2 bg-gray-secondary py-5 rounded-md">
				<button>Save</button>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: "NewVideoForm", 
	methods: {
		cancelRecording: () => {
			console.log('cancel recording');
		}, 
		saveRecording: () => {
			console.log('save recording');
		}
	}

}
</script>