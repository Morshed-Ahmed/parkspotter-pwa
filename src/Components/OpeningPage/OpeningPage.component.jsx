import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import logo from "../../Assets/Logo/ParkSpotterLogoWhite.svg";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #00cc99, 0 0 10px #00cc99, 0 0 20px #00cc99, 0 0 40px #00cc99;
  }
  50% {
    box-shadow: 0 0 10px #00cc99, 0 0 20px #00cc99, 0 0 40px #00cc99, 0 0 80px #00cc99;
  }
  100% {
    box-shadow: 0 0 5px #00cc99, 0 0 10px #00cc99, 0 0 20px #00cc99, 0 0 40px #00cc99;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #4a90e2, #003366);
  padding: 1rem;
  color: #ffffff;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  animation: ${fadeIn} 2s ease-in-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 2.5s ease-in-out;
`;

const Logo = styled.img`
  width: 8rem;
  height: 8rem;
  margin-bottom: 2rem;
  animation: ${bounce} 2s infinite;
  @media (max-width: 768px) {
    width: 6rem;
    height: 6rem;
  }
`;

const Button = styled.button`
  background-color: #00cc99;
  color: #ffffff;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  cursor: pointer;
  animation: ${glow} 1.5s infinite alternate;

  &:hover {
    background-color: #007366;
    color: #ccffdd;
  }

  &:active {
    background-color: #007366;
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 1s linear infinite;
  margin-top: 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 1rem;
  text-align: center;
  color: #ffffff;
  font-size: 0.875rem;
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const OpeningPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageWrapper>
      <Header>
        <Title>ParkSpotter</Title>
      </Header>
      <Main>
        <Logo src={logo} alt="ParkSpotter logo" />
        {loading ? <LoadingSpinner /> : <Button>Find Parking Now</Button>}
      </Main>
      <Footer>© 2024 ParkSpotter. All rights reserved.</Footer>
    </PageWrapper>
  );
};

export default OpeningPage;
// original