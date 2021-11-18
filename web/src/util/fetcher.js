/*const fetcher = async url => 
    await new Promise.resolve(fetch(url)
    .then(res => res.json())) //.then(res => console.log(res.json))
*/

const fetcher = url => fetch(url).then(res => res.json())

export default fetcher



/*
const fetcher = url => fetch(url
    , {
        headers : {
            'Content-Type': 'text/html',
            'Accept': 'text/html'
        }
    })
    .then(res => res.json())//.then(res => console.log(res.json))

export default fetcher
*/