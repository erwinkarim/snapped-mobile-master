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
			<div class="pt-10">
				<p>Info about the answer object.</p>
				<p>{{  mark }}</p>
			</div>
			<p class="text-left p-2">
				Status: Mark/Unmakred/Request to resubmit.
			</p>
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


export default {
	name: "MarkOptions",
	data(){ 
		return {
			mark: null,
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
			});
		},
	},
	components: {
		ArrowBackIcon, PageHeaderThree, DashboardLayout, IconBaseTwo,
	}
}
</script>