import {atom, useRecoilState} from "recoil"
import useSWR from "swr"
import {IDLE, LOADING} from "../global/constants"
import fetcher from "../util/fetcher"
import normalizeItem from "../util/normalize-item"

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
  var fetcher1 = JSON.stringify(fetcher)

  useSWR(url, fetcher1, {
    initialData: items,
    refreshInterval: 10,
    onLoadingSlow: () => {
      setStatus(LOADING)
    },
    onSuccess: ({latestSaleOffers}) => {
      //var temp = JSON.stringify(items)
      setItems(latestSaleOffers.map(item => normalizeItem(item)))
      setStatus(IDLE)
    },
    onError: error => {
      console.log("sale offers" + fetcher)
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
