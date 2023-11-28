<template>
	<div class="flex flex-row items-center mt-2 mb-2 w-full text-lg font-normal leading-tight border border-none appearance-none text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary">
			<select class="flex w-1/2 p-2 mr-1" name="level" v-model="mysoalan_level_select" @change="updateState('select_mysoalan_level')">
				<option value="" disabled selected>Level</option>
				<option v-for="(level, index) in mysoalan_level" :value="index">
					{{  level }}
				</option>
			</select>
			<select class="flex w-1/2 p-2 ml-1" name="subject" v-model="mysoalan_subject_select" @change="updateState('select_mysoalan_subject')">
				<option value="" disabled selected>Subject</option>
				<option v-for="(subject, index) in mysoalan_subject" :value="index"> 
					{{  subject }}
				</option>
			</select>
	</div>
</template>

<script>
export default {
	name: 'MySoalanSelector',
	props: {
		select_mysoalan_level: String,
		select_mysoalan_subject: String,
	},
	data(){
		return {
      mysoalan_level: {
        year_1: "Darjah 1", year_2: "Darjah 2", year_3: "Darjah 3", year_4: "Darjah 4", year_5: "Darjah 5", year_6: "Darjah 6",
        form_1: "Tingkatan 1", form_2: "Tingkatan 2", form_3: "Tingkatan 3", form_4: "Tingkatan 4", form_5: "Tingkatan 5", 
      },
      mysoalan_subject: {english: "English", sejarah: "Sejarah", mathematics: "Mathematics", geografi: "Geography", 'pendidikan-islam': "Pendidikan Islam", 'bahasa-melayu': "Bahasa Melayu", 'pendidikan-moral': "Pendidikan Moral", 'reka-bentuk-dan-teknologi': "Reka Bentuk Dan Teknologi", 'additional-mathematics': "Additional Mathematics", physics: "Physics", chemistry: "Chemistry", biology: "Biology", science: "Science" },
			mysoalan_level_select: "",
			mysoalan_subject_select: "",
		}
	}, 
	created(){
		if(sessionStorage.getItem('mysoalan_level')){
			this.mysoalan_level_select = sessionStorage.getItem('mysoalan_level');
			this.mysoalan_subject_select = sessionStorage.getItem('mysoalan_subject');
		} else {
			this.mysoalan_level_select = this.select_mysoalan_level;
			this.mysoalan_subject_select = this.select_mysoalan_subject;
		};
		console.log('inside selector', this.mysoalan_subject_select, this.mysoalan_level_select);
	},
	/*
	mounted(){
	},
	*/
	methods: {
		// update state of the parent
		updateState(key){
			let value = '';
			if(key == 'select_mysoalan_level'){
				value = this.mysoalan_level_select;
			} else {
				value = this.mysoalan_subject_select;
			};
			this.$emit('change', {key, value});
		},
	}
}
</script>