import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { toast, Toaster } from "react-hot-toast"
import Header from "../SharedComponents/Header/Header"

const Container = styled.div`
  padding: 20px;
  margin-top: 20px;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #202123;
`

const TicketDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
`

const Detail = styled.div`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
`

const BackButton = styled.button`
  position: absolute;
  top: 50px;
  left: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;

  &:hover {
    background-color: #e9ecef;
  }

  img {
    width: 24px;
    height: 24px;
  }
`

const Ticket = () => {
  const location = useLocation()
  const { ticket } = location.state
  const navigate = useNavigate()

  useEffect(() => {
    const postTicketData = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/tickets",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ticket),
          }
        )

        if (response.ok) {
          toast.success("Data sent successfully!")
        } else {
          throw new Error("Failed to send ticket data")
        }
      } catch (error) {
        toast.error("Error: Failed to send data")
      }
    }

    postTicketData()
  }, [ticket])

  const handleBackToHome = () => {
    navigate("/home")
  }

  return (
    <>
      {" "}
      <Header />
      <Container>
        <BackButton onClick={handleBackToHome}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
            alt="Back"
          />
        </BackButton>
        <Title>Ticket Booked</Title>
        <TicketDetails>
          <Detail>Email: {ticket.userEmail}</Detail>
          <Detail>Car Make: {ticket.carMake}</Detail>
          <Detail>Car Number: {ticket.carNumber}</Detail>
          <Detail>Time Slot: {ticket.timeSlot} Hours</Detail>
          <Detail>Price: ${ticket.price}</Detail>
          <Detail>Payment Method: {ticket.paymentMethod}</Detail>
          <Detail>Payment Time: {ticket.paymentTime}</Detail>
          <Detail>Zone: {ticket.zone}</Detail>
          <Detail>Slot Number: {ticket.slotNumber}</Detail>
          <Detail>Parking Lot: {ticket.parkingLotName}</Detail>
          <Detail>Address: {ticket.parkingLotAddress}</Detail>
        </TicketDetails>
        <Toaster position="bottom-center" />
      </Container>
    </>
  )
}

export default Ticket
