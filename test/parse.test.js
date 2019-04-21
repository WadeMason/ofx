const ofx = require('..')
const fs = require('fs')

// Load sample files
const withoutEndTags = fs.readFileSync(
  `${__dirname}/samples/sample.ofx`,
  'utf8'
)
const withEndTags = fs.readFileSync(
  `${__dirname}/samples/sampleWithEndTags.ofx`,
  'utf8'
)
const inXMLasQFX = fs.readFileSync(`${__dirname}/samples/sample.qfx`, 'utf8')

// Parse function tests
test('Parse: Without end tags', () => {
  const obj = ofx.parse(withoutEndTags)
  expect(obj).toHaveProperty('headers')
  expect(obj).toHaveProperty('body')
})

test('Parse: With end tags', () => {
  const obj = ofx.parse(withEndTags)
  expect(obj).toHaveProperty('headers')
  expect(obj).toHaveProperty('body')
})

test('Parse: QFX (XML) file', () => {
  const obj = ofx.parse(inXMLasQFX)
  expect(obj).toHaveProperty('headers')
  expect(obj).toHaveProperty('body')
})

// Serialize function tests
test('Serialize: Without end tags', () => {
  const obj = ofx.parse(withoutEndTags)
  const str = ofx.serialize(obj.headers, obj.body)
  expect(str).toBe(withEndTags)
})

test('Serialize: With end tags', () => {
  const obj = ofx.parse(withEndTags)
  const str = ofx.serialize(obj.headers, obj.body)
  expect(str).toBe(withEndTags)
})

test('Serialize: QFX (XML) file', () => {
  const obj = ofx.parse(inXMLasQFX)
  const str = ofx.serialize(obj.headers, obj.body)
  expect(str).toBe(withEndTags)
})
