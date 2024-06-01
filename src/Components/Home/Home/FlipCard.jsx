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
      <CardFront borderColor={borderColor} isLast={isLast}>
        <CardIcon color={iconColor} isLast={isLast}>
          {icon}
        </CardIcon>
        <CardText color={textColor}>{text}</CardText>
        <CardInfo color={infoColor}>{info}</CardInfo>
      </CardFront>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 100%;
  height: 150px;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    height: ${({ isLast }) => (isLast ? "120px" : "150px")};
  }
`

const CardFront = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CardIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ color }) => color};
  @media (max-width: 768px) {
    font-size: ${({ isLast }) => (isLast ? "2rem" : "2.5rem")};
  }
`

const CardText = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color: ${({ color }) => color};
`

const CardInfo = styled.div`
  font-size: 1rem;
  margin-top: 0.3rem;
  color: ${({ color }) => color};
`

export default FlipCard
