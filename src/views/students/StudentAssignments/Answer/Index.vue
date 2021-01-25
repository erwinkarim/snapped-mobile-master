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
             :redirect-route="submissionStatus === 'success' ? {name: 'student.assignments.show'} : {}"
             @toggleModal="toggleModal"
             class="w-4/5 "
      >
        <template slot="message">
          <div v-if="submissionStatus === 'success'" class="w-full">
            Got something to change? Don't worry! You can always edit your published homework
          </div>
          <div v-if="submissionStatus === 'error'" class="w-full">
            Please submit a valid answer!
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
import Modal from "@/components/Modal";

export default {
  name: "Index",
  components: {Modal},
  props: {
    assignmentDetails: Object
  },
  data() {
    return {

      // States
      isShowingModal: false,
      isSubmitting: false,
      submissionStatus: null,

      answer: {
        type: null,
        content: ''
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

      this.isSubmitting = true;
      this.toggleModal();

      SubmissionRepository.store(
          {
            assignmentID: this.assignmentDetails.id,
            answerType: this.answer.type,
            answerContent: this.answer.content,
            remarks: remarks,
          })
          .then(response => {

            this.isSubmitting = false;
            this.toggleModal();

            if (response.data.success) {
              this.submissionStatus = 'success';
              this.toggleModal();
            }
          })


    },
    handleError() {
      this.submissionStatus = 'error';
      this.toggleModal();
    },

    toggleModal() {
      this.isShowingModal = !this.isShowingModal;
    }
  },
}
</script>

<style scoped>

</style>
