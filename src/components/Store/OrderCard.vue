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
          <img v-else src="@/assets/img/75.jpeg" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
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
  }
}
</script>