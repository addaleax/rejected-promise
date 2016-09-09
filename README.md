rejected-promise
==============

[![NPM Version](https://img.shields.io/npm/v/rejected-promise.svg?style=flat)](https://npmjs.org/package/rejected-promise)
[![NPM Downloads](https://img.shields.io/npm/dm/rejected-promise.svg?style=flat)](https://npmjs.org/package/rejected-promise)
[![Build Status](https://travis-ci.org/addaleax/rejected-promise.svg?style=flat&branch=master)](https://travis-ci.org/addaleax/rejected-promise?branch=master)
[![Coverage Status](https://coveralls.io/repos/addaleax/rejected-promise/badge.svg?branch=master)](https://coveralls.io/r/addaleax/rejected-promise?branch=master)
[![Dependency Status](https://david-dm.org/addaleax/rejected-promise.svg?style=flat)](https://david-dm.org/addaleax/rejected-promise)

Make promises that can be rejected *and* unhandled (where Node doesn’t complain).

Install:
`npm install rejected-promise`

```js
const RejectedPromise = require('rejected-promise');

// Implements all Promise APIs.
RejectedPromise.resolve(42);
RejectedPromise.reject(new Error('Meh'));
new RejectedPromise((resolve, reject) => {
  // ...
});

// Silences `rejectedPromiseFromSomeSource`.
RejectedPromise.resolve(rejectedPromiseFromSomeSource);
```

License
=======

MIT
