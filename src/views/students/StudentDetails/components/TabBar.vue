<template>
  <div>
    <div v-if="this.userRole === 'Teacher' || this.isAuthStudent" class="flex mt-5 justify-between items-center">
      <router-link
          :to="{name: tab.route}"
          v-for="tab in tabs"
          :class="isActiveTab(tab.name)"
          class="text-xs font-bold py-2 px-4 rounded-lg w-full mx-1" exact>
        {{ tab.displayName }}
      </router-link>
    </div>
    <div v-else class="flex mt-5 justify-between items-center">
      <div
          v-for="tab in tabs"
          :class="isActiveTab(tab.name)"
          class="text-xs font-bold py-2 px-4 rounded-lg w-full mx-1">
        {{ tab.displayName }}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    userRole: String,
    isAuthStudent: Boolean,
  },
  data() {
    return {

      activeTab: 'show',

      tabs: [
        {
          name: 'show',
          displayName: 'BADGES',
          route: 'student.profile.show'
        },
        {
          name: 'assignments',
          displayName: 'ASSIGNMENT',
          route: 'student.profile.show.assignments'
        },
        {
          name: 'overview',
          displayName: 'OVERVIEW',
          route: 'student.profile.show.overview'
        }
      ]
    }
  },
  watch: {
    '$route': 'handleRouteChange',
  },
  computed: {},
  methods: {

    isActiveTab(tabName) {
      if (this.activeTab === tabName) {
        return 'bg-purple-primary text-white'
      } else {
        return 'text-gray-primary'
      }
    },

    handleRouteChange() {
      if (this.$route.path.includes('/show')) this.activeTab = 'show';
      if (this.$route.path.includes('/overview')) this.activeTab = 'overview';
      if (this.$route.path.includes('/assignments')) this.activeTab = 'assignments';
    },
  }
}
</script>

<style scoped>

</style>
