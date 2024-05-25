import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #ddd;
  width: 50%;
  margin: auto;
  padding: 10px;
`;
const CardContainer = styled.div`
  border: 1px solid black;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
`;

const History = () => {
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>History</h1>
      <CardContainer>
        <h1>Dhaka ParkSpotter</h1>
      </CardContainer>
    </Container>
  );
};

export default History;
