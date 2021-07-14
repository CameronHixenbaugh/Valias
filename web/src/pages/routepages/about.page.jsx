/*users.jsx*/
import React from "react";
import {Base} from "../../parts/base.comp"
import AuthCluster from "../../parts/auth-cluster.comp.js"
import Navbar from "../../parts/navbar.comp.js"
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
        <Box backgroundColor="black" style={{color:"white"}}>
          <Text>
            This is what we're all about!
          </Text>
        </Box>
    </Base>
  );
};