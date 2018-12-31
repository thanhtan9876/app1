exports.getAccessToken = function () {
  var user = JSON.parse(localStorage.getItem('user'))
  if (user == null) return ''
  return user.accessToken
}

exports.saveUser = function (user) {
  localStorage.setItem('user', JSON.stringify(value))
}

exports.getUserID = function () {
  var user = JSON.parse(localStorage.getItem('user'))
  if (user == null) return ''
  return user.user.id
}

exports.getHeaderRequest = function () {
  var headers = {
      'Content-Type': 'application/json',
      'x-access-token': exports.getAccessToken()
  }
  return headers
}
