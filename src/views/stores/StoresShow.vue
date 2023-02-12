
<template>
  <dashboard-layout :has-custom-bottom-bar="true" >
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'stores.home'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>{{  store.name }}</template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <img src="@/assets/img/300x150.jpeg" />
      <div class="w-full text-left break-words p-2">
        {{  store.desc }}
      </div>
      <h2 class="text-lg font-bold">Products</h2>
      <div ref="product-content" class="grid grid-cols-2 gap-2">
        <ProductCard class="col-span-1" v-for="product in products" :product="product" />
      </div>
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
import ProductCard from "@/components/Store/ProductCard.vue";

export default {
  name: 'StoresShow',
  data(){
    return {
      store: {},
      products: [],
    };
  },
  mounted(){
    StoresRepository.storeDetail(this.$route.params.storeID).then((res) => {
      this.store = res.data;
    });

    // load store products
    StoresRepository.storeProducts(this.$route.params.storeID).then((res) => {
      console.log('store products', res);
      this.products = res.data;
    });
  },
  components: {
    SectionTitle, DashboardLayout, CoinsBottomNavBarVue, PageHeaderThree, 
    NavBack, ProductCard,
  },
}
</script>