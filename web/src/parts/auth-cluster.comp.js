import {Suspense} from "react"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Link as A} from "react-router-dom"
import './../pages/vid.css';
import {
  Box,
  Button,
  Center,
  HStack,
  Link,
  Spacer
} from "@chakra-ui/react"

import Vault from "./images/vault.jpg"
import rain from "./images/rain.mp4"
import logo from "./images/ValiasLogo.svg"

export function AuthCluster() {
  const [user, loggedIn, {signUp, logIn, logOut}] = useCurrentUser()

  return loggedIn ? (
    <Box id="vid">
        <div className="overlay"></div>
          <video playsInline="playsInline" autoPlay="autoPlay" muted="muted" loop="loop">
            <source src={rain} type='video/mp4' />
          </video>
          <div className="container h-100">
    <div className="d-flex h-100 text-center align-items-center">
      <div className="w-100 text-white">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous"></link>
      <div className="jumbotron-fluid">
        <Center className="container-fluid" >
          <img className="img-fluid rounded-circle" alt="vaultDoor" src={Vault} style={{width: 225, height: 200}}/>
        </Center>
        <div className="container-fluid text-center">
          <h1 className="display-3 font-weight-bold align-middle text-white">The Vault</h1>
        </div>
        <Spacer />
        <div className="container-fluid text-center text-white">
          <Link as={A} mr="4" to={"/" + user.addr}>
            <u>Acct: {user.addr}</u>
          </Link>
          <Button type="button" className="btn btn-light mr-5" onClick={logOut}>
            Log Out
          </Button> 
        </div>
      </div>
      </div>
      </div>
      </div>
    </Box>
  ) : (
    <Box backgroundColor="black">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css?family=Sora&display=swap" rel="stylesheet" />
      <div className="jumbotron-fluid" id="bg">
        <div className="container-fluid" >
          <Box >
            <HStack>
              <img className="img-fluid" alt="ValiasLogo" src={logo} style={{width: 150, height: 150}}/>
              <div className="container-fluid text-right">
                <Button type="button" className="btn mr-4" onClick={logIn} style={{
                  border: "2px solid #BEE3F8",
                  boxSizing: "border-box",
                  boxShadow: "inset 0px 4px 4px #E2E8F0",
                  filter: "drop-shadow(0px 4px 4px #C4C4C4)",
                  borderRadius: "6px",
                  fontFamily: "Sora",
                  fontStyle: "normal",
                  fontWeight: "bolder",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "rgba(226, 232, 240, 0.92)",
                  textShadow: "0px 4px 4px rgba(196, 196, 196, 0.0989583)",
                  backgroundColor: "black"
                }}>
                  Log In
                </Button>
                <Button type="button" className="btn" onClick={signUp} style={{
                  border: "2px solid #BEE3F8",
                  boxSizing: "border-box",
                  boxShadow: "inset 0px 4px 4px #E2E8F0",
                  filter: "drop-shadow(0px 4px 4px #C4C4C4)",
                  borderRadius: "6px",
                  fontFamily: "Sora",
                  fontStyle: "normal",
                  fontWeight: "bolder",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "rgba(226, 232, 240, 0.92)",
                  textShadow: "0px 4px 4px rgba(196, 196, 196, 0.0989583)",
                  backgroundColor: "black"
                }}>
                  Sign Up
                </Button>
              </div>
              </HStack>
          </Box>
        </div>
        <div className="container-fluid text-center">
          <span style={{
            fontFamily: "Sora",
            fontStyle: "normal",
            fontWeight: "bolder",
            fontSize: "120px",
            lineHeight: "151px",
            letterSpacing: "-0.06em",
            color: "#FFFFFF",
            textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
              VALIAS
          </span>
        </div>
        <Spacer />
      </div>
    </Box>
  )
}

export default function WrappedAuthCluster() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCluster />
    </Suspense>
  )
}
