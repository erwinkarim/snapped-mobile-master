<template>
  <div class="max-w-sm h-18 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 py-3">

    <div class="flex flex-row items-center h-full">

      <div class="w-1/6 relative h-full p-0">
        <icon-base class="absolute h-full w-5/6" icon-name="profile-photo-icon" icon-color="white" view-box="-5 0 60 55">
          <profile-photo/>
        </icon-base>
      </div>

      <div class="w-4/6 flex-col pl-1">
        <div class="text-left text-purple-primary text-xs-plus mb-1  truncate pr-4">
          Muhammad Imran Abdul Razak
        </div>
        <div class="text-left text-px-10 text-purple-secondary">
          Father
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import IconBase from "@/components/IconBase";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
export default {
name: "ParentGuardianCard",
  components: {ProfilePhoto, IconBase}
}
</script>

<style scoped>

</style>
