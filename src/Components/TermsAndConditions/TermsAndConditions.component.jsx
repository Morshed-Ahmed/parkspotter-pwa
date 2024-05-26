import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  color: #ffffff;
`;

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 90vw;

  @media(min-width: 768px) {
    padding: 3rem;
    max-width: 800px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #202123;

  @media(min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  color: #202123;

  strong {
    font-weight: bold;
    font-size: 16px;
  }

  @media(min-width: 768px) {
    font-size: 16px;

    strong {
      font-size: 18px;
    }
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
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

  @media(min-width: 768px) {
    padding: 0.75rem 1.5rem;
    margin-top: 2rem;
  }
`;

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup");
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>Terms and Conditions</Title>
        <Paragraph>
          These are the terms and conditions for using our service. Please read
          these terms carefully before using our service. By using our service,
          you agree to be bound by these terms and conditions.
          <br />
          <br />
          <strong>Your Rights and Responsibilities:</strong>
          <br />
          - You have the right to use our service in accordance with these terms
          and conditions.
          <br />
          - You are responsible for maintaining the confidentiality of your
          account information.
          <br />
          - You are responsible for all activity that occurs under your account.
          <br />
          - You agree to not use our service for any illegal or unauthorized
          purpose.
          <br />
          <strong>Our Limitations of Liability:</strong>
          <br />
          - We are not liable for any damages that may arise out of your use of
          our service.
          <br />
          - We are not liable for any content or information that you access
          through our service.
          <br />
          <strong>Termination of Your Access:</strong>
          <br />
          - We may terminate your access to our service at any time, with or
          without cause.
          <br />
          <strong>Dispute Resolution:</strong>
          <br />
          - You agree to resolve any disputes arising out of these terms and
          conditions through binding arbitration.
          <br />
          <strong>Governing Law:</strong>
          <br />
          - These terms and conditions shall be governed by and construed in
          accordance with the laws of the State of [Your State].
          <br />
          We reserve the right to modify these terms and conditions at any time
          without prior notice. You are responsible for reviewing these terms
          and conditions regularly to stay informed of any updates. By
          continuing to use our service after we have posted updates to these
          terms and conditions, you agree to be bound by the updated terms and
          conditions. If you have any questions about these terms and
          conditions, please contact us.
        </Paragraph>
        <Button onClick={handleBackClick}>Back to Signup</Button>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default TermsAndConditions;
