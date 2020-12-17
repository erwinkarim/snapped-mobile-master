<template>

  <div class="h-screen bg-black-primary">

    <page-header-three background-color="bg-black-primary" :bottom-padding="4">
      <template v-slot:leftAction>
        <nav-back class="w-1/4 pl-0 ml-0" stroke-color="white"/>
      </template>
      <template v-slot:rightAction>
        <button @click="undoEdits" class="flex flex-row justify-end mr-5">
          <icon-base-two class="w-1/4">
            <undo-icon/>
          </icon-base-two>
        </button>
      </template>
    </page-header-three>

    <div class="flex flex-col w-screen ">
      <div class="relative top-24 pb-16/9">
        <div
            class="w-full bg-black-primary h-full object-cover top-0 flex flex-row justify-center items-center absolute">
          <canvas id="canvas" crossOrigin="Anonymous"/>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import TickedBoxIcon from "@/components/icons/TickedBoxIcon";
import StickerLoader from "@/views/teachers/TeacherAssignments/Mark/Components/StickerLoader";
import {fabric} from 'fabric';
import PenIcon from "@/components/icons/PenIcon";
import stickers from "@/components/Stickers/Stickers";
import Login from "@/views/Login";
import router from "@/router";
import UndoIcon from "@/components/icons/UndoIcon";

export default {
  name: "EditSnappedAnswer",
  mounted() {
    this.$store.dispatch('teacherMarking/checkNowMarkingPathExists').catch(() => {
      router.push({name: 'teacher.assignments.marking.details'})
    })
    this.$store.commit('teacherMarking/loadCanvas')
    this.$store.commit('teacherMarking/loadImage')
  },
  methods: {
    undoEdits() {
      this.$store.dispatch('teacherMarking/undoEditedSnappedAnswer')
    }
  },
  components: {
    UndoIcon,
    StickerLoader,
    TickedBoxIcon,
    ArrowBackIcon,
    IconBaseTwo,
    NavBack,
    PageHeaderThree,
    DashboardLayout,
    PenIcon
  },
}
</script>

<style scoped>

</style>
