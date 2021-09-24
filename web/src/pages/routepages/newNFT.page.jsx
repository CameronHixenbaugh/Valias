import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import {useCurrentUser } from "../../hooks/use-current-user.hook";
import {useAddress} from "../../hooks/use-url-address.hook"
import {Base} from "../../parts/base.comp"
import AuthCluster from "../../parts/auth-cluster.comp.js"
import Navbar from "../../parts/navbar.comp.js"
import Foot from "../../parts/footer.comp"
import { 
  Box,
  Button,
  Center,
  Text,
  VStack
} from "@chakra-ui/react";

import "../../pages/vid2.css"
//import fireworks from "../../parts/images/fireworks.mp4"

var name
var description
var price
var length
var price3
var hash 

function buildNFT(n, d, p, l, p3, h){
    name = n
    description = d
    price = p
    length = l
    price3 = p3
    hash = h


}

export function Newnft (){
    const address = useAddress()
    const [user, loggedIn] = useCurrentUser()
    if (address == null) return <Redirect to={"/"} />  

    var image = "https://ipfs.io/ipfs/"+ hash

  return loggedIn ?(
    <Base>
        <Box borderWidth="10px" borderColor="black" >
          <AuthCluster/>
        </Box>
        <Box borderWidth="10px" borderColor="black"> 
          <Navbar />
        </Box>
        <Box id="vid">
            <div className="overlay"></div>
            <video playsInline="playsInline" autoPlay="autoPlay" muted="muted" loop="loop">
                <source src={'https://drive.google.com/uc?export=view&id=16AKIxDoMt_ZOozqlt4eKPqRHv9lBWbd7'} type='video/mp4' />
            </video>
            <div className="container h-100">
                <div className="d-flex h-100 text-center align-items-center">
                    <div className="w-100">
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                            integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                            crossOrigin="anonymous"></link>
                        <div className="jumbotron-fluid">
                            <Text color="white" fontSize="6xl" ><b>Congratulations!</b></Text>
                            <Text color="white" fontSize="4xl" ><b>This is your new NFT!</b></Text>
                            <Center>
                                <VStack>
                                    <Text color="white" fontSize="4xl" ><b>{name}</b></Text>
                                    <img src={image} alt="New NFT" width="75%" />
                                    <Text color="white" fontSize="2xl" width="75%" ><b>{description}</b></Text>
                                    <Text color="white" fontSize="2xl" ><b>Price: {price}</b></Text>
                                    <Button backgroundColor= "#BEE3F8" variant="ghost"><NavLink to={"/" + user.addr} style={{color:"black"}}>Home</NavLink></Button>
                                </VStack>
                            </Center>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </Box>
        <Foot />
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

export {buildNFT, hash, price};