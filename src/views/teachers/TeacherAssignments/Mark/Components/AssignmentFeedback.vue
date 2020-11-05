<template>
  <div class="h-screen pb-10">

    <!-- -->
    <page-title-two>
      <template v-slot:leftAction>
        <nav-back class="w-2/3" stroke-color="red-primary"/>
      </template>
      <template v-slot:title>
        Feedback
      </template>
      <template v-slot:rightAction>
        <div v-if="feedback.length === 0" class="text-gray-primary font-bold">
          Done
        </div>
        <router-link :to="{name: ''}" v-if="feedback.length > 0" class="text-red-primary font-bold">
          Done
        </router-link>
      </template>
    </page-title-two>

    <div class="relative pt-40 px-6 h-full">
      <textarea v-model="feedback"
                class="resize-y text-purple-primary  w-full h-full  rounded focus:outline-none"></textarea>
    </div>

  </div>

</template>

<script>
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
export default {
  name: "AssignmentFeedback",
  components: {NavBack, PageTitleTwo},
  data() {
    return {
      feedback: ''
    }
  }
}
</script>

<style scoped>

</style>
