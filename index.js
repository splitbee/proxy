addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const jsUrl = 'https://cdn.splitbee.io/sb.js'
const hiveUrl = 'https://hive.splitbee.io'

async function handleRequest(request) {
  const url = new URL(request.url)
  if (url.pathname === '/sb.js') {
    return await fetch(jsUrl)
  } else {
    const newRequest = new Request(hiveUrl + url.pathname, request)
    newRequest.headers.set('x-country', request.headers.get('cf-ipcountry'))
    newRequest.headers.set('x-real-ip', request.headers.get('x-real-ip'))

    return await fetch(newRequest)
  }
}
