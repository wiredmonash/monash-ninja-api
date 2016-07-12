const validate = (decoded, request, callback) => {
  // If decoded._id not in user's database, then..
  if (false) {
    return callback(null, false)
  } else {
    return callback(null, true)
  }
}

module.exports = validate
