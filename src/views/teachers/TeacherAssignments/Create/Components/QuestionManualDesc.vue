<template>
    <dashboard-layout>

      <template v-slot:pageHeader>
        <page-header-three>
          <template v-slot:leftAction>
            <nav-back class="w-5/7" type="cancel" stroke-color="red-primary"/>
          </template>
          <template v-slot:mini-title>
            Manual Description
          </template>
          <template v-slot:rightAction>
            <router-link :to="{name : 'teacher.assignments.create'}" class="font-bold text-red-primary">
              Save
            </router-link>
          </template>
        </page-header-three>
      </template>

        <template v-slot:content>
            <div id="manual-description" class="flex-wrap relative top-12">
                <!-- DESCRIPTION -->
                <textarea class="w-full h-48 form-textarea block break-words px-7 mt-26 text-left text-purple-secondary text-sm leading-snug"
                       placeholder="Enter description"
                       v-model="description"
                />
            </div>
        </template>
    </dashboard-layout>
</template>

<script>
    import PageTitle from "@/components/PageTitle";
    import NavBack from "@/components/NavBack";
    import PageTitleTwo from "@/components/PageTitleTwo";
    import PageTitleThree from "@/components/PageHeaderThree";
    import DashboardLayout from "@/views/layout/DashboardLayout";
    import PageHeaderThree from "@/components/PageHeaderThree";

    export default {
        name: "QuestionManualDescription",
        data() {
            return {

                // MODELS
                description: '',
            }
        },
        components: {
          PageHeaderThree,
          DashboardLayout, NavBack, PageTitle, PageTitleTwo, PageTitleThree,}
    }
</script>

<style scoped>

</style>
