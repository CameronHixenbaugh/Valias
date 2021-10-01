const fetcher = url => fetch(url).then(res => res.json())//.then(res => console.log(res.json))
export default fetcher
