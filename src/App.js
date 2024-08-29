import React, { useEffect, useState } from 'react'
import MenuButton from './partials/menu-button'
import Timer from './partials/timer'
import Card from './partials/card'
import AboutCard from './partials/about-card'
import { 
  ChakraProvider, 
  Text, 
  Button,
  Box,
  Heading,
  VStack,
  HStack,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Container,
} from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

// images
import bear from './img/bear.png'
import bird from './img/bird.png'
import fox from './img/fox.png'
import hodgehog from './img/hedgehog.png'
import owl from './img/owl.png'
import rabbit from './img/rabbit.png'
import gameEnd from './img/complete.png'
import gameOverImg from './img/gameover.png'

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
});

const cardInfo = [
  { src: bear, name: 'Bear', matched: false},
  { src: bird, name: 'Bird', matched: false},
  { src: fox, name: 'Fox', matched: false},
  { src: hodgehog, name: 'Hodgehog', matched: false},
  { src: owl, name: 'Owl', matched: false},
  { src: rabbit, name: 'Rabbit', matched: false}
]

const vShapeStyle = {
  clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
}

function App() {
  const [cards, setCards] = useState([])
  const [showMenu, setShowMenu] = useState(true)
  const [showAbout, setShowAbout] = useState(false)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [timer, setTimer] = useState(90)
  const [gameOver, setGameOver] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [headingText, setHeadingText] = useState('Memory Game')

  const shuffleCards = () => {
    const shuffledCards = [...cardInfo, ...cardInfo]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }))

      resetGameState()
      setCards(shuffledCards)
      setShowMenu(false)
      setHeadingText('Welcome!')
   }

  const handleUserChoice = (card) => {
    if (card.matched || card === firstChoice || card === secondChoice) {
      return
    }

    if (firstChoice === null) {
      setFirstChoice(card)
    } else {
      setSecondChoice(card)
    }
  }

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setIsDisabled(true)

      if (firstChoice.src === secondChoice.src) {
          setCards(prevCards => {
              return prevCards.map(card => {
                  if (card.src === firstChoice.src) {
                      return { ...card, matched: true }
                  } else {
                      return card
                  }
              })
          })
          reset()
      } else {
          setTimeout(() => reset(), 1000)
      }
    }
  }, [firstChoice, secondChoice])

  useEffect(() => {
    let timeInterval

    if (!showMenu && !gameOver) {
      timeInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }

    return () => {
      clearInterval(timeInterval)
    }
  }, [showMenu, gameOver])

  useEffect(() => {
    const allCardsMatched = cards.every(card => card.matched);

    if ((allCardsMatched || timer === 0) && !showMenu && cards.length > 0) {
      setIsGameComplete(true)
      setGameOver(true)
    }
  }, [cards, timer, showMenu])

    const reset = () => {
      setFirstChoice(null)
      setSecondChoice(null)
      setIsDisabled(false)
    }

    const resetGameState = () => {
      setCards([])
      setFirstChoice(null)
      setSecondChoice(null)
      setIsDisabled(false)
      setTimer(90)
      setGameOver(false)
      setIsGameComplete(false)
    }

    const handleExitToMenu = () => {
      resetGameState()
      setShowMenu(true)
      setHeadingText('Memory Game')
      setCards([])
    }

    const handleGameRestart = () => {
      resetGameState()
      shuffleCards()
      setHeadingText('Welcome!')
    }

    const handleShowAbout = () => {
      setShowMenu(false)
      setShowAbout(true)
      setHeadingText('About')
    }

    const handleBackFromAbout = () => {
      setShowMenu(true)
      setShowAbout(false)
      setGameOver(false)
      setIsGameComplete(false)
      setHeadingText('Memory Game')
    }

   return (
    <ChakraProvider theme={theme}>
      <Box 
      w='100%'
      minHeight='100vh'
      backgroundColor={showMenu ? '#7E84D4' : 'F0EFE9'}
      display='flex'
      alignItems='top'
      justifyContent='center'
      p={{ base: 4, md: 8 }}
      overflowX="hidden"
      >
      <Container align='center'
                maxWidth='100%'
               >
            <VStack 
              mt={{ base: '40px', md: '50px' }}  align='center'
            >
            <Heading
                as='h3' size='2xl' fontWeight='800'
                mb={{ base: '2rem', md: '4rem' }} color={showMenu ? '#F0EFE9' : '#4B4B4B'}
            >{headingText}
            </Heading>
            {showMenu ? (
                <Box 
                  style={vShapeStyle} 
                  display='flex' 
                  justifyContent='center' 
                  alignItems='center'
                  width={{ base: '100%', md: '80%', lg: '50%' }}
                  overflowX="hidden"
                  >
                    <VStack
                        spacing={4} width={{ base: '100%', md: '100%'}}
                        >
                        <MenuButton onClick={shuffleCards}>Play</MenuButton>
                        <MenuButton onClick={handleShowAbout}>About</MenuButton>
                        <MenuButton>Scores</MenuButton>
                        <MenuButton></MenuButton>
                        <MenuButton></MenuButton>
                    </VStack>
                </Box>
            ) : showAbout ? (
              <>
                <AboutCard />
                <Button colorScheme='purple' mt={{ base: '1rem', md: '2rem' }} onClick={handleBackFromAbout}>
                    Go Back
                  </Button>
                </>
            ) : (
                <Box vh='100%'>
                  <HStack justify='space-between' w='100%' mb='1rem'
                          flexDirection={{ base: 'column', md: 'row' }}
                          >
                  <Timer
                        seconds={timer}
                        isGameOver={gameOver} />
                        <Button colorScheme='orange' borderRadius='50' mt={{ base: '1rem', md: 0 }} 
                                onClick={handleExitToMenu}>Exit Game</Button>
                  </HStack>
                    <Grid
                        templateColumns={{
                          base: 'repeat(3, 1fr)',
                          md: 'repeat(4, 1fr)',
                          lg: 'repeat(6, 1fr)',
                        }}
                        gap={{ base: '1rem', md: '2rem' }}
                    >{cards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            handleChoice={handleUserChoice}
                            isFlipped={card === firstChoice || card === secondChoice || card.matched}
                            disabled={isDisabled}></Card>
                    ))}
                    </Grid>
                </Box>
            )}
            <Modal
                isOpen={(gameOver || isGameComplete) && !showAbout && !showMenu && cards.length > 0}
                onClose={() => { }}
                size={{ base: 'xs', md: 'xs', lg: 'lg'}}
                isCentered>
                <ModalOverlay size='100%'/>
                <ModalContent p='2rem'>
                    <ModalBody >
                        <VStack align='center' justify='center' spacing={4}>
                            <Image
                                src={timer === 0 ? gameOverImg : gameEnd}
                                alt='Game Over' 
                                />
                            <Text fontSize='3xl' fontWeight='medium' textAlign='center'>{timer === 0 ? 'Time is Over!' : 'Congrats!'}
                            </Text>
                            <Button
                            backgroundColor='#7E84D4'
                            color='white'
                            borderRadius='28px'
                            variant='ghost' mt={4}
                            onClick={handleGameRestart}
                            >Try Again</Button>
                          </VStack>
                    </ModalBody>
                  </ModalContent>
              </Modal>
          </VStack>
        </Container>
        </Box>
  </ChakraProvider>
  ) 
}
export default App;
