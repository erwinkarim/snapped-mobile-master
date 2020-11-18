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
        <!--        <div class="hidden">-->
        <!--          <img id="source" :src="snappedAnswerPath">-->
        <!--        </div>-->
        <div
            class="w-full bg-black-primary h-full object-cover top-0 flex flex-row justify-center items-center absolute">
          <canvas id="canvas" crossOrigin="Anonymous">
          </canvas>
        </div>

      </div>
    </div>


    <!-- BOTTOM BAR -->
    <div v-if="showStickersBar" class="fixed inset-x-0 z-60 bg-white block bottom-0 h-3/5 rounded-t-2xl shadow-xl">
      <button @click="showStickersBar" class="bg-gray-primary h-2 w-1/5 rounded-full mt-3"></button>
      <button @click="loadSticker" class="px-3 py-2 bg-red-100 mt-2">
        Test
      </button>
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
import {fabric} from 'fabric';
import PenIcon from "@/components/icons/PenIcon";
import stickers from "@/components/Stickers/Stickers";
import Login from "@/views/Login";

export default {
  name: "EditSnappedAnswer",
  components: {
    StickerLoader,
    TickedBoxIcon,
    ArrowBackIcon,
    IconBaseTwo,
    NavBack,
    PageHeaderThree,
    DashboardLayout,
    PenIcon
  },
  props: {
    snappedAnswer: String,
  },
  data() {
    return {
      canvasVue: null,
      originalImage: {
        path: decodeURIComponent(this.snappedAnswer),
        dimensions: {
          width: null,
          height: null
        }
      },
      canvasDimensions: {
        height: 0.75 * screen.height,
        width: screen.width
      },
      showStickersBar: false,
    }
  },
  computed: {
    backgroundImageScaleFactor() {
      return this.canvasDimensions.width / this.originalImage.dimensions.width;
    }
  },
  methods: {
    loadCanvas() {

      // FabricJS docs: http://fabricjs.com/docs/

      /* TODO:
          - Move this component back into the Show page to allow persistence of stickers on canvas
          - Add status isMarking to limit usage of Stickers
          - Create multiple canvases on page http://jsfiddle.net/illumine/PSkmD/
          -
      */

      this.canvasVue = new fabric.Canvas('canvas', {
        width: this.canvasDimensions.width,
        height: this.canvasDimensions.height,
      })
    },
    loadImage() {
      fabric.Image.fromURL(this.originalImage.path, (img, error) => {
        this.originalImage.dimensions.width = img.width;
        this.originalImage.dimensions.height = img.height;

        this.canvasVue.setBackgroundImage(
            this.originalImage.path,
            this.canvasVue.renderAll.bind(this.canvasVue),
            {
              top: this.canvasDimensions.height / 2,
              left: this.canvasDimensions.width / 2,
              originX: 'center',
              originY: 'center',
              scaleX: this.backgroundImageScaleFactor,
              scaleY: this.backgroundImageScaleFactor
            }
        );
      });
    },
    toggleStickersBar() {
      this.showStickersBar = !this.showStickersBar;
    },
    loadSticker(stickerName) {

      console.log(`Jom load ${stickerName}`)
      this.showMarkersBar = false;

      fabric.loadSVGFromString(stickers[stickerName], (objects, options) => {

        let obj = fabric.util.groupSVGElements(objects, options);
        obj.scaleToHeight(this.canvasVue.height / 12)
            .set({left: this.canvasVue.width / 2, top: this.canvasVue.height / 2})
            .setCoords();

        this.canvasVue.add(obj).renderAll();
      });
    }
  },
  mounted() {
    this.loadCanvas()
    this.loadImage()
  }
}
</script>

<style scoped>

</style>
