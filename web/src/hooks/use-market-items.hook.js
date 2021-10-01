import {atom, useRecoilState} from "recoil"
import useSWR from "swr"
import {IDLE, LOADING} from "../global/constants"
import fetcher from "../util/fetcher"
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
  const fetcherFunc = (url) => axios.get(url).then((res) => res.data);
  const [items, setItems] = useRecoilState($marketItemsState)

  useSWR(url, fetcherFunc, {
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
      console.log("url is: " + url)
      console.log("Failed to fetch market items." + error)
    },
  })

  const asMap = new Map(items.map(item => [item.itemID, item]))

  return {
    status,
    items,
    has(item) {
      return asMap.has(item.itemID)
    },
  }
}
