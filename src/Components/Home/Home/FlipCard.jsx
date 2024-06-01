import React, { useState } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import ReactCardFlip from "react-card-flip"

const FlipCard = ({
  icon,
  text,
  info,
  bgColor,
  textColor = "#2c3e50",
  borderColor,
  iconColor,
  infoColor,
  navigateTo,
  navigate,
  backText,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      infinite={false}
      flipSpeedBackToFront={1}
      flipSpeedFrontToBack={1}
    >
      <CardFront
        onClick={handleFlip}
        borderColor={borderColor}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CardIcon color={iconColor}>{icon}</CardIcon>
        <CardText color={textColor}>{text}</CardText>
        <CardInfo color={infoColor}>{info}</CardInfo>
      </CardFront>

      <CardBack
        onClick={() => navigate(navigateTo)}
        bgColor={bgColor}
        color={textColor}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <BackText>{backText}</BackText>
      </CardBack>
    </ReactCardFlip>
  )
}

const CardFront = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background-color: #ffffff;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 150px;
  transition: transform 0.8s ease-in-out;
  border: 2px solid ${({ borderColor }) => borderColor};

  &:hover {
    background-color: #ecf0f1;
  }
`

const CardBack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 150px;
  transition: transform 0.8s ease-in-out;
`

const CardIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${({ color }) => color};
`

const CardText = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 18px;
  color: ${({ color }) => color};
`

const CardInfo = styled.div`
  text-align: right;
  font-size: 14px;
  color: ${({ color }) => color};
`

const BackText = styled.div`
  text-align: center;
`

export default FlipCard
