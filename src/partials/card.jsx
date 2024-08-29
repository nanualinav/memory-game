import React from 'react'
import {
    Box,
    Image
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import backCard from '../img/back-card.png'

const Card = ({ card, handleChoice, isFlipped, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <Box
            position='relative'
            width={{ base: '100px', md: '150px' }}
            height={{ base: '140px', md: '200px' }}
            my={3} boxShadow='md'>
            <Box
                position='absolute'
                width='100%'
                height='100%'
                top='0' left='0'
                style={{ backfaceVisibility: 'hidden' }}
                transform={isFlipped ? 'rotateY(0deg)' : 'rotateY(90deg)'}
                transition='all ease-in-out 0.5s'
                transitionDelay={isFlipped ? '0.1s' : '0s'}
            >
                <Image
                    src={card.src} alt='card'
                    objectFit='cover'
                    width='100%'
                    height='100%'
                />
            </Box>
            <Box
                as='button'
                width='100%' height='100%'
                top='0' left='0'
                transform={isFlipped ? 'rotateY(90deg)' : 'rotateY(0deg)'}
                style={{ backfaceVisibility: 'hidden' }}
                position='absolute'
                transition='all ease-in-out 0.5s'
                transitionDelay={isFlipped ? '0' : '0.1s'}
                onClick={handleClick}
            >
                <Image src={backCard}
                    width='100%'
                    height='100%'
                />
            </Box>
        </Box>
    )
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    handleChoice: PropTypes.func.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
}

export default Card
