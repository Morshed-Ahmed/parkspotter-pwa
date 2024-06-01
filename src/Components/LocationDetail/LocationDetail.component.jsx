import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import carIcon from "../../Assets/CarIcon/caricon.png"
import Header from "../SharedComponents/Header/Header"

const Container = styled.div`
  // padding: 20px;
  background-color: #fff;
  height: 100dvh;
  @media (max-width: 768px) {
    padding: 0px;
  }
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
  font-size: 1.7em;
  color: #202123;
  margin-top: 30px;
  text-decoration: underline;
`

const Filters = styled.div`
  display: flex;
  justify-content: center;
  background-color: #202123;
  padding: 25px 25px;
  // border-radius: 5px;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: space-evenly;
    border-radius: 0px;
  }
`

const Filter = styled.select`
  padding: 9px 10px;
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
  // border: 2px solid #222;
  margin-top: 30px;
  position: relative;
  border-left: 0;
  border-right: 0;
  margin-bottom: 20px;
  // background-color: #202123;
  // &:first-of-type {
  //   border-top: 2px dashed #222;
  // }
  // &:last-of-type {
  //   border-bottom: 2px solid #222;
  // }
`

const ZoneTitle = styled.h2`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #202123;
  color: #fff;
  padding: 8px 18px;
  font-size: 0.8rem;
  border-radius: 25px;
`

const SlotRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  margin: 10px 0;
`

const Slot = styled.div`
  width: 200px;
  height: 300px;
  border: 2px solid #aaa;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e5ff;
  position: relative;
  border-radius: 10px;
  cursor: pointer;
  color: #202123;
  // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  &:hover {
    background-color: ${(props) => (props.booked ? "#ddd" : "#ccffcc")};
  }

  @media (max-width: 768px) {
    width: 90px;
    height: 130px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  }
`

const CarIcon = styled.img`
  width: 95%;
  height: 60%;
  margin-top: 30px;
`

const SlotText = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  box-sizing: content-box;

  background-color: ${(props) => (props.booked ? "#202123" : "#fff")};
  border: 2px solid ${(props) => (props.booked ? "#666" : "rgb(0,0,255,0.7)")};
  border-radius: 35px;
  padding: 2px 7px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.booked ? "#fff" : "#202123")};

  @media (max-width: 768px) {
    padding: 3px 8px;
    top: 10px;
    right: 8px;
  }
`

const SlotNumber = styled(SlotText)`
  top: 6%;
  right: 3.5%;
  background-color: #fff;
  color: #202123;
  border: 1px solid #202123;
  padding: 18px 10px;
  font-weight: 700;
  @media (max-width: 768px) {
    padding: 18px 10px;
  }
`

const SlotNumberCircle = styled.div`
  border: 1px solid #202123;
  padding: 30px;
  background-color: rgb(0, 0, 255, 0.5);
  border-radius: 56px;
  position: absolute;
  top: 40%;
`

const LocationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [parkingSlots, setParkingSlots] = useState([])
  const [zone, setZone] = useState(null)
  const [zoneFilter, setZoneFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")

  useEffect(() => {
    const fetchZone = async () => {
      try {
        const response = await fetch(
          `https://parkspotter-backened.onrender.com/accounts/zone/`
        )
        const data = await response.json()
        const zoneInfo = data.find((zone) => zone.park_owner === parseInt(id))
        setZone(zoneInfo ? zoneInfo.id : null)
      } catch (error) {
        console.error("Error fetching zone:", error)
      }
    }

    if (id) {
      fetchZone()
    }
  }, [id])

  useEffect(() => {
    const fetchParkingSlots = async () => {
      if (!zone) return

      try {
        const response = await fetch(
          `https://parkspotter-backened.onrender.com/accounts/slot/`
        )
        const data = await response.json()

        const transformedData = data.map((slot) => ({
          slotNumber: slot.slot_number,
          zone: slot.zone,
          booked: !slot.available,
        }))

        setParkingSlots(transformedData.filter((slot) => slot.zone === zone))
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
        setParkingSlots(dummyData.filter((slot) => slot.zone === zone))
      }
    }

    fetchParkingSlots()
  }, [zone])

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
        <Title>Choose Parking Spot</Title>

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
                        <SlotNumberCircle>
                          {" "}
                          <SlotNumber>Slot&nbsp;{slot.slotNumber}</SlotNumber>
                        </SlotNumberCircle>
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
    </>
  )
}

export default LocationDetail
