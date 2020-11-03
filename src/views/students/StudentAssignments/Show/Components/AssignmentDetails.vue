<template>
  <assignment-dashboard-layout class="relative">

    <template v-slot:content>
      <div class="flex flex-col">
        <div class="relative w-full justify-center">

          <!-- Background Stack Green -->
          <div class="absolute w-full z-0 sm:z-10 md:z-20 lg:z-30 xl:z-40 h-screen">
            <div class=" bg-green-primary h-1/3">

            </div>
          </div>
          <!-- Background Stack Overlay -->
          <div class="absolute w-full z-10  sm:z-10 md:z-20 lg:z-30 xl:z-40 h-screen">
            <div class=" bg-black bg-opacity-10 h-1/3">

            </div>
          </div>

          <!-- Page Content -->
          <div class="absolute w-full z-20 mb-32">

            <!-- HEADER with Nav Back -->
            <div class="flex flex-row w-full justify-between pt-16 px-5">
              <nav-back class="w-1/12" stroke-color="white"/>
            </div>

            <!-- TIMER -->
            <div class="w-full flex flex-row justify-center items-center mt-7">
              <div class="flex flex-col w-1/2">
                <div class="text-white font-bold text-sm">
                  Assignment Time Remaining
                </div>
                <div class=" bg-green-primary mt-3 py-1 rounded-full">

                  <div class="text-white font-bold text-3xl tracking-wider">
                    03:46:54
                  </div>
                </div>
              </div>
            </div>

            <!-- Assignment Detail Card -->
            <div class="px-8 mt-8">
              <div class="bg-gray-secondary rounded-2xl text-left py-5 px-6">
                <!-- TITLE -->
                <div class="font-semibold text-2xl text-purple-primary">
                  Mengenali Tokoh
                </div>

                <!-- DETAILS -->
                <div class="flex flex-row justify-start text-xs-plus text-purple-secondary mt-2">
                  <div>
                    Sejarah
                  </div>
                  <div class="mx-3">
                    1 Opal
                  </div>
                  <div>
                    17 June 2020
                  </div>
                </div>

                <!-- DESCRIPTION -->
                <div class="mt-8 text-purple-primary text-xs-plus">
                  <p class="my-5">
                    Tuliskan tokoh-tokoh sejarah kebangsaan dan huraikan jasa mereka kepada negara. Anda boleh pilih sehingga 3 orang tokoh.
                  </p>
                  <p class="my-5">
                    5 penghantar terawal dan MENEPATI kehendak soalan akan menerima markah bonus.
                  </p>
                  <p class="my-5">
                    Gagal menghantar pada masa yang ditetapkan akan mengakibatkan markah ditolak.
                  </p>
                </div>

                <!-- READ MORE -->
                <div class="text-red-primary font-semibold text-xs-plus">
                  Read More
                </div>
              </div>
            </div>

            <!-- Submissions -->
            <div class="mt-8 px-8">
              <div class="flex flex-row justify-between text-purple-primary font-bold">
                <div>
                  Submission
                </div>
                <div>
                  0/51
                </div>
              </div>

              <div class="text-purple-secondary text-xs-plus text-left mt-4">
                No ongoing submissions at the moment.
              </div>

            </div>

          </div>


        </div>

      </div>
    </template>

    <template v-slot:bottomBar >
      <div class="w-1/2 px-2">
        <button class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
          <div class="w-5/7">
            Write Answer
          </div>
          <icon-base-two class="w-1/7">
            <pen-icon/>
          </icon-base-two>
        </button>
      </div>
      <div class="w-1/2 px-2">
        <button class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
          <div class="w-5/7">
            Snap Answer
          </div>
          <icon-base-two class="w-1/7">
            <camera-icon/>
          </icon-base-two>
        </button>
      </div>
    </template>

  </assignment-dashboard-layout>



</template>

<script>
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import AssignmentDashboardLayout from "@/views/layout/AssignmentDashboardLayout";
import PenIcon from "@/components/icons/PenIcon";
import CameraIcon from "@/components/icons/CameraIcon";

export default {
  name: "AssignmentDetails",
  components: {CameraIcon, PenIcon, AssignmentDashboardLayout, MagnifyingGlassIcon, IconBaseTwo, NavBack}
}
</script>

<style scoped>

</style>
