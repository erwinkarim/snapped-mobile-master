
<template>
  <dashboard-layout :has-custom-bottom-bar="true" >
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'stores.show', params:{ storeID: $route.params.storeID} }" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          {{ product.name }}
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <img v-if=" product.picture != ''" :src="picture" class="w-full" crossorigin="anonymous" />
      <div v-else class="text-center text-6xl w-full p-8 m-8 flex items-center justify-items-center justify-center">
        <BoxArchiveIcon />
      </div>

      <div v-if="Object.keys(product).length === 0">
        <p>Loading ...</p>
      </div>
      <div v-else class="w-full p-2 text-left">
        <h2 class="text-lg font-bold">{{  product.name }}</h2>
        <p>By {{ product.store.name }}</p>
        <p class="w-full text-center bg-gray-secondary text-black"></p>
        <p class="p-4 w-full text-center">
          <router-link class="bg-purple-primary text-white opacity-100 hover:opacity-75 text-lg font-bold py-2 px-4 rounded-lg w-full" :to="{ name:'stores.orders.new', query: { storeID: $route.params.storeID, productID: $route.params.productID } }">Order This!</router-link>
        </p>
        <p>{{ product.price }} EdCoins</p>
        <p>{{  product.desc }}</p>
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
import BoxArchiveIcon from '@/components/icons/BoxArchiveIcon.vue';

export default {
  name: 'StoresProductShow',
  data(){
    return { product: {}, };
  },
  computed: {
    picture(){
      return process.env.VUE_APP_S3 + this.product.picture;
    },
  },
  mounted() {
    // load the product
    StoresRepository.storeProduct(this.$route.params.storeID, this.$route.params.productID).then((res) => {
      this.product = res.data;
    });
  },
  components: {
    SectionTitle, DashboardLayout, CoinsBottomNavBarVue, PageHeaderThree, 
    NavBack, BoxArchiveIcon
  },
}
</script>