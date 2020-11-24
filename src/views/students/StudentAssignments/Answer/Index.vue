<template>
  <div>


    <!-- OVERLAYS -->
    <div v-if="isShowingModal" @click="toggleModal"
         class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 bg-gray-primary bg-opacity-75 ">
    </div>


    <!-- MODAL -->
    <div v-if="isShowingModal"
         class="fixed left-0 w-full items-center flex flex-col items-center justify-center top-1/4 z-70">
      <modal class="w-4/5 "
             :modal-type="submissionStatus"
             :redirect-route="{name: 'student.assignments.show'}"
             @toggleModal="toggleModal"
      >
        <template slot="message">
          <div v-if="submissionStatus === 'success'" class="w-full">
            Got something to change? Don't worry! You can always edit your published homework
          </div>
        </template>
        <template slot="button">
          Okay
        </template>
      </modal>
    </div>

    <router-view
        @writtenAnswer="handleWrittenAnswer"
        @submitWrittenAnswer="handleSubmitWrittenAnswer"
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
    assignmentID: [String, Number],
    assignmentTitle: {
      type: String,
      default: null
    }
  },
  data() {
    return {

      // States
      isShowingModal: false,
      submissionStatus: null,

      answer: {
        type: null,
        content: ''
      }
    }
  },
  computed: {
    assignmentDetails () {
      return {
        id: this.assignmentID,
        title: this.assignmentTitle
      }
    }
  },
  methods: {
    handleWrittenAnswer(value) {
      this.answer.type = 'written';
      this.answer.content = value;
    },
    handleSubmitWrittenAnswer(remarks) {

      if (this.answer.type === 'written') {

        SubmissionRepository.store(
            {
              assignmentID: this.assignmentID,
              answerType : this.answer.type,
              answerContent: this.answer.content,
              remarks: remarks,
            })
            .then(response => {
              let content = response.data;

              let type = content.messageType;

              if (type === 'success') {
                this.submissionStatus = type;
                this.toggleModal();
              }
            })

      }
    },

    toggleModal () {
      this.isShowingModal = !this.isShowingModal;
    }
  },
  mounted() {
    console.log(`Title: ${this.assignmentTitle}`)
  }
}
</script>

<style scoped>

</style>
