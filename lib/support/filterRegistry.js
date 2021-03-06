'use strict';

const clone = require('lodash.clonedeep'),
  metricsFilter = require('./metricsFilter');

let filterForType = {};

module.exports = {
  registerFilterForType(filter, type) {
    filterForType[type] = filter;
  },

  getFilterForType(type) {
    return filterForType[type];
  },

  getFilters() {
    return filterForType;
  },

  getTypes() {
    return Object.keys(filterForType);
  },

  removeFilter(type) {
    filterForType[type] = undefined;
  },

  clearAll() {
    filterForType = {};
  },

  filterMessage(message) {
    const filterConfig = this.getFilterForType(message.type);

    if (!filterConfig) {
      return message;
    }

    const filteredMessage = clone(message);
    filteredMessage.data = metricsFilter.filterMetrics(filteredMessage.data, filterConfig);
    return filteredMessage;
  }
};
