import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import dayjs from "dayjs";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  background-color: #f5f5f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease-out;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.3rem;
  padding: 10px 15px;
  background: #efefef;
  border-radius: 15px;
  color: #1d1d1f;
  font-weight: 600;
  animation: ${slideDown} 0.6s ease-out;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: ${slideDown} 0.6s ease-out;

  @media (min-width: 768px) {
    gap: 20px;
    padding: 30px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d2d2d7;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover,
  &:focus {
    border-color: #0071e3;
    box-shadow: 0 0 8px rgba(0, 113, 227, 0.3);
  }

  @media (min-width: 768px) {
    padding: 12px;
    font-size: 1.1rem;
  }
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #0071e3;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #005bb5;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 91, 181, 0.2);
  }

  @media (min-width: 768px) {
    padding: 15px;
    font-size: 1.1rem;
  }
`;

const SlotBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slotNumber } = useParams();
  const { zone } = location.state || {};
  const [carNumber, setCarNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [approxCheckOutTime, setApproxCheckOutTime] = useState("");
  const [price, setPrice] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customerId = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        const response = await fetch(`https://parkspotter-backened.onrender.com/customer/customer-list/${customerId}/`, {
          headers: {
            "Authorization": `Token ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setUserId(data.customer_id.id);
        setCarNumber(data.plate_number || "");
        setMobileNumber(data.mobile_no || "");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchCustomerDetails();
  }, []);

  useEffect(() => {
    if (checkInTime && approxCheckOutTime) {
      const checkIn = dayjs(checkInTime);
      const checkOut = dayjs(approxCheckOutTime);
      const duration = checkOut.diff(checkIn, 'minute');
      setPrice(duration);
    }
  }, [checkInTime, approxCheckOutTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingDetails = {
      slotNumber,
      zone,
      carNumber,
      mobileNumber,
      checkInTime,
      approxCheckOutTime,
      price,
      parkingLotName: "Dhaka Parking Lot",
      parkingLotAddress: "Dhaka, Bangladesh",
    };

    const token = localStorage.getItem("token");

    const apiData = {
      employee: null,
      customer: userId,
      zone: zone,
      slot: slotNumber,
      vehicle: {
        plate_number: carNumber,
        mobile_no: mobileNumber
      },
      check_in_time: new Date(checkInTime).toISOString(),
      check_out_time: null,
      appoximate_check_out_time: new Date(approxCheckOutTime).toISOString()
    };

    try {
      const response = await fetch("https://parkspotter-backened.onrender.com/accounts/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify(apiData)
      });
      console.log(apiData);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Booking response:", data);
      navigate("/payment", { state: { bookingDetails } });
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Book Slot</Title>
        <Label>Zone</Label>
        <Input type="text" value={zone} readOnly />
        <Label>Slot Number</Label>
        <Input type="text" value={slotNumber} readOnly />
        <Label>Car Number</Label>
        <Input 
          type="text" 
          value={carNumber} 
          onChange={(e) => setCarNumber(e.target.value)} 
          required 
        />
        <Label>Mobile Number</Label>
        <Input 
          type="text" 
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} 
          required 
        />
        <Label>Check-in Time</Label>
        <Input 
          type="datetime-local" 
          value={checkInTime} 
          onChange={(e) => setCheckInTime(e.target.value)} 
          required 
        />
        <Label>Approximate Check-out Time</Label>
        <Input 
          type="datetime-local" 
          value={approxCheckOutTime} 
          onChange={(e) => setApproxCheckOutTime(e.target.value)} 
          required 
        />
        <Label>Price</Label>
        <Input type="text" value={`৳${price}`} readOnly />
        <Button type="submit">Book Now</Button>
      </Form>
    </Container>
  );
};

export default SlotBookingForm;
