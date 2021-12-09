/*users.jsx*/
import React from "react";
import {Base} from "../../parts/base.comp"
import AuthCluster from "../../parts/auth-cluster.comp.js"
import Navbar from "../../parts/navbar.comp.js"
import Foot from "../../parts/footer.comp"
import { 
  Box,
  Text
} from "@chakra-ui/react";

export function Aboutpage (){
   
  return (
    <Base>
        <Box borderWidth="10px" borderColor="black" >
          <AuthCluster/>
        </Box>
        <Box borderWidth="10px" borderColor="black">
          <Navbar />
        </Box>
        <Box textAlign="center" backgroundColor="black" style={{color:"white"}} p="16">
          <Text>
            Valias is a USD-based NFT exchange that is built with Flow’s unique and powerful infrastructure and uses Blocto as a third-party wallet service. Flow is a new generation of blockchain and uses Multi-role architecture, this design is unique, allowing the network to scale to serve billions of users without reducing safety or decentralization. This new ledger protects users and their NFTS, guaranteeing the privacy of each and every transaction. Valias is just like Flow in the way that it is an improved version of its predecessors. Valias provides a peer distributed exchange that allows every NFT to reside within its Vault-like infrastructure, all while creating a user-friendly interface. Valias is creating a place where anyone can affordably and safely create, sell, or buy NFTs. The use of making everyday items into a digital version is a process that is becoming more familiar every day. NFTs are the future, now wouldn’t you like to help create it?

            I have one question to ask you?

            Do you want to be a part of the future, or do you want to create it?

            </Text> 
          <footer>
            <Foot />
          </footer>
        </Box>
    </Base>
  );
};