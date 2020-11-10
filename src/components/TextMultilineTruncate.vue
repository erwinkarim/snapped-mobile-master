<template>
<!--  <div class="multi-line-truncate">-->
  <div class="leading-relaxed" :style="style">
    {{text}}
  </div>
</template>

<script>
export default {
  name: "TextMultilineTruncate",
  props: {
    text: String,
    lines: {
      type: Number,
      default: 2
    }
  },
  computed: {
    style () {
      let value = '';

      value += ' display: -webkit-box;';
      value += ' -webkit-box-orient: vertical;';
      value += ' overflow: hidden;';

      value += ` -webkit-line-clamp: ${this.lines};`;

      return value;
    }
  }

}
</script>

<style scoped>
.multi-line-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
