<template>
  <div>

    <!--  HEADER: MAIN  -->
    <page-header-three v-if="$store.state.teacherMarking.states.isMain"
                       :background-color="headerBackgroundColor"
                       :bottom-padding="8"
    >

      <template v-slot:leftAction>
        <nav-back :to="{name: 'teacher.assignments.show'}"
                  class="w-1/4"
                  :stroke-color="navBackColor"
        />
      </template>

    </page-header-three>

    <page-header-three v-if="$store.state.teacherMarking.states.isPreviewing"
                       :background-color="headerBackgroundColor"
                       :bottom-padding="8"
    >

      <template v-slot:leftAction>
        <div @click="togglePreviewMode">
          <icon-base-two class="w-1/4 ml-6">
            <arrow-back-icon :stroke-color="navBackColor"/>
          </icon-base-two>
        </div>
      </template>

      <template v-slot:title>
        Answer Preview
      </template>
    </page-header-three>

    <!--  HEADER: MARKING  -->
    <page-header-three v-if="isViewingMarkingMainPage"
                       :background-color="headerBackgroundColor"
                       :bottom-padding="8"
    >

      <template v-slot:leftAction>
        <!--        <nav-back class="pl-0 ml-0 w-1/4" stroke-color="white"/>-->
        <div @click="exitMarkingMode">
          <icon-base-two class="w-1/4 ml-6">
            <arrow-back-icon :stroke-color="navBackColor"/>
          </icon-base-two>
        </div>
      </template>

      <template v-slot:rightAction>
                <button @click="undoEdits" class="z-70 text-white tracking-wide text-sm px-2 py-2 focus:outline-none">
                  RESET
                </button>
      </template>
    </page-header-three>

    <page-header-three v-if="$store.state.teacherMarking.states.isDrawing"
                       :background-color="headerBackgroundColor"
                       :bottom-padding="8"
    >

      <template v-slot:leftAction>
        <div class="ml-5 flex flex-row text-left justify-start">
          <button @click="toggleDrawingModeState('drawing')"
                  class="px-3 focus:outline-none "
          >

            <font-awesome-layers class="text-center fa-lg focus:outline-none">
              <font-awesome-icon :icon="icons.circle"
                                 v-if="drawingModeState ==='drawing'"
                                 class="fa-2x text-white"
              />
              <font-awesome-icon :icon="icons.marker"
                                 :class="drawingModeState ==='drawing' ? '' : 'text-white'"
                                 class="fa-2x focus:outline-none"
                                 transform="shrink-9"
              />
            </font-awesome-layers>

          </button>
<!--          <button @click="$store.commit('teacherMarking/toggleDrawingModeStates')"-->
<!--                  class="px-3 ml-1 focus:outline-none"-->
<!--          >-->

<!--            <font-awesome-layers class="text-center fa-lg focus:outline-none">-->
<!--              <font-awesome-icon :icon="icons.circle"-->
<!--                                 v-if="drawingModeState ==='erasing'"-->
<!--                                 class="fa-2x text-white"-->
<!--              />-->
<!--              <font-awesome-icon :icon="icons.eraser"-->
<!--                                 :class="drawingModeState ==='erasing' ? '' : 'text-white'"-->
<!--                                 class="fa-2x focus:outline-none"-->
<!--                                 transform="shrink-9"-->
<!--              />-->
<!--            </font-awesome-layers>-->
<!--          </button>-->
        </div>
      </template>

      <template v-slot:rightAction>
        <button @click="$store.dispatch('teacherMarking/exitDrawingMode')" class="text-white">
          DONE
        </button>
      </template>
    </page-header-three>
  </div>
</template>

<script>
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import UndoIcon from "@/components/icons/UndoIcon";
import router from "@/router";

import {faCircle, faMarker, faEraser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon, FontAwesomeLayers} from '@fortawesome/vue-fontawesome'

export default {
  name: "PageHeader",
  data() {
    return {
      icons: {
        circle: faCircle,
        marker: faMarker,
        eraser: faEraser
      }
    }
  },
  computed: {

    isViewingMarkingMainPage() {
      return this.$store.state.teacherMarking.states.isMarking && !this.$store.state.teacherMarking.states.isDrawing
    },

    headerBackgroundColor: function () {

      let value = 'bg-black-primary';

      if (this.$store.state.teacherMarking.states.isPreviewing || this.$store.state.teacherMarking.states.isWritingFeedback) {
        value = 'bg-white'
      }
      if (this.$store.state.teacherMarking.states.isMarking) {
        value = 'bg-transparent'
      }

      return value;
    },

    drawingModeState() {

      if (this.$store.state.teacherMarking.nowDrawing.drawing && !this.$store.state.teacherMarking.nowDrawing.erasing) {
        return 'drawing';
      }

      if (this.$store.state.teacherMarking.nowDrawing.erasing && !this.$store.state.teacherMarking.nowDrawing.drawing) {
        return 'erasing';
      }
    },


    navBackColor: function () {
      if (this.$store.state.teacherMarking.states.isPreviewing) {
        return 'purple-primary'
      } else {
        return 'white'
      }
    },
  },
  methods: {

    // MODE: PREVIEW
    togglePreviewMode() {
      this.$store.commit('teacherMarking/togglePreviewMode')
    },


    exitMarkingMode() {
      this.$store.commit('teacherMarking/setPreviewingMode')
      router.push({name: 'teacher.assignments.marking.details'})
    },


    toggleDrawingModeState(action) {
      if (action === 'drawing' && !this.$store.state.teacherMarking.nowDrawing.drawing) {
        this.$store.commit('teacherMarking/toggleDrawingModeStates')
      }

      if (action === 'erasing' && !this.$store.state.teacherMarking.nowDrawing.erasing) {

      }
    },

    undoEdits() {
      this.$store.dispatch('teacherMarking/undoEditedSnappedAnswer')
    }
  },
  components: {UndoIcon, ArrowBackIcon, IconBaseTwo, NavBack, PageHeaderThree, FontAwesomeIcon, FontAwesomeLayers}
}
</script>

<style scoped>

</style>
