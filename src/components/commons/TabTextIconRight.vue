<template>
  <div class="tab-icon-text-wrapper">
    <div>
      <template v-if="showIcon">
        <p class="icon-text-heading">{{ selectedTextHeading }}</p>
      </template>
      <template v-else>
        <p class="icon-text-heading">{{ textHeading }}</p>
      </template>
      <p class="icon-text-sub-heading" v-if="showIcon">{{ textSubHeading }}</p>
    </div>
    <div class="icon-text-wrapper">
      <Icon class="icon-text" name="check-circle-o" scale="1.2" v-if="showIcon"></Icon>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/check-circle-o';
import Icon from 'vue-awesome/components/Icon';
export default {
  props: {
    showIcon: {
      type: Boolean,
      default: false
    },
    textHeading: {
      type: String,
      default: ''
    },
    selectedTextHeading: {
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
<style lang="scss">
  .tab-icon-text-wrapper {
    height: 42px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon-text-heading {
    font-weight: bold;
  }

  .icon-text-heading,
  .icon-text-sub-heading {
    margin: 0;
  }

  .icon-text-wrapper {
    margin-left: 15px;
  }

  .icon-text {
    color: #28a745;
  }
</style>
