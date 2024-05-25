import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import carIcon from "../../Assets/CarIcon/caricon.png"

const Container = styled.div`
  padding: 20px;
  background-color: #f6f6f6;
  height: 100dvh;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #202123;
`

const Filters = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: coral;
  padding: 10px 25px;
  border-radius: 5px;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const Filter = styled.select`
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #fff;
  background-color: #fff;
  color: #202123;
  font-size: 0.8rem;
`

const ParkingLotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ZoneContainer = styled.div`
  border: 2px dashed #aaa;
  padding: 10px;
  margin-top: 30px;
  position: relative;
  border-left: 0;
  border-right: 0;

  &:first-of-type {
    border-top: 2px dashed #aaa;
  }
  &:last-of-type {
    border-bottom: 2px dashed #aaa;
  }
`

const ZoneTitle = styled.h2`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: #202123;
  color: #fff;
  padding: 3px 15px;
  font-size: 1em;
  border-radius: 25px;
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
  border-left: 2px dashed #aaa;
  border-right: 2px dashed #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  position: relative;
  cursor: pointer;
  color: #202123;
  &:hover {
    background-color: ${(props) => (props.booked ? "coral" : "#ccffcc")};
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 130px;
  }
`

const CarIcon = styled.img`
  width: 95%;
  height: 60%;
  margin-top: 15px;
`

const SlotText = styled.div`
  position: absolute;
  top: 2px;
  right: 5px;
  background-color: #fff;
  border: 2px solid ${(props) => (props.booked ? "#202123" : "blue")};
  border-radius: 35px;
  padding: 2px 7px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.booked ? "#202123" : "#202123")};

  @media (max-width: 768px) {
    padding: 1px 7px;
  }
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

  const zones = Array.from(new Set(parkingSlots.map((slot) => slot.zone)))

  return (
    <Container>
      <Title>Choose Parking Spot</Title>
      <Filters>
        <Filter
          value={zoneFilter}
          onChange={(e) => setZoneFilter(e.target.value)}
        >
          <option value="all">All Zones</option>
          {zones.map((zone) => (
            <option key={zone} value={zone}>
              Zone {zone}
            </option>
          ))}
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
        {zones.map((zone) => (
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
                      {slot.booked ? "Occupied" : "Available"}
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
// original