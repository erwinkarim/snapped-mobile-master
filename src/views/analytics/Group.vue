<template>
  <dashboard-layout>
    <template v-slot:pageHeader>
      <page-header-three background-color="bg-transparent" class="relative">
        <template v-slot:leftAction>
          <div class="w-2/7" @click="goBack()">
            <icon-base-two>
              <arrow-back-icon/>
            </icon-base-two>
          </div>
        </template>
				<template v-slot:mini-title>
					Analytics
				</template>
			</page-header-three>
		</template>

    <template v-slot:content>
      <div class="flex flex-col w-full">
				<div class="relative w-full top-1/12">
					<div v-if="qAnalysis.length != 0">
						<p class="text-left p-2 font-bold">Questions Analysis</p>
						<div class="w-full px-2 mb-4" v-for="qData in qAnalysis">
							<Question :data="{ qData }"/>
						</div>
					</div>
					<p class="text-left p-2 font-bold">Score Distribution</p>
					<div class="w-full" v-if="dataLoaded">
						<p>Data loaded</p>
						<PercentileHistogram :data="{ dist }" />
					</div>
					<div v-else>
						<p>Data not loaded.</p>
					</div>
					<div to="mysoalanAnalyticsPath" v-if="mysoalanQ" class="font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 my-4 mx-2">
						<a :href="mysoalanAnalyticsPath">
							More Info at MySoalan.com
						</a>
					</div>
				</div>
			</div>
		</template>

	</dashboard-layout>
</template>

<script>
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import PageHeaderThree from "@/components/PageHeaderThree";
import DashboardLayout from "@/views/layout/DashboardLayout";
import IconBaseTwo from "@/components/IconBaseTwo";
import Question from "@/components/Analytics/Question.vue";
import PercentileHistogram from "@/components/Analytics/PercentileHistogram.vue";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import MySoalanRepository from "@/repositories/MySoalanRepository";

export default {
	name: "AnalyticsGroup",
	data() {
		return {
			dist: [],
			dataLoaded: false, 
			qAnalysis: [], 
			assignment: null,
			mysoalanQ: false,
			mysoalanAnalyticsPath: '#',
		};
	},
	methods:{
		goBack(){
			// proper for teacher / student
			this.$router.push({ name: 'teacher.assignments.show', params: { assignmentID: this.$route.params.assignmentID }});
		},
	},
	async mounted(){
		console.log()
		// get analytics to populate the distribution chart.
		AssignmentRepository.analytics(this.$route.params.assignmentID).then(e => {
			console.log('msg', e);
			this.dist = e.data.plot;
			this.qAnalysis = e.data.q_analysis;
			this.dataLoaded = true;
		});

		// should also get assignment info. 
		AssignmentRepository.find(this.$route.params.assignmentID).then(e => {
			console.log('assignment', e);
			if(e.data.data.assignment_details.mysoalan != "null"){
				this.mysoalanQ = true;
			}
			this.assignment = e.data.data.assignment_details;
		}).then(async e => {
			console.log('more stuff to load');

			// get assignment url from mysoalan
			if(this.mysoalanQ){
				console.log('building mysoalan url');

				// get token
				let token = '';

				await MySoalanRepository.getAccessToken(this.$store.getters['getAuthEmail'], this.$store.getters['getAuthUserRole']).then((res) => {
					token = res.data.accessToken;
				});

				// build url
				this.mysoalanAnalyticsPath = MySoalanRepository.viewAssignPapers(this.assignment.mysoalan, token, location.host + location.pathname);
			}
		});

	}, 
	async updated(){
		console.log('updated fired');


	},
	components: {
		ArrowBackIcon, PageHeaderThree, DashboardLayout, IconBaseTwo, Question, PercentileHistogram
	}
}
</script>
