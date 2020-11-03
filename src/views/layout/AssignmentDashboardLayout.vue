<template>
  <div >
    <slot name="content"/>
    <section id="bottom-navigation"
             class="md:hidden block fixed inset-x-0 border-t-1/4 bottom-0 z-40 py-6 px-6 shadow bg-white ">

      <div id="tabs" class="flex flex-row h-full items-center justify-around">
        <slot name="bottomBar"/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
name: "AssignmentDashboardLayout"
}
</script>

<style scoped>

</style>
