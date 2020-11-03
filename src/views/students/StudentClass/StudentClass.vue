<template>
  <div class="">
    <router-view/>
  </div>
</template>

<script>
import NavBack from "@/components/NavBack";
import IconBase from "@/components/IconBase";
import FilterIcon from "@/components/icons/FilterIcon";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import PageTitle from "@/components/PageTitle";
import IconBaseTwo from "@/components/IconBaseTwo";

export default {
  name: "StudentClass",
  components: {IconBaseTwo, PageTitle, MagnifyingGlassIcon, FilterIcon, IconBase, NavBack}
}
</script>

<style scoped>

</style>
