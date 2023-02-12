<template>
  <div class="bg-gray-secondary my-2">
    <router-link :to="{ name:'stores.product.show', params: { storeID: product.store_id, productID: product.id }}">
      <img src="@/assets/img/150.png" class="aspect-square w-full"/>
      <div class="p-2">
        <h2 class="text-lg font-bold">{{  product.name }}</h2>
        <p>{{ product.price }} EdCoins</p>
        <small>By {{ product.store_id }}</small>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  props: {
    product: {},
    img: "https://via.placeholder.com/150",
  },
  name: "ProductCard",
}
</script>