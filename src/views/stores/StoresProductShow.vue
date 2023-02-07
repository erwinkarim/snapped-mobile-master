
<template>
  <dashboard-layout class="pt-5" :has-custom-bottom-bar="true" >
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'stores.show', params:{ storeID: 1} }" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          {{ product.name }}
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div>Description of a product. And also link to order this product</div>
      <div>Link to <router-link :to="{ name:'stores.orders.new', params: { storeID: 1, productID: 1 }}">a ordering page</router-link>.</div>
      <div>{{ product }}</div>
      <div><router-link :to="{ name:'stores.orders.new', query: {storeID: $route.params.storeID, productID: $route.params.productID} }">Order This Product</router-link></div>
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
import StoresRepository from "@/repositories/StoresRepository";

export default {
  name: 'StoresProductShow',
  data(){
    return { product: {}, };
  },
  mounted() {
    // load the product
    StoresRepository.storeProduct(this.$route.params.storeID, this.$route.params.productID).then((res) => {
      this.product = res.data;
    });
  },
  components: {
    SectionTitle, DashboardLayout, CoinsBottomNavBarVue, PageHeaderThree, 
    NavBack,
  },
}
</script>