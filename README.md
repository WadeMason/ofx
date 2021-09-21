# OFX

A simple OFX <=> JS object parser/serializer inspired by [node-ofx](https://github.com/chilts/node-ofx), [ofx-js](https://github.com/bradenmacdonald/ofx-js), and [Banking.js](https://github.com/euforic/banking.js/)

[![Downloads](https://img.shields.io/npm/v/@wademason/ofx?style=flat-square)](https://www.npmjs.com/package/@wademason/ofx)
[![Build](https://img.shields.io/travis/com/WadeMason/ofx?style=flat-square)](https://app.travis-ci.com/github/WadeMason/ofx)
[![Coverage](https://img.shields.io/codecov/c/github/WadeMason/ofx?style=flat-square)](https://codecov.io/gh/WadeMason/ofx)

## Installation

```bash
$ npm install @wademason/ofx
```

## Usage

### Parsing

```js
const fs = require('fs')
const ofx = require('@wademason/ofx')

const file = fs.readFileSync(`${__dirname}/file.ofx`, 'utf8')

const obj = ofx.parse(file)

console.log(obj)
```

### Serializing

```js
const fs = require('fs')
const ofx = require('@wademason/ofx')

const file = fs.readFileSync(`${__dirname}/file.ofx`, 'utf8')

const obj = ofx.parse(file)
const str = ofx.serialize(obj.headers, obj.body)

console.log(str)
```

## License

[MIT](LICENSE)
