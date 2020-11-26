<template>
  <div>
    <div class="w-full bg-white flex flex-col fixed z-40">

      <page-title title="Class">

        <template v-slot:rightAction>
          <div class="flex flex-row justify-end items-center ">
            <router-link :to="{name: 'student.class.classmates'}" class="w-1/7 bg-white ">
              <icon-base-two>
                <magnifying-glass-icon stroke-color="red-primary"/>
              </icon-base-two>
            </router-link>
            <router-link :to="{name: 'student.class.school_ranking'}" class="ml-2">
              School Rank
            </router-link>
          </div>
        </template>
      </page-title>

      <!-- TABS -->
      <div class="px-5 pb-4 w-full flex flex-row mt-4">
        <router-link @click.native="changeTab({tabName: 'classmates'})" :to="{name: 'student.class'}"
                     :class="isActiveTab('classmates')"
                     class=" opacity-100 hover:opacity-75 text-xs-plus font-bold py-2 px-4 rounded-lg w-1/2 mr-3">
          CLASSMATES
        </router-link>
        <router-link @click.native="changeTab({tabName: 'teachers'})" :to="{name: 'student.class.teacher'}"
                     :class="isActiveTab('teachers')"
                     class=" opacity-100 hover:opacity-75  text-xs-plus font-bold py-2 px-4 rounded-lg w-1/2">
          TEACHERS
        </router-link>
      </div>

    </div>

    <div class="top-46 relative mb-24">
      <slot/>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import IconBaseTwo from "@/components/IconBaseTwo";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";

export default {
  name: "LayoutOne",
  data() {
    return {
      path: '',
      activeTab: 'classmates',
    }
  },
  watch: {
    'activeTab': 'isActiveTab'
  },
  methods: {
    changeTab({tabName: tabName}) {
      this.activeTab = tabName;
    },
    isActiveTab(tabName) {
      if (this.activeTab === tabName) {
        return 'bg-purple-primary text-white'
      } else {
        return 'bg-gray-secondary text-purple-primary text-opacity-75'
      }
    },
    getInitialActiveTab() {

      let path = this.$route.path;

      if (path.includes('/teachers')) {
        this.activeTab = 'teachers';
      }

      if (path.includes('/ranking')) {
        this.activeTab = 'classmates';
      }
    },
  },
  created() {
    this.getInitialActiveTab()
  },
  components: {MagnifyingGlassIcon, IconBaseTwo, PageTitle}
}
</script>

<style scoped>

</style>
