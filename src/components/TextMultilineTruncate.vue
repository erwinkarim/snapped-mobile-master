<template>
  <VueMarkdown class="leading-relaxed" :style="style">
    <slot/>
  </VueMarkdown>
</template>

<script>
import VueMarkdown from 'vue-markdown';

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
  },
  components: {
    VueMarkdown,
  },
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
