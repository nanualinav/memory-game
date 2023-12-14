import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Container, Text, Button } from '@chakra-ui/react'

function App() {
  return (
  <ChakraProvider>
    <Container 
      alignItems="center" 
      border="1px solid"
      my="60px" p={5}>
      <Text>Memory Game</Text>
      <Button>Play</Button>
    </Container>
  </ChakraProvider>
  ) 
}
export default App;
