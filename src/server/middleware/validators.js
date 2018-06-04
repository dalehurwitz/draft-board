exports.equals = function (field, message) {
  return function (value, { req }) {
    if (value !== req.body[field]) {
      return Promise.reject(new Error(message))
    }
    return Promise.resolve()
  }
}

// Value has only numbers, letters, or space characters
exports.alphaNumeric = function (message) {
  return function (value, other) {
    const re = new RegExp('^[a-zA-Z0-9 ]*$')
    if (!re.test(value)) {
      return Promise.reject(new Error(message))
    }
    return Promise.resolve()
  }
}
