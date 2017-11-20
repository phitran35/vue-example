<template>
  <div class="animated fadeIn autocomplete-input">
    <p class="control has-icon has-icon-right">
      <input v-model="keyword" class="input is-large" placeholder="Search..." @input="onInput($event.target.value)" @keyup.esc="isOpen = false" @blur="isOpen = false" @keydown.down="moveDown" @keydown.up="moveUp" @keydown.enter="select">
    </p>
    <b-collapse id="auto-collapse" v-model="isOpen" visible="true">
      <ul class="options-list">
        <li v-for="(option, index) in fOptions" :class="{
          'highlighted': index === highlightedPosition
        }" @mouseenter="highlightedPosition = index" @mousedown="select">
          <slot name="item" :title="option.title" />
        </li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        isOpen: false,
        highlightedPosition: 0,
        keyword: ''
      };
    },
    computed: {
      fOptions () {
        // const re = new RegExp(this.keyword, 'i')
        // return this.options.filter(o => o.title.match(re))
        return this.options.filter(o => o.title.length > 0);
      }
    },
    methods: {
      onInput (value) {
        this.highlightedPosition = 0;
        // this.isOpen = !!value
        this.isOpen = value.length > 0;
      },
      moveDown () {
        if (!this.isOpen) {
          return;
        }
        this.highlightedPosition =
          (this.highlightedPosition + 1) % this.fOptions.length;
      },
      moveUp () {
        if (!this.isOpen) {
          return;
        }
        this.highlightedPosition = this.highlightedPosition - 1 < 0 ? this.fOptions.length - 1 : this.highlightedPosition - 1;
      },
      select () {
        const selectedOption = this.fOptions[this.highlightedPosition];
        this.$emit('select', selectedOption);
        this.isOpen = false;
        this.keyword = selectedOption.title;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .autocomplete-input ul {
    list-style-type: none;
    padding: 0;
  }

  .autocomplete-input li {
    display: inline-block;
    margin: 0 10px;
  }

  .autocomplete-input {
    position: relative;
    height: 300px;
  }

  .autocomplete-input input {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25;
    color: #3e515b;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid #c2cfd6;
    border-radius: 0;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }

  ul.options-list {
    display: flex;
    flex-direction: column;
    margin-top: 7px;
    border: 1px solid #dbdbdb;
    border-radius: 0 0 3px 3px;
    position: absolute;
    width: 100%;
    overflow: hidden;
  }

  ul.options-list li {
    width: 100%;
    flex-wrap: wrap;
    background: white;
    margin: 0;
    border-bottom: 1px solid #eee;
    color: #363636;
    padding: 7px;
    cursor: pointer;
  }

  ul.options-list li.highlighted {
    background: #f8f8f8
  }
</style>
