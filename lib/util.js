const convert = require('xml-js')

/**
 * Converts SGML to XML
 * @param {string} sgml SGML string
 * @returns {string} XML string
 * ! CREDIT - https://github.com/euforic/banking.js
 */
function sgml2xml(sgml) {
  return sgml
    .replace(/>\s+</g, '><') // Remove empty spaces and line breaks between tags
    .replace(/\s+</g, '<') // Remove empty spaces and line breaks before tags content
    .replace(/>\s+/g, '>') // Remove empty spaces and line breaks after tags content
    .replace(/<([A-Z0-9_]*)+\.+([A-Z0-9_]*)>([^<]+)(<\/\1\.\2>)?/g, '<$1$2>$3') // Remove dots in start-tags names and remove end-tags with dots
    .replace(/<(\w+?)>([^<]+)/g, '<$1>$2</<added>$1>') // Add a new end-tags for the ofx elements
    .replace(/<\/<added>(\w+?)>(<\/\1>)?/g, '</$1>') // Remove duplicate end-tags
}

/**
 * Converts XML string into a JavaScript object
 * @param {string} xml XML string
 */
function parseOFX(xml) {
  return convert.xml2js(xml, {
    compact: true,
    spaces: 4,
    ignoreComment: true,
    elementNameFn(val) {
      // Required for <INTU.BID> & <INTU.USERID> tags
      switch (val) {
        case 'INTUBID':
          return 'INTU.BID'
        case 'INTUUSERID':
          return 'INTU.USERID'
        default:
          return val
      }
    },
  })
}

/**
 * Converts a header string into an object
 * @param {string} headerString Header string
 * @returns {object} OFX headers object
 */
function parseHeaders(headerString) {
  const headerArray = headerString.split(/\r?\n/)
  const headerMap = headerArray.map((header) => header.split(/:/, 2))

  const headers = {}

  // Create headers object from 2d headerMap array
  headerMap.forEach((header) => {
    if (!header[0]) return
    Object.assign(headers, { [header[0]]: header[1] })
  })

  return headers
}

/**
 * Converts a body string into an object
 * @param {string} bodyString Body string
 * @param {boolean} sgml Is string in formatted as SGML?
 * @returns {object} OFX body object
 */
function parseBody(bodyString) {
  try {
    return parseOFX(`<OFX>${bodyString}`) // QFX format
  } catch (err) {
    return parseOFX(sgml2xml(`<OFX>${bodyString}`)) // OFX formats
  }
}

/**
 * Converts a headers object into XML
 * @param {string} headers Header object
 * @returns {string} OFX header string
 */
function serializeHeaders(headers) {
  let headerString = ''

  const headerArray = Object.entries(headers)

  headerArray.forEach((header) => {
    headerString += `${header[0]}:${header[1]}\n`
  })

  headerString += '\n'

  return headerString
}

/**
 * Converts a body object into XML
 * @param {string} body Body object
 * @returns {string} OFX body string
 */
function serializeBody(body) {
  return convert.js2xml(body, {
    compact: true,
    ignoreComment: true,
    spaces: 2,
  })
}

module.exports = { parseHeaders, parseBody, serializeHeaders, serializeBody }
