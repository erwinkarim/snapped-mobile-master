<template>

  <!-- BOTTOM BAR -->

  <div v-if="show" :class="bottomBarClass" class="md:hidden block fixed inset-x-0 bottom-0 shadow pt-4 pb-6 px-5">

    <div class="w-full">

      <div v-if="isMarkedAssignment" class="w-full flex flex-row">
        <div
            class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
          Marked
        </div>
      </div>

      <div v-else-if="states.isMarking" class="z-70">

        <div v-if="states.isSelectingSticker"
             class="fixed inset-x-0 z-70 bg-white block bottom-0 h-3/5 rounded-t-2xl shadow-xl">
          <button @click="toggleStickerBar" class="bg-gray-primary h-2 w-1/5 rounded-full mt-3"></button>
          <sticker-loader v-on:selected-sticker="handleSelectedSticker" class="mt-5"/>
        </div>
        <div v-else class="flex flex-row h-full items-center justify-around">
          <div class="w-full flex flex-row">
            <div class="w-1/3 px-1">
              <button @click="toggleStickerBar"
                      class="w-full font-bold rounded-full text-white text-sm bg-transparent border-1 border-white py-3 px-1 flex flex-row justify-center">
                <div class="w-5/7">
                  Markers
                </div>
                <icon-base-two class="w-1/7">
                  <ticked-box-icon/>
                </icon-base-two>
              </button>
            </div>
            <div class="w-1/3 px-1">
              <button @click="loadTextBar"
                  class="w-full font-bold rounded-full text-white text-sm bg-transparent border-1 border-white py-3 px-1 flex flex-row justify-center">
                <div class="w-5/7">
                  Text
                </div>
              </button>
            </div>
            <div class="w-1/3 px-1">
              <button @click="saveEditedSnappedAnswer"
                      class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
                <div class="w-5/7">
                  Done
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="w-full flex flex-row items-center">
        <router-link :to="{name: 'teacher.assignments.marking.feedback'}" class="w-1/8 mr-2">
          <icon-base-two class="w-7/8">
            <dialog-bubble-icon/>
          </icon-base-two>
        </router-link>
        <div class="w-3/8 px-2">
          <router-link :to="{name: 'teacher.assignments.marking.add_mark'}" v-if="states.isPreviewing"
                       class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary">
            Add Mark
          </router-link>
          <button v-else @click="togglePreviewMode"
                  class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary">
            Marking
          </button>
        </div>
        <div class="w-4/8 px-2">
          <button @click="setAsMarked" class="w-full font-bold bg-yellow-primary rounded-full text-purple-primary text-sm py-3 px-1 flex flex-row justify-center">
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

export default {
  name: "BottomBar",
  props: {
    states: Object,
    isMarkedAssignment: Boolean
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    bottomBarClass() {
      if (this.states.isMarking) {
        return 'bg-black-primary z-70'
      } else {
        return 'bg-white z-60 '
      }
    }
  },
  methods: {
    togglePreviewMode() {
      this.$emit('togglePreviewMode')
    },
    toggleMarkingMode() {
      this.$emit('toggleMarkingMode')
      router.push({ name: 'teacher.assignments.marking.details'})
    },
    toggleStickerBar() {
      this.$emit('toggleStickerBar')
    },
    loadTextBar(){
      this.$emit('loadTextBar')
    },
    handleSelectedSticker(stickerName) {
      this.$emit('loadSticker', stickerName)
    },
    handleRouteChange() {
      let path = this.$route.path;
      this.show = !(path.includes('/add-mark') || path.includes('/feedback'));
    },
    saveEditedSnappedAnswer(){
      this.$emit('saveEditedSnappedAnswer')

      // this.toggleMarkingMode();
    },
    setAsMarked() {
      this.$emit('submit')
    }
  },
  watch: {
    '$route': 'handleRouteChange'
  },
  components: {DialogBubbleIcon, TickedBoxIcon, IconBaseTwo, StickerLoader}
}
</script>

<style scoped>

</style>
