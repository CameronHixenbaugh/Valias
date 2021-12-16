import React from "react";
import {Base} from "../../parts/base.comp"
import AuthCluster from "../../parts/auth-cluster.comp.js"
import Navbar from "../../parts/navbar.comp.js"
import Foot from "../../parts/footer.comp"
import { 
  Box
} from "@chakra-ui/react";

export function HowPage (){
   
  return (
    <Base>
        <Box borderWidth="10px" borderColor="black" >
          <AuthCluster/>
        </Box>
        <Box borderWidth="10px" borderColor="black">
          <Navbar />
        </Box>
        <Box textAlign="center" backgroundColor="black" style={{color:"white"}} p="16">
            <h1>
                How does it work?
            </h1> 


        
          <footer>
            <Foot />
          </footer>
        </Box>
    </Base>
  );
};