'use strict';

function noop() {}

class RejectedPromise extends Promise {
  constructor(...args) {
    super(...args);

    this.catch(noop);
  }
};

RejectedPromise.prototype.constructor = Promise;

module.exports = RejectedPromise;
