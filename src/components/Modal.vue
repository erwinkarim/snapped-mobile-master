<template>
    <div class="bg-white px-10 rounded-2xl pt-12 pb-10">

        <!-- ICON -->
        <div class=" w-full flex flex-row items-center justify-center mb-12">
            <div class="w-1/2">
                <component :is="iconLoader" />
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
        <div class="text-purple-secondary text-sm leading-relaxed">
            <slot name="message"/>
        </div>

        <!-- BUTTON -->
        <button @click="closeModal" :class="buttonClass" class="w-full rounded-full px-2 py-4 font-bold leading-relaxed tracking-wider mt-7">
            <slot name="button"/>
        </button>

    </div>
</template>

<script>

    import ErrorIcon from "@/components/icons/ErrorIcon";
    import SuccessIcon from "@/components/icons/SuccessIcon";

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
        },
        computed: {
            isErrorType() {
                return this.modalType === 'error'
            },
            isSuccessType() {
                return this.modalType === 'success'
            },
            buttonClass () {
                let value = 'bg-yellow-primary text-purple-primary';

                if (this.isErrorType) {
                    value = 'bg-red-primary text-white';
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
            closeModal () {
                this.$emit('toggleModal')
            }
        },
        components: {
            ErrorIcon,
            SuccessIcon
        }
    }
</script>

<style scoped>
</style>
