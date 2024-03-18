<template>
  <div class="flex flex-row items-center items-center mb-4">

    <icon-base-two class="w-1/5 mr-2">
      <profile-photo :gender="gender"/>
    </icon-base-two>
    <div class="flex flex-col w-4/5 text-left truncate mr-5">
      <h1 class=" text-purple-primary">Welcome, <span class="font-bold truncate">{{ username }}</span></h1>

      <div class="flex flex-row text-purple-secondary text-px-13 mt-1">
        <span class="pr-2">{{ nowDate || '' }}</span>
        <span>{{ nowTime || '' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import moment from "moment";
import PlusIcon from "@/components/icons/PlusIcon";
import IconBaseTwo from "@/components/IconBaseTwo";

export default {
  name: "UserProfile",
  data() {
    return {
      nowDatetime: moment().format()
    }
  },
  computed: {
    username() {
      return this.$store.getters.getAuthUsername
    },
    gender() {
      return this.$store.getters.getAuthUserGender
    },
    nowDate() {
      const date = moment(this.nowDatetime, "YYYY-MM-DD hh:mm:ss").format('DD MMMM YYYY')
      return date === 'Invalid date' ? moment().format('DD MMMM YYYY') : date
    },
    nowTime() {
      const time = moment(this.nowDatetime, "YYYY-MM-DD hh:mm:ss").format('hh:mm A')
      return time === 'Invalid date' ? moment().format('hh:mm A') : time
    }
  },
  methods: {
    datetime() {
      this.nowDatetime = moment().format()
    },
  },
  mounted() {
    this.interval = setInterval(this.datetime, 1000)
  },
  // beforeDestroy() {
  beforeUnmount() {
    clearInterval(this.interval)
  },
  components: {IconBaseTwo, PlusIcon, ProfilePhoto}
}
</script>

<style scoped>

</style>
