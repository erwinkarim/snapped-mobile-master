<template>

  <div class="h-screen bg-black-primary">

    <div v-if="showMarkersBar" @click="toggleMarkersBar"
         class="fixed h-screen z-50 inset-x-0 block top-0 bg-filter-blue bg-opacity-40 ">

    </div>

    <div class="flex flex-row">
      <page-header-three background-color="bg-black-primary" :bottom-padding="4">
        <template v-slot:leftAction>
          <nav-back class="w-2/3" stroke-color="white"/>
        </template>
      </page-header-three>
    </div>

    <div class="flex flex-col w-screen ">
      <div class="relative top-24 pb-16/9">

        <!-- SNAPPED ANSWER -->
        <div class="hidden">
          <img id="source" :src="snappedAnswerPath">
        </div>
        <div
            class="w-full bg-black-primary h-full object-cover top-0 flex flex-row justify-center items-center absolute">
          <canvas id="canvas" crossOrigin="Anonymous">
          </canvas>
        </div>

      </div>
    </div>


    <!-- BOTTOM BAR -->
    <div v-if="showMarkersBar" class="fixed inset-x-0 z-60 bg-white block bottom-0 h-3/5 rounded-t-2xl shadow-xl">
      <button @click="toggleMarkersBar" class="bg-gray-primary h-2 w-1/5 rounded-full mt-3"></button>
      <sticker-loader v-on:selected-sticker="loadSticker" class="mt-5"/>
    </div>
    <div v-else class="md:hidden block fixed inset-x-0  bottom-0 z-10 shadow pt-4 pb-6 px-5">
      <div class="flex flex-row h-full items-center justify-around">
        <div class="w-full flex flex-row">-->
          <div class="w-1/3 px-1">
            <button @click="toggleMarkersBar"
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
            <button
                class="w-full font-bold rounded-full text-white text-sm bg-transparent border-1 border-white py-3 px-1 flex flex-row justify-center">
              <div class="w-5/7">
                Text A
              </div>
            </button>
          </div>
          <div class="w-1/3 px-1">
            <button
                class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
              <div class="w-5/7">
                Done
              </div>
            </button>
          </div>
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

export default {
  name: "EditSnappedAnswer",
  components: {
    StickerLoader,
    TickedBoxIcon,
    ArrowBackIcon,
    IconBaseTwo,
    NavBack,
    PageHeaderThree,
    DashboardLayout
  },
  props: {
    snappedAnswer: String,
  },
  data() {
    return {
      image: null,
      showMarkersBar: false,
    }
  },
  computed: {
    snappedAnswerPath: function () {
      return decodeURIComponent(this.snappedAnswer)
    },


  },
  methods: {
    loadImage() {

      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');

      // Set canvas width and height to match screen's
      canvas.width = screen.width;
      canvas.height = screen.height;

      let src = document.getElementById('source');

      // Get aspect ratio of source image
      let aspectRatio = src.width / src.height;

      canvas.height = ctx.canvas.width / aspectRatio;

      ctx.drawImage(src, 0, 0, src.width, src.height, 0, 0, ctx.canvas.width, ctx.canvas.height)
    },
    toggleMarkersBar() {
      this.showMarkersBar = !this.showMarkersBar;
      console.log(`Marker bar status: ${this.showMarkersBar}`)
    },
    loadSticker(stickerName) {
      console.log(`Jom load ${stickerName}`)
      this.showMarkersBar = false;
    }
  },
  mounted() {
    this.loadImage()
  }
}
</script>

<style scoped>

</style>
