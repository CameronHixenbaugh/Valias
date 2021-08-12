import {Base} from "../parts/base.comp"
import React from "react"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Redirect} from "react-router-dom"
//import {MarketItemsCluster} from "../parts/market-items-cluster.comp"
import {AuthCluster} from "../parts/auth-cluster.comp"
//import {MarketItemsCount} from "./account/index"
import "./routepages/preloadgif.js"
import Navbar from "../parts/navbar.comp"
import {
  Box,
  Center,
  Text,
  VStack
} from "@chakra-ui/react"

import sphere from "./../parts/images/WordSphere.mp4"
import thinker from "./../parts/images/Thinking.mp4"
import flow from "./../parts/images/FLOWbutton.png"
import yes from "./../parts/images/NOButton.png"
import dn from "./../parts/images/DNGButton.png"
import grid from "./../parts/images/PicGrid.png"
import frame5 from "./../parts/images/Frame5.png"
import frame6 from "./../parts/images/Frame6.png"
import frame7 from "./../parts/images/Frame7.png"


export function Page() {
  const [user, loggedIn] = useCurrentUser()

  if (loggedIn) return <Redirect to={"/" + user.addr} />

  return (
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
        <br />
        <Box id="vid">
          <video className="rounded-circle" style={{width: 50, height: 50}} playsInline="playsInline" autoPlay="autoPlay" muted="muted" loop="loop">
            <source src={sphere} type='video/mp4' />
          </video>
          <div className="container h-100">
            <div className=" h-100 text-center align-items-center">
              <div className="w-100 text-white" />
            </div>
          </div>
        </Box>
        <br />
        <Box>
          <Center>
            <Text textAlign="center" style={{
              fontFamily: "Sora",
              fontStyle: "normal",
              fontWeight: "bolder",
              fontSize: "25px",
              lineHeight: "50px",
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                A Decentralized NFT Exchange with the Most Secure Vault to Store your NFTs 
            </Text>
          </Center>
        </Box>
        <br />
        <br />
        <br />
        <Box>
          <Center>
            <Text textAlign="center" style={{
              fontFamily: "Sora",
              fontStyle: "normal",
              fontWeight: "bolder",
              fontSize: "25px",
              lineHeight: "50px",
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                One Step Closer Towards Concealment of Personal Data
            </Text>
          </Center>
        </Box>
        <Box id="vid">
          <video style={{width: 50, height: 50}} playsInline="playsInline" autoPlay="autoPlay" muted="muted" loop="loop">
            <source src={thinker} type='video/mp4' />
          </video>
          <div className="container h-100">
            <div className=" h-100 text-center align-items-center">
              <div className="w-100 text-white" />
            </div>
          </div>
        </Box>
        <Box>
          <Center>
            <VStack>
              <Text textAlign="center" style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "bolder",
                fontSize: "30px",
                lineHeight: "50px",
                letterSpacing: "-0.06em",
                color: "#FFFFFF",
                textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                  The Most Secure NFT Exchange
              </Text>
              <Text textAlign="center" style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "bolder",
                fontSize: "20px",
                lineHeight: "10px",
                letterSpacing: "-0.06em",
                color: "#FFFFFF",
                textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                  Your Own Personal Vault   
              </Text>
              </VStack>
          </Center>
        </Box>
        <br />
        <br />
        <br />
        <br />
        <Box>
          <Center>
            <VStack>
              <Text textAlign="center" style={{
              fontFamily: "Sora",
              fontStyle: "normal",
              fontWeight: "bolder",
              fontSize: "100px",
              lineHeight: "50px",
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                VEX
              </Text>
              <Text textAlign="center" style={{
              fontFamily: "Sora",
              fontStyle: "normal",
              fontWeight: "bolder",
              fontSize: "40px",
              lineHeight: "50px",
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>       
                The Vault EXchange Token
              </Text>
            </VStack>
          </Center>
          <VStack>
            <Box>
                <Text color="white">
                  Coin
                </Text>
            </Box>
            <Box>
              <img className="img-fluid" alt="FlowBox" src={flow} style={{width: 800, height: 150}}/>
              <img className="img-fluid" alt="NoLimitBox" src={yes} style={{width: 800, height: 150}}/>
              <img className="img-fluid" alt="DNGLBBox" src={dn} style={{width: 800, height: 150}}/>
            </Box>
          </VStack>
        </Box>
        <br />
        <br />
        <br />
        <br />
        <Box>
          <Center>
            <VStack>
              <Text textAlign="center" style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "bolder",
                fontSize: "40px",
                lineHeight: "50px",
                letterSpacing: "-0.06em",
                color: "#FFFFFF",
                textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                  Created With A Vision to Level The Playing Field
              </Text>
              <Text textAlign="center" style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "bolder",
                fontSize: "25px",
                lineHeight: "50px",
                letterSpacing: "-0.06em",
                color: "#FFFFFF",
                textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                  Community Protected, Infinite Growth, Immediate Liquidation
              </Text>
              <img className="img-fluid" alt="PictureGrid" src={grid} style={{width: 600, height: 600}}/>
            </VStack>
          </Center>
        </Box>
        <Box>
          <Center>
            <img className="img-fluid" alt="SecondGrid" src={frame5} style={{width: 850, height: 750}}/>
          </Center>
        </Box>
        <br />
        <br />
        <br />
        <Box>
          <Center>
            <img className="img-fluid" alt="CreationOfAdam" src={frame6} style={{width: 1000, height: 700}}/>
          </Center>
        </Box>
        <footer>
          <Center>
            <img className="img-fluid" alt="ValiasFooter" src={frame7} style={{width:"100%", height: 500}}/>
          </Center>
        </footer>
      </Box>
    </Base>
  )
}