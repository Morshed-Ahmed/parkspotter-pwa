import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import Header from "../../SharedComponents/Header/Header"

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 600px;
  color: #202123;
  text-align: center;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #202123;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
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
  background-color: coral;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #202123;
    color: coral;
  }
`

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #202123;
  background-color: rgba(255, 255, 255, 0.1);
  color: #202123;
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
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #202123;
  color: #202123;
  cursor: pointer;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #202123;
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
  margin-left: 5px;
`

const LabelLeft = styled(LabelRight)`
  margin-left: 0px;
`

const dummyTickets = [
  {
    amount: "$10",
    ticketNo: "123456",
    date: "2024-05-25",
    parkOwner: "Bashundhara",
  },
  {
    amount: "$15",
    ticketNo: "123457",
    date: "2024-05-26",
    parkOwner: "Khilkhet",
  },
  {
    amount: "$20",
    ticketNo: "123458",
    date: "2024-05-27",
    parkOwner: "Mirpur",
  },
]

const TicketHistory = () => {
  const [tickets, setTickets] = useState(dummyTickets)
  const [searchDate, setSearchDate] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/tickets"
        )
        const data = await response.json()
        setTickets(data)
      } catch (error) {
        toast.error("Failed to load ticket data")
      }
    }

    fetchTickets()
  }, [])

  const handleSortByNewest = () => {
    const sortedTickets = [...tickets].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
    setTickets(sortedTickets)
  }

  const handleSearch = (event) => {
    setSearchDate(event.target.value)
  }

  const filteredTickets = tickets.filter((ticket) =>
    ticket.date.includes(searchDate)
  )

  const handleTicketClick = (ticketNo) => {
    navigate(`/ticket/${ticketNo}`)
  }

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
            {filteredTickets.map((ticket, index) => (
              <TicketItem
                key={index}
                onClick={() => handleTicketClick(ticket.ticketNo)}
              >
                <DetailTicketNo>
                  <LabelLeft>No:</LabelLeft>
                  <span style={{ color: "coral", fontWeight: "bold" }}>
                    {ticket.ticketNo}
                  </span>
                </DetailTicketNo>
                <DetailRow>
                  <Detail>
                    <LabelLeft>Date:</LabelLeft>
                    {ticket.date}
                  </Detail>
                  <Detail>
                    <LabelRight>Amount:</LabelRight>
                    {ticket.amount}
                  </Detail>
                </DetailRow>
                <DetailRow></DetailRow>
                <DetailRow>
                  <Detail>
                    <LabelLeft>Owner Address:</LabelLeft>
                    {ticket.parkOwner}
                  </Detail>
                </DetailRow>
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
