<template>
  <div>
    <div v-for="chunk in $store.getters['teacherMarking/markingStickers']" class="flex flex-row items-center justify-center w-full px-5">
      <div @click="selectSticker(sticker)" v-for="sticker in chunk" class="w-1/3 px-4 py-6">
        <icon-base-two  class="w-5/6">
          <component :is="sticker"/>
        </icon-base-two>
      </div>
    </div>
  </div>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import TickSticker from "@/components/Stickers/TickSticker";
import ConfusedPersonSticker from "@/components/Stickers/ConfusedPersonSticker";
import TopSticker from "@/components/Stickers/TopSticker";
import QuestionMarkSticker from "@/components/Stickers/QuestionMarkSticker";
import FalseSticker from "@/components/Stickers/FalseSticker";
import LetsGoSticker from "@/components/Stickers/LetsGoSticker";

export default {
  name: "StickerLoader",
  methods: {
    selectSticker(stickerName) {
      this.$store.dispatch('teacherMarking/loadSticker', stickerName)
    }
  },
  components: {
    IconBaseTwo,
    TickSticker,
    ConfusedPersonSticker,
    TopSticker,
    QuestionMarkSticker,
    LetsGoSticker,
    FalseSticker
  },

}
</script>

<style scoped>

</style>
