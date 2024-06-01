import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { setRedirectedFlag } from "../../Store/User/userSlice"
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
  min-height: 100vh;
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
  min-height: 100vh;
  margin: auto auto;
  text-align: center;
  animation: ${fadeIn} 2s ease-in-out;
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const SignupLink = styled.p`
  margin-top: 1rem;
  color: #202123;

  a {
    color: inherit;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #005bb5;
    }
  }
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

const LoginPage = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    dispatch(setRedirectedFlag(false))

    fetch("https://parkspotter-backened.onrender.com/accounts/user_login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: login, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setSuccess(true)

        localStorage.setItem("token", data.token)
        localStorage.setItem("role", data.role)
        localStorage.setItem("user_id", data.user_id)

        setTimeout(() => navigate("/home"), 1500)
      })
      .catch((error) => {
        setLoading(false)
        setError("Invalid email or password. Please try again.")
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
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Login</Button>
        </form>
        <SignupLink>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignupLink>
      </FormWrapper>
    </PageWrapper>
  )
}

export default LoginPage
