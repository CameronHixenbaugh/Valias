import { HStack, Text, VStack } from '@chakra-ui/react'
import * as React from 'react'

export const UserInfo = (props) => {
  const { name, bio, isVerified, ...stackProps } = props
  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack>
        <Text fontWeight="bold">{name}</Text>
      </HStack>
      <Text
        fontSize="sm"
        textAlign="center"
        noOfLines={2}
        color="#FFD700"
      >
        {bio}
      </Text>
    </VStack>
  )
}
