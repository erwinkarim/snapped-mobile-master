<template>
  <div class="grid grid-cols-8">
    <div class="col-span-1">
      <img src="@/assets/img/75.jpeg" />
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
  props: {
    store: {},
  }
}
</script>