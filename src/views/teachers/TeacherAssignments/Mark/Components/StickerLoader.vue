<template>
  <div>

    <div v-for="chunk in stickers" class="flex flex-row items-center justify-center w-full px-5">
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
  data() {
    return {
      stickerCollection: [
        'tick-sticker',
        'confused-person-sticker',
        'top-sticker',
        'lets-go-sticker',
        'false-sticker',
        'question-mark-sticker'
      ],
    }
  },
  computed: {
    // TODO: Load all stickers, then add onClick
    stickers: function () {

      let result = [];
      let size = 3;

      for (let i = 0; i < this.stickerCollection.length; i += 3) {
        let chunk = this.stickerCollection.slice(i, i + size)
        result.push(chunk)
      }

      return result
    }
  },
  methods: {
    selectSticker(stickerName) {
      this.$emit('selected-sticker', stickerName)
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
