import React from "react"
import styled from "styled-components"

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
  isLast = false,
}) => {
  return (
    <CardContainer
      onClick={() => navigate(navigateTo)}
      isLast={isLast}
      bgColor={bgColor}
    >
      <CardFront borderColor={borderColor}>
        <CardIcon color={iconColor}>{icon}</CardIcon>
        <CardText color={textColor}>{text}</CardText>
        <CardInfo color={infoColor}>{info}</CardInfo>
      </CardFront>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 100%;
  height: ${({ isLast }) => (isLast ? "100px" : "150px")};
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 12px;
`

const CardFront = styled.div`
font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background-color: ${({ bgColor }) => bgColor};

  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 100%;
  border: 2px solid ${({ borderColor }) => borderColor};

  &:hover {
    background-color: #ecf0f1;
  }
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

export default FlipCard
