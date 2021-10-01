import {Suspense} from "react"
//import * as fcl from "@onflow/fcl"
//import {NavLink, Redirect} from "react-router-dom"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Link as A} from "react-router-dom"
import {
  Box,
  Button,
  Center,
  HStack,
  Link,
  Spacer
} from "@chakra-ui/react"


//import logo from "./images/ValiasLogo.svg"

export function AuthCluster() {
  const [user, loggedIn, {signUp, logIn, logOut}] = useCurrentUser()

  return loggedIn ? (
    <Box backgroundColor="black">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css?family=Sora&display=swap" rel="stylesheet" />
      <div className="jumbotron-fluid" id="bg">
        <div className="container-fluid" >
          <Center>
            <Link as={A} mr="4" to={"/" + user.addr}>
              Account: {user.addr}
            </Link>
          </Center>
          <Box >
            <HStack>
              <img className="img-fluid" alt="ValiasLogo" style={{width: 150, height: 150}} src={'https://drive.google.com/uc?export=view&id=1iKkvy1tPabahiV3eRNGZU_7DRbXcPLJk'} />           
              <div className="container-fluid text-right">
                <Button type="button" className="btn" onClick={logOut} style={{
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
                  Log Out{/*<NavLink to={"/"} >Log Out</NavLink>*/}
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
            <img className="img-fluid" alt="ValiasLogo" style={{width: 150, height: 150}} src={'https://drive.google.com/uc?export=view&id=1iKkvy1tPabahiV3eRNGZU_7DRbXcPLJk'} />
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
