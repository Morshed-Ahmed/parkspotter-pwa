import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"
import { setRedirectedFlag } from "../../Store/User/userSlice"

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: #ffffff;
`

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 400px;
  text-align: center;
`

const Title = styled.h1`
  color: #202123;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
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

const ErrorMessage = styled.p`
  color: red;
  margin: 0.5rem 0;
`

const SignupLink = styled.p`
  margin-top: 1rem;
  color: #202123;

  a {
    color: coral;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #202123;
    }
  }
`

const LoginPage = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(setRedirectedFlag(false))
    console.log(login, password)
    fetch("https://parkspotter-backened.onrender.com/accounts/user_login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: login, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        localStorage.setItem("token", data.token)
        localStorage.setItem("role", data.role)
        localStorage.setItem("user_id", data.user_id)
        navigate("/home")
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.")
      })
  }

  return (
    <PageWrapper>
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
