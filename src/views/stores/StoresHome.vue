
<template>
  <dashboard-layout class="pt-5" :has-custom-bottom-bar="true" >
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
      <div>Get a list of stores here</div>
      <div>Link to <router-link :to="{ name:'stores.show', params: { storeID: 1}}">a store</router-link>.</div>
      <div>Also show recent 5 orders and a <router-link :to="{ name:'stores.orders.home' }">link</router-link> to all of your previous orders</div>
      <div>
        Stores
        <ul>
          <li v-for="store in stores"><router-link :to="{ name:'stores.show', params: { storeID: store.id}}">{{  store.name }}</router-link></li>
        </ul>
      </div>
      <div>
        Orders
        <ul>
          <li v-for="order in orders"><router-link :to="{ name:'stores.orders.show', params: { orderID: order.id}}">{{  order.id }}</router-link></li>
        </ul>
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

export default {
  name: 'StoresHome',
  data(){
    return {
      stores: [],
      orders: [], 
    };
  },
  mounted(){
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
    NavBack,
  },
}
</script>