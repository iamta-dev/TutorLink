<template>
  <div id="alert" class="my-alert">
    <template>
      <CAlert v-model="open" color="warning" persistent closeButton>{{desc}}</CAlert>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    topic: {
      type: String
    },
    desc: {
      type: String
    },
    open: {
      type: Boolean
    },
    callback: {
      type: Function
    }
  },
  methods: {
    submit() {
      this.callback;
    }
  }
};
</script>

<style scoped>
.my-alert {
  text-align: center;
  position: absolute;
  top: 0px;
  z-index: 10;
  width: 100vw;
}
</style>
