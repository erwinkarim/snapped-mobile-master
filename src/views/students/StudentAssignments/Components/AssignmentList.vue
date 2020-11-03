<template>
  <div>
    <div :key="item.assignmentID" v-for="item in assignments"
         class="max-w-sm h-30 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 pt-5 pb-3 mb-3">
      <div class="text-left text-purple-primary text-xs-plus truncate  pr-10">{{ item.title }}</div>

      <div class="text-left text-purple-primary text-px-10 truncate pr-10">{{ item.description }}</div>

      <div class="flex flex-row">

        <div class="flex flex-row w-3/4 text-left text-px-10 text-purple-secondary">
          <div class="w-1/4 truncate"> {{ item.subjectName }}</div>
          <div class="w-1/4  truncate mx-1"> {{ item.classroomName }}</div>
          <div class="w-2/4"> {{ getHumanDate(item.dueDatetime) }}</div>
        </div>

        <div class="w-1/4 bg-purple-secondary rounded-full">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import StudentRepository from "@/repositories/StudentRepository";
import moment from "moment";

export default {
  name: "AssignmentList",
  data() {
    return {
      assignments: []
    }
  },
  methods: {
    getAssignments: function () {

      StudentRepository.getAssignments(1)
          .then(response => {

            const data = response.data.data

            for (let i = 0; i < data.length; i++) {

              let item = data[i];

              let assignmentDetail = {
                assignmentID: item.id,
                subjectName: item.subject_name,
                classroomName: item.class_name,
                title: item.title,
                description: item.written_description,
                dueDatetime: item.due_datetime,
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
    console.log()
    this.getAssignments()
  },
}
</script>

<style scoped>

</style>
