import React from "react";
import { useLocation } from "react-router-dom";

const SlotDetail = () => {
  const location = useLocation();
  const { slotNumber, zone, userEmail } = location.state;

  return (
    <div>
      <h1>Slot Detail</h1>
      <p>Slot Number: {slotNumber}</p>
      <p>Zone: {zone}</p>
      <p>User Email: {userEmail}</p>
    </div>
  );
};

export default SlotDetail;
