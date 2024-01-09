<template>
	<dashboard-layout noBottomBar>
    <template v-slot:pageHeader>
      <page-header-three background-color="bg-transparent" class="relative">
        <template v-slot:leftAction>
          <div class="w-2/7" @click="$router.go(-1)">
            <icon-base-two>
              <arrow-back-icon/>
            </icon-base-two>
          </div>
        </template>
				<template v-slot:mini-title>
					Marking Options
				</template>
			</page-header-three>
		</template>

		<template v-slot:content>

			<!---------------------
				OVERLAYS FOR MODAL
			--------------------->
			<div v-if="modalOn" @click="toggleModalMode()" class="fixed w-full bg-black-primary bg-opacity-25 h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 ">
			</div>
			<div v-if="modalOn" class="fixed left-0 w-full items-center flex flex-col items-center justify-center top-1/4 z-70">
				<modal @toggleModal="toggleModalMode()" class="w-4/5">
					<template slot="message">
						Asked student to resubmit answer ...
					</template>
					<template slot="button">
						Okay
					</template>
				</modal>
			</div>

			<!--
				ACTUAL PAGE
			-->
			<div v-if="mark != null" class="pt-10 text-left">
				<p>Info about the answer object.</p>
				<!-- style this later-->
				<dl class="">
					<dt>Assignment name:</dt>
					<dd>{{ mark.assignment_title }}</dd>
					<dt>Student name:</dt>
					<dd> {{ mark.student_name }}</dd>
					<dt>Snap answers:</dt>
					<dd> {{  mark.snap_answer != null }}</dd>
					<dt>Text Answer:</dt>
					<dd>{{  mark.written_answer != null }}</dd>
					<dt>Status:</dt>
					<dd>{{  mark.status }}</dd>
				</dl>
			</div>
			<div class="">
				<p class="w-full text-left p-2">Actions: </p>
				<button
					class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary"
					@click="requestToResubmit"
				>
				Ask Student To Resubmit Answer</button>
			</div>
		</template>
	</dashboard-layout>
</template>

<script>
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import PageHeaderThree from "@/components/PageHeaderThree";
import DashboardLayout from "@/views/layout/DashboardLayout";
import IconBaseTwo from "@/components/IconBaseTwo";
import SubmissionRepository from "@/repositories/SubmissionRepository";
import Modal from "@/components/Modal";


export default {
	name: "MarkOptions",
	data(){ 
		return {
			mark: null,
			modalOn: false,
		};
	},
	mounted(){
		SubmissionRepository.find(this.$attrs.submissionID).then((e) => {
			console.log('data found', e);
			this.mark = e.data.data;
		});

	}, 
	methods: {
		requestToResubmit(){
			console.log('request to resubmit clicked');
			SubmissionRepository.requestToResubmit(this.$attrs.submissionID).then((e) => {
				console.log('request ok');
				this.toggleModalMode();
			});
		},
		toggleModalMode(){
			console.log('toggle modal mode');
			this.modalOn = !this.modalOn;
		},
	},
	components: {
		ArrowBackIcon, PageHeaderThree, DashboardLayout, IconBaseTwo, Modal
	}
}
</script>