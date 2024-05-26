import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Header from "../../SharedComponents/Header/Header"
import { FaMapMarkerAlt, FaFileInvoice, FaUser } from "react-icons/fa"

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  min-height: 100vh;
  color: white;
`

const Title = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
  color: #202123;
`

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  justify-content: center;
`

const MenuItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 10px;
  border: none;
  background-color: #5050aa;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;

  &:hover {
    background-color: #202123;
    color: white;
  }

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <HomeContainer>
        <Title>Home</Title>
        <Menu>
          <MenuItem onClick={() => navigate("/map")}>
            <FaMapMarkerAlt />
            Book a Parking Slot
          </MenuItem>
          <MenuItem onClick={() => navigate("/history")}>
            <FaFileInvoice />
            View Invoices
          </MenuItem>
          <MenuItem onClick={() => navigate("/profile")}>
            <FaUser />
            View Profile
          </MenuItem>
        </Menu>
      </HomeContainer>
    </>
  )
}

export default Home
