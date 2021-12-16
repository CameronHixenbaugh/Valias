import ValiasMarket from "../../contracts/ValiasMarket.cdc"

transaction(itemID: UInt64) {
    let marketCollection: &ValiasMarket.Collection

    prepare(signer: AuthAccount) {
        self.marketCollection = signer.borrow<&ValiasMarket.Collection>(from: ValiasMarket.CollectionStoragePath)
            ?? panic("Missing or mis-typed ValiasMarket Collection")
    }

    execute {
        let offer <-self.marketCollection.remove(itemID: itemID)
        destroy offer
    }
}
