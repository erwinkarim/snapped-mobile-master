<template>
    <assignment-dashboard-layout>
        <template v-slot:content>

            <page-title-two>
                <template v-slot:leftAction>
                    <nav-back class="w-5/7" stroke-color="red-primary"/>
                </template>
                <template v-slot:title>
                    Manual Description
                </template>
                <template v-slot:rightAction>
                    <router-link :to="{name : 'teacher.assignments.create'}" class="font-bold text-red-primary">
                        Save
                    </router-link>
                </template>
            </page-title-two>

            <div id="manual-description" class="flex-wrap relative top-12">
                <!-- DESCRIPTION -->
                <textarea class="w-full h-48 form-textarea block break-words px-7 mt-26 text-left text-purple-secondary text-sm leading-snug"
                       placeholder="Enter description"
                       v-model="description"
                />
            </div>


        </template>
    </assignment-dashboard-layout>
</template>

<script>
    import AssignmentDashboardLayout from "@/views/layout/AssignmentDashboardLayout";
    import PageTitle from "@/components/PageTitle";
    import NavBack from "@/components/NavBack";
    import PageTitleTwo from "@/components/PageTitleTwo";
    import PageTitleThree from "@/components/PageTitleThree";

    export default {
        name: "QuestionManualDescription",
        data() {
            return {

                // MODELS
                description: '',
            }
        },
        components: {NavBack, PageTitle, PageTitleTwo, PageTitleThree,AssignmentDashboardLayout,}
    }
</script>

<style scoped>

</style>