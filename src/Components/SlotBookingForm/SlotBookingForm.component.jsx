import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const Select = styled.select`
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
  const { slotNumber, zone, userEmail } = location.state;
  const [carMake, setCarMake] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`/api/car-details/${userEmail}`);
        const data = await response.json();
        setCarMake(data.carMake);
        setCarNumber(data.carNumber);
      } catch (error) {
        console.error("Error fetching car details:", error);
        // Fallback to dummy data
        setCarMake("Toyota");
        setCarNumber("ABC-1234");
      }
    };

    fetchCarDetails();
  }, [userEmail]);

  const handleTimeSlotChange = (e) => {
    const hours = e.target.value;
    setTimeSlot(hours);
    setPrice(hours * 10); // Assuming $10 per hour
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDetails = {
      slotNumber,
      zone,
      carMake,
      carNumber,
      timeSlot,
      price,
      userEmail,
      parkingLotName: "Dhaka Parking Lot",
      parkingLotAddress: "Dhaka, Bangladesh",
    };
    navigate("/payment", { state: { bookingDetails } });
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
        <Label>Time Slot (hours)</Label>
        <Select value={timeSlot} onChange={handleTimeSlotChange}>
          <option value="">Select Time Slot</option>
          {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1} Hour</option>
          ))}
        </Select>
        <Label>Price</Label>
        <Input type="text" value={`$${price}`} readOnly />
        <Button type="submit">Book Now</Button>
      </Form>
    </Container>
  );
};

export default SlotBookingForm;
