<template>
    <div class="h-screen pb-10">

      <!-- -->
      <page-title-two>
        <template v-slot:leftAction>
          <nav-back class="w-2/3" stroke-color="red-primary"/>
        </template>
        <template v-slot:title>
          Write Answer
        </template>
        <template v-slot:rightAction>
          <div  class="text-red-primary font-bold">
            Save
          </div>
        </template>
      </page-title-two>

      <div class="relative pt-40 px-6 h-full">
        <textarea class="resize-y text-purple-primary  w-full h-full  rounded focus:outline-none"></textarea>
      </div>

  </div>

</template>

<script>
import NavBack from "@/components/NavBack";
import PageTitleTwo from "@/components/PageTitleTwo";
export default {
name: "AnswerWrite",
  components: {PageTitleTwo, NavBack}
}
</script>

<style scoped>

</style>
