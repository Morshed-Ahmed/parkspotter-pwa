import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import carIcon from "../../Assets/CarIcon/caricon.png"
import Header from "../SharedComponents/Header/Header"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const Container = styled.div`
  background-color: #f5f5f7;
  min-height: 100vh;
  animation: ${fadeIn} 1s ease-out;

  @media (min-width: 768px) {
    padding: 40px 20px;
  }
`

// const Title = styled.h1`
//   text-align: center;
//   margin-bottom: 30px;
//   font-size: 1.75em;
//   color: #1d1d1f;
//   font-weight: 600;
//   animation: ${slideDown} 0.6s ease-out;

//   @media (min-width: 768px) {
//     font-size: 2.5em;
//     margin-bottom: 50px;
//   }
// `;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 15px 0px;
  gap: 10px;
  margin-bottom: 20px;
  // border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  animation: ${slideDown} 0.6s ease-out;

  @media (min-width: 768px) {
    padding: 15px 25px;
    gap: 15px;
    border-radius: 12px;
    margin-bottom: 60px;
  }
`

const Filter = styled.select`
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #d2d2d7;
  background-color: #ffffff;
  color: #1d1d1f;
  font-size: 0.9rem;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;

  &:hover,
  &:focus {
    border-color: #0071e3;
  }

  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 1rem;
  }
`

const ParkingLotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    gap: 40px;
  }
`

const ZoneContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
  animation: ${slideUp} 0.6s ease-out;

  @media (min-width: 768px) {
    margin-bottom: 60px;
  }
`

const ZoneTitle = styled.h2`
  position: relative;
  background: #ffffff;
  color: #1d1d1f;
  padding: 8px 15px;
  font-size: 0.9rem;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
  margin-bottom: 20px;
  max-width:70%;
  margin-left:auto;
  margin-right:auto;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e0f7fa;
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    font-size: 1rem;
    margin-bottom: 0;
  }
`

const SlotRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    gap: 25px;
    margin: 20px 0;
  }
`

const Slot = styled.div`
  width: 100px;
  height: 150px;
  border: 2px solid #d2d2d7;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  position: relative;
  border-radius: 20px;
  cursor: pointer;
  color: #1d1d1f;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;

  &:hover {
    background-color: ${(props) => (props.booked ? "#f5f5f7" : "#e0f7fa")};
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) {
    width: 200px;
    height: 300px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  }
`

const CarIcon = styled.img`
  width: 60%;
  height: auto;
`

const SlotText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.booked ? "#ff3b30" : "#4caf50")};
  border-radius: 12px;
  padding: 3px 10px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #ffffff;

  @media (min-width: 768px) {
    padding: 5px 15px;
    font-size: 0.8rem;
  }
`

const SlotNumber = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  font-weight: 600;
  color: #1d1d1f;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`

const LocationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [zones, setZones] = useState([])
  const [parkingSlots, setParkingSlots] = useState([])
  const [zoneFilter, setZoneFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [collapsedZones, setCollapsedZones] = useState({})

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(
          `https://parkspotter-backened.onrender.com/accounts/zone/?park_owner=${id}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        const data = await response.json()
        setZones(data)
      } catch (error) {
        console.error("Error fetching zones:", error)
      }
    }

    if (id) {
      fetchZones()
    }
  }, [id])

  useEffect(() => {
    const fetchParkingSlots = async () => {
      if (zones.length === 0) return

      try {
        const token = localStorage.getItem("token")
        const response = await fetch(
          `https://parkspotter-backened.onrender.com/accounts/slot/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        const data = await response.json()
        
        const transformedData = data.map((slot) => ({
          id:slot.id,
          slotNumber: slot.slot_number,
          zone: slot.zone,
          booked: !slot.available,
        }))

        setParkingSlots(
          transformedData.filter((slot) =>
            zones.map((zone) => zone.id).includes(slot.zone)
          )
        )
      } catch (error) {
        console.error("Error fetching parking slots:", error)
      }
    }

    fetchParkingSlots()
  }, [zones])

  const handleSlotClick = (slot) => {
    if (!slot.booked) {
      console.log({slot});
      navigate(`/slot/${slot.id}`, { state: { ...slot } })
    }
  }

  const toggleZoneCollapse = (zoneId) => {
    setCollapsedZones((prev) => ({
      ...prev,
      [zoneId]: !prev[zoneId],
    }))
  }

  const filteredSlots = parkingSlots.filter((slot) => {
    if (zoneFilter !== "all" && slot.zone !== parseInt(zoneFilter)) return false
    if (availabilityFilter === "available" && slot.booked) return false
    if (availabilityFilter === "unavailable" && !slot.booked) return false
    return true
  })

  return (
    <>
      <Header />
      <Container>
        <Filters>
          <Filter
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
          >
            <option value="all">All Zones</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
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
        {/* <Title>Choose Parking Spot</Title> */}

        <ParkingLotContainer>
          {zones.map((zone) => (
            <ZoneContainer key={zone.id}>
              <ZoneTitle onClick={() => toggleZoneCollapse(zone.id)}>
                Zone:&nbsp;{zone.name}
              </ZoneTitle>
              {!collapsedZones[zone.id] && (
                <SlotRow>
                  {filteredSlots
                    .filter((slot) => slot.zone === zone.id)
                    .map((slot) => (
                      <Slot
                        key={slot.slotNumber}
                        booked={slot.booked}
                        onClick={() => handleSlotClick(slot)}
                      >
                        {slot.booked ? (
                          <CarIcon src={carIcon} alt="Car Icon" />
                        ) : (
                          <SlotNumber>Slot {slot.slotNumber}</SlotNumber>
                        )}
                        <SlotText booked={slot.booked}>
                          {slot.booked ? "Occupied" : "Available"}
                        </SlotText>
                      </Slot>
                    ))}
                </SlotRow>
              )}
            </ZoneContainer>
          ))}
        </ParkingLotContainer>
      </Container>
    </>
  )
}

export default LocationDetail
