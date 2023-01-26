<template>
  <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
    <div class="flex flex-col items-center h-full text-left text-purple-primary">
      <div class="flex w-full border-b-2 border-grey-500 text-2xl">{{ finalName }} - {{ people.id }}</div>
      <div class="flex px-2 w-full">
        {{  finalDesc }}
      </div>
    </div>
  </div>
</template>

<script>

import StudentRepository from '@/repositories/StudentRepository';

export default {
  data() {
    // format the data based on model name and model id.
    return {
      finalModel: {},
      finalName: "finalName",
      finalDesc: "",
    }
  },
  beforeUpdate(){
    if(this.modelName === "Student"){
      this.finalName = this.people.first_name + " " + this.people.last_name;
      // load extra data once
      if(this.finalModel.studentDetail === undefined){
        StudentRepository.getStudentDetails().then((res) => {
          console.log('loaded extra data')
          this.$set(this.finalModel, "studentDetail", res.data.data[0]);
          this.finalDesc = "Student of " + this.finalModel.studentDetail.school.name;
        });
      }
    } else if(this.modelName === "Mark"){
      this.finalName = "Assignment " + this.people.assignment_id;
      this.finalDesc = `Marks from assignment ${this.people.assignment_id}`;
    }

  },
  props: {
    headerCaption: "" ,
    modelName: "",
    modelId: 0,
    people: {},
  },
  mounted() {
  },
  name: 'EdCoinTrxPeoplePill',
};
</script>