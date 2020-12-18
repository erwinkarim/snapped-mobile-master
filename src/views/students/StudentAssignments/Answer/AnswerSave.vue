<template>

  <dashboard-layout :content-fills-screen="isPreviewingSnappedAnswer"
                    :has-custom-bottom-bar="isMainPage"
                    :no-bottom-bar=" isPreviewingSnappedAnswer"
  >

    <template v-slot:pageHeader>
      <page-header-three>

        <template v-slot:leftAction>
          <nav-back v-if="isMainPage"
                    type="cancel"
                    :to="{name: 'student.assignments.show'}"
                    class="w-2/7" stroke-color="red-primary"
          />

          <div @click="toggleSnappedAnswerPreview"
               v-if="isPreviewingSnappedAnswer"
          >
            <icon-base-two class="w-2/7 ml-5">
              <arrow-back-icon/>
            </icon-base-two>
          </div>
        </template>

        <template v-slot:mini-title>
          Answer
        </template>

      </page-header-three>
    </template>

    <template slot="content" v-if="isMainPage">

      <div class="relative pt-40 px-6 h-full text-left text-purple-primary">

        <!-- SUBMISSION DETAIL -->
        <div>
          <div>
            Your answer will be submitted to
          </div>
          <div class="font-bold mt-1">
            {{ assignmentDetails ? assignmentDetails.title : '' }}
          </div>
        </div>

        <!-- VIEW STORED ANSWER -->
        <div v-if="isWrittenAnswer" class="mt-10">
          <div>
            Your Written Answer
          </div>
          <div
              class="flex flex-row justify-between mt-5 px-5 py-5 items-center bg-gray-secondary text-blue-secondary rounded-lg">

            <router-link
                :to="{name:'student.assignments.answer.write' , params: { assignmentDetails : assignmentDetails, isEditingAnswer: true}}">
              <div>
                Edit Answer
              </div>

            </router-link>

            <div class="w-1/12">
              <icon-base-two class="w-6/7">
                <trash-icon/>
              </icon-base-two>
            </div>
          </div>

        </div>

        <!-- VIEW SNAPPED ANSWER -->
        <div class="mt-10" v-if="isSnappedAnswer">
          <div class="mb-4">
            Your Snapped Answer
          </div>
          <div class="flex flex-col">
            <div v-for="(answer,index) in snappedAnswers"
                 class="flex flex-row justify-between mt-3 px-5 py-5 items-center bg-gray-secondary text-blue-secondary rounded-lg">

              <div @click="handleSnappedAnswerPreview(index)">
                View Photo
              </div>

              <div class="w-1/12" @click="removeSnappedAnswer(index)">
                <icon-base-two class="w-6/7">
                  <trash-icon/>
                </icon-base-two>
              </div>
            </div>
          </div>


          <!-- ADD MORE PHOTO -->
          <div class="flex mb-4 -mx-1">
            <label
                class="text-center pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full text-lg font-normal leading-tight focus:outline-none focus:shadow-outline text-red-primary">
              + Add more photo
              <input class="hidden" type="file" accept="image/*" multiple @change="onFileSelected">
            </label>
          </div>
        </div>


        <div class="mt-6">
          <div>
            Your remarks
          </div>
          <div class="mt-4 h-36 ">
            <textarea v-model="remarks"
                      class="resize-y text-purple-primary py-4 px-5 h-full w-full bg-gray-secondary rounded focus:outline-none placeholder-purple-secondary"
                      placeholder="Remarks"></textarea>
          </div>
        </div>

      </div>
    </template>

    <template slot="content" v-if="isPreviewingSnappedAnswer">
      <div class="pb-16/9  h-20 bg-white">
        <div
            class="w-full h-full object-cover top-0 flex flex-row justify-center items-center absolute">
          <img :src="snappedAnswerPreviews[snappedAnswerPreviewIndex]"/>
        </div>
      </div>

    </template>


    <template v-slot:bottomBar>
      <div class="w-full px-2">
        <button @click="submit"
                class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-4 px-1 flex flex-row justify-center">
          Submit Answer
        </button>
      </div>
    </template>
  </dashboard-layout>

</template>

<script>
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import TrashIcon from "@/components/icons/TrashIcon";
import Modal from "@/components/Modal";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import router from "@/router";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";

export default {
  name: "AnswerSave",
  props: {
    answer: Object,
    assignmentDetails: Object,
  },
  data() {
    return {

      // States
      isMainPage: true,
      isPreviewingSnappedAnswer: false,
      isShowingModal: false,
      submissionStatus: null,

      snappedAnswerPreviews: [],
      snappedAnswerPreviewIndex: null,

      remarks: '',

      snappedAnswers: []
    }
  },
  computed: {
    hasAnswerContent() {
      return this.answer.type !== null && this.answer.content !== '';
    },
    isWrittenAnswer() {
      return this.answer.type === 'written';
    },
    isSnappedAnswer() {
      return this.answer.type === 'snapped';
    },
  },
  methods: {

    toggleSnappedAnswerPreview() {
      if (this.isPreviewingSnappedAnswer) {
        this.isMainPage = true;
        this.isPreviewingSnappedAnswer = false;
      } else {
        this.isMainPage = false;
        this.isPreviewingSnappedAnswer = true;
      }
    },

    handleSnappedAnswerPreview(index) {
      this.snappedAnswerPreviewIndex = index;
      this.toggleSnappedAnswerPreview();
    },

    onFileSelected(e) {
      let files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      if (files[0].type.match("image.*")) {
        this.snappedAnswers.push(files[0]);
        this.generateSnappedAnswerPreview(files)
      }
    },

    generateSnappedAnswerPreview(files) {
      files.forEach(f => {

        if (!f.type.match("image.*")) {
          return;
        }

        let reader = new FileReader();
        let that = this;

        reader.onload = function (e) {
          that.snappedAnswerPreviews.push(e.target.result);
        }

        reader.readAsDataURL(f);
      });
    },

    removeSnappedAnswer(index) {
      this.snappedAnswers.splice(index, 1);
      this.snappedAnswerPreviews.splice(index, 1);
    },

    submit() {
      if (this.isSnappedAnswer) {
        if (this.snappedAnswers.length > 0) {
          this.$emit('snappedAnswer', this.snappedAnswers)
          this.$emit('submit', this.remarks)
        } else {
          this.$emit('error')
        }
      }

      if (this.isWrittenAnswer) {
        this.$emit('submit', this.remarks)
      }

    },


  },
  mounted() {
    if (this.isSnappedAnswer) {
      this.snappedAnswers = this.answer.content
      this.generateSnappedAnswerPreview(this.answer.content)
    }
  },
  created() {
    if (!this.hasAnswerContent) {
      router.push({name: 'student.assignments.show'})
    }
  },
  components: {
    ArrowBackIcon,
    PageHeaderThree,
    DashboardLayout, Modal, TrashIcon, IconBaseTwo, NavBack, PageTitleTwo
  }
}
</script>

<style scoped>

</style>
