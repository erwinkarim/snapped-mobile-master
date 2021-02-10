<template>

  <!-- BOTTOM BAR -->

  <div v-if="show" :class="bottomBarClass"
       class="md:max-w-xl mx-auto block fixed inset-x-0 bottom-0 shadow md:shadow-none pt-4 pb-6 px-5">

    <div class="w-full md:max-w-xl mx-auto">

      <div v-if="$store.getters['teacherMarking/isMarkedAssignment']" class="w-full flex flex-row">
        <div @click="togglePreviewMode" v-if="$store.state.teacherMarking.states.isMain"
             class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
          View Markings
        </div>
      </div>

      <div v-else-if="$store.state.teacherMarking.states.isMarking" class="z-70">

        <div v-if="$store.state.teacherMarking.states.isSelectingSticker"
             class="fixed inset-x-0 z-70 bg-white block bottom-0 h-3/5 md:h-3/7 rounded-t-2xl shadow-xl"
        >
          <button @click="toggleStickerBar" class="bg-gray-primary h-2 w-1/5 rounded-full mt-3"></button>
          <!-- STICKER LOADER -->
          <sticker-loader class="mt-5"/>
        </div>
        <div v-else-if="hideMarkingOptions">
        </div>
        <div v-else class="flex flex-row w-full h-full items-center justify-between">

            <!-- MARKING ACTIONS -->
            <div class="flex flex-row w-2/3">
              <div @click="toggleStickerBar" class="px-3">
                <font-awesome-icon  class="w-full fa-2x text-white" :icon="icons.checkCircle" />
              </div>
              <div @click="loadTextBox" class="px-3">
                <font-awesome-icon  class="w-full fa-2x text-white" :icon="icons.font" />
              </div>
              <div @click="beginDrawingMode" class="px-3" >
                <font-awesome-icon  class="w-full fa-2x text-white" :icon="icons.marker" />
              </div>
            </div>

            <div class="w-1/3 px-1">
              <button @click="doneEditSnappedAnswer"
                      class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
                <div class="w-5/7">
                  Done
                </div>
              </button>
            </div>

<!--            <div class="w-1/3 px-1"  >-->

<!--              <button @click="toggleStickerBar"-->
<!--                      class="w-full font-bold rounded-full text-white text-sm bg-transparent border-1 border-white py-3 px-1 flex flex-row justify-center">-->
<!--               -->


<!--                                <div class="w-5/7">-->
<!--                                  Markers-->
<!--                                </div>-->
<!--                                <icon-base-two class="w-1/7">-->
<!--                                  <ticked-box-icon/>-->
<!--                                </icon-base-two>-->
<!--              </button>-->
<!--            </div>-->
<!--            <div class="w-1/3 px-1">-->
<!--              <button @click="loadTextBox"-->
<!--                      class="w-full font-bold rounded-full text-white text-sm bg-transparent border-1 border-white py-3 px-1 flex flex-row justify-center">-->
<!--                <div class="w-5/7">-->
<!--                  Text-->
<!--                </div>-->
<!--              </button>-->
<!--            </div>-->

        </div>
      </div>

      <div v-else-if="$store.state.teacherMarking.states.isMain" class="w-full flex flex-row items-center">
        <button @click="togglePreviewMode"
                class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary">
          Begin Marking
        </button>
      </div>

      <div v-else class="w-full flex flex-row items-center">
        <router-link :to="{name: 'teacher.assignments.marking.feedback'}" class="w-1/8 mr-2">
          <icon-base-two class="w-7/8">
            <dialog-bubble-icon/>
          </icon-base-two>
        </router-link>
        <div class="w-3/8 px-2">
          <router-link :to="{name: 'teacher.assignments.marking.add_mark'}"
                       class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary"
          >
            Add Mark
          </router-link>
        </div>
        <div class="w-4/8 px-2">
          <button @click="setAsMarked"
                  class="w-full font-bold bg-yellow-primary rounded-full text-purple-primary text-sm py-3 px-1 flex flex-row justify-center">
            <div class="w-5/7">
              Set as Marked
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StickerLoader from "@/views/teachers/TeacherAssignments/Mark/Components/StickerLoader";
import IconBaseTwo from "@/components/IconBaseTwo";
import TickedBoxIcon from "@/components/icons/TickedBoxIcon";
import DialogBubbleIcon from "@/components/icons/DialogBubbleIcon";
import router from "@/router";

import { library } from '@fortawesome/fontawesome-svg-core'
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons'
import {faFont} from '@fortawesome/free-solid-svg-icons'
import {faMarker} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: "BottomBar",
  data() {
    return {
      show: true,

      icons: {
        checkCircle: faCheckCircle,
        font: faFont,
        marker: faMarker,
        trash: faTrash
      }
    }
  },
  computed: {
    hideMarkingOptions() {
      return this.$store.state.teacherMarking.states.isDrawing || this.$store.state.teacherMarking.states.isMovingObject
    },
    bottomBarClass() {
      if (this.$store.state.teacherMarking.states.isMarking) {
        return 'bg-black-primary z-70'
      } else {
        return 'bg-white z-60 '
      }
    }
  },
  methods: {
    togglePreviewMode() {
      this.$store.commit('teacherMarking/togglePreviewMode');
    },
    toggleStickerBar() {
      this.$store.commit('teacherMarking/toggleStickerBar')
    },
    beginDrawingMode() {
      this.$store.dispatch('teacherMarking/beginDrawingMode')
    },
    loadTextBox() {
      this.$store.dispatch('teacherMarking/loadTextBox')
    },
    doneEditSnappedAnswer() {
      this.$store.dispatch('teacherMarking/doneEditSnappedAnswer')
          .then(() => {
            router.push({name: 'teacher.assignments.marking.details'});
          })
    },

    setAsMarked() {

      this.$store.dispatch('teacherMarking/submit')
          .then((submissionID) => {
            this.$store.dispatch('teacherMarking/fetchData', submissionID)
          })
          .catch(err => {
            console.log('Please add a mark first!')
          })
    },

    handleRouteChange() {
      let path = this.$route.path;
      this.show = !(path.includes('/add-mark') || path.includes('/feedback'));
    },
  },
  watch: {
    '$route': 'handleRouteChange'
  },
  components: {
    DialogBubbleIcon,
    TickedBoxIcon,
    IconBaseTwo,
    StickerLoader,
    faCheckCircle,
    FontAwesomeIcon
  }
}
</script>

<style scoped>

</style>
