/*users.jsx*/
import React, {Suspense} from "react";
import { Redirect } from "react-router-dom";
import {Base} from "../../parts/base.comp"
import {useCurrentUser } from "../../hooks/use-current-user.hook";
import AuthCluster from "../../parts/auth-cluster.comp.js"
import {CreateNFTCluster} from "../../parts/create-nft-cluster.comp.js"
import Navbar from "../../parts/navbar.comp.js"
import {useAddress} from "../../hooks/use-url-address.hook"
import Foot from "../../parts/footer.comp"
import { 
  Box
} from "@chakra-ui/react";

export function CreatePage (){
  const address = useAddress()
  const [user, loggedIn, cu] = useCurrentUser()

  return loggedIn ?(
    <Base>
        <Box borderWidth="10px" borderColor="black" >
          <AuthCluster/>
        </Box>
        <Box borderWidth="10px" borderColor="black">
          <Navbar />
        </Box>
        <Box backgroundColor="black" style={{color:"white"}}>
          <Suspense fallback={null}>
              <CreateNFTCluster address={address} />
          </Suspense>
        </Box>
        <footer>
          <Foot />
        </footer>
    </Base>
  ):(
    <Base>
      <div>\\<Redirect to="/" /></div>
    </Base>
  );
};


