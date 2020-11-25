<template>
  <div class="px-7 bg-white py-8 rounded-xl text-sm text-left">

    <div class="" v-if="isPreviewing">
      {{answer}}
    </div>

    <text-multiline-truncate v-else :lines="14">
      {{answer}}
    </text-multiline-truncate>

  </div>
</template>

<script>
import TextMultilineTruncate from "@/components/TextMultilineTruncate";

export default {
  name: "WrittenAnswerPreview",
  props: {
    isPreviewing: Boolean,
    answer: String
  },
  computed: {

  },
  components: {TextMultilineTruncate}
}
</script>

<style scoped>

</style>
