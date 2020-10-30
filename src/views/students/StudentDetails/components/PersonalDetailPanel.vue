<template>
  <div class="mt-8 mb-4">
    <section-title class="text-left" title="Personal Information"/>
    <div class="mt-5">
      <div class="flex flex-row text-xs justify-between py-1">
        <div class="text-left text-purple-secondary">
          School ID
        </div>
        <div class="text-right text-purple-primary">
          {{ schoolID }}
        </div>
      </div>
      <div class="flex flex-row text-xs justify-between  py-1">
        <div class="text-left text-purple-secondary">
          Email
        </div>
        <div class="text-right text-purple-primary">
          {{ email }}

        </div>
      </div>
      <div class="flex flex-row text-xs justify-between  py-1">
        <div class="text-left text-purple-secondary">
          Contact Number
        </div>
        <div class="text-right text-purple-primary">
          {{ contactNum }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle";

export default {
  name: "PersonalDetailPanel",
  props: {
    details: Object
  },
  computed: {
    email() {
      if (typeof this.details !== "undefined") {
        if (typeof this.details.personal_details !== "undefined") {
          return this.details.personal_details.email ?? '-';
        }
      }
    },
    contactNum() {
      if (typeof this.details !== "undefined") {
        if (typeof this.details.personal_details !== "undefined") {
          return this.details.personal_details.contact_number ?? '-';
        }
      }
    },
    schoolID() {
      if (typeof this.details !== "undefined") {
        return this.details.school_id ?? '-';
      }
    }
  },
  watch: {
  },
  methods: {
    updateDate() {
      console.log('test')

      if (typeof this.details !== "undefined") {
        this.schoolID = this.details.school_id
        this.email = this.details.personalDetails.email;
        this.contactNum = this.details.personalDetails.contact_num;
      }
    }
  },
  components: {SectionTitle}
}
</script>

<style scoped>

</style>
