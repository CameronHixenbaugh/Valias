import { Avatar, Box, Flex } from '@chakra-ui/react'
import * as React from 'react'

export const CardWithAvatar = (props) => {
  const { children, avatarProps } = props
  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      padding="8"
      borderWidth="4px"
      borderColor="#FFD700"
      boxShadow= "inset 0px 4px 4px #E2E8F0"
      filter= "drop-shadow(0px 4px 10px #C4C4C4)"
      color="#FFD700"
      position="relative"
      bg="black"
    >
      <Box position="absolute" inset="0" height="20" bg="#BEE3F8" roundedTop="inherit" />
      <Avatar size="xl" {...avatarProps} />
      {children}
    </Flex>
  )
}
