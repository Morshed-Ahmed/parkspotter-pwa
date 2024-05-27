import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: coral;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #202123;
    color: coral;
  }
`;

const SlotBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slotNumber, zone } = location.state;
  const [carMake, setCarMake] = useState("");
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
        setCarMake(data.vehicle_brand || "");
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
      carMake,
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
      console.log({apiData});
      console.log(JSON.stringify(apiData));
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
      <Title>Book Slot</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Zone</Label>
        <Input type="text" value={zone} readOnly />
        <Label>Slot Number</Label>
        <Input type="text" value={slotNumber} readOnly />
        <Label>Car Make</Label>
        <Input type="text" value={carMake} readOnly />
        <Label>Car Number</Label>
        <Input type="text" value={carNumber} readOnly />
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
