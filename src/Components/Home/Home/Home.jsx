import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../../SharedComponents/Header/Header";
import {
  FaMapMarkerAlt,
  FaFileInvoice,
  FaUser,
  FaHistory,
  FaParking,
  FaRoad,
  FaStar,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRedirectedFlag,
  setRedirectedFlag,
} from "../../../Store/User/userSlice";
import Slider from "react-slick";
import FlipCard from "./FlipCard"; // Import the FlipCard component

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #f7f9fc;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
  color: #333;
  font-weight: bold;
  text-align: center;
`;

const CardsCarousel = styled(Slider)`
  width: 100%;
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const InfoCard = styled.div`
  background-color: ${(props) => props.bgColor};
  border-radius: 16px;
  color: white;
  padding: 1.5rem 7.3rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1024px) {
    width: 60%;
  }
`;

const InfoCardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const InfoCardBalance = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const InfoCardNumber = styled.div`
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: bold;
`;

const InfoCardHolder = styled.div`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-style: italic;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;
  color: #333;
  font-weight: bold;
  text-align: left;
  width: 100%;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirectedFlag = useSelector(selectRedirectedFlag);

  const [bookingCount, setBookingCount] = useState(0);
  const [paidUnpaidCount, setPaidUnpaidCount] = useState({ paid: 0, unpaid: 0 });
  const [points, setPoints] = useState(0);
  const [paidInvoices, setPaidInvoices] = useState(0);
  const [availableParkingLots, setAvailableParkingLots] = useState(0);

  useEffect(() => {
    if (redirectedFlag) {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const user_id = params.get("user_id");
      const role = params.get("role");

      if (token && user_id && role) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("role", role);
      } else {
        navigate("/login");
      }
    }
    dispatch(setRedirectedFlag(false));
  }, [location, navigate, dispatch, redirectedFlag]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data) => setBookingCount(data.count))
      .catch(() => setBookingCount(5));

    fetch("/api/tickets")
      .then((response) => response.json())
      .then((data) =>
        setPaidUnpaidCount({ paid: data.paid, unpaid: data.unpaid })
      )
      .catch(() => setPaidUnpaidCount({ paid: 3, unpaid: 1 }));

    fetch("/api/points")
      .then((response) => response.json())
      .then((data) => setPoints(data.points))
      .catch(() => setPoints(120));

    fetch("/api/invoices")
      .then((response) => response.json())
      .then((data) => setPaidInvoices(data.paid))
      .catch(() => setPaidInvoices(4));

    fetch("/api/parking-lots")
      .then((response) => response.json())
      .then((data) => setAvailableParkingLots(data.available))
      .catch(() => setAvailableParkingLots(7));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Header />
      <HomePageContainer>
        {/* <PageTitle>Hello User Name</PageTitle> */}
        <CardsCarousel {...settings}>
          <InfoCard bgColor="#da1d81">
            <InfoCardIcon>
              <FaRoad />
            </InfoCardIcon>
            <InfoCardBalance>Trips</InfoCardBalance>
            <InfoCardNumber>49</InfoCardNumber>
            <InfoCardHolder>In June</InfoCardHolder>
          </InfoCard>
          <InfoCard bgColor="#0984e3">
            <InfoCardIcon>
              <FaStar />
            </InfoCardIcon>
            <InfoCardBalance>Points</InfoCardBalance>
            <InfoCardNumber>{points}</InfoCardNumber>
            <InfoCardHolder>Earned</InfoCardHolder>
          </InfoCard>
        </CardsCarousel>
        <SectionTitle>Menu</SectionTitle>
        <MenuGrid>
          <FlipCard
            icon={<FaMapMarkerAlt />}
            text="Find Parking"
            info="Available lots"
            bgColor="#00b894"
            borderColor="#007854"
            iconColor="#00b894"
            infoColor="#009874"
            textColor="#202123"
            navigateTo="/map"
            navigate={navigate}
            backText="Find parking spots"
          />
          <FlipCard
            icon={<FaFileInvoice />}
            text="Invoices"
            info="Paid/Unpaid"
            bgColor="#0984e3"
            borderColor="#0984e3"
            iconColor="#0984e3"
            infoColor="#0964c3"
            textColor="#202123"
            navigateTo="/history" // Adjusted path
            navigate={navigate}
            backText="View invoices"
          />
          <FlipCard
            icon={<FaUser />}
            text="Profile"
            info="View & Edit"
            bgColor="#6c5ce7"
            borderColor="#6c5ce7"
            iconColor="#6c5ce7"
            infoColor="#6c5ce7"
            textColor="#202123"
            navigateTo="/profile"
            navigate={navigate}
            backText="View profile"
          />
          <FlipCard
            icon={<FaHistory />}
            text="Booking History"
            info={`${bookingCount} bookings`}
            bgColor="#fdcb6e"
            borderColor="#cd9b2e"
            iconColor="#edbb5e"
            infoColor="#9d6b0e"
            textColor="#202123"
            navigateTo="/history"
            navigate={navigate}
            backText="View booking history"
          />
          <FlipCard
            icon={<FaParking />}
            text="Parking Lots"
            info={`${availableParkingLots} available`}
            bgColor="#e17055"
            borderColor="#a14025"
            iconColor="#e17055"
            infoColor="#c15035"
            textColor="#202123"
            navigateTo="/map" // Adjusted path
            navigate={navigate}
            backText="View parking lots"
          />
          <FlipCard
            icon={<FaStar />}
            text="Rewards"
            info={`${points} points`}
            bgColor="#fd79a8"
            borderColor="#8d4958"
            iconColor="#fd79a8"
            infoColor="#cd4968"
            textColor="#202123"
            navigateTo="/terms" // Adjusted path
            navigate={navigate}
            backText="View rewards"
          />
        </MenuGrid>
      </HomePageContainer>
    </>
  );
};

export default Home;
