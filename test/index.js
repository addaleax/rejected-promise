'use strict';

const util = require('util');
const Debug = require('vm').runInDebugContext('Debug');

// Roll inspection hacks so that rejections aren’t accidentally handled.
Promise.prototype.shouldEqual = function(v) {
  return new Promise((resolve, reject) => setImmediate(() => {
    const m = Debug.MakeMirror(this);
    if (m.status() === 'resolved' && m.promiseValue().value_ === v) {
      resolve();
    } else {
      reject(new Error(`${util.inspect(this)} does not equal ${v}`));
    }
  }));
};

Promise.prototype.shouldBeRejected = function(v) {
  return new Promise((resolve, reject) => setImmediate(() => {
    const m = Debug.MakeMirror(this);
    if (m.status() === 'rejected' && m.promiseValue().value_ === v) {
      resolve();
    } else {
      reject(new Error(`${util.inspect(this)} was not rejected with ${v}`));
    }
  }));
};

const RejectedPromise = require('../');

const handler = (warning) => {
  throw warning;
};

before('set up process warnings handler', function() {
  process.addListener('warning', handler);
});

after('set up process warnings handler', function() {
  process.removeListener('warning', handler);
});

describe('RejectedPromise', function() {
  describe('constructor', function() {
    it('can accept a fulfilling resolver', function() {
      return new RejectedPromise(resolve => resolve(42)).shouldEqual(42);
    });

    it('can accept a rejecting resolver', function() {
      return new RejectedPromise((resolve, reject) => reject(42)).shouldBeRejected(42);
    });
  });

  describe('resolve', function() {
    it('accepts values', function() {
      return RejectedPromise.resolve(42).shouldEqual(42);
    });

    it('accepts rejected Promises', function() {
      return RejectedPromise.resolve(Promise.reject(42)).shouldBeRejected(42);
    });
  });

  describe('resolve', function() {
    it('accepts values', function() {
      return RejectedPromise.resolve(42).shouldEqual(42);
    });

    it('accepts rejected Promises', function() {
      return RejectedPromise.resolve(Promise.reject(42)).shouldBeRejected(42);
    });
  });

  describe('reject', function() {
    it('accepts values', function() {
      return RejectedPromise.reject(42).shouldBeRejected(42);
    });
  });
});

describe('self-testing sanity check', function() {
  it('recognizes bad resolve values', function() {
    return Promise.resolve(42).shouldEqual(40).then(() => {
      throw Error();
    }, () => 0);
  });

  it('recognizes bad reject values', function() {
    return RejectedPromise.reject(42).shouldBeRejected(40).then(() => {
      throw Error();
    }, () => 0);
  });

  it('recognizes a wrong rejection state', function() {
    return RejectedPromise.reject(42).shouldEqual(42).then(() => {
      throw Error();
    }, () => 0);
  });

  it('recognizes wrong resolution state', function() {
    return Promise.resolve(42).shouldBeRejected(42).then(() => {
      throw Error();
    }, () => 0);
  });
});
