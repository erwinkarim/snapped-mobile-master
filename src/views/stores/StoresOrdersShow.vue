
<template>
  <dashboard-layout class="pt-5" :has-custom-bottom-bar="true" >
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'stores.home'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Order #{{ order.id }} 
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div class="grid grid-cols-8">
        <img v-if="order.store_product.picture != ''" class="col-span-1" :src="picture" crossorigin="anonymous" />
        <img v-else class="col-span-1" src="@/assets/img/75.jpeg" />
        <p class="col-span-7 text-left p-2">{{  order.store_product.name }}</p>
      </div>
      <div class="py-4">
        <h2 class="text-lg font-bold">Remarks</h2>
        <p class="" v-if="order.remarks ===''">No remarks</p>
        <p class="text-left">{{  order.remarks }}</p>
      </div>
      <div>
        <h2 class="text-lg font-bold">Order Progress</h2>
        <OrderProgressCard :status="order.status" />
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
import OrderProgressCard from "@/components/Store/OrderProgressCard.vue";

export default {
  name: 'StoresOrdersNew',
  data() {
    return { order: {}};
  },
  computed: {
    picture(){
      return process.env.VUE_APP_S3 + this.order.store_product.picture;
    },
  },
  mounted() {
    StoresRepository.storeGetOrder(this.$route.params.orderID).then((res) => {
      this.order = res.data;
    })
  },
  components: {
    SectionTitle, DashboardLayout, CoinsBottomNavBarVue, PageHeaderThree, 
    NavBack, OrderProgressCard
  },
}
</script>