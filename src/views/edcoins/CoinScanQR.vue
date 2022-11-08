<template>
  <dashboard-layout class="pt-5" :has-fixed-header="true" :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'coin.home'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Scan QR
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="flex flex-col px-5 w-full md:px-10">
        Something here.
      </div>
      <div class="h-30">Empty Space</div>
      <p>Scan QR Code Here</p>
      <QrcodeStream @decode="decodeString" />
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
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name:"CoinScanQR",
  mounted() {
    console.log('mounted scan QR');
  },
  methods: {
    decodeString(decodedString){
      console.log('decode string', decodedString);
    },
  },
  components: {
    DashboardLayout, SectionTitle, PageHeaderThree, NavBack, PageTitle,
    CoinsBottomNavBarVue, QrcodeStream,
  }
}
</script>