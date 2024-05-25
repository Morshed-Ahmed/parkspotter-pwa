import React from "react"
import styled from "styled-components"
import logo from "../../Assets/Logo/ParkSpotterLogoWhite.svg"

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #606163, #202123);
  padding: 1rem;
  color: #ffffff;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.img`
  width: 8rem;
  height: 8rem;
  margin-bottom: 2rem;
`

const Button = styled.button`
  background-color: coral;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #fff;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #202123;
    color: coral;
  }
`

const OpeningPage = () => {
  return (
    <PageWrapper>
      <Header>
        <Title>ParkSpotter</Title>
      </Header>
      <Main>
        <Logo src={logo} alt="ParkingSpotter logo" />
        <Button>Find Parking Now</Button>
      </Main>
    </PageWrapper>
  )
}

export default OpeningPage
