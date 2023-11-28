<template>
  <div>

    <!-- OVERLAYS -->
    <div v-if="isShowingModal" @click="toggleModal"
         class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 bg-gray-primary bg-opacity-75 ">
    </div>


    <!-- MODAL -->
    <div v-if="isShowingModal"
         class="fixed left-0 w-full items-center flex flex-col items-center justify-center top-1/4 z-70"
    >
      <modal v-if="submissionStatus === 'success'"
             :modal-type="submissionStatus"
             :redirect-route="{name: 'student.assignments.show', query: { assignmentSend: assignmentSendValue }}"
             @toggleModal="toggleModal"
             class="w-4/5 "
      >
        <template slot="message">
          <div class="w-full">
            Got something to change? Don't worry! You can always edit your published homework
          </div>
        </template>
        <template slot="button">
          Okay
        </template>
      </modal>
      <modal v-if="submissionStatus === 'error'"
             :modal-type="submissionStatus"
             @toggleModal="toggleModal"
             class="w-4/5 "
      >
        <template slot="message">
          <div class="w-full">
            {{ error }}
          </div>
        </template>
        <template slot="button">
          Okay
        </template>
      </modal>
      <modal v-if="isSubmitting"
             modal-type="no-icon"
             :has-button="false"
             class="w-4/5 "
      >
        <p slot="message">
          Submitting your answer.
          <br>
          Please wait...
        </p>
      </modal>
    </div>

    <router-view
        @writtenAnswer="handleWrittenAnswer"
        @snappedAnswer="handleSnappedAnswer"
        @error="handleError"
        @submit="handleSubmit"
        :assignment-details="assignmentDetails"
        :answer="answer"
    />
  </div>


</template>

<script>
import SubmissionRepository from "@/repositories/SubmissionRepository";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import Modal from "@/components/Modal";

export default {
  name: "Index",
  components: {Modal},
  props: {
    assignmentDetails: Object
  },
  async mounted() {
    // this just redirected from MySoalan
    if(this.$route.query['correct_questions']){
      // fetch and re-load assignment details
      let data = await AssignmentRepository.find(this.$route.params.assignmentID).then((res) => {
        return res.data.data;
      });

      this.assignmentDetails = {
        id: this.$route.params.assignmentID,
        title: data.assignment_details.title,
        auto_marking: data.assignment_details.auto_marking,
      };
    }
  },
  data() {
    return {

      // States
      isShowingModal: false,
      isSubmitting: false,
      submissionStatus: null,
      assignmentSendValue:0,

      error: null,

      answer: {
        type: null,
        content: '', 
        mysoalan_all: 0, 
        mysoalan_correct: 0, 
        mysoalan_result_uuid: '',
        mysoalan_result: {},
      }
    }
  },
  methods: {
    handleWrittenAnswer(value) {
      this.answer.type = 'written';
      this.answer.content = value;
    },
    handleSnappedAnswer(value) {
      this.answer.type = 'snapped';
      this.answer.content = value;
    },
    handleSubmit(remarks) {

      this.resetError();

      this.isSubmitting = true;
      this.toggleModal();

      SubmissionRepository.store(
          {
            assignmentID: this.assignmentDetails.id,
            answerType: this.answer.type,
            answerContent: this.answer.content,
            remarks: remarks,
            mysoalan_all: this.answer.mysoalan_all,
            mysoalan_correct: this.answer.mysoalan_correct,
            mysoalan_result: this.answer.mysoalan_result, 
            mysoalan_result_uuid: this.answer.mysoalan_result_uuid, 
          })
          .then(response => {

            this.isSubmitting = false;
            this.toggleModal();

            if (response.data.success) {
              if(this.assignmentDetails.auto_marking){
                // console.log('assignmentSendValue set to true');
                this.assignmentSendValue = 1;
              };
              this.submissionStatus = 'success';
              this.toggleModal();
            }
          })
          .catch(error => {
            this.isSubmitting = false;
            this.toggleModal();

            this.handleError({
              status: true,
              message: error
            })
          })


    },
    handleError(error) {
      this.submissionStatus = 'error';
      this.error = error.message;
      this.toggleModal();
    },

    resetError() {
      this.submissionStatus = null;
      this.error = null;
    },

    toggleModal() {
      this.isShowingModal = !this.isShowingModal;
    }
  },
}
</script>

<style scoped>

</style>
