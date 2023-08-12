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
					<!-- it was decided question info will be download from mysoalan through pdf -->
					<!--p class="text-left p-2 font-bold">Questions Analysis</p>
					<div class="w-full px-2 mb-4" v-for="item in [0,1,2]">
						<Question />
					</div-->
					<p class="text-left p-2 font-bold">Score Distribution</p>
					<div class="w-full">
						<PercentileHistogram />
					</div>
					<div class="font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 my-4 mx-2">
						More Info at MySoalan.com
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

export default {
	name: "AnalyticsGroup",
	methods:{
		goBack(){
			// proper for teacher / student
			this.$router.push({ name: 'teacher.assignments.show', params: { assignmentID: this.$route.params.assignmentID }});
		},
	},
	components: {
		ArrowBackIcon, PageHeaderThree, DashboardLayout, IconBaseTwo, Question, PercentileHistogram
	}
}
</script>
