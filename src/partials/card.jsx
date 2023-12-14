import React from 'react'
import {
    Box,
    Image,
    Text
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Card = ({ card, handleChoice, isFlipped, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <Box
            position='relative'
            width='150px'
            height='250px'
            my={5} boxShadow='xl'>
            <Box
                position="absolute"
                top="0" left="0"
                transform={isFlipped ? "rotateY(0deg)" : "rotateY(90deg)"}
                transition="all ease-in-out 0.5s"
                transitionDelay={isFlipped ? "0.2s" : "0s"}
            >
                <Image
                    src={card.src} alt="card"
                    objectFit="contain">
                </Image>
                <Text
                    align="center"
                    my={3} color="gray.700"
                >{card.name}
                </Text>
            </Box>
            <Box
                as="button"
                width="150px" height="250px"
                top="0" left="0"
                transform={isFlipped ? "rotateY(90deg)" : "rotateY(0deg)"}
                position="absolute"
                transition="all ease-in-out 0.5s"
                transitionDelay={isFlipped ? "0" : "0.2s"}
                onClick={handleClick}
            >
                <Text
                    as="samp"
                    align="center"
                    fontSize="3xl"
                    color="gray.600"
                >Card
                </Text>
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
