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
			</page-header-three>
		</template>

    <template v-slot:content>
      <div class="flex flex-col bg-red-400 w-full">
				<div class="relative w-full top-1/12">
          <div class="absolute w-full z-20 md:z-40 lg:z-50 mb-32">
						<p>Group Analytics Here</p>
					</div>
				</div>
			</div>
			<p>Group Analytics here</p>
		</template>

	</dashboard-layout>
</template>

<script>
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import PageHeaderThree from "@/components/PageHeaderThree";
import DashboardLayout from "@/views/layout/DashboardLayout";
import IconBaseTwo from "@/components/IconBaseTwo";

export default {
	name: "AnalyticsGroup",
	methods:{
		goBack(){
			// proper for teacher / student
			this.$router.push({ name: 'teacher.assignments.show', params: { assignmentID: this.$route.params.assignmentID }});
		},
	},
	components: {
		ArrowBackIcon, PageHeaderThree, DashboardLayout, IconBaseTwo,
	}
}
</script>
