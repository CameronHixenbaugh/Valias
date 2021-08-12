import {Base} from "../parts/base.comp"
import React from "react"
//import ReactDOM from "react-dom"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Redirect} from "react-router-dom"
import {MarketItemsCluster} from "../parts/market-items-cluster.comp"
import {AuthCluster} from "../parts/auth-cluster.comp"
import {MarketItemsCount} from "./account/index"
//import "./routepages/preloadgif.css"
import "./routepages/preloadgif.js"
//import vgif from "../parts/Images/vault.gif"
import Navbar from "../parts/navbar.comp"
import {
  Box,
  Center,
  Text,
  VStack
} from "@chakra-ui/react" 

//var slider
//var toggle




export function Page() {
  const [user, loggedIn] = useCurrentUser()

  if (loggedIn) return <Redirect to={"/" + user.addr} />


/*
document.getElementById('toggle').addEventListener('click', toggleSlider, false);

function toggleSlider(){
  if (slider.classList.contains('opened')) {
    slider.classList.remove('opened');
    slider.classList.add('closed');
  } else {
    slider.classList.remove('closed');
    slider.classList.add('opened');
  }
}

*/
  return (
    <Base>
    
   {/*}   
    <div id="preloader" style={{
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: 999,
      overflow: "visible",
      background: 'url(' + vgif + ') no-repeat center center',
      backgroundColor: "black"
    }}></div>
            <div id="content">
  
*/}

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous"></link>

        <Box borderWidth="10px" borderColor="black" >
        <AuthCluster/>
        </Box>
        <Box borderWidth="10px" borderColor="black">
          <Navbar />
        </Box>
        <Box backgroundImage={'url(https://burst.shopifycdn.com/photos/ripples-of-sand-in-black-and-white.jpg?width=4460&height=4460&exif=1&iptc=1)'}
    backgroundSize={'cover'} backgroundPosition={'center center'} p={5}>
        <Center>
         <HStack>
                <Box fontSize="6xl" color="white" p={25}>
                  What's For Sale in The Vault?
                </Box>
              </HStack>
                <MarketItemsCount />
              </Center>
              <br/>
              <Center>
              <Box fontSize="4xl" color="white" backgroundColor="black" maxW="lg">
              <MarketItemsCluster />
              </Box>
        </Center>
        </Box>
        {/*</div>*/}
    </Base>
  )
}
/*
function toggleSlider(){
  ( (ReactDOM.render('<div class="slider"></div>', document.querySelector('.slider')).classList.contains('opened')) ?
    (ReactDOM.render('<div class="slider"></div>', document.querySelector('.slider')).classList.remove('opened'),
    ReactDOM.render('<div class="slider"></div>', document.querySelector('.slider')).classList.add('closed'))
   : 
    (ReactDOM.render('<div class="slider"></div>', document.querySelector('.slider')).classList.remove('closed'),
    ReactDOM.render('<div class="slider"></div>', document.querySelector('.slider')).classList.add('opened'))
  
)};
ReactDOM.render('<button id="toggle"></button>', document.getElementById('toggle').addEventListener('click', toggleSlider, false));

toggle.addEventListener('click', toggleSlider, false);

function toggleSlider(){
  if (slider.classList.contains('opened')) {
    slider.classList.remove('opened');
    slider.classList.add('closed');
  } else {
    slider.classList.remove('closed');
    slider.classList.add('opened');
  }
}
*/