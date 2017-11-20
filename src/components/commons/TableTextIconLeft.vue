<template>
  <table class="list-item-container">
    <tr class="list-item-row">
      <td rowspan="2" class="list-item-col list-icon-container">
        <template v-if="textIcon === 'check-square-o'">
          <Icon class="icon-published" name="check-square-o" scale="0.8"></Icon>
        </template>
        <template v-else-if="textIcon === 'file-o'">
          <Icon class="icon-draft" name="file-o" scale="0.8"></Icon>
        </template>
        <template v-else-if="textIcon === 'clock-o'">
          <Icon class="icon-pending" name="clock-o"></Icon>
        </template>
      </td>
      <td class="list-item-col text-heading">{{textHeading}}</td>
    </tr>
    <tr class="list-item-row" v-if="textSubHeading.length > 0">
      <td class="list-item-col sub-text-heading">{{textSubHeading}}</td>
    </tr>
  </table>
</template>

<script>
  import 'vue-awesome/icons/check-square-o';
  import 'vue-awesome/icons/clock-o';
  import 'vue-awesome/icons/file-o';
  import Icon from 'vue-awesome/components/Icon';
  export default {
    props: {
      textIcon: {
        type: String,
        default: false
      },
      textHeading: {
        type: String,
        default: ''
      },
      textSubHeading: {
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
<style lang="scss" scoped>
  $color-published: #00C450;
  $color-draft: #00B5E6;
  $color-pending: #7260BC;

  .icon-published {
    color: $color-published;
  }

  .icon-draft {
    color: $color-draft;
  }

  .icon-pending {
    color: $color-pending;
  }

  .list-item-container {
    .text-heading {
      font-size: 13px;
    }

    .sub-text-heading {
      font-size: 10px;
      padding-top: 10px;
    }
  }

  .list-item-row,
  .list-item-col {
    padding:0;
    background: transparent!important;
    border-top: 0;
    vertical-align: middle;
  }

  .list-icon-container {
    padding-right: 15px;
  }
</style>
