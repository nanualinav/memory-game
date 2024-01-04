import React, { useEffect, useState } from 'react'
import MenuButton from './partials/menu-button'
import Timer from './partials/timer'
import Card from './partials/card'
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
  Image
} from '@chakra-ui/react'

// images
import bear from './img/bear.png'
import bird from './img/bird.png'
import fox from './img/fox.png'
import hodgehog from './img/hedgehog.png'
import owl from './img/owl.png'
import rabbit from './img/rabbit.png'
import gameEnd from './img/complete.png'
import gameOverImg from './img/gameover.png'

const cardInfo = [
  { src: bear, name: 'Bear', matched: false},
  { src: bird, name: 'Bird', matched: false},
  { src: fox, name: 'Fox', matched: false},
  { src: hodgehog, name: 'Hodgehog', matched: false},
  { src: owl, name: 'Owl', matched: false},
  { src: rabbit, name: 'Rabbit', matched: false}
]

const vShapeStyle = {
  clipPath: "polygon(0 0, 100% 0, 50% 100%)"
}

function App() {
  const [cards, setCards] = useState([])
  const [showMenu, setShowMenu] = useState(true)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [timer, setTimer] = useState(90)
  const [gameOver, setGameOver] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardInfo, ...cardInfo]
        .sort(() => Math.random() - 0.5)
          .map((card) => ({ ...card, id: Math.random() }))

      setCards(shuffledCards)
      setShowMenu(false)
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

    if ((allCardsMatched || timer === 0) && !showMenu) {
      setIsGameComplete(true)
      setGameOver(true)
    }
  }, [cards, timer, showMenu])

    const reset = () => {
      setFirstChoice(null)
      setSecondChoice(null)
      setIsDisabled(false)
    }

    const handleGameRestart = () => {
      setGameOver(false)
      setShowMenu(true)
      setIsGameComplete(false)
      setTimer(90)
    }
  return (
  <ChakraProvider>
    <VStack
            mt="70px" align="center"
            >
            <Heading
                as="h3" size="lg"
                mb="4" color="gray.800"
            >Memory Game

            </Heading>
            {showMenu ? (
                <Box style={vShapeStyle} >
                    <VStack
                        spacing={4} width="700px">
                        <MenuButton onClick={shuffleCards}>Play</MenuButton>
                        <MenuButton>Scores</MenuButton>
                        <MenuButton>About</MenuButton>
                        <MenuButton></MenuButton>
                        <MenuButton></MenuButton>
                    </VStack>
                </Box>
            ) : (
                <Box vh="100%">
                    <Timer
                        seconds={timer}
                        isGameOver={gameOver} />
                    <Grid
                        templateColumns='repeat(6, 1fr)'
                        gap={6}
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
                isOpen={gameOver || isGameComplete}
                nClose={() => { }}
                isCentered>
                <ModalOverlay size="100vh"/>
                <ModalContent p={5}>
                    <ModalBody align="center">
                        <HStack>
                            <Image
                                src={timer === 0 ? gameOverImg : gameEnd}
                                alt="Game Over"></Image>
                            <Text fontSize="5xl">{timer === 0 ? "Game Over" : "Congrats!"}</Text>
                        </HStack>
                        <Button
                            colorScheme="gray.500"
                            variant="ghost" mt={4}
                            onClick={handleGameRestart}
                        >Try Again</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </VStack>
  </ChakraProvider>
  ) 
}
export default App;
