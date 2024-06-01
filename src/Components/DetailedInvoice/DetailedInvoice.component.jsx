import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import Header from "../SharedComponents/Header/Header"
// import logo from '../../Assets/Logo/ParkSpotterLogoBlack.svg'
import { ParkSpotterLogoBlack } from "../../Assets/Logo/Logo"

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  width: 100%;
`

const ContentWrapper = styled.div`
  background: white;
  padding: 2rem;
  width: 100%;
  color: #333;
  position: relative;
  font-family: Arial, sans-serif;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
`

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`

const Logo = styled.img`
  max-width: 50px;
  height: auto;
`

const InvoiceInfo = styled.div`
  text-align: right;
`

const InvoiceSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const Detail = styled.div`
  flex: 1;
  text-align: left;
`

const Label = styled.span`
  font-weight: bold;
`

const Note = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin-top: 2rem;
`

const PrintButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin: 10px auto 0 auto;
`

const dummyTicket = {
  id: 21,
  employee: null,
  customer: null,
  zone: 3,
  slot: 38,
  vehicle: {
    plate_number: "ABC3454",
    mobile_no: "938434",
  },
  ticket_no: "SP-Padma-1021",
  amount: 0.0,
  fine: 80,
  check_in_time: null,
  check_out_time: null,
  rate_per_minute: "0.50",
  booking_time: "2024-05-25T23:38:43.926902+06:00",
  appoximate_check_out_time: null,
  total_amount: 80.0,
  is_paid: false,
}

const DetailedInvoice = () => {
  const { ticketNo } = useParams()
  // const navigate = useNavigate()
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
  )
}

export default DetailedInvoice
