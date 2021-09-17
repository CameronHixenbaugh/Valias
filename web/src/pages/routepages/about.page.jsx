/*users.jsx*/
import React from "react";
import {NavLink, Redirect } from "react-router-dom";
import {Base} from "../../parts/base.comp"
import {useCurrentUser } from "../../hooks/use-current-user.hook";
import {useAddress} from "../../hooks/use-url-address.hook"
import AuthCluster from "../../parts/auth-cluster.comp.js"
import Navbar from "../../parts/navbar.comp.js"
import Foot from "../../parts/footer.comp"
import { 
  Box,
  Text
} from "@chakra-ui/react";

export function Aboutpage (){
    const address = useAddress()
    const [loggedIn] = useCurrentUser()
    if (address == null) return <Redirect to={"/"} /> 
   
  return loggedIn ?(
    <Base>
        <Box borderWidth="10px" borderColor="black" >
          <AuthCluster/>
        </Box>
        <Box borderWidth="10px" borderColor="black">
          <Navbar />
        </Box>
        <Box textAlign="center" backgroundColor="black" style={{color:"white"}}>
          <Text>
            This is what we're all about!
          </Text> 
          <footer>
            <Foot />
          </footer>
        </Box>
    </Base>
  ):(
    <Base>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous"></link>
      <Box borderWidth="10px" borderColor="black" >
        <AuthCluster/>
      </Box>
      <Box borderWidth="10px" borderColor="black">
        <Navbar />
      </Box>
      <Box backgroundColor="black">
        <Text textAlign="center" fontSize="4xl" color="white"><b>Oops! Please click this link:</b></Text>
        <Text textAlign="center" fontSize="4xl"><NavLink to={"/"} >Back to Home</NavLink></Text>
        <footer>
          <Foot />
        </footer>
      </Box>
    </Base>
  )
};