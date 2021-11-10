import React from "react";
import { NavLink} from "react-router-dom"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const bg = useColorModeValue("black");
  const mobileNav = useDisclosure();
  const [user] = useCurrentUser()

  function handle() {
    alert(`${user.addr}`)
  }

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        backgroundColor="black"
      >
        <Flex position="s" backgroundColor="black" justifyContent="space-between" mx="auto" borderColor="#BEE3F8" borderWidth="3px">
          <Flex align="center">
            <chakra.a
              href="/" 
              title="Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Valias</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" color="white" fontWeight="medium" ml="2">
              Menu
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Button variant="ghost"><NavLink to={"/" + user.addr} style={{color:"white"}}>Home</NavLink></Button>
              <Button variant="ghost"><NavLink to={"/"+user.addr+"/congrats"} style={{color:"white"}}>My NFTs</NavLink></Button>
              <Button variant="ghost"><NavLink to={"/"+user.addr+"/create"} style={{color:"white"}}>Create NFT</NavLink></Button>
              {/*<Button variant="ghost" style={{color:"white"}}>Marketplace</Button>*/}
              <Button variant="ghost" style={{color:"white"}} onClick={handle}>Marketplace</Button>
              <Button variant="ghost"><NavLink to={"/"+user.addr+"/about"} style={{color:"white"}}>About Us</NavLink></Button>
            </HStack>
            <Box display={{ base: "inline-block", md: "none" }}>
              <IconButton
                display={{ base: "block", md: "block" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("white", "black")}
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
              />
              
              <VStack
                pos="absolute"
                top={381}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "block" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
                color="white"
                zIndex="100"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
