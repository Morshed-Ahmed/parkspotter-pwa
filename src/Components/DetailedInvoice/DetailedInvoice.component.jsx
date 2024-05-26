import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../SharedComponents/Header/Header"

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`

const ContentWrapper = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
  color: #333;
  position: relative;

  @media (min-width: 600px) {
    padding: 2rem;
    max-width: 800px;
  }
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;

  @media (min-width: 600px) {
    font-size: 2rem;
  }
`

const InvoiceHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const InvoiceSection = styled.div`
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    margin-bottom: 2rem;
  }
`

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;

  @media (min-width: 600px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Detail = styled.div`
  text-align: left;
  margin-bottom: 0.5rem;

  @media (min-width: 600px) {
    flex: 1;
    margin-bottom: 0;
  }
`

const Label = styled.span`
  font-weight: bold;
`

const BackButton = styled.button`
  padding: 7px 14px;
  border-radius: 5px;
  border: none;
  background-color: coral;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 99;

  &:hover {
    background-color: #202123;
  }

  @media (min-width: 600px) {
    top: 20px;
    left: 20px;
  }
`

const dummyTicket = {
  amount: "$20",
  ticketNo: "123458",
  date: "2024-05-27",
  parkOwner: "Mirpur",
  startTime: "10:00 AM",
  bookingDate: "2024-05-20",
  paymentType: "Credit Card",
  parkOwnerName: "John Doe",
  timeSlot: "10:00 AM - 12:00 PM",
  paymentStatus: "Paid",
}

const DetailedInvoice = () => {
  const { ticketNo } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTicket = async () => {
      // Replace this with actual fetch code if needed
      // const response = await fetch(`https://parkspotter-backened.onrender.com/tickets/${ticketNo}`);
      // const data = await response.json();
      // setTicket(data);

      // Use dummy data for now
      setTicket(dummyTicket)
      setLoading(false)
    }

    fetchTicket()
  }, [ticketNo])

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
    )
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
    )
  }

  return (
    <>
      <Header />
      <PageWrapper>
        <ContentWrapper>
          <BackButton onClick={() => navigate(-1)}>Back</BackButton>
          <Title>Invoice Details</Title>
          <InvoiceHeader>
            <div>
              <h2>Invoice</h2>
              <p>
                <Label>Invoice Number:</Label> {ticket.ticketNo}
              </p>
              <p>
                <Label>Date:</Label> {ticket.date}
              </p>
            </div>
            <div>
              <h2>Park Owner</h2>
              <p>{ticket.parkOwnerName}</p>
              <p>{ticket.parkOwner}</p>
            </div>
          </InvoiceHeader>

          <InvoiceSection>
            <SectionTitle>Booking Information</SectionTitle>
            <DetailRow>
              <Detail>
                <Label>Booking Date:</Label> {ticket.bookingDate}
              </Detail>
              <Detail>
                <Label>Time Slot:</Label> {ticket.timeSlot}
              </Detail>
            </DetailRow>
            <DetailRow>
              <Detail>
                <Label>Start Time:</Label> {ticket.startTime}
              </Detail>
            </DetailRow>
          </InvoiceSection>

          <InvoiceSection>
            <SectionTitle>Payment Information</SectionTitle>
            <DetailRow>
              <Detail>
                <Label>Amount:</Label> {ticket.amount}
              </Detail>
              <Detail>
                <Label>Payment Type:</Label> {ticket.paymentType}
              </Detail>
            </DetailRow>
            <DetailRow>
              <Detail>
                <Label>Payment Status:</Label> {ticket.paymentStatus}
              </Detail>
            </DetailRow>
          </InvoiceSection>
        </ContentWrapper>
      </PageWrapper>
    </>
  )
}

export default DetailedInvoice
