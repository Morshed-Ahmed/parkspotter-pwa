import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const TicketDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
`;

const Detail = styled.div`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
`;

const Ticket = () => {
  const location = useLocation();
  const { ticket } = location.state;

  return (
    <Container>
      <Title>Booking Ticket</Title>
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
    </Container>
  );
};

export default Ticket;
