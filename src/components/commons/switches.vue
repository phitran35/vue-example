<!--
"name": "vue-switches",
"version": "1.1.7",
"author": "Drew J Bartlett",
"homepage": "https://github.com/drewjbartlett/vue-switches#readme",
-->
<template>
  <label :class="classObject">
        <span class="vue-switcher__label" v-if="shouldShowLabel">
            <span v-if="label" v-text="label"></span>
            <span v-if="!label && value" v-text="textEnabled"></span>
            <span v-if="!label && !value" v-text="textDisabled"></span>
        </span>

    <input type="checkbox" :disabled="disabled" @change="trigger" :checked="value">

    <div></div>
  </label>
</template>

<script>
  export default {
    name: 'switches',

    props: {
      typeBold: {
        default: false
      },

      value: {
        default: false
      },

      disabled: {
        default: false
      },

      label: {
        default: ''
      },

      textEnabled: {
        default: ''
      },

      textDisabled: {
        default: ''
      },

      color: {
        default: 'default'
      },

      theme: {
        default: 'default'
      },

      emitOnMount: {
        default: true
      }
    },

    mounted () {
      if (this.emitOnMount) {
        this.$emit('input', this.value);
      }
    },

    methods: {
      trigger (e) {
        this.$emit('input', e.target.checked);
      }
    },

    computed: {
      classObject () {
        const { color, value, theme, typeBold, disabled } = this;

        return {
          'vue-switcher': true,
          'vue-switcher--unchecked': !value,
          'vue-switcher--disabled': disabled,
          'vue-switcher--bold': typeBold,
          'vue-switcher--bold--unchecked': typeBold && !value,
          [`vue-switcher-theme--${theme}`]: color,
          [`vue-switcher-color--${color}`]: color
        };
      },

      shouldShowLabel () {
        return this.label !== '' || this.textEnabled !== '' || this.textDisabled !== '';
      }
    }
  };
</script>


<style lang="scss">
  /**
   * Default
   */
  $color-default-default: #F6F8F8;
  $color-default-green: #53b96e;
  $color-default-blue: #539bb9;
  $color-default-red: #b95353;
  $color-default-orange: #b97953;
  $color-default-yellow: #bab353;

  $theme-default-colors: (
    default : $color-default-default,
    blue    : $color-default-blue,
    red     : $color-default-red,
    yellow  : $color-default-yellow,
    orange  : $color-default-orange,
    green   : $color-default-green
  );

  /**
   * Bulma
   */
  $color-bulma-default: #f5f5f5;
  $color-bulma-primary: #00d1b2;
  $color-bulma-blue: #3273dc;
  $color-bulma-red: #ff3860;
  $color-bulma-yellow: #ffdd57;
  $color-bulma-green: #22c65b;

  $theme-bulma-colors: (
    default : $color-bulma-default,
    primary : $color-bulma-primary,
    blue    : $color-bulma-blue,
    red     : $color-bulma-red,
    yellow  : $color-bulma-yellow,
    green   : $color-bulma-green
  );

  /**
   * Bootstrap
   */
  $color-bootstrap-default: #fff;
  $color-bootstrap-primary: #337ab7;
  $color-bootstrap-success: #00C841;
  $color-bootstrap-info: #5bc0de;
  $color-bootstrap-warning: #f0ad4e;
  $color-bootstrap-danger: #c9302c;
  $color-bootstrap-border: #E1E0E1;
  $color-bootstrap-enable: #00C841;

  $theme-bootstrap-colors: (
    default : $color-bootstrap-default,
    primary : $color-bootstrap-primary,
    success : $color-bootstrap-success,
    info    : $color-bootstrap-info,
    warning : $color-bootstrap-warning,
    danger  : $color-bootstrap-danger
  );

  .vue-switcher {
    position: relative;
    display: inline-block;

    &__label {
      display: block;
      font-size: 10px;
      margin-bottom: 5px;
    }

    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      cursor: pointer;
    }

    div {
      height: 20px;
      width: 35px;
      position: relative;
      border-radius: 30px;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      transition: all ease .4s;
      border: 1px solid $color-bootstrap-border;

      &:after {
        content: '';
        height: 20px;
        width: 20px;
        border-radius: 100px;
        display: block;
        transition: all ease .3s;
        position: absolute;
        left: 100%;
        margin-left: -17px;
        cursor: pointer;
        top: -1px;
        border: 1px solid #BEBEBE;
        box-shadow: 1px 0px 5px #CFD1D1;
      }
    }

    &--unchecked {
      div {
        justify-content: flex-end;

        &:after {
          left: 15px;
        }
      }
    }

    &--disabled {
      div {
        opacity: .3;
      }

      input {
        cursor: not-allowed;
      }
    }

    &--bold {
      div {
        top: -8px;
        height: 26px;
        width: 51px;

        &:after {
          margin-left: -22px;
          top: 4px;
        }
      }

      &--unchecked {
        div {
          &:after {
            left: 26px;
          }
        }
      }

      .vue-switcher__label {
        span {
          padding-bottom: 7px;
          display: inline-block;
        }
      }
    }

    &-theme--default {
      @each $colorName, $color in $theme-default-colors {
        &.vue-switcher-color--#{$colorName} {

          div {
            @if $colorName == 'default' {
              background-color: $color-bootstrap-enable;
            } @else {
              background-color: lighten($color, 10%);
            }

            &:after {
              @if $colorName == 'default' {
                background-color: white;
              } @else {
                background-color: $color
              }
            }
          }

          &.vue-switcher--unchecked {
            div {

              @if $colorName == 'default' {
                background-color: $color;
              } @else {
                background-color: lighten($color, 30%);
              }

              &:after {
                background-color: lighten($color, 10%);
              }
            }
          }

        }
      }
    }

    &-theme--bulma {
      @each $colorName, $color in $theme-bulma-colors {
        &.vue-switcher-color--#{$colorName} {

          div {
            @if $colorName == 'default' {
              background-color: darken($color, 10%);
            } @else {
              background-color: lighten($color, 10%);
            }

            &:after {
              background-color: $color;
            }
          }

          &.vue-switcher--unchecked {
            div {

              @if $colorName == 'default' or $colorName == 'yellow' {
                background-color: darken($color, 5%);
              } @else {
                background-color: lighten($color, 30%);
              }

              &:after {

                @if $colorName == 'default' {
                  background-color: $color;
                } @else {
                  background-color: lighten($color, 10%);
                }
              }
            }
          }

        }
      }
    }

    &-theme--bootstrap {
      @each $colorName, $color in $theme-bootstrap-colors {
        &.vue-switcher-color--#{$colorName} {
          div {
            @if $colorName == 'default' {
              background-color: darken($color, 10%);
            } @else {
              background-color: lighten($color, 10%);
            }

            &:after {
              @if $colorName == 'default' {
                background-color: darken($color, 6%);
              } @else {
                background-color: $color;
              }
            }
          }

          &.vue-switcher--unchecked {
            div {

              @if $colorName == 'default' {
                background-color: darken($color, 4%);
              } @else {
                background-color: lighten($color, 30%);
              }

              &:after {

                @if $colorName == 'default' {
                  background-color: darken($color, 6%);
                } @else {
                  background-color: lighten($color, 10%);
                }
              }
            }
          }
        }
      }
    }

  }

</style>
