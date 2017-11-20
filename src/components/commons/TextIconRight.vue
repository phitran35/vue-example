<template>
  <div>
    <template v-if="showIcon">
      <p class="icon-text-heading">{{ selectedTextHeading | textEllipsis }}</p>
    </template>
    <template v-else>
      <p class="icon-text-heading">{{ textHeading | textEllipsis }}</p>
    </template>
    <p class="icon-text-sub-heading" v-if="showIcon">{{ textSubHeading | textEllipsis }}</p>
    <Icon class="icon-text" name="check-circle-o" scale="1.2" v-if="showIcon"></Icon>
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
<style scoped>
  .icon-text-heading {
    font-weight: bold;
  }

  .icon-text-heading,
  .icon-text-sub-heading {
    margin: 0;
  }

  .icon-text {
    position: absolute;
    right: 25px;
    top: 25px;
    color: #28a745;
  }
</style>
