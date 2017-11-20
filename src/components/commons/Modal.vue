<template>
  <div class="animated fadeIn">
    <b-modal id="confirmModal"
             ref="confirmModal"
             :title="modalOptions.title"
             @ok="handleOk">
      <span>
        {{ modalOptions.message }}
      </span>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    props: {
      modalOptions: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        modalName: '',
        names: []
      };
    },
    methods: {
      handleOk (e) {
        e.cancel();
        this.$refs.confirmModal.hide();
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
