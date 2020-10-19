<template>
  <div class="max-w-sm h-18 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 py-3">

    <div class="flex flex-row items-center h-full">

      <div class="w-1/6 relative h-full p-0">
        <icon-base class="absolute h-full w-5/6" icon-name="profile-photo-icon" icon-color="white" view-box="-5 0 60 55">
          <ProfilePhoto/>
        </icon-base>
      </div>

      <div class="w-4/6 flex-col pl-1">
        <div class="text-left text-purple-primary text-xs-plus mb-1">
          Muhammad Imran Abdul Razak
        </div>
        <div class="flex flex-row text-left text-px-10 text-purple-secondary">
          <div class="w-1/4"> Sejarah </div>
          <div class="w-1/4"> 1 Opal </div>
          <div class="w-2/4"> 15 June 2020 </div>
        </div>
      </div>

      <div class="w-1/6 relative h-full pl-5">
        <icon-base class="absolute h-full w-full" icon-name="arrow-right-icon" icon-color="white" view-box="-15 -20 60 55">
          <ArrowRightIcon/>
        </icon-base>
      </div>

    </div>

  </div>
</template>

<script>
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import IconBase from "@/components/IconBase";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

export default {
name: "SubmissionCard",
  components: {
    ArrowRightIcon,
    IconBase,
    ProfilePhoto

  }
}
</script>

<style scoped>

</style>
