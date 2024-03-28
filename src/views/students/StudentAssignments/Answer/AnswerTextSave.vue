<template>
	<dashboard-layout
			:has-fixed-header="true"
			:has-custom-bottom-bar="true"
	>
		<template v-slot:pageHeader>
			<page-header-three background-color="bg-transparent" class="relative">
				<template v-slot:leftAction>
					<div class="w-2/7" @click="goBack()">
						<icon-base-two>
							<arrow-back-icon/>
						</icon-base-two>
					</div>
				</template>
			</page-header-three>
		</template>

		<template v-slot:content>
			<p>Answer Text Here</p>
			<textarea placeholder="Type your answer here. Markdown supported." 
				class="block py-5 px-5 mt-4 w-full text-lg leading-snug text-left break-words rounded-md h-half-screen bg-gray-secondary form-textarea focus:outline-none focus:shadow-outline text-purple-secondary placeholder-purple-secondary text-m"
				v-model="textAnswer"
			rows="20">
			</textarea>
		</template>

		<template v-slot:bottomBar>
			<div class="flex flex-col w-full">
				<div class="mb-3">
					<a href="#" class="mb-3 flex flex-row justify-center items-center py-3 px-1 w-full h-full text-sm font-bold rounded-full text-purple-primary bg-yellow-primary" @click="saveAnswer()">
						Submit Answer
					</a>
				</div>
			</div>
		</template>
	</dashboard-layout>
</template>


<script>

import DashboardLayout from "@/views/layout/DashboardLayout";
import IconBaseTwo from "@/components/IconBaseTwo";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import PageHeaderThree from "@/components/PageHeaderThree";
// import router from "@/router";

export default {
	name: "AnswerTextSave",
  props: {
    answer: Object,
    assignmentDetails: Object,
	},
	data() {
		return {
			textAnswer: "",
			answer: {
				type: "",
				content: "",
			},
			assignmentDetails: {},
		};
	}, 
	methods: {
		goBack(){
			console.log('goback');
			this.$router.go(-2);
		},
		saveAnswer(){
			// store text answer in repo and go back
			// emit submits to StudentAssignment/Answer/Index.vue
			console.log('sending', this.textAnswer);
			/*
			this.answer.type = 'written';
			this.answer.content = this.textAnswer;
			*/

			this.$emit('writtenAnswer', this.textAnswer);
			this.$emit('submit', this.textAnswer);
		}
	},
	created(){
    // load from store
    this.answer = this.$store.getters['studentAssignment/answer'];
    this.assignmentDetails = this.$store.getters['studentAssignment/assignmentDetails'];

		console.log('should update the answer object', this.answer, this.assignmentDetails);
	},
	components: {
		DashboardLayout, IconBaseTwo, ArrowBackIcon, PageHeaderThree,
	}
}
</script>