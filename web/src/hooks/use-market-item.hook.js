//import {useEffect} from "react"
import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import {sansPrefix} from "@onflow/fcl"
import {IDLE, PROCESSING} from "../global/constants"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {useAccountItems} from "../hooks/use-account-items.hook"
import {useKibblesBalance} from "../hooks/use-kibbles-balance.hook"
import {fetchMarketItem} from "../flow/script.get-market-item"
import {buyMarketItem} from "../flow/tx.buy-market-item"
import {cancelMarketListing} from "../flow/tx.remove-sale-offer"
//import { sleep } from "../util/sleep"

function expand(key) {
  return key.split("|")
}

function comp(address, id) {
  return [address, id].join("|")
}

export const $state = atomFamily({
  key: "market-item::state",
  default: selectorFamily({
    key: "market-item::default",
    get: key => async () => await fetchMarketItem(...expand(key)),
  }),
})

export const $status = atomFamily({
  key: "market-item::status",
  default: IDLE,
})

export function useMarketItem(address, id) {
  const [cu] = useCurrentUser()
  const ownerItems = useAccountItems(address)
  const cuItems = useAccountItems(cu.addr)
  const kibble = useKibblesBalance(cu.addr)
  const key = comp(address, id)
  const [item, setItem] = useRecoilState($state(key))
  const [status, setStatus] = useRecoilState($status(key))
  const owned = sansPrefix(cu.addr) === sansPrefix(address)

  /*useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 1 second!')
    }, 2000);
    fetchMarketItem(...expand(key)).then(setItem)
    return () => clearTimeout(timer);
  })*/

  return {
    ...item,
    status,
    owned,
    async buy() {
      await buyMarketItem(
        {itemID: id, ownerAddress: address},
        {
          onStart() {
            setStatus(PROCESSING)
          },
          async onSuccess() {
            if (address !== cu.addr) {
              ownerItems.refresh()
            }
            cuItems.refresh()
            kibble.refresh()
          },
          async onComplete() {
            setStatus(IDLE)
          },
          async onError(error) {
            // TODO: Handle error
          },
        }
      )
    },
    async cancelListing() {
      await cancelMarketListing(
        {itemID: id},
        {
          onStart() {
            setStatus(PROCESSING)
          },
          async onSuccess() {
            cuItems.refresh()
            kibble.refresh()
          },
          async onComplete() {
            setStatus(IDLE)
          },
          async onError(error) {
            // TODO: Handle error
          },
        }
      )
    },
    async refresh() {
      setStatus(PROCESSING)
      await fetchMarketItem(...expand(key)).then(setItem)
      setStatus(IDLE)
    },
  }
}
