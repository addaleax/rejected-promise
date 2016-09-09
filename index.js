'use strict';

function noop() {}

class RejectedPromise extends Promise {
  constructor(executor) {
    super(executor);

    this.catch(noop);
  }
};

RejectedPromise.prototype.constructor = Promise;

module.exports = RejectedPromise;
