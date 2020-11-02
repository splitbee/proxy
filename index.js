addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

const jsUrl = 'https://ab-lib.proxy.elevate.sh/sb.js'
const hiveUrl = 'https://staging-hive.splitbee.io'

async function handleRequest(request) {
  const url = new URL(request.url)
  if (url.pathname === '/sb.js') {
    return await fetch(jsUrl)
  } else {
    const newRequest = new Request(hiveUrl + url.pathname, request)
    return await fetch(newRequest)
  }
}