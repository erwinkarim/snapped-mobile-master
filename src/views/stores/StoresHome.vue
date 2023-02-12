
<template>
  <dashboard-layout :has-custom-bottom-bar="true" >
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'coin.home'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Stores Home
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>

      <!-- "tabs" -->
      <div class="px-5 pb-4 w-full flex flex-row mt-4">
        <button @click="toggleNavBar('product-content')" :class="activeTab==='product-content' ? 'bg-purple-primary text-white' : 'bg-gray-secondary text-purple-primary text-opacity-75'" class="opacity-100 hover:opacity-75 text-xs-plus font-bold py-2 px-4 rounded-lg w-1/3 mr-3">Products</button>
        <button @click="toggleNavBar('store-content')" :class="activeTab==='store-content' ? 'bg-purple-primary text-white' : 'bg-gray-secondary text-purple-primary text-opacity-75'" class="opacity-100 hover:opacity-75 text-xs-plus font-bold py-2 px-4 rounded-lg w-1/3 mr-3">Stores</button>
        <button @click="toggleNavBar('orders-content')" :class="activeTab==='orders-content' ? 'bg-purple-primary text-white' : 'bg-gray-secondary text-purple-primary text-opacity-75'" class="opacity-100 hover:opacity-75 text-xs-plus font-bold py-2 px-4 rounded-lg w-1/3 mr-3">Orders</button>
      </div>

      <!--"tab content"-->
      <div class="tab-content md:px-5 pb-1 md:pb-4 w-full mt-4 text-left">
        <div ref="product-content" class="grid grid-cols-2 gap-2">
          <ProductCard class="col-span-1" v-for="product in products" :product="product" />
        </div>
        <div ref="store-content" class="w-full hidden">
          <StoreCard v-for="store in stores" :store="store" />
        </div>
        <div ref="orders-content" class="w-full hidden">
          <OrderCard v-for="order in orders" :order="order" />
        </div>
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
import StoreCard from "@/components/Store/StoreCard.vue";
import OrderCard from "@/components/Store/OrderCard.vue";

export default {
  name: 'StoresHome',
  data(){
    return {
      stores: [],
      products: [],
      orders: [], 
      activeTab: 'product-content'
    };
  },
  methods: {
    toggleNavBar(e){
      // switch the target 
      console.log(e);

      // this is stupid, but it'd works
      this.$refs["product-content"].style.display="none";
      this.$refs["store-content"].style.display="none";
      this.$refs["orders-content"].style.display="none";
      this.$refs[e].style.display="grid";
      this.activeTab = e;
    },
  },
  mounted(){
    // load products
    StoresRepository.storeProducts().then((res) => {
      this.products = res.data;
      console.log('products', res.data);
    });

    // load stores
    StoresRepository.storeIndex().then((res) => {
      this.stores = res.data;
      console.log('stores', res.data);
    });

    // load recent orders
    StoresRepository.storeOrders().then((res) => {
      this.orders = res.data;
      console.log('orders', res.data);
    }) ;
  },
  components: {
    SectionTitle, DashboardLayout, CoinsBottomNavBarVue, PageHeaderThree, 
    NavBack, ProductCard, StoreCard, OrderCard,
  },
}
</script>