import Vex from "../../contracts/Vex.cdc"

// This script returns the total amount of Vex currently in existence.

pub fun main(): UFix64 {

    let supply = Vex.totalSupply

    log(supply)

    return supply
}
