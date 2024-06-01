import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import ParticlesBg from "particles-bg"
import { motion, AnimatePresence } from "framer-motion"
import { ClipLoader } from "react-spinners"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333333;
  animation: ${fadeIn} 1.5s ease-in-out;
  position: relative;
  overflow: hidden;
`

const FormWrapper = styled.div`
  backdrop-filter: blur(5px);
  padding: 2rem;
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 2s ease-in-out;
  z-index: 1;
  position: relative;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
`

const CheckboxWrapper = styled.div`
  color: #333333;
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`

const Checkbox = styled.input`
  margin-right: 0.5rem;
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border-radius: 10px;
  border: none;
  background-color: #202123;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;

  &:hover {
    background-color: #005bb5;
    color: #e0f0ff;
  }

  &:active {
    background-color: #005bb5;
    transform: scale(0.98);
  }
`

const ErrorMessage = styled.p`
  color: red;
  margin: 0.5rem 0;
`

const LoadingOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 2;
`

const SignupPage = () => {
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions")
      return
    }

    setLoading(true)

    const data = {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      mobile_no: phoneNumber,
      password,
      confirm_password: confirmPassword,
    }

    console.log(data)
    fetch(
      "https://parkspotter-backened.onrender.com/customer/customer_register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(
              data.confirm_password || "An error occurred. Please try again."
            )
          })
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)
        toast.success("Customer account successful.")
        navigate("/login")
      })
      .catch((error) => {
        console.error("Error:", error)
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <PageWrapper>
      <ParticlesBg type="cobweb" bg={true} num={15} />
      <AnimatePresence>
        {loading && (
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ClipLoader size={50} color={"#007aff"} loading={loading} />
          </LoadingOverlay>
        )}
      </AnimatePresence>
      <FormWrapper>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <label htmlFor="terms">
              I accept the <Link to="/terms">terms and conditions</Link>
            </label>
          </CheckboxWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Sign Up</Button>
        </form>
      </FormWrapper>
    </PageWrapper>
  )
}

export default SignupPage
