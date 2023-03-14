<template>
  <dashboard-layout class="pt-5" :has-fixed-header="true" :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'coin.home'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>Show QR</template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div class="flex items-center flex-col px-5 w-full md:px-10">
        <QrcodeVue :value="qrValue" :size=256 class="" />
        <div class="h-30">{{qrValue}}</div>
      </div>
    </template>

    <template v-slot:bottomBar>
      <CoinsBottomNavBarVue />
    </template>

  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import SectionTitle from "@/components/SectionTitle";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import PageTitle from "@/components/PageTitle";
import CoinsBottomNavBarVue from "@/components/CoinsBottomNavBar.vue";
import QrcodeVue from 'qrcode.vue';

export default {
  data() {
    return {
      bottomBarClass: true,
      qrValue: this.$store.state.authUser.id_num + '-' + this.$store.state.authUser.first_name,
    }
  },
  name: "CoinShowQR",
  mounted() {
    console.log('coinshowQR mounted');
  },
  components: {
    DashboardLayout, SectionTitle, PageHeaderThree, NavBack, PageTitle,
    CoinsBottomNavBarVue, QrcodeVue,
  }
}
</script>