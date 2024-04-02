<template>
	<div class="w-full">
		<!--div v-my-swiper="swiperOption"-->
		<swiper :modules="modules" :pagination="{ clickable: true }">
			<swiper-slide v-for="assignment in assignments" >

				<assignment-card
						:key="assignment.assignmentID"
						:assignment="assignment"
						:route="{name: 'teacher.assignments.show', params: { assignmentID: assignment.assignmentID }}"
						:description-lines="2"
						class="mt-4 swiper-slide h-32 min-h-1/6"
				/>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
// import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import TeacherRepository from "@/repositories/TeacherRepository";
import moment from 'moment'
import AssignmentRepository from "@/repositories/AssignmentRepository";
import AssignmentCard from "@/components/AssignmentCard";

export default {
	components: {
		AssignmentCard,
		Swiper, SwiperSlide
	},
  setup(){
    return {
      modules: [Pagination],
    };
  },
	data() {
		return {
			numOfAssignments: 0,
			nowDatetime: '',
			assignments: [],
			swiperOption: {
				initialSlide: 0,
				direction: 'horizontal',
				speed: 200,
				slidesPerView: 1.2,
				spaceBetween: 15,
				freeMode: false,
				loop: false,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				autoplay: false
				// ...
			}
		}
	},
	watch: {
		'numOfAssignments' : 'emitNumOfAssignments'
	},
	methods: {
		getNowDatetime() {
			this.nowDatetime = moment().format()
		},
		emitNumOfAssignments () {
			this.$emit('numOfAssignments', this.numOfAssignments)
		},
		getAssignments: function () {

			AssignmentRepository.active()
					.then(response => {

						const data = response.data.data

						this.numOfAssignments = data.length;

						for (let i = 0; i < data.length; i++) {

							let item = data[i];

							// why the fuck filter the data??
							let assignmentDetail = {
								assignmentID: item.assignment_id,
								subjectName: item.subject_name,
								classroomName: item.classroom_name,
								title: item.title,
								description: item.written_description,
								dueDatetime: item.due_datetime,
								school_name: item.school_name
							}

							this.assignments.push(assignmentDetail);
						}

					})
		},
		getHumanDate(datetime) {
			return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
		}
	},
	mounted() {
		this.getAssignments()
		// this.interval = setInterval(this.datetime, 1000)
	},

	//beforeDestroy() {
	beforeUnmount() {
		clearInterval(this.interval)
	},
}
</script>

<style scoped>

</style>
