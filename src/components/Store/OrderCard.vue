<template>
  <div class="w-full bg-gray-secondary my-2 p-2">
    <router-link :to="{ name:'stores.orders.show', params: { orderID: order.id}}">
      <div class="grid grid-cols-7">
        <div class="col-span-6">
          <h2>Order {{  order.id }}</h2>
          <p>Created {{ new Date(order.created_at).toLocaleString() }}</p>
          <p>Status: {{ order_status }}</p>
        </div>
        <div class="col-span-1">
          <img v-if=" order.store_product.picture != ''" :src="picture" crossorigin="anonymous" />
          <div v-else class="text-center text-6xl p-2 m-auto w-100 flex items-center justify-items-center justify-center">
            <BoxArchiveIcon />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import BoxArchiveIcon from '@/components/icons/BoxArchiveIcon.vue';

export default{
  name: "OrderCard",
  computed: {
    picture(){
      return process.env.VUE_APP_S3 + this.order.store_product.picture;
    },
    order_status(){
      return this.status_codes[this.order.status];
    },
  },
  props: {
    order: {},
    status_codes: [],
  },
  components: { BoxArchiveIcon }
}
</script>