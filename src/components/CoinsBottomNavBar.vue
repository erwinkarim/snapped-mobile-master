<template>
  <section id="bottom-navigation">
    <div id="tabs" class="flex flex-row md:max-w-2xl h-full items-center justify-around mx-auto md:w-6/7">
      <router-link v-for="tab in tabs" :key="tab.routeName" :to="{name: tab.routeName}" class=" w-1/5 pt-1 flex flex-row justify-center items-center" exact >
        <div class="w-5/7 md:w-4/7">
          <bottom-navbar-icon-base :tabName="tab.tabName" :icon="tab.icon" width="8" />
        </div>
        <div>{{ tab.tabName }}</div>
      </router-link>
    </div>
  </section>
</template>

<script>
import coins_tabs from "@/components/BottomNavbar/coins_tabs";
import BottomNavbarIconBase from "@/components/BottomNavbar/BottomNavbarIconBase";

export default {
  name: "CoinsBottomNavBar",
  data() {
    return {
      tabs: [],
    }
  }, 
  mounted() {
    console.log('mounted CoinsBottomNavBar');
    this.tabs = coins_tabs;
  },
  components: {
    BottomNavbarIconBase,
  }
}
</script>