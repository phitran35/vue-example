<template>
  <div class="tab-icon-text-wrapper">
    <div>
      <p class="icon-text-heading">
        <span>{{ textHeading }}</span>
        <template v-if="showIcon">
          <template v-if="iconStatus === 'DONE'">
            <Icon class="icon-done" name="check-circle-o"></Icon>
          </template>
          <template v-else-if="iconStatus === 'PAUSE'">
            <Icon class="icon-pause" name="pause-circle-o"></Icon>
          </template>
        </template>
        <Icon class="icon-arrow" v-bind:class="{ 'icon-rotate-90': showIcon}" name="angle-down" scale="1.2"></Icon>
      </p>
      <p class="icon-text-sub-heading" v-if="showIcon && textSubHeading.length > 0">{{ textSubHeading }}</p>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/angle-down';
import 'vue-awesome/icons/check-circle-o';
import 'vue-awesome/icons/pause-circle-o';
import Icon from 'vue-awesome/components/Icon';
export default {
  props: {
    iconStatus: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: () => false
    },
    textHeading: {
      type: String,
      default: () => ''
    },
    textSubHeading: {
      type: String,
      default: () => ''
    }
  },
  components: {
    Icon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-icon-text-wrapper {
    height: 41px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon-text-heading {
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon-text-sub-heading {
    font-weight: 300;
    width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .icon-text-heading,
  .icon-text-sub-heading {
    margin: 0;
    color: black;
  }

  .icon-arrow {
    color: black;
    margin-left: 50px;
  }

  .icon-done {
    margin-left: 10px;
    color: #28a745;
  }

  .icon-pause {
    margin-left: 10px;
    color: #ffc107;
  }

  .icon-rotate-90 {
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }
</style>
