<template>
  <div class="simple-table-wrapper animated fadeIn">
    <b-card no-body>
      <div slot="header" class="simple-table-header">
        <h4 class="simple-table-header-title">{{cardHeader}}</h4>
        <b-button class="button-skip" v-if="showSkipButton" @click="handleSkipButtonClick()">{{labelSkipButton}}</b-button>
        <b-button class="button-skip" v-if="showLongFormSurveyButton" @click="handleLongFormButtonClick()">
          <template v-if="isLongSurvey"><Icon class="icon-long-survey" name="check-square-o" scale="0.8"></Icon></template>
          {{labelLongFormSurveyButton}}
        </b-button>
      </div>
      <b-card-body>
        <div class="row filter-container">
          <div class="col-md-9">
            <b-input-group>
              <!-- Add-ons -->
              <b-input-group-addon>
                <Icon class="icon-search" name="search"></Icon>
              </b-input-group-addon>
              <b-form-input v-model="filter" :placeholder="placeholderSearchText" />
            </b-input-group>
          </div>
          <div class="col-md-3">
            <b-form-select v-model="filterSelectedDate" :options="optionsFilterDate" class="mb-3">
            </b-form-select>
          </div>
        </div>
        <div class="row counter-container">
          <span class="item-counter">{{currentTotalRows}}</span>
          <span class="item-counter-text">{{header}}</span>
        </div>
        <b-table striped hover show-empty
                 :items="items"
                 :fields="fields"
                 :current-page="currentPage"
                 :per-page="perPage"
                 :filter="filter"
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 @filtered="onFiltered"
                 class="simple-table"
                 v-bind:class="{'simple-table-empty': items.length === 0}"
        >
          <template slot="title" slot-scope="row">
            <div v-on:click.stop="onTableItemSelected(row.item)">
              <template v-if="row.item.status">
                <template v-if="row.item.status === 'published'">
                  <Icon class="icon-published" name="check-square-o" scale="0.8"></Icon>
                </template>
                <template v-else-if="row.item.status === 'draft'">
                  <Icon class="icon-draft" name="file-o" scale="0.8"></Icon>
                </template>
                <template v-else-if="row.item.status === 'pending'">
                  <Icon class="icon-pending" name="clock-o"></Icon>
                </template>
              </template>
              <template v-if="row.item.name">{{row.item.name}}</template>
              <template v-if="row.item.title">{{row.item.title}}</template>
            </div>
          </template>

          <template slot="author" slot-scope="row">
            <template v-if="row.item.authorName">
              {{row.item.authorName}}
            </template>
            <template v-else>
              {{getAuthorName(row.item.author)}}
            </template>
          </template>
          <template slot="updated" slot-scope="row">
            <template v-if="row.item.updatedAt">
              {{row.item.updatedAt | durationDate}}
            </template>
            <template v-else>
              {{row.item.updateDate | durationDate}}
            </template>
          </template>
          <template slot="referenceId" slot-scope="row">
            <template v-if="row.item.referenceId">
              {{row.item.referenceId}}
            </template>
            <template v-else-if="row.item.referenceItems && row.item.referenceItems[0]">
              {{row.item.referenceItems[0].id}}
            </template>
          </template>
        </b-table>
      </b-card-body>
      <b-card-footer class="simple-row">
        <div class="col-sm-6">
          <ul class="flex-container legend-container" v-if="showLegend">
            <li><span class="legend-title">Legend</span></li>
            <li class="legend-status-item"><Icon class="icon-published" name="check-square-o"></Icon><span class="legend-status">Published</span></li>
            <li class="legend-status-item"><Icon class="icon-draft" name="file-o"></Icon><span class="legend-status">Draft</span></li>
            <li class="legend-status-item"><Icon class="icon-pending" name="clock-o"></Icon><span class="legend-status">Pending Review</span></li>
          </ul>
        </div>
        <div class="col-sm-6">
          <ul class="flex-container flex-end">
            <li class="flex-item-pagination"><b-pagination class="col-sm-3 text-md-right" :total-rows="currentTotalRows" :per-page="perPage" v-model="currentPage" /></li>
            <li class="flex-item"><b-form-select class="col-sm-3 text-md-right" :options="pageOptions" v-model="perPage" /></li>
            <li><span>Per Page</span></li>
          </ul>
        </div>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import 'vue-awesome/icons/check-square-o';
import 'vue-awesome/icons/clock-o';
import 'vue-awesome/icons/file-o';
import 'vue-awesome/icons/pencil';
import 'vue-awesome/icons/ellipsis-h';
import 'vue-awesome/icons/search';
import Icon from 'vue-awesome/components/Icon';
import { EVENT_SIMPLE_TABLE_SKIP_BUTTON_CLICK, EVENT_SIMPLE_TABLE_LONG_SURVEY_CLICK, EVENT_SIMPLE_TABLE_ITEM_CLICK } from '../../store/events';

