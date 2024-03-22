<template>
  <!--   Modal Error   -->
  <div @click.self="$store.commit('teacherCreateAssignment/toggleShowingErrorMode')"
       class="fixed w-full h-screen z-70 flex flex-col justify-center items-center top-0 bg-gray-primary bg-opacity-75 "
  >
    <modal class="w-4/5"
           modal-type="error"
    >
      <template v-slot:message>
        <p>
          <b>Please ensure that you have entered all the important inputs</b>
        </p>
        <ul>
          <li v-for="error in $store.state.teacherCreateAssignment.errors">
            {{ error }}
          </li>
        </ul>
      </template>
      <template v-slot:button>
        <button @click="$store.commit('teacherCreateAssignment/toggleShowingErrorMode')"
                class="font-bold w-4/5 rounded-full px-2 font-bold leading-relaxed tracking-wider"
        >
          Okay
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
export default {
name: "ErrorModal",
  components: {Modal}
}
</script>

<style scoped>

</style>
