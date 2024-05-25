import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import carIcon from "../../Assets/CarIcon/caricon.png" // Adjust the path as needed

const Container = styled.div`
  padding: 20px;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
`

const Filters = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const Filter = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
`

const ParkingLotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ZoneContainer = styled.div`
  border: 2px dashed #ccc;
  padding: 10px;
  margin-top: 30px;
  position: relative;
  &:first-of-type {
    border-top: 2px dashed #ccc;
  }
  &:last-of-type {
    border-bottom: 2px dashed #ccc;
  }
`

const ZoneTitle = styled.h2`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 0 10px;
  font-size: 1.25em;
`

const SlotRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`

const Slot = styled.div`
  width: 100px;
  height: 160px;
  border-left: 1px dashed #ccc;
  border-right: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.booked ? "#202123" : "#ccffcc")};
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 130px;
  }
`

const CarIcon = styled.img`
  width: 80%;
  height: 80%;
`

const SlotText = styled.div`
  position: absolute;
  top: 0px;
  right: 25px;
  background-color: #fff;
  border: 1px solid ${(props) => (props.booked ? "#ccc" : "#ccc")};
  border-radius: 10px;
  padding: 2px 5px;
  font-size: 10px;
  
  color: ${(props) => (props.booked ? "#202123" : "#202123")};
`

const LocationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [parkingSlots, setParkingSlots] = useState([])
  const [zoneFilter, setZoneFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")

  useEffect(() => {
    const fetchParkingSlots = async () => {
      try {
        const response = await fetch(`/api/parking-lot/${id}`)
        const data = await response.json()
        setParkingSlots(data.slots)
      } catch (error) {
        console.error("Error fetching parking slots:", error)
        // Fallback to dummy data
        const dummyData = [
          {
            slotNumber: 1,
            zone: "A",
            booked: true,
            userEmail: "user1@example.com",
          },
          { slotNumber: 2, zone: "A", booked: false },
          { slotNumber: 3, zone: "B", booked: false },
          {
            slotNumber: 4,
            zone: "B",
            booked: true,
            userEmail: "user2@example.com",
          },
          // Add more dummy slots as needed
        ]
        setParkingSlots(dummyData)
      }
    }

    fetchParkingSlots()
  }, [id])

  const handleSlotClick = (slot) => {
    if (!slot.booked) {
      navigate(`/slot/${slot.slotNumber}`, { state: { ...slot } })
    }
  }

  const filteredSlots = parkingSlots.filter((slot) => {
    if (zoneFilter !== "all" && slot.zone !== zoneFilter) return false
    if (availabilityFilter === "available" && slot.booked) return false
    if (availabilityFilter === "unavailable" && !slot.booked) return false
    return true
  })

  return (
    <Container>
      <Title>Choose Slot</Title>
      <Filters>
        <Filter
          value={zoneFilter}
          onChange={(e) => setZoneFilter(e.target.value)}
        >
          <option value="all">All Zones</option>
          <option value="A">Zone A</option>
          <option value="B">Zone B</option>
          {/* Add more zones as needed */}
        </Filter>
        <Filter
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </Filter>
      </Filters>
      <ParkingLotContainer>
        {["A", "B"].map((zone) => (
          <ZoneContainer key={zone}>
            <ZoneTitle>Zone {zone}</ZoneTitle>
            <SlotRow>
              {filteredSlots
                .filter((slot) => slot.zone === zone)
                .map((slot) => (
                  <Slot
                    key={slot.slotNumber}
                    booked={slot.booked}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot.booked ? (
                      <CarIcon src={carIcon} alt="Car Icon" />
                    ) : (
                      <SlotText>{slot.slotNumber}</SlotText>
                    )}
                    <SlotText booked={slot.booked}>
                      {slot.booked ? "Booked" : "Available"}
                    </SlotText>
                  </Slot>
                ))}
            </SlotRow>
          </ZoneContainer>
        ))}
      </ParkingLotContainer>
    </Container>
  )
}

export default LocationDetail
