<template>
  <div class="relative top-24 md:top-30 min-h-90vh w-full h-full relative md:max-w-xl bg-black-primary">
    <div :style="canvasContainerStyle"
         class=" relative h-full object-cover top-0 z-50 left-0 w-9/10 mx-auto bg-black-primary"
    >
      <canvas class="absolute" id="canvas" crossOrigin="Anonymous"/>
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
    this.scrollToTop();
    // this.$store.commit('teacherMarking/loadCanvas')
    this.$store.commit('teacherMarking/loadImage')
  },
  computed: {
    canvasContainerStyle() {
      return {
        height: this.$store.state.teacherMarking.nowMarking.canvas.dimensions.height,
        'padding-bottom': this.$store.state.teacherMarking.nowMarking.canvas.dimensions.height > 0.7 * window.innerHeight ? '90px' : '0px'
      }
    },
    backgroundStyle() {
      return {
        height: window.innerHeight
      }
    }
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
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
