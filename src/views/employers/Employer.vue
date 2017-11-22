<template>
  <div class="animated fadeIn">
    This is emplyoer management page
  </div>
</template>

<script>
//  import 'vue-awesome/icons/check-square-o';
//  import 'vue-awesome/icons/clock-o';
//  import 'vue-awesome/icons/file-o';
//  import 'vue-awesome/icons/pencil';
//  import 'vue-awesome/icons/ellipsis-h';
//  import 'vue-awesome/icons/search';
//  import 'vue-awesome/icons/trash-o';
//  import Icon from 'vue-awesome/components/Icon';
//  import { mapActions, mapGetters } from 'vuex';
</script>

<style lang="scss" scoped>
  $icon-color: #66757C;
  $border-color: #9B9B9B;
  $color-legend: #56666D;
  $color-published: #16C445;
  $color-draft: #00B5E9;
  $color-pending: #7260BC;
  $color-primary: #16C445;
  $color-secondary: #00B5E9;

  .btn-hover-info {
    cursor: pointer;
  }

  .employer-table {
    background-color: white;
  }

  .employer-table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #FAFBFC;
  }

  .counter-container {
    margin-left: 0;
    margin-bottom: 15px;
  }

  .item-counter {
    border-radius: 41%;
    background: #CFDADD;
    width: 30px;
    text-align: center;
    margin-right: 10px;
    font-size: 13px;
    font-weight: bold;
    color: white;
  }

  .item-counter-text {
    color: #A6AEB1;
  }

  .icon-pencil {
    cursor: pointer;
    color: $icon-color;
    border: 1px solid $border-color;
    border-radius:50%;
    -moz-border-radius:50%;
    -webkit-border-radius:50%;
    width: 30px;
    height: 30px;
    padding: 5px;
  }

  .pagination-container {
    justify-content: space-around;
    padding: 0;
  }

  .paging-container {
    list-style: none;
    display: flex;
    align-items: center;
  }

  .flex-container {
    padding: 0;
    margin: 0;
    list-style: none;
    align-items: center;
  }

  .flex-start {
    justify-content: space-between;
  }

  .flex-end {
    justify-content: flex-end;
  }

  .flex-item {
    padding: 5px;
    margin: 5px;
    line-height: 50px;
    color: white;
  }

  .icon-published {
    color: $color-published;
  }

  .icon-draft {
    color: $color-draft;
  }

  .icon-pending {
    color: $color-pending;
  }

  .legend-icons {
    margin-left: 5px;
  }

  .icon-published,
  .icon-draft,
  .icon-pending {
    margin-right: 15px;
  }

  .legend-container {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
  }

  .legend-status-item {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .legend-path {
    display: inline-block;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 2px 15px;
    font-size: 10px;
    line-height: 1.25;
    border-radius: .25rem;
    -webkit-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
  }

  .legend-title {
    color: $color-legend;
    font-weight: bold;
  }

  .legend-status {
    font-size: 12px;
  }

  .legend-primary-path {
    color: white;
    background-color: $color-primary;
    border-color: $color-primary;
    margin-right: 5px;
  }

  .legend-second-path {
    color: white;
    background-color: $color-secondary;
    border-color:$color-secondary;
    margin-right: 5px;
  }
  @media (min-width: 768px) {
    .container {
      width: 100%;
    }
  }
</style>
<!-- table-complete-1.vue -->
