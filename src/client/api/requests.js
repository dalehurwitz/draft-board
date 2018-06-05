/* global fetch */

function timeout (delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('Request timed out'))
    }, delay)
  })
}

function createFetchRequest (method, url, body = {}) {
  const timeoutPromise = timeout(10000)
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  const fetchPromise = fetch(url, options)
    .then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json()
      }
      return Promise.reject(response)
    })
    .catch(error => {
      return error.json()
    })

  return Promise.race([fetchPromise, timeoutPromise])
}

function get (url, body) {
  return createFetchRequest('GET', url, body)
}

function put (url, body) {
  return createFetchRequest('PUT', url, body)
}

function post (url, body) {
  return createFetchRequest('POST', url, body)
}

export { get, put, post }
