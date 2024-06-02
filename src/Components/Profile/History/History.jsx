import React, { useEffect, useState, useCallback } from "react"
import styled, { keyframes } from "styled-components"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import Header from "../../SharedComponents/Header/Header"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const PageWrapper = styled.div`
  font-family: "Helvetica Neue", Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f7;
  animation: ${fadeIn} 1.5s ease-in-out;
`

const ContentWrapper = styled.div`
  background: #ffffff;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  text-align: center;
  animation: ${fadeIn} 2s ease-in-out;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1d1d1f;
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background-color: #0071e3;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #005bb5;
  }

  &:active {
    background-color: #004494;
    transform: scale(0.98);
  }
`

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #d2d2d7;
  background-color: #f5f5f7;
  color: #1d1d1f;
  font-size: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 300px;
  }
`

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TicketItem = styled.div`
  position: relative;
  background-color: #f5f5f7;
  padding: 1rem;
  border-radius: 15px;
  border: 1px solid #d2d2d7;
  color: #1d1d1f;
  cursor: pointer;
  transition: background-color 0.3s;
  overflow: hidden;

  &:hover {
    background-color: #e5e5ea;
  }
`

const StatusBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: ${({ paid }) => (paid ? "#28a745" : "#dc3545")};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: bold;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const Detail = styled.div`
  flex: 1;
  text-align: center;

  @media (max-width: 768px) {
    text-align: start;
  }
`

const DetailTicketNo = styled.div`
  flex: 1;
  text-align: right;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    text-align: right;
  }
`

const LabelRight = styled.span`
  font-weight: bold;
  margin-right: 5px;
  margin-left: 10px;
`

const LabelLeft = styled(LabelRight)`
  margin-left: 0px;
`

const InvoiceButton = styled(Button)`
  background-color: #1d1d1f;
  margin-top: 1rem;
  margin-right: 10px;

  &:hover {
    background-color: #333333;
  }

  &:active {
    background-color: #000000;
  }
`

const ExpandButton = styled(Button)`
  background-color: #0071e3;
  font-size: 0.8rem;
  padding: 5px 10px;
  margin-left: 15px;
  &:hover {
    background-color: #005bb5;
  }

  &:active {
    background-color: #004494;
  }
`

const Divider = styled.div`
  height: 1px;
  background-color: #d2d2d7;
  margin: 1rem 0;
`

const TicketHistory = () => {
  const [tickets, setTickets] = useState([])
  const [expandedTickets, setExpandedTickets] = useState({})
  const [searchDate, setSearchDate] = useState("")
  const navigate = useNavigate()
  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/bookings/"
        )
        const data = await response.json()
        const userTickets = data.filter(
          (ticket) => ticket.customer === parseInt(userId, 10)
        )
        setTickets(userTickets)
      } catch (error) {
        toast.error("Failed to load ticket data.")
      }
    }

    fetchTickets()
  }, [userId])

  const handleSortByNewest = useCallback(() => {
    const sortedTickets = [...tickets].sort(
      (a, b) => new Date(b.booking_time) - new Date(a.booking_time)
    )
    setTickets(sortedTickets)
  }, [tickets])

  const handleSearch = (event) => {
    setSearchDate(event.target.value)
  }

  const toggleExpandTicket = (ticketNo) => {
    setExpandedTickets((prev) => ({
      ...prev,
      [ticketNo]: !prev[ticketNo],
    }))
  }

  const handleTicketClick = (ticketNo) => {
    navigate(`/ticket/${ticketNo}`)
  }

  const filteredTickets = tickets.filter((ticket) =>
    ticket.booking_time.includes(searchDate)
  )

  return (
    <>
      <Header />
      <PageWrapper>
        <ContentWrapper>
          <Title>Invoice List</Title>
          <Controls>
            <Button onClick={handleSortByNewest}>Sort by Newest</Button>
            <Input
              type="date"
              value={searchDate}
              onChange={handleSearch}
              placeholder="Search by Date"
            />
          </Controls>
          <TicketList>
            {filteredTickets.map((ticket) => (
              <TicketItem key={ticket.ticket_no}>
                <StatusBadge paid={ticket.is_paid}>
                  {ticket.is_paid ? "Paid" : "Unpaid"}
                </StatusBadge>
                <DetailTicketNo>
                  <LabelLeft>No:</LabelLeft>
                  <span style={{ color: "#0071e3", fontWeight: "bold" }}>
                    {ticket.ticket_no}
                  </span>
                </DetailTicketNo>
                <DetailRow>
                  <Detail>
                    <LabelLeft>Date:</LabelLeft>
                    {new Date(ticket.booking_time).toLocaleDateString()}
                  </Detail>
                  <Detail>
                    <LabelRight>Amount:</LabelRight>
                    {ticket.total_amount}
                  </Detail>
                </DetailRow>
                <DetailRow>
                  <Detail>
                    <LabelLeft>Vehicle Plate:</LabelLeft>
                    {ticket.vehicle.plate_number}
                  </Detail>
                </DetailRow>
                {expandedTickets[ticket.ticket_no] && (
                  <>
                    <Divider />
                    <DetailRow>
                      <Detail>
                        <LabelLeft>Zone:</LabelLeft>
                        {ticket.zone}
                      </Detail>
                      <Detail>
                        <LabelRight>Slot:</LabelRight>
                        {ticket.slot}
                      </Detail>
                    </DetailRow>
                    <InvoiceButton onClick={() => handleTicketClick(ticket.id)}>
                      View Invoice
                    </InvoiceButton>
                  </>
                )}
                <ExpandButton
                  onClick={() => toggleExpandTicket(ticket.ticket_no)}
                >
                  {expandedTickets[ticket.ticket_no] ? "Collapse" : "Expand"}
                </ExpandButton>
              </TicketItem>
            ))}
          </TicketList>
          <Toaster position="bottom-center" />
        </ContentWrapper>
      </PageWrapper>
    </>
  )
}

export default TicketHistory
