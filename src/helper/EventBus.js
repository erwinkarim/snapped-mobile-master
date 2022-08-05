import Vue from 'vue';

export class EventBus {
    constructor() {
        this.vue = new Vue();
    }

    fire(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        this.vue.$on(event, callback);
    }

    destroy(event, callback) {
        this.vue.$off(event, callback);
    }
}
