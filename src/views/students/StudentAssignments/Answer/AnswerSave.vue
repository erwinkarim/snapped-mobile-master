<template>

  <assignment-dashboard-layout class="relative">

    <template v-slot:content>
      <!-- -->
      <page-title-two>
        <template v-slot:leftAction>
          <nav-back class="w-full" stroke-color="red-primary" type="cancel" to="student.assignments.show"/>
        </template>
        <template v-slot:title>
          Answer
        </template>
      </page-title-two>

      <div class="relative pt-40 px-6 h-full text-left text-purple-primary">

        <!-- SUBMISSION DETAIL -->
        <div>
          <div>
            Your answer will be submitted to
          </div>
          <div class="font-bold mt-1">
            Mengenali Tokoh Sejarah
          </div>
        </div>

        <div class="mt-10">
          <div>
            Your Written/Snapped Answer
          </div>
          <router-link :to="{name:'student.assignments.answer.write'}" class="flex flex-row justify-between bg-gray-secondary text-blue-secondary mt-5 px-5 py-5 rounded-lg">
            <div>
              Edit Answer
            </div>
            <div class="w-1/12">
              <icon-base-two class="w-6/7">
                <trash-icon/>
              </icon-base-two>
            </div>
          </router-link>
        </div>

        <div class="mt-6">
          <div>
            Your remarks
          </div>
          <div class="mt-4 h-36 ">
            <textarea v-model="remarks" class="resize-y text-purple-primary py-4 px-5 h-full w-full bg-gray-secondary rounded focus:outline-none placeholder-purple-secondary" placeholder="Remarks"></textarea>
          </div>
        </div>

      </div>
    </template>



    <template v-slot:bottomBar>
      <div class="w-full px-2">
        <button @click="showModal = true" class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-4 px-1 flex flex-row justify-center">
            Submit Answer
        </button>
      </div>
    </template>
  </assignment-dashboard-layout>

</template>

<script>
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import TrashIcon from "@/components/icons/TrashIcon";
import AssignmentDashboardLayout from "@/views/layout/AssignmentDashboardLayout";
import Modal from "@/components/Modal";

export default {
  name: "AnswerSave",
  props: {
    answer: String
  },
  data() {
    return {
      remarks: '',
      showModal: false
    }
  },
  components: {Modal, AssignmentDashboardLayout, TrashIcon, IconBaseTwo, NavBack, PageTitleTwo}
}
</script>

<style scoped>

</style>
