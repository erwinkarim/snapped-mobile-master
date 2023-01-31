
<template>
  <dashboard-layout class="pt-5" :has-custom-bottom-bar="true" >
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'stores.home'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Store Name
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div>Get a list of products here</div>
      <div>Link to <router-link :to="{ name:'stores.product.show', params: { storeID: 1, productID: 1 }}">a product</router-link>.</div>
    </template>

    <template v-slot:bottomBar>
      <CoinsBottomNavBarVue />
    </template>
  </dashboard-layout>
  
</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import DashboardLayout from "@/views/layout/DashboardLayout";
import CoinsBottomNavBarVue from "@/components/CoinsBottomNavBar.vue";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";

export default {
  name: 'StoresShow',
  components: {
    SectionTitle, DashboardLayout, CoinsBottomNavBarVue, PageHeaderThree, 
    NavBack,
  },
}
</script>