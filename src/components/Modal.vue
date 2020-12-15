<template>
  <div class="bg-white px-10 rounded-2xl pt-12 pb-10">

    <!-- ICON -->
    <div v-if="!isNoIcon" class=" w-full flex flex-row items-center justify-center mb-12">
      <div class="w-1/2">
        <component :is="iconLoader"/>
      </div>
    </div>

    <!-- TITLE  -->
    <div class="mb-4">
      <div v-if="isErrorType" class="text-red-primary font-bold text-4xl">
        Error!
      </div>
      <slot v-else name="title"/>
    </div>

    <!-- MESSAGE -->
    <div class="text-purple-secondary text-sm leading-relaxed pb-10">
      <slot name="message"/>
    </div>

    <!-- BUTTON -->
    <button  @click="closeModal"
            :class="buttonClass"
            class="w-full rounded-full px-2 py-4 font-bold leading-relaxed tracking-wider mt-7"
    >
      <slot name="button"/>
    </button>

  </div>
</template>

<script>

import ErrorIcon from "@/components/icons/ErrorIcon";
import SuccessIcon from "@/components/icons/SuccessIcon";
import router from "@/router";

export default {
  name: "Modal",
  props: {
    modalType: {
      type: String,
      default: 'success'
    },
    icon: {
      type: [Object, String],
      default: ''
    },
    redirectRoute: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isNoIcon() {
      return this.modalType === 'no-icon'
    },
    isErrorType() {
      return this.modalType === 'error'
    },
    isSuccessType() {
      return this.modalType === 'success'
    },
    buttonClass() {
      let value = ' bg-yellow-primary text-purple-primary ';

      if (this.isErrorType) {
        value = ' bg-red-primary text-white ';
      }

      if (this.isNoIcon) {
        value = '  bg-red-primary text-white'
      }

      return value;
    },
    iconLoader() {
      if (this.isErrorType) {
        return 'error-icon'
      }
      if (this.isSuccessType) {
        return 'success-icon'
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('toggleModal');

      if(Object.keys(this.redirectRoute).length > 0) {
        router.push(this.redirectRoute);
      }
    }
  },
  components: {
    ErrorIcon,
    SuccessIcon
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
