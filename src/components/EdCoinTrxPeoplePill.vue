<template>
  <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
    <div class="flex flex-col items-center h-full text-left text-purple-primary">
      <div class="flex w-full border-b-2 border-grey-500 text-2xl">
        <router-link v-if="modelName == 'Store'" :to="{ name:'stores.show', params: { storeID: modelId}}">
          {{  finalName }}
        </router-link>
        <router-link v-else-if="modelName == 'Mark'" :to="{ name:'student.assignments.show', params: { assignmentID: people.assignment_id }}">
          {{  finalName }}
        </router-link>
        <router-link v-else-if="modelName == 'Student'" :to="{ name:'student.profile.show', params: { studentID: modelId}}">
          {{  finalName }}
        </router-link>
        <span v-else>
          {{  finalName }}
        </span>
      </div>
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
      finalDesc: "finalDesc",
    }
  },
  created(){
    if(this.modelName === "Student"){
      this.finalName = this.people.first_name + " " + this.people.last_name;
      // load extra data once
      if(this.finalModel.studentDetail === undefined){
        StudentRepository.getStudentDetails().then((res) => {
          console.log('loaded extra data')
          // this.$set(this.finalModel, "studentDetail", res.data.data[0]);
          this.finalModel['studentDetail'] = res.data.data[0];
          this.finalDesc = "Student of " + this.finalModel.studentDetail.school.name;
        });
      }
    } else if(this.modelName === "Mark"){
      this.finalName = "Assignment " + this.people.assignment_id;
      this.finalDesc = `Marks from assignment ${this.people.assignment_id}`;
    } else if(this.modelName === "Store"){
      this.finalName = this.people.name;
      this.finalDesc = this.people.desc;
      
      //should get order details
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