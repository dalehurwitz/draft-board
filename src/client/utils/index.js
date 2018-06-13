const storage = {
  get: function (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  set: function (key, payload) {
    localStorage.setItem(key, JSON.stringify(payload))
  },
  remove: function (key) {
    localStorage.removeItem(key)
  },
  clear: function () {
    localStorage.clear()
  }
}

const ACCESS_TOKEN_KEY = 'db-access-token'

function storeAccessToken (token) {
  storage.set(ACCESS_TOKEN_KEY, token)
}

function getStoredAccessToken () {
  return storage.get(ACCESS_TOKEN_KEY)
}

function removeStoredAccessToken () {
  storage.remove(ACCESS_TOKEN_KEY)
}

export {
  storage,
  storeAccessToken,
  getStoredAccessToken,
  removeStoredAccessToken
}
