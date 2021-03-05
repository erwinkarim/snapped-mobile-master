<template>
  <dashboard-layout :has-custom-bottom-bar="true">

    <!--  HEADER -->
    <template v-slot:pageHeader>
      <page-header-three class="px-2" :has-scroll-animation="true">
        <template v-slot:leftAction>
          <nav-back class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Export Assignment
        </template>
        <template v-slot:title>
          Export Assignment
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>

      <!--  MODAL: SUCCESS   -->
<!--      <div v-if="isShowingSuccessModal" @click.self=""-->
<!--           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">-->
<!--        <modal :redirect-route="{name: 'teacher.assignments.show'}"-->
<!--               modal-type="success"-->
<!--               class="w-4/5 "-->
<!--        >-->
<!--          <h3 slot="title" class="text-purple-primary font-bold text-4xl">Published!</h3>-->
<!--          <p slot="message">-->
<!--            Assignment exported!-->
<!--          </p>-->
<!--          <template slot="button">-->
<!--            <button class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider">-->
<!--              Okay-->
<!--            </button>-->
<!--          </template>-->
<!--        </modal>-->
<!--      </div>-->

<!--      &lt;!&ndash;  MODAL: DELETE   &ndash;&gt;-->
<!--      <div v-if="isShowingDeleteModal" @click.self="toggleDeleteModal"-->
<!--           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">-->
<!--        <modal-->
<!--            modal-type="no-icon"-->
<!--            class="w-4/5 "-->
<!--        >-->
<!--          <h3 slot="title" class="text-purple-primary font-bold text-4xl">Delete this assignment</h3>-->
<!--          <p slot="message">-->
<!--            Are you sure?-->
<!--          </p>-->
<!--          <template slot="button">-->
<!--            <div @click="deleteAssignment">-->
<!--              DELETE THIS-->
<!--            </div>-->
<!--          </template>-->
<!--        </modal>-->
<!--      </div>-->

<!--      &lt;!&ndash;  MODAL: SELECT DUE DATE &ndash;&gt;-->
<!--      <div v-if="isSelectingDueDate" @click.self="closeSetDueDateModal"-->
<!--           class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 ">-->
<!--        <modal class="fixed mx-1/24" v-if="isSelectingDueDate" modal-type="no-icon">-->

<!--          <template v-slot:title>-->
<!--            <div class="font-bold">-->
<!--              Set Due Date & Time-->
<!--            </div>-->
<!--          </template>-->

<!--          <template v-slot:message>-->
<!--            <div class="w-full grid grid-cols-1 divide-y divide-transparent">-->
<!--              <v-date-picker class="place-self-center" :min-date="new Date()" v-model="due_datetime" mode="dateTime"/>-->
<!--            </div>-->
<!--          </template>-->

<!--          <template v-slot:button>-->
<!--            <button @click="closeSetDueDateModal"-->
<!--                    class="font-bold w-full rounded-full px-2 font-bold leading-relaxed tracking-wider"-->
<!--            >-->
<!--              Okay-->
<!--            </button>-->
<!--          </template>-->
<!--        </modal>-->
<!--      </div>-->

      <!-- INPUTS     -->
      <div class="w-full px-7 mt-3 pb-3">

        <multiselect v-model="selectedFolder"
                     :options="folders"
                     :show-labels="false"
                     track-by="id"
                     label="title"
                     :placeholder="!isLoading ? 'Google Classroom Folder' : 'Loading...'"
                     class="mt-2 w-full text-lg font-normal leading-tight text-left rounded-md border border-none appearance-none bg-gray-secondary text-purple-secondary focus:outline-none focus:shadow-outline placeholder-purple-secondary"
        >

          <!--            <option disabled value="">Class</option>-->
          <!--            <option v-for="classroom in classrooms" :value="classroom.id">{{ classroom.name }}</option>-->
        </multiselect>
      </div>

    </template>

    <template v-slot:bottomBar>
<!--      <button @click="toggleDeleteModal"-->
<!--              class="w-full font-bold rounded-full text-white text-sm bg-red-primary border-2 border-red-primary py-3 px-1 flex flex-row justify-center mr-2">-->
<!--        Delete-->
<!--      </button>-->
      <button @click="submit"
              class="w-full font-bold focus:outline-none rounded-full text-purple-primary text-sm bg-white border-2 border-purple-primary py-3 px-1 flex flex-row justify-center">
        Export
      </button>
    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";

export default {
  name: "Index",
  data() {
    return {

      // states
      isLoading: true,

      selectedFolder: null,
        folders: []
    }
  },
  methods: {
    fetchFolders() {
      this.$store.dispatch('googleClassroom/fetchFolders').then(response => {
        if (response.data.success) {
          // console.log(response.data.data.folders)
          this.isLoading = false;
          this.folders = response.data.data.folders;
        }
      })
    },
    submit() {
      if (this.selectedFolder) {

        let payload = {
          folderID: this.selectedFolder.id,
          assignmentID: this.$attrs.assignmentID
        }

        this.$store.dispatch('googleClassroom/export', payload).then(response => {
          console.log('done export')
          console.log(response.data)
        })
      } else {
        console.log('no folder selected!')
      }

    }
  },
  created() {
    this.fetchFolders()
  },
  components: {NavBack, PageHeaderThree, DashboardLayout}
}
</script>

<style scoped>

</style>
