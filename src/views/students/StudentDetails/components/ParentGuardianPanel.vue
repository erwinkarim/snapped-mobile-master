<template>
  <div class="mt-8">
    <section-title class="text-left" title="Guardian/Parents"/>
    <div class="mt-5" >
      <div
          class=" max-w-sm h-18 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 py-3">

        <div class="flex flex-row items-center h-full">

          <div class="w-1/6 relative h-full p-0">
            <icon-base class="absolute h-full w-5/6" icon-name="profile-photo-icon" icon-color="white"
                       view-box="-5 0 60 55">
              <profile-photo :gender="gender"/>
            </icon-base>
          </div>

          <div class="w-4/6 flex-col pl-1">
            <div class="text-left text-purple-primary text-xs-plus mb-1  truncate pr-4">
              {{ guardians.name }}
            </div>
            <div class="text-left text-px-10 text-purple-secondary">
              Parent
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import IconBase from "@/components/IconBase";
import ProfilePhoto from "@/components/icons/ProfilePhoto";

export default {
  name: "ParentGuardianPanel",
  props: {
    guardians: Object
  },
  computed: {
    gender() {
      if(this.guardians.relationship === 'Father') {
        return 'male'
      }
      if(this.guardians.relationship === 'Mother') {
        return 'female'
      }
    }
  },
  components: {ProfilePhoto, IconBase, SectionTitle}
}
</script>

<style scoped>

</style>
