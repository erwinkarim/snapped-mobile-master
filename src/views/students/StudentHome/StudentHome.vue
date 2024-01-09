<template>
	<dashboard-layout class="pt-5">
		<template v-slot:content>
			<div class="flex flex-col px-5 w-full md:px-10">
				<div class="w-2/7">
					<icon-base-two>
						<AppLogo/>
					</icon-base-two>
				</div>
				<user-profile />
			</div>

			<div class="px-5 w-full md:px-10">

				<!-- SECTION: EDCOINS -->
				<div class="mt-2 mb-3">
					<div class="mb-3 text-left w-full">
						<section-title class="mb-5" title="EdCoins"/>
					</div>
					<EdCoinSummaryPillVue />
				</div>

				<!-- SECTION: CURRENT SCHOOL -->
				<div class="mt-2 mb-3">
						<section-title class="mb-5 text-left" title="Current School"/>
						<CurrentSchoolPillVue />
				</div>

				<!-- SECTION: ASSIGNMENT SUMMARY -->
				<div class="mt-2 mb-3">
						<section-title class="mb-5 text-left" title="Assignments"/>

					<div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
						<div class="flex flex-row items-center h-full text-left text-purple-primary">
							<div class="flex flex-col px-2 w-1/3">
								<div class="py-2 font-bold border-b-1">{{ numOfNewAssignments }}</div>
								<div class="py-2 mb-1 text-xs-plus">
									New
								</div>
							</div>
							<div class="flex flex-col px-2 w-1/3 border-l-1 border-r-1">
								<div class="py-2 font-bold border-b-1">{{ numOfDueSoonAssignments }}</div>
								<div class="py-2 mb-1 text-xs-plus">Due Soon</div>
							</div>
							<div class="flex flex-col px-2 w-1/3">
								<div class="py-2 font-bold border-b-1">{{ numOfOverdueAssignments }}</div>
								<div class="py-2 mb-1 text-xs-plus">Overdue</div>
							</div>
						</div>
					</div>

				</div>

				<!-- SECTION: ACTIVE ASSIGNMENTS -->
				<div class="mt-5">
					<div class="mb-3 text-left w-full">
						<section-title class="mb-5" title="Active Assignments"/>
					</div>
					<assignment-card
							v-for="assignment in assignments"
							:key="assignment.assignmentID"
							:route="{name: 'student.assignments.show', params: { assignmentID: assignment.assignmentID }}"
							:assignment="assignment"
					>
						<template v-slot:topRightAction v-if="!assignment.marks">
							<div v-if="assignment.hasSubmitted" class="pr-1 md:pr-3" >
								DONE
							</div>
						</template>
					</assignment-card>
				</div>

			</div>
		</template>

	</dashboard-layout>
</template>

<script>
import IconBase from "@/components/IconBase";
import AppLogo from "@/components/icons/AppLogo";
import UserProfile from "@/components/UserProfile";
import SectionTitle from "@/components/SectionTitle";
import ActiveAssignment from "@/views/students/StudentHome/Components/ActiveAssignment";
import DashboardLayout from "@/views/layout/DashboardLayout";
import AssignmentCard from "@/components/AssignmentCard";
import StudentRepository from "@/repositories/StudentRepository";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import IconBaseTwo from "@/components/IconBaseTwo";
import EdCoinSummaryPillVue from "@/components/EdCoinSummaryPill.vue";
import CurrentSchoolPillVue from "../../../components/CurrentSchoolPill.vue";

export default {
	name: "StudentHome",
	data() {
		return {
			assignments: [],
			numOfNewAssignments: 0,
			numOfDueSoonAssignments: 0,
			numOfOverdueAssignments: 0,
			trxResult: [],
			studentInfo: {},
		}
	},
	methods: {
		fetchSummary() {
			StudentRepository.getUnsubmittedAssignmentSummary()
					.then(response => {
						if (response.data.success) {
							let data = response.data.data;

							this.numOfNewAssignments = data.num_of_new_assignments
							this.numOfDueSoonAssignments = data.num_of_due_soon_assignments
							this.numOfOverdueAssignments = data.num_of_overdue_assignments
						}
					})
		},
		getAssignments: function () {

			AssignmentRepository.active()
			.then(response => {

				const data = response.data.data;

				for (let i = 0; i < data.length; i++) {

					let item = data[i];

					// why the Fuck we have do this?
					/*
						the way this is done is retarded
					*/
					let assignmentDetail = {
						assignmentID: item.assignment_id,
						subjectName: item.subject_name,
						classroomName: item.classroom_name,
						title: item.title,
						description: item.written_description,
						dueDatetime: item.due_datetime,
						hasSubmitted: item.has_submitted === "yes",
						school_name: item.school_name,
						answered: item.answered,
						answer_status: item.answer_status,
					}

					this.assignments.push(assignmentDetail);
				}
			})
			
		},
	},
	mounted() {
		this.getAssignments();
		this.fetchSummary();
	},
	components: {
		IconBaseTwo,
		AssignmentCard, DashboardLayout, ActiveAssignment, SectionTitle, UserProfile, AppLogo, IconBase, EdCoinSummaryPillVue, CurrentSchoolPillVue,
	},
}
</script>

<style scoped>

</style>
