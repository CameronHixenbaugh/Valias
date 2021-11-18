/*export function sleep(ms = 500) {
  return new Promise(resolve => 
    setTimeout(resolve, ms)
  )
}
async function timeoutHandler(){
  await sleep(1)
}

setTimeout(timeoutHandler, 10000)*/

export function sleep(ms = 500) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
