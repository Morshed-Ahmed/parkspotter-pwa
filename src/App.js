import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OpeningPage from "./Components/OpeningPage/OpeningPage.component";
import LoginPage from "./Components/Login/Login.component";
import SignupPage from "./Components/SignUp/SignUp.component";
import Map from "./Components/Map/Map.component";
import LocationDetail from "./Components/LocationDetail/LocationDetail.component";
import SlotBookingForm from "./Components/SlotBookingForm/SlotBookingForm.component";
import Payment from "./Components/Payment/Payment.component";
import Ticket from "./Components/Ticket/Ticket.component";
import Home from "./Components/Home/Home/Home";
import PersonalInformation from "./Components/Profile/PersonalInformation/PersonalInformation";
import History from "./Components/Profile/History/History";
import TermsAndConditions from "./Components/TermsAndConditions/TermsAndConditions.component";
// import TicketHistory from "./Components/TicketHistory/TicketHistory.component";
import DetailedInvoice from "./Components/DetailedInvoice/DetailedInvoice.component";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<PersonalInformation />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/location/:id" element={<LocationDetail />} />
        <Route path="/slot/:slotNumber" element={<SlotBookingForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/ticket/:ticketNo" element={<DetailedInvoice />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
}

export default App;
