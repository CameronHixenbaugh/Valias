import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import {fetchAccountItems} from "../flow/script.get-account-items"
import {IDLE, PROCESSING} from "../global/constants"
import { hash } from "../parts/ipfsUpload.comp"
//import { Dict } from "../parts/account-items-cluster.comp"


export const $state = atomFamily({
  key: "account-items::state",
  default: selectorFamily({
    key: "account-items::default",
    get: address => async () => fetchAccountItems(address),
  }),
})

export const $status = atomFamily({
  key: "account-items::status",
  default: IDLE,
})
/*
export function minterFunc(address, typeID) {
  const [items, setItems] = useRecoilState($state(address))
  const [status, setStatus] = useRecoilState($status(address))


  return {
    ids: items,
    status,

    async mint() {
      alert(`got to mint: ${typeID}`)
      setStatus(PROCESSING)
      await fetch(process.env.REACT_APP_API_KITTY_ITEM_MINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: address,
          // Random typeID between 1 - 5
          //Math.floor(Math.random() * (5 - 1)) + 1
          typeID: hash, //{hash},
        }),
      })
      await fetchAccountItems(address).then(setItems)
      //Dict()
      setStatus(IDLE)
    },
    async refresh() {
      setStatus(PROCESSING)
      await fetchAccountItems(address).then(setItems)
      setStatus(IDLE)
    },
  }
}
*/

export function useAccountItems(address) {
  const [items, setItems] = useRecoilState($state(address))
  const [status, setStatus] = useRecoilState($status(address))


  return {
    ids: items,
    status,

    async mint() {
      setStatus(PROCESSING)
      await fetch(process.env.REACT_APP_API_KITTY_ITEM_MINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: address,
          // Random typeID between 1 - 5
          //Math.floor(Math.random() * (5 - 1)) + 1
          typeID: hash,
        }),
      })
      await fetchAccountItems(address).then(setItems)
      //Dict()
      setStatus(IDLE)
    },
    async refresh() {
      setStatus(PROCESSING)
      await fetchAccountItems(address).then(setItems)
      setStatus(IDLE)
    },
  }
}