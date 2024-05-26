import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import { useNavigate } from "react-router-dom"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import Header from "../SharedComponents/Header/Header"

mapboxgl.accessToken =
  "pk.eyJ1IjoibW93dWoiLCJhIjoiY2x3ZHJjcWs4MDRrMjJqcXBmZnIwMHpvNCJ9.YGSlU2XkHa7quHa1Mnd2Pg"

const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`

const SearchBox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  width: calc(100% - 20px);
  max-width: 400px;
`



const Map = () => {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [userLocation, setUserLocation] = useState(null)
  const [locationData, setLocationData] = useState([])
  const [hoveredLocation, setHoveredLocation] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [90.4125, 23.8103],
      zoom: 12,
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for places",
    })

    mapRef.current.addControl(geocoder, "top-left")

    mapRef.current.addControl(new mapboxgl.NavigationControl())

    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          "our api link for getting geo locations and available count of parking slots"
        )
        const data = await response.json()
        setLocationData(data)
      } catch (error) {
        console.error("Error fetching location data:", error)
        const dummyData = [
          {
            id: 1,
            name: "Bashundhara R/A",
            coordinates: [90.489, 23.8186],
            availableSpots: 10,
          },
          {
            id: 2,
            name: "Mirpur",
            coordinates: [90.3667, 23.8041],
            availableSpots: 15,
          },
          {
            id: 3,
            name: "Khilkhet",
            coordinates: [90.4264, 23.8284],
            availableSpots: 5,
          },
          {
            id: 4,
            name: "Uttara",
            coordinates: [90.4004, 23.8761],
            availableSpots: 20,
          },
        ]
        setLocationData(dummyData)
      }
    }

    fetchLocationData()

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([longitude, latitude])
          mapRef.current.setCenter([longitude, latitude])
          new mapboxgl.Marker({ color: "blue" })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current)
        },
        (error) => {
          console.error("Error fetching user location", error)
        }
      )
    }

    return () => {
      mapRef.current.remove()
    }
  }, [])

  useEffect(() => {
    if (mapRef.current && locationData.length) {
      locationData.forEach((location) => {
        const marker = new mapboxgl.Marker()
          .setLngLat(location.coordinates)
          .addTo(mapRef.current)

        marker.getElement().addEventListener("mouseenter", () => {
          setHoveredLocation(location)
        })

        marker.getElement().addEventListener("mouseleave", () => {
          setHoveredLocation(null)
        })

        marker.getElement().addEventListener("click", () => {
          navigate(`/location/${location.id}`)
        })

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          `${location.name}: ${location.availableSpots} spots available`
        )

        marker.getElement().addEventListener("mouseenter", () => {
          popup.addTo(mapRef.current)
        })

        marker.getElement().addEventListener("mouseleave", () => {
          popup.remove()
        })
      })
    }
  }, [locationData, navigate])

  const calculateDistance = (coords1, coords2) => {
    if (!coords1 || !coords2) return null

    const toRad = (value) => (value * Math.PI) / 180

    const lat1 = coords1[1]
    const lon1 = coords1[0]
    const lat2 = coords2[1]
    const lon2 = coords2[0]

    const R = 6371
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  return (
    <>
      <Header />
      <MapContainer ref={mapContainerRef}>
        <SearchBox id="geocoder-container" />

        {hoveredLocation && userLocation && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              zIndex: 2,
            }}
          >
            <h4>{hoveredLocation.name}</h4>
            <p>{hoveredLocation.availableSpots} spots available</p>
            <p>
              Distance:{" "}
              {calculateDistance(
                userLocation,
                hoveredLocation.coordinates
              ).toFixed(2)}{" "}
              km
            </p>
          </div>
        )}
      </MapContainer>
    </>
  )
}

export default Map
