/* global fetch */

function timeout (delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('Request timed out'))
    }, delay)
  })
}

function createFetchRequest (method, url, body, authToken) {
  const timeoutPromise = timeout(10000)
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(body)
  }

  const fetchPromise = fetch(url, options)
    .then(async response => {
      const json = await response.json()

      if (response.status >= 200 && response.status < 400) {
        return Promise.resolve(json)
      }
      return Promise.reject(json)
    })

  return Promise.race([fetchPromise, timeoutPromise])
}

function get (url, authToken) {
  return createFetchRequest('GET', url, undefined, authToken)
}

function put (url, body, authToken) {
  return createFetchRequest('PUT', url, body, authToken)
}

function post (url, body, authToken) {
  return createFetchRequest('POST', url, body, authToken)
}

export { get, put, post }
