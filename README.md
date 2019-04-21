# OFX

A simple OFX <=> JS object parser/serializer inspired by [node-js](https://github.com/chilts/node-ofx), [ofx-js](https://github.com/bradenmacdonald/ofx-js), and [Banking.js](https://github.com/euforic/banking.js/)

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
const str = ofx.serialize(obj)

console.log(str)
```

## License

[MIT](LICENSE)
