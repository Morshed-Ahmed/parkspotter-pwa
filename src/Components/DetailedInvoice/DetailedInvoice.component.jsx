import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import Header from "../SharedComponents/Header/Header";
import { ParkSpotterLogoBlack } from "../../Assets/Logo/Logo";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const ContentWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2.5rem 1.4rem;
  width: 100%;
  max-width: 600px;
  color: #202123;
  position: relative;
  animation: ${fadeIn} 2s ease-in-out;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  max-width: 50px;
  height: auto;
`;

const InvoiceInfo = styled.div`
  text-align: right;
`;

const InvoiceSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 2px solid #ffffff;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 0.5rem;
`;

const Detail = styled.div`
  flex: 1;
  text-align: left;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Note = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
  text-align: center;
  margin-top: 2rem;
`;

const PrintButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #00cc99;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin: 10px auto 0 auto;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #007366;
  }

  &:active {
    background-color: #007366;
    transform: scale(0.98);
  }
`;

const DetailedInvoice = () => {
  const { ticketNo } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`https://parkspotter-backened.onrender.com/accounts/bookings/${ticketNo}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        console.error("Failed to fetch ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketNo]);

  if (loading) {
    return (
      <>
        <Header />
        <PageWrapper>
          <ContentWrapper>
            <Title>Loading...</Title>
          </ContentWrapper>
        </PageWrapper>
      </>
    );
  }

  if (!ticket) {
    return (
      <>
        <Header />
        <PageWrapper>
          <ContentWrapper>
            <Title>No Ticket Found</Title>
          </ContentWrapper>
        </PageWrapper>
      </>
    );
  }

  return (
    <>
      <Header />
      <PageWrapper>
        <ContentWrapper>
          <InvoiceHeader>
            <Logo src={ParkSpotterLogoBlack} alt="Company Logo" />
            <InvoiceInfo>
              <p>
                <Label>Date:</Label>{" "}
                {new Date(ticket.booking_time).toLocaleDateString()}
              </p>
              <p>
                <Label>Invoice No:</Label> {ticket.ticket_no}
              </p>
            </InvoiceInfo>
          </InvoiceHeader>

          <InvoiceSection>
            <SectionTitle>Vehicle Information:</SectionTitle>
            <DetailRow>
              <Detail>
                <Label>Plate Number:</Label> {ticket.vehicle.plate_number}
              </Detail>
              <Detail>
                <Label>Mobile No:</Label> {ticket.vehicle.mobile_no}
              </Detail>
            </DetailRow>
          </InvoiceSection>

          <InvoiceSection>
            <SectionTitle>Booking Details:</SectionTitle>
            <DetailRow>
              <Detail>
                <Label>Zone:</Label> {ticket.zone}
              </Detail>
              <Detail>
                <Label>Slot:</Label> {ticket.slot}
              </Detail>
            </DetailRow>
            <DetailRow>
              <Detail>
                <Label>Check-in Time:</Label>{" "}
                {ticket.check_in_time
                  ? new Date(ticket.check_in_time).toLocaleString()
                  : "N/A"}
              </Detail>
              <Detail>
                <Label>Approx. Check-out Time:</Label>{" "}
                {ticket.appoximate_check_out_time
                  ? new Date(ticket.appoximate_check_out_time).toLocaleString()
                  : "N/A"}
              </Detail>
            </DetailRow>
            <DetailRow>
              <Detail>
                <Label>Rate per Minute:</Label> {ticket.rate_per_minute}
              </Detail>
              <Detail>
                <Label>Booking Time:</Label>{" "}
                {new Date(ticket.booking_time).toLocaleString()}
              </Detail>
            </DetailRow>
          </InvoiceSection>

          <InvoiceSection>
            <SectionTitle>Payment Information:</SectionTitle>
            <DetailRow>
              <Detail>
                <Label>Amount:</Label> ${ticket.amount.toFixed(2)}
              </Detail>
              <Detail>
                <Label>Fine:</Label> ${ticket.fine.toFixed(2)}
              </Detail>
            </DetailRow>
            <DetailRow>
              <Detail>
                <Label>Total Amount:</Label> ${ticket.total_amount.toFixed(2)}
              </Detail>
              <Detail>
                <Label>Payment Status:</Label>{" "}
                {ticket.is_paid ? "Paid" : "Unpaid"}
              </Detail>
            </DetailRow>
          </InvoiceSection>

          <Note>
            NOTE: This is a computer-generated receipt and does not require a
            physical signature.
          </Note>
          <PrintButton onClick={() => window.print()}>
            Print & Download
          </PrintButton>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};

export default DetailedInvoice;
