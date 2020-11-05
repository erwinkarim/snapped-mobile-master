<template>
    <assignment-dashboard-layout>
        <template v-slot:content>

            <page-title-two>
                <template v-slot:leftAction>
                    <nav-back class="w-5/7" type="cancel" stroke-color="red-primary"/>
                </template>
                <template v-slot:title>
                    Create Question
                </template>
                <template v-slot:rightAction>
                    <router-link :to="{name : 'teacher.assignments.create'}" class="font-bold text-red-primary">
                    Save
                    </router-link>
                </template>
            </page-title-two>

            <div class="flex-wrap relative top-12">
                <!-- DESCRIPTION -->
                <div class="w-full break-words px-7 mt-26 text-left text-purple-secondary text-sm leading-snug">
                    Fill the question title and select description method
                </div>

                <!-- FORM -->
                <div class="relative w-full px-7 mt-3 max-h-full">
                    <input v-model="title"
                           class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
                           type="text" placeholder="Title" autocomplete="off">
                    <div class="flex mb-4 -mx-1">
                        <div class="w-1/2 h-12 px-1">
                            <router-link :to="{name:'teacher.assignments.manual-description'}" tag="button" class="pl-6 pr-2 py-5 mt-2 appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline">
                                <icon-base-two class="w-12">
                                    <pen-icon class="w-12"></pen-icon>
                                </icon-base-two>
                                Manual
                            </router-link>
                        </div>
                        <div class="w-1/2 h-12 px-1">
                            <button class="pl-6 pr-2 py-5 mt-2 text-center appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline">
                                <icon-base-two class="w-12">
                                    <camera-icon></camera-icon>
                                </icon-base-two>
                                Upload
                            </button>
                        </div>
                    </div>
                    <div class="grid grid-rows-1">
                    </div>
                </div>

                <!-- DESCRIPTION -->
                <div class="w-full break-words px-7 mt-20 text-left text-purple-secondary text-sm leading-snug">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                </div>
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
    import PenIcon from "@/components/icons/PenIcon";
    import CameraIcon from "@/components/icons/CameraIcon";
    import IconBaseTwo from "@/components/IconBaseTwo";

    export default {
        name: "QuestionForm",
        data() {
            return {

                // MODELS
                title: '',
            }
        },
        components: {NavBack, PageTitle, PageTitleTwo, PageTitleThree,AssignmentDashboardLayout, PenIcon, CameraIcon, IconBaseTwo}
    }
</script>

<style scoped>

</style>