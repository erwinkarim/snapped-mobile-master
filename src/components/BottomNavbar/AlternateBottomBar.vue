<template>
  <section id="alternate-bottom-bar" class="md:hidden block fixed inset-x-0 border-t-1/4 bottom-0 z-10 shadow bg-white h-14">

    <div class="flex flex-row h-full items-center justify-around">
      <slot/>
    </div>
  </section>
</template>

<script>
export default {
name: "AlternateBottomBar"
}
</script>

<style scoped>

</style>
