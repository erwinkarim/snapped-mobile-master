<template>
  <div class="grid grid-cols-8">
    <div class="col-span-1">
      <img v-if="store.picture != ''" :src="picture" crossorigin="anonymous"/>
      <img v-else src="@/assets/img/75.jpeg" />
    </div>
    <div class="col-span-7 p-2 truncate">
      <router-link :to="{ name:'stores.show', params: { storeID: store.id}}">
        <h2>{{  store.name }}</h2>
        <p>{{  store.desc }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default{
  name: "StoreCard",
  computed: {
    picture(){
      return process.env.VUE_APP_S3 + this.store.picture;
    }

  },
  props: {
    store: {},
  }
}
</script>