export default {
  props: {
    cardHeader: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    placeholderSearchText: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Object,
      default: () => {}
    },
    labelSkipButton: {
      type: String,
      default: ''
    },
    showSkipButton: {
      type: Boolean,
      default: false
    },
    showLegend: {
      type: Boolean,
      default: false
    },
    labelLongFormSurveyButton: {
      type: String,
      default: ''
    },
    showLongFormSurveyButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      pageOptions: [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalDetails: { index: '', data: '' },
      filterSelectedDate: 'a',
      currentTotalRows: 0,
      isLongSurvey: false,
      optionsFilterDate: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'Recent' }
      ]
    };
  },
  computed: {
  },
  components: {
    Icon
  },
  methods: {
    getAuthorName (author) {
      if (author && author.profile) {
        return author.profile.firstname + ' ' + author.profile.lastname;
      }
      return '';
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.currentTotalRows = filteredItems.length;
      this.currentPage = 1;
    },
    totalRows () {
      if (this.currentTotalRows === 0) {
        this.currentTotalRows = this.items.length;
      }
      return this.currentTotalRows;
    },
    handleSkipButtonClick () {
      this.$emit(EVENT_SIMPLE_TABLE_SKIP_BUTTON_CLICK);
    },
    handleLongFormButtonClick () {
      this.isLongSurvey = !this.isLongSurvey;
      this.$emit(EVENT_SIMPLE_TABLE_LONG_SURVEY_CLICK, this.isLongSurvey);
    },
    onTableItemSelected (item) {
      this.$emit(EVENT_SIMPLE_TABLE_ITEM_CLICK, item);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $common-background-color: #F6F7F7;
  $color-legend: #56666D;
  $color-published: #00C450;
  $color-draft: #00B5E6;
  $color-pending: #7260BC;
  $color-primary: #00C450;
  $color-secondary: #00B5E6;
  $color-item-hover: #0080A2;
  $color-item-focus: #376173;

  $border-color-table: 1px solid #E2E0E2;

  .simple-table-wrapper {
    .card-footer {
      background-color: #FAFAFC;

      .pagination {
        display: flex;
        padding-left: 0;
        list-style: none;
      }

      ul li {
        padding: 0;
      }
    }

    .card,
    .card-header:first-child,
    .card-footer:last-child {
      border-radius: 0;
    }

    .card {
      background-color: $common-background-color;
    }

    .card-header {
      background-color: white;
    }

    .card-body {
      padding-right: 0;
      padding-left: 0;
      padding-bottom: 0;
    }

    .pagination-container {
    }

    .filter-container {
      margin-left: 15px;
      margin-right: 15px;
    }

    .counter-container {
      margin-left: 55px;
      margin-bottom: 15px;
    }

    .flex-container {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      align-items: center;
    }

    .simple-row {
      display: flex;
      flex-wrap: wrap;
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

    .item-counter {
      border-radius: 41%;
      background: #CFDADD;
      width: 30px;
      text-align: center;
      margin-right: 10px;
      font-size: 14px;
      font-weight: bold;
      color: white;
    }

    .item-counter-text {
      color: #A6AEB1;
    }

    .icon-search {
      color: #969696;
    }

    .icon-published {
      color: $color-published;
    }

    .icon-long-survey {
      color: white;
    }

    .icon-draft {
      color: $color-draft;
    }

    .icon-pending {
      color: $color-pending;
    }

    .icon-published,
    .icon-draft,
    .icon-pending {
      margin-right: 15px;
    }

    .legend-container {
      height: 50px;
    }

    .legend-title {
      color: #556679;
      font-weight: bold;
      font-size: 16px;
    }

    .legend-status-item {
      margin-left: 35px;
    }
  }

  .simple-table {
    background-color: white;
    margin-bottom: 0;

    &.table-striped tbody tr {
      background-color: white;
    }

    &.table-striped tbody tr:hover,
    .table-selected,
    .table-selected > td,
    .table-selected:hover,
    .table-selected > td:hover{
      background-color: $color-item-hover;
      color: white;
      cursor: pointer;
      font-weight: normal;
    }

    thead th {
      border-bottom: $border-color-table;
    }

    td {
      border-top: $border-color-table;
    }
  }

  .simple-table.table-striped tbody tr:active,
  .simple-table.table-striped tbody tr:focus {
    background-color: $color-item-focus;
  }

  .simple-table-empty {

    &.b-table>thead>tr>th.sorting {
      cursor: default;
      user-select: none;
      pointer-events: none;
    }

    &.table-striped tbody tr {
      background-color: white;
      user-select: none;
      pointer-events: none;
    }

    &.table-striped tbody tr:hover {
      background-color: white;
      color: black;
      cursor: default;
    }
  }

  .button-skip {
    background-color: $color-item-hover;
    color: white;

    &:hover {
      background-color: $color-item-focus;
      color: white;
    }
  }

  .simple-table-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 17px;
  }

  .simple-table-header-title {
    font-family: Arquitecta;
    color: #D92C27;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 30px;
  }

</style>
