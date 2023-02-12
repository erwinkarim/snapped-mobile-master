<template>
  <div class="w-full bg-gray-secondary my-2 p-2">
    <router-link :to="{ name:'stores.orders.show', params: { orderID: order.id}}">
      <div class="grid grid-cols-7">
        <div class="col-span-6">
          <h2>Order {{  order.id }}</h2>
          <p>Created {{ new Date(order.created_at).toLocaleString() }}</p>
          <p>Status: {{ order.status }}</p>
        </div>
        <div class="col-span-1">
          <img src="@/assets/img/75.jpeg" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default{
  name: "OrderCard",
  props: {
    order: {},
  }
}
</script>