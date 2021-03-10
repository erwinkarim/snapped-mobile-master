<template>
  <dashboard-layout
      :has-fixed-header="true"
  >

    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'student.class'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Rankings
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="relative top-20 md:mt-10 px-5 w-full">
        <div class=" pb-4 w-full flex flex-row mt-4">
          <router-link
              :to="{name: 'student.rankings.school'}"
              :class="$route.name === 'student.rankings.school' ? 'bg-purple-primary text-white' : 'bg-gray-secondary text-purple-primary text-opacity-75'"
              class=" opacity-100 hover:opacity-75 text-xs-plus font-bold py-2 px-4 rounded-lg w-1/2 mr-3">
            SCHOOL
          </router-link>
          <router-link :to="{name: 'student.rankings.national'}"
                       :class="$route.name === 'student.rankings.national' ? 'bg-purple-primary text-white' : 'bg-gray-secondary text-purple-primary text-opacity-75'"
                       class=" opacity-100 hover:opacity-75  text-xs-plus font-bold py-2 px-4 rounded-lg w-1/2">
            NATIONAL
          </router-link>
        </div>
      </div>

      <div class="mt-20 w-full">
        <router-view/>
      </div>


    </template>

  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
export default {
  name: "Index",
  components: {NavBack, PageHeaderThree, DashboardLayout}
}
</script>

<style scoped>

</style>
