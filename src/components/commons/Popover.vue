<template>
  <div class="vue-popover" v-bind:class="{ open: isOpen, [name]: true }">
    <div class="popover__face" :aria-owns="id" v-on:click="onPopoverToggle">
      <slot name="face" >
        <a href="#">popover</a>
      </slot>
    </div>

    <div class="popover__container" :id="id" v-if="isOpen" v-on:click="onPopoverContentClick">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  const popovers = [];
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      closeOnContentClick: {
        'default': true,
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        isOpen: false
      };
    },
    methods: {
      onPopoverToggle (e) {
        e.stopPropagation();
        if (this.isOpen) {
          this.isOpen = false;
          this.$emit('popover:close');
          return;
        }
        const length = popovers.length;
        if (length > 1) {
          for (let i = 0; i < length; i++) {
            const popover = popovers[i];
            if (popover.isOpen) {
              popover.isOpen = false;
              this.$emit('popover:close');
            }
          }
        }
        this.isOpen = true;
        document.documentElement.addEventListener('click', this.onDocumentClick, false);
        this.$emit('popover:open');
      },
      onDocumentClick () {
        this.isOpen = false;
        this.$emit('popover:close');
      },
      onPopoverContentClick (e) {
        e.stopPropagation();
        if (this.closeOnContentClick) {
          this.isOpen = false;
          this.$emit('popover:close');
        }
      },
      removeDocumentEvent () {
        document.documentElement.removeEventListener('click', this.onDocumentClick, false);
      }
    },
    computed: {
      id () {
        return `popover-${this.name}`;
      }
    },
    mounted () {
      popovers.push(this);
      this.$on('popover:close', this.removeDocumentEvent);
    },
    beforeDestroy () {
      this.removeDocumentEvent();
      popovers.length = 0;
    }
  };
</script>

<style>
  /* Popover section */
  .default .popover__container ul,
  .custom-face .popover__container ul {
    margin: 0;
    padding: 5px 0;
    list-style: none;
    background: white;
    -webkit-box-shadow: 0 2px 11px -1px rgba(0, 0, 0, 0.51);
    -moz-box-shadow: 0 2px 11px -1px rgba(0, 0, 0, 0.51);
    box-shadow: 0 2px 11px -1px rgba(0, 0, 0, 0.51);
  }
  .default .popover__container a,
  .custom-face .popover__container a {
    display: block;
    text-decoration: none;
    padding: 8px 10px;
    color: black;
    transition: background 0.3s ease;
  }
  .default .popover__container a:hover,
  .custom-face .popover__container a:hover {
    color: #141719;
    background-color: #edf1f2;
  }

  .vue-popover {
    position: relative;
    background-color: transparent;
    border: transparent;
  }
  .popover__container {
    position: absolute;
    z-index: 1070;
    right: 0;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
  }

  .popover-item-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .popover-item-label {
    margin-left: 5px;
  }
</style>
