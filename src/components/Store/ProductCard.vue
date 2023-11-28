<template>
  <div class="bg-gray-secondary my-2">
    <router-link :to="{ name:'stores.product.show', params: { storeID: product.store_id, productID: product.id }}">
      <img v-if=" product.picture != '' " :src="picture" class="aspect-square w-full" crossorigin="anonymous" />
      <div v-else class="text-center text-6xl w-100 p-8 m-8 flex items-center justify-items-center justify-center">
        <BoxArchiveIcon />
      </div>
      <div class="p-2">
        <h2 class="text-lg font-bold">{{  product.name }}</h2>
        <p>{{ product.price }} EdCoins</p>
        <small v-if="product.store != null">By {{ product.store.name }}</small>
        <small v-else>By {{ product.store_id }}</small>
      </div>
    </router-link>
  </div>
</template>

<script>

import BoxArchiveIcon from '../icons/BoxArchiveIcon.vue';

export default {
    props: {
        product: {},
        img: "https://via.placeholder.com/150",
    },
    computed: {
        picture() {
            return process.env.VUE_APP_S3 + this.product.picture;
        }
    },
    name: "ProductCard",
    components: [BoxArchiveIcon],
    components: { BoxArchiveIcon }
}
</script>