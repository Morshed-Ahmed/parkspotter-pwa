import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8em;
  color: #333;
`;

const PaymentOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Option = styled.button`
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  background-color: #f57c00;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #202123;
    color: #f57c00;
  }
`;

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state;

  const handleBkashPayment = async () => {
    try {
      const response = await axios.post('/.netlify/functions/create-bkash-payment', { amount: bookingDetails.amount });
      
      if (response.data && response.data.bkashURL) {
        window.location.href = response.data.bkashURL;
      }
    } catch (error) {
      console.error("Error processing bKash payment:", error);
      alert("Failed to initiate bKash payment. Please try again.");
    }
  };

  const handlePayment = (method) => {
    if (method === "Bkash") {
      handleBkashPayment();
    } else {
      const ticket = {
        ...bookingDetails,
        paymentMethod: method,
        paymentTime: method === "Bkash" ? new Date().toLocaleString() : "Due",
      };
      // Simulate POST request
      console.log("Booking Ticket:", ticket);
      // Navigate to ticket page
      navigate("/ticket", { state: { ticket } });
    }
  };

  return (
    <Container>
      <Title>Complete Payment</Title>
      <PaymentOptions>
        <Option onClick={() => handlePayment("Cash on Checkout")}>Cash on Checkout</Option>
        <Option onClick={handleBkashPayment}>Bkash</Option>
      </PaymentOptions>
    </Container>
  );
};

export default Payment;
