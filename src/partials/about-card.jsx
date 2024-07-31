import React, { useState } from 'react'
import { Box, Image, Text, VStack } from '@chakra-ui/react'
import aboutCardBack from '../img/back-card.png'

const AboutCard = () => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(prevState => !prevState)
    }

    return (
        <Box
            position='relative'
            width='300px'
            height='400px'
            my={3}
            boxShadow='md'
            onClick={handleFlip}
            style={{ perspective: '1000px' }}
        >
            <Box
                position='absolute'
                width='100%'
                height='100%'
                top='0' left='0'
                transform={isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}
                transition='transform 0.5s'
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
                <Box
                    position='absolute'
                    width='100%'
                    height='100%'
                    top='0'
                    left='0'
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <Image
                        src={aboutCardBack}
                        alt='About Card'
                        width='100%'
                        height='100%'
                    />
                </Box>
                <Box
                    position='absolute'
                    width='100%'
                    height='100%'
                    top='0'
                    left='0'
                    transform='rotateY(180deg)'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    backgroundColor='white'
                    color='black'
                    p='2rem'
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <VStack spacing={2} textAlign='left'>
                        <Text
                            fontSize='lg'
                        >
                            - This project is a playful experiment with <span>Chakra UI</span>, a user-friendly React component library.
                        </Text>
                        <Text
                            fontSize='lg'
                        >
                            - It helps improve cognitive skills and provide entertainment.
                        </Text>
                        <Text
                            fontSize='lg'
                        >
                            😌 Have fun matching pairs!
                        </Text>
                    </VStack>
                </Box>
            </Box>
        </Box>
    )
}

export default AboutCard
