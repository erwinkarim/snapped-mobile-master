<template>
  <assignment-dashboard-layout>

    <template v-slot:content>

      <!-- -->
      <page-title-two background-color="bg-black-primary" :bottom-border="false">
        <template v-slot:leftAction>
          <nav-back class="w-2/3" stroke-color="white"/>
        </template>
        <template v-slot:rightAction>
          <icon-base-two class="w-1/3 justify-end">
            <expand-image-icon/>
          </icon-base-two>
        </template>
      </page-title-two>

      <!-- Content -->
      <div class="relative top-34">
        <div class="pb-11/12 bg-black-primary">

        </div>

        <!-- ASSIGNMENT DETAILS -->
        <div class="mt-6 px-5">

          <!-- Achievements -->
          <div class="flex flex-row ">
            <div class="bg-gray-secondary rounded-full py-1 px-4 text-xs font-bold text-purple-primary uppercase">
              First Submit
            </div>
          </div>

          <div class="text-left mt-5 text-purple-primary font-bold tracking-normal text-xl truncate">
            Kenali Tokoh Sejarah
          </div>

          <div class="text-purple-secondary font-bold text-sm mt-3 text-left truncate">
            Muhammad Amin Firdaus Abdullah
          </div>

          <div class="flex flex-row justify-between mt-4 text-sm ">
            <div class="text-purple-secondary text-left">
              Time submitted
            </div>
            <div class="flex flex-row justify-end text-purple-primary text-right">
              <div class="mr-4">
                12:25PM
              </div>
              <div>
                15 June 2020
              </div>
            </div>
          </div>

          <!-- MARKS -->
          <div class="flex flex-row font-bold text-xl mt-8 text-left tracking-wide">
            <div class="text-purple-secondary mr-1">
              0
            </div>
            <div class="text-purple-primary">
              /100 Marks
            </div>
          </div>



        </div>

      </div>


    </template>

    <template v-slot:bottomBar>
      <router-link :to="{name: 'teacher.assignments.marking.feedback'}" class="w-1/8 mr-2">
        <icon-base-two class="w-7/8">
          <dialog-bubble-icon/>
        </icon-base-two>
      </router-link>
      <div class="w-3/8 px-2">
        <router-link :to="{name: ''}"
                     class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary">
          Marking
        </router-link>
      </div>
      <div class="w-4/8 px-2">
        <button
            class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
          <div class="w-5/7">
            Set as Marked
          </div>
        </button>
      </div>
    </template>
  </assignment-dashboard-layout>
</template>

<script>
import AssignmentDashboardLayout from "@/views/layout/AssignmentDashboardLayout";
import IconBaseTwo from "@/components/IconBaseTwo";
import DialogBubbleIcon from "@/components/icons/DialogBubbleIcon";
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
import ExpandImageIcon from "@/components/icons/ExpandImageIcon";
import PageTitle from "@/components/PageTitle";

export default {
  name: "AssignmentDetails",
  components: {
    PageTitle,
    ExpandImageIcon, NavBack, PageTitleTwo, DialogBubbleIcon, IconBaseTwo, AssignmentDashboardLayout
  }
}
</script>

<style scoped>

</style>
