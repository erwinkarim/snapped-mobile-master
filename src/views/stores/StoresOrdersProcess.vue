
<template>
  <dashboard-layout class="pt-5" :has-custom-bottom-bar="true" >
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
        </template>
        <template v-slot:mini-title>
          Processing Order
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div>process the order and then push to new place</div>
      <div>don't refresh this page.</div>
      <div>{{  msg[msg_status] }}</div>
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
  name: "StoresOrdersProcess",
  data(){

    return {
      msg: [
        'Processing order',
        'Order failed. Check your balance or try again',
        'Order successful, attempt to redirect to order page',
      ],
      msg_status: 0,
    };
  },
  mounted(){
    // process order than push to new page with the result

    StoresRepository.storeNewOrder(this.$route.query).then((res) => {
      console.log('store order new', res);
    
      if(res.data !== 0){
        // show orders
        this.msg_status = 2;
        this.$router.push({ name: 'stores.orders.show', params: {orderID: res.data }, query: { orderConfirmed: true }});
      };
    }).catch((res) => {
      // order failed
      console.log('order failed')
      this.msg_status = 1;
    });
  },
  components: {
    SectionTitle, DashboardLayout, CoinsBottomNavBarVue, PageHeaderThree, 
    NavBack,
  },
}
</script>