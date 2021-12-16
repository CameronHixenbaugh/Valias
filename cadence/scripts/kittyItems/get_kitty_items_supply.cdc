import Valias from "../../contracts/Valias.cdc"

// This scripts returns the number of Valias currently in existence.

pub fun main(): UInt64 {    
    return Valias.totalSupply
}
