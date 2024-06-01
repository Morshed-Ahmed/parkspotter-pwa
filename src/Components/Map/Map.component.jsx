import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Header from "../SharedComponents/Header/Header";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW93dWoiLCJhIjoiY2x3ZHJjcWs4MDRrMjJqcXBmZnIwMHpvNCJ9.YGSlU2XkHa7quHa1Mnd2Pg";

const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

const SearchBox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  width: calc(100% - 20px);
  max-width: 400px;
`;

const PopupContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  position: relative;
`;

const PopupButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [activeLocation, setActiveLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [90.4125, 23.8103],
      zoom: 12,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for places",
    });

    mapRef.current.addControl(geocoder, "top-left");

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/parkowner-list/"
        );
        const data = await response.json();
        const transformedData = data
          .filter(
            (item) =>
              item.latitude &&
              item.longitude &&
              !isNaN(item.latitude) &&
              !isNaN(item.longitude)
          )
          .map((item) => ({
            id: item.id,
            name: item.address,
            coordinates: [
              parseFloat(item.longitude),
              parseFloat(item.latitude),
            ],
            availableSpots: item.available_slot,
          }));

        setLocationData(transformedData);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          mapRef.current.setCenter([longitude, latitude]);
          new mapboxgl.Marker({ color: "blue" })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);
        },
        (error) => {
          console.error("Error fetching user location", error);
        }
      );
    }

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && locationData.length) {
      locationData.forEach((location) => {
        const marker = new mapboxgl.Marker()
          .setLngLat(location.coordinates)
          .addTo(mapRef.current);

        marker.getElement().addEventListener("click", () => {
          setActiveLocation(location);
        });
      });
    }
  }, [locationData]);

  const calculateDistance = (coords1, coords2) => {
    if (!coords1 || !coords2) return null;

    const toRad = (value) => (value * Math.PI) / 180;

    const lat1 = coords1[1];
    const lon1 = coords1[0];
    const lat2 = coords2[1];
    const lon2 = coords2[0];

    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <>
      <Header />
      <MapContainer ref={mapContainerRef}>
        <SearchBox id="geocoder-container" />

        {activeLocation && userLocation && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <PopupContainer>
              <CloseButton onClick={() => setActiveLocation(null)}>×</CloseButton>
              <h4>{activeLocation.name}</h4>
              <p>{activeLocation.availableSpots} spots available</p>
              <p>
                Distance:{" "}
                {calculateDistance(
                  userLocation,
                  activeLocation.coordinates
                ).toFixed(2)}{" "}
                km
              </p>
              <PopupButton onClick={() => navigate(`/location/${activeLocation.id}`)}>
                Goto
              </PopupButton>
            </PopupContainer>
          </div>
        )}
      </MapContainer>
    </>
  );
};

export default Map;
// original