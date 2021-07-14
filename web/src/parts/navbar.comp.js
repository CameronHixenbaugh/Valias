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
//import Vault from "./../parts/images/vault.jpg";

export default function Navbar() {
  const bg = useColorModeValue("#A0AEC0");
  const mobileNav = useDisclosure();
  const [user] = useCurrentUser()

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex position="s" justifyContent="space-between" mx="auto">
          <Flex align="center">
            <chakra.a
              href="/" 
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            {/*<img className="img-fluid rounded-circle" alt="vaultDoor" src={Vault} style={{width: 60, height: 50}} />*/}
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              The Vault
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Button variant="ghost"><NavLink to={"/" + user.addr} style={{color:"black"}}>Home</NavLink></Button>
              <Button variant="ghost">My NFTs</Button>
              <Button variant="ghost"><NavLink to={"/"+user.addr+"/create"} style={{color:"black"}}>Create NFT</NavLink></Button>
              <Button variant="ghost">Marketplace</Button>
              <Button variant="ghost"><NavLink to={"/"+user.addr+"/about"} style={{color:"black"}}>About Us</NavLink></Button>
            </HStack>
            <Button colorScheme="brand" size="sm">
              Get Started
            </Button>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
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
