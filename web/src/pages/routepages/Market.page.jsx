import React, {Suspense} from "react";
import {Base} from "../../parts/base.comp"
import AuthCluster from "../../parts/auth-cluster.comp.js"
import {MarketItemsCluster} from "../../parts/market-items-cluster.comp.js"
import Navbar from "../../parts/navbar.comp.js"
import {useAddress} from "../../hooks/use-url-address.hook"
import Foot from "../../parts/footer.comp"
import { 
  Box
} from "@chakra-ui/react";

export function Market (){
  const address = useAddress()

  return (
    <Base>
        <Box borderWidth="10px" borderColor="black" >
          <AuthCluster/>
        </Box>
        <Box borderWidth="10px" borderColor="black">
          <Navbar />
        </Box>
        <Box backgroundColor="black" style={{color:"white"}} p="5">
            <Box textAlign="center" backgroundColor="black" style={{color:"white"}}>
                <h3>NFTs for Sale</h3>
            </Box>
          <Suspense fallback={null} >
              <MarketItemsCluster address={address} />
          </Suspense>
        </Box>
        <footer>
          <Foot />
        </footer>
    </Base>
  );
};
