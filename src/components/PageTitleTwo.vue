<template>
  <div v-bind:class="customClass"
       class="w-full flex flex-col fixed z-40  pb-12">

    <!-- HEADER -->
    <div class="flex flex-row w-full justify-between items-center pt-16 px-5">

      <div class="w-1/12 items-center justify-center flex-row flex">
        <slot name="leftAction"/>
      </div>

      <div class="w-9/12 text-lg font-bold text-purple-primary">
        <slot name="title"/>
      </div>

      <div class="w-2/12 flex flex-row justify-end">
        <slot name="rightAction"/>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PageTitleTwo",
  props: {
    backgroundColor:{
      type: String,
      default: 'bg-white'
    },
    bottomBorder: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    customClass: function (){

      let value = '';

      value += this.backgroundColor;

      if (this.bottomBorder) {
        value += ' border-b-1 border-gray-primary border-opacity-15'
      }

      return value;
    }
  }
}
</script>

<style scoped>

</style>
