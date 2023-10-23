
<template>
  <dashboard-layout class="pt-5" :has-custom-bottom-bar="true" >
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'stores.product.show', params: {storeID: 1, productID: 1}}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          New Order Page
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div v-if="Object.keys(product).length === 0">
        <p>No product</p>
      </div>
      <div v-else class="p-5 text-center">
        <img class="w-full" src="@/assets/img/300.jpeg" />
        <p>You are ordering "<strong>{{ product.name }}</strong>" for {{ product.price }} Edcoins.</p>
        <p class="p-4"><router-link class="bg-purple-primary text-white opacity-100 hover:opacity-75 text-lg font-bold py-2 px-4 rounded-lg w-full" :to="{ name: 'stores.orders.process', query: $route.query }">Initiate Order</router-link></p>
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
  name: 'StoresOrdersNew',
  data(){
    return { product: {}, }
  },
  mounted() {
    StoresRepository.storeProduct(this.$route.query.storeID, this.$route.query.productID).then((res) => {
      this.product = res.data;
    })

  },
  components: {
    SectionTitle, DashboardLayout, CoinsBottomNavBarVue, PageHeaderThree, 
    NavBack, BoxArchiveIcon,
  },
}
</script>