import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import cashIcon from "../../Assets/PaymentIcons/dollar.png";
import stripeIcon from "../../Assets/PaymentIcons/stripe.png";

const stripePromise = loadStripe("pk_test_51PGS16GjULo50m7Sn5jjIOleHMtD8Wy67YmYYr8VXNItzLZ8JBIGq0C9SxzEAffsS74VLY1QXFnzQrBekhlebRAk00fC9HURwk");

const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
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
  flex-direction: column;
  gap: 15px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid ${(props) => (props.selected ? "#007bff" : "#e0e0e0")};
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: #007bff;
  }
`;

const OptionIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const OptionDetails = styled.div`
  flex-grow: 1;
`;

const OptionTitle = styled.div`
  font-size: 1.2rem;
  color: #333;
`;

const OptionSubtitle = styled.div`
  font-size: 0.9rem;
  color: #777;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const StripePaymentForm = ({ bookingDetails, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: 'Customer Name', // Replace with actual customer name
        },
      });

      if (error) {
        console.error("Payment method creation error:", error);
        return;
      }

      const paymentResponse = await axios.post('/.netlify/functions/create-stripe-payment-intent', {
        paymentMethodId: paymentMethod.id,
        amount: bookingDetails.price * 100,
        currency: "usd",
      });

      const { clientSecret } = paymentResponse.data;

      const confirmedPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmedPayment.error) {
        console.error("Payment confirmation error:", confirmedPayment.error);
      } else if (confirmedPayment.paymentIntent.status === "succeeded") {
        onPaymentSuccess("Stripe");
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <PayButton type="submit">Pay ${bookingDetails.price}</PayButton>
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("cash");
  const [showStripeForm, setShowStripeForm] = useState(false);

  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return <div>Error: No booking details provided.</div>;
  }

  const handlePayment = () => {
    if (selectedOption === "stripe") {
      setShowStripeForm(true);
    } else {
      const ticket = {
        ...bookingDetails,
        paymentMethod: selectedOption,
        paymentTime: "Due",
      };
      console.log("Booking Ticket:", ticket);
      navigate("/ticket", { state: { ticket } });
    }
  };

  const handleStripePaymentSuccess = () => {
    const ticket = {
      ...bookingDetails,
      paymentMethod: "Stripe",
      paymentTime: "Paid",
    };
    console.log("Booking Ticket:", ticket);
    navigate("/ticket", { state: { ticket } });
  };

  return (
    <Container>
      <Title>Choose Payment</Title>
      <PaymentOptions>
        <Option selected={selectedOption === "cash"} onClick={() => setSelectedOption("cash")}>
          <OptionIcon src={cashIcon} alt="Cash Icon" />
          <OptionDetails>
            <OptionTitle>Cash</OptionTitle>
            <OptionSubtitle>on checkout</OptionSubtitle>
          </OptionDetails>
        </Option>
        <Option selected={selectedOption === "stripe"} onClick={() => setSelectedOption("stripe")}>
          <OptionIcon src={stripeIcon} alt="Stripe Icon" />
          <OptionDetails>
            <OptionTitle>Stripe</OptionTitle>
            <OptionSubtitle>Connect your Stripe account</OptionSubtitle>
          </OptionDetails>
        </Option>
      </PaymentOptions>
      {showStripeForm && selectedOption === "stripe" ? (
        <Elements stripe={stripePromise}>
          <StripePaymentForm bookingDetails={bookingDetails} onPaymentSuccess={handleStripePaymentSuccess} />
        </Elements>
      ) : (
        <PayButton onClick={handlePayment}>Pay ${bookingDetails.price}</PayButton>
      )}
    </Container>
  );
};

export default Payment;
