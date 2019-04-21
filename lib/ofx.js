const util = require('./util')

/**
 * Parses an OFX string into a JavaScript object with header & body attributes
 * @param {string} ofx OFX string
 * @returns {object} Object with header & body attributes
 */
function parse(ofx) {
  const [headerString, bodyString] = ofx.split('<OFX>', 2)

  return {
    headers: util.parseHeaders(headerString),
    body: util.parseBody(bodyString)
  }
}

/**
 * Serializes a JavaScript object's header & body into an OFX string
 * @param {object} headers OFX JavaScript object's headers
 * @param {object} body OFX JavaScript object's body
 * @returns {string} OFX string
 */
function serialize(headers, body) {
  const headerString = util.serializeHeaders(headers)
  const bodyString = util.serializeBody(body)

  return headerString + bodyString
}

module.exports = { parse, serialize }
