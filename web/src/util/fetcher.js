const fetcher = url => fetch(url).then(res => res.json())//text()).then(text => console.log(text))
export default fetcher
