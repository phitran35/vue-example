<template>
  <div class="icon-text-left-wrapper">
    <template v-if="iconName == 'icon-plus'">
      <div class="icon-plus"> </div>
    </template>
    <template v-if="iconName == 'icon-minus'">
      <div class="icon-minus"> </div>
    </template>
    <template v-if="iconName == 'edit-question-logic'">
      <div class="icon-edit-question-logic"> </div>
    </template>
    <template v-if="iconName == 'edit-question-order'">
      <Icon class="icon-text" name="edit-question-order" scale="1.2"></Icon>
    </template>
    <span class="icon-text">{{ textHeading }}</span>
  </div>
</template>

<script>
  import '../../components/icons/edit-question-logic';
  import '../../components/icons/edit-question-order';
  import Icon from 'vue-awesome/components/Icon';
  export default {
    props: {
      iconName: {
        type: String,
        default: ''
      },
      textHeading: {
        type: String,
        default: ''
      }
    },
    components: {
      Icon
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .icon-text-left-wrapper {
    height: 20px;
    cursor: pointer;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .icon-text-left-wrapper .icon-plus,
  .icon-text-left-wrapper .icon-minus,
  .icon-text-left-wrapper .icon-text {
    vertical-align: middle;
  }

  .icon-text-left-wrapper .icon-text {
    margin-right: 10px;
  }

  .icon-plus {
    display: inline-block;
    background-image: url("../../assets/icons/icon-plus-normal.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 20px; /*or your image's width*/
    height: 20px; /*or your image's height*/
    margin-right: 10px;
  }

  .icon-minus {
    display: inline-block;
    background-image: url("../../assets/icons/icon-minus-normal.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 20px; /*or your image's width*/
    height: 20px; /*or your image's height*/
    margin-right: 10px;
  }

  .icon-edit-question-logic {
    display: inline-block;
    background-image: url("../../assets/icons/icon-question-logic.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 18px; /*or your image's width*/
    height: 13px; /*or your image's height*/
    margin-right: 10px;
  }
</style>
