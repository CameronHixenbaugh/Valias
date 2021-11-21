//import {useEffect} from "react"
import {atom, useRecoilState} from "recoil"
import useSWR from "swr"
import {IDLE, LOADING} from "../global/constants"
//import fetcher from "../util/fetcher"
import normalizeItem from "../util/normalize-item"
import axios from 'axios'

export const $marketItemsState = atom({
  key: "market-items::state",
  default: [],
})

export const $marketItemsStatus = atom({
  key: "market-items::status",
  default: IDLE,
})

export function useMarketItems() {
  const url = process.env.REACT_APP_API_MARKET_ITEMS_LIST
  const [status, setStatus] = useRecoilState($marketItemsStatus)
  const [items, setItems] = useRecoilState($marketItemsState)
  var fetcher 
  //useEffect(() => {
  fetcher = url => axios.get(url).then(res => res.data.latestSaleOffers)
  //}, [])

  //console.log("bitch ass " + JSON.stringify(fetcher(url)))

  useSWR(url, fetcher, {
    initialData: items,
    refreshInterval: 10,
    //focusThrottleInterval: 5000,
    //dedupingInterval: 5000,
    onLoadingSlow: () => {
      setStatus(LOADING)
    },
    onSuccess: (res) => {
      setItems(res.map(item => normalizeItem(item)))
      setStatus(IDLE)
    },
    onError: error => {
      console.log("Failed to fetch market items.", error)
    },
  })


  /*
  const getSales = async () => {
    await axios.get(url)
      .then(res => {
        fetcher = res.data.latestSaleOffers
        setItems(fetcher.map(item => normalizeItem(item)))
        setStatus(IDLE)
      })
      .catch(error => {
        console.log("Failed to fetch market items.", error)
      })
  }

  getSales()*/

  const asMap = new Map(items.map(item => [item.itemID, item]))

  //console.log("items: " + JSON.stringify(items))

  return {
    status,
    items,
    has(item) {
     return asMap.has(item.itemID)
    },
  }
}

  /*

  res.data.latestSaleOffers

  useSWR(url, fetch, {
    initialData: items,
    refreshInterval: 10,
    onLoadingSlow: () => {
      setStatus(LOADING)
    },
    onSuccess: ({latestSaleOffers}) => {
      setItems(latestSaleOffers.map(item => normalizeItem(item)))
      setStatus(IDLE)
    },
    onError: error => {
      console.log("Failed to fetch market items.", fetch)
    },
  })

  
  useSWR(url, fetcher, {
    initialData: items,
    refreshInterval: 10,
    onLoadingSlow: () => {
      setStatus(LOADING)
    },
    onSuccess: ({latestSaleOffers}) => {
      setItems(latestSaleOffers.map(item => normalizeItem(item)))
      setStatus(IDLE)
    },
    onError: error => {
      console.log("Failed to fetch market items.", error)
    },
  })
    console.log(data)

  if (error) return console.log("Failed to fetch market items.", error)
  if (!data || undefined) return setStatus(LOADING)
  else setItems(data.latestSaleOffers.map(item => normalizeItem(item)))
  setStatus(IDLE)
*/

