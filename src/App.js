import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpeningPage from './Components/OpeningPage/OpeningPage.component';
import LoginPage from './Components/Login/Login.component';
import SignupPage from './Components/SignUp/SignUp.component';
import Map from './Components/Map/Map.component';
import LocationDetail from './Components/LocationDetail/LocationDetail.component';
import SlotBookingForm from './Components/SlotBookingForm/SlotBookingForm.component';
import Payment from './Components/Payment/Payment.component';
import Ticket from './Components/Ticket/Ticket.component';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/location/:id" element={<LocationDetail />} />
        <Route path="/slot/:slotNumber" element={<SlotBookingForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </Router>
  );
}

export default App;
