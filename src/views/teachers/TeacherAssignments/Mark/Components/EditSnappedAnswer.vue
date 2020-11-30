<template>

  <div class="h-screen bg-black-primary">

    <div class="flex flex-row">
      <page-header-three background-color="bg-black-primary" :bottom-padding="4">
        <template v-slot:leftAction>
          <nav-back class="w-2/3" stroke-color="white"/>
        </template>
      </page-header-three>
    </div>

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

export default {
  name: "EditSnappedAnswer",
  props: {
    states: Object,
    nowMarking: String,
    nowLoadingSticker: String
  },
  data() {
    return {
      canvasMain: null,
      canvasContext: null,
      originalImage: {
        path: decodeURIComponent(this.nowMarking),
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
  watch: {
    'states.isSelectingSticker': 'loadSticker',
    'states.isSavingEditedSnappedAnswer': 'saveEditedSnappedAnswer'
  },
  computed: {
    backgroundImageScaleFactor() {
      return this.canvasDimensions.width / this.originalImage.dimensions.width;
    },
  },
  methods: {
    loadCanvas() {
      this.canvasVue = new fabric.Canvas('canvas', {
        width: this.canvasDimensions.width,
        height: this.canvasDimensions.height,
      })
    },
    loadImage() {

      let http = new XMLHttpRequest();
      http.open('HEAD', this.originalImage.path);
      http.onload = function(e) { console.log(e); }
      http.send();

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
            },
            { crossOrigin: 'Anonymous' }
        );
      });
    },
    loadSticker() {

      if (!this.states.isSelectingSticker && (this.nowLoadingSticker !== null && this.nowLoadingSticker !== undefined)) {

        let stickerName = this.nowLoadingSticker;

        fabric.loadSVGFromString(stickers[stickerName], (objects, options) => {

          let obj = fabric.util.groupSVGElements(objects, options);
          obj.scaleToHeight(this.canvasVue.height / 12)
              .set({left: this.canvasVue.width / 2, top: this.canvasVue.height / 2})
              .setCoords();

          this.canvasVue.add(obj).renderAll();
        });
      }
    },
    saveEditedSnappedAnswer() {
      let save = this.canvasVue.toDataURL()
      console.log(save)
    },
    checkNowMarkingPathExists() {
      if (this.nowMarking === null || this.nowMarking === undefined) {
        router.push({name: 'teacher.assignments.marking.details'})
      }
    }
  },
  mounted() {
    this.checkNowMarkingPathExists();
    this.loadCanvas()
    this.loadImage()
  },
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
}
</script>

<style scoped>

</style>
