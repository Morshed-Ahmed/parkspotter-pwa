import React, { useCallback, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import toast from "react-hot-toast"

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #ffffff;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #333;

  @media (min-width: 600px) {
    font-size: 26px;
  }
`

const ProfileContainer = styled.div`
  position: relative;
`

const ProfileButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;

  &:hover {
    color: #2980b9;
  }

  @media (min-width: 600px) {
    font-size: 18px;
  }
`

const ProfileDropdown = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: #fff;
  color: #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
  width: 180px;
  animation: fadeIn 0.3s ease-in-out;

  @media (min-width: 600px) {
    width: 220px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const DropdownItem = styled(NavLink)`
  display: block;
  padding: 12px 15px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ecf0f1;
  }

  @media (min-width: 600px) {
    padding: 12px 20px;
  }
`

const LogoutItem = styled.div`
  display: block;
  padding: 12px 15px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ecf0f1;
  }

  @media (min-width: 600px) {
    padding: 12px 20px;
  }
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: 600px) {
    width: 40px;
    height: 40px;
  }
`

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleOutsideClick = useCallback(
    (event) => {
      if (isDropdownOpen && !event.target.closest("#profile-dropdown")) {
        setIsDropdownOpen(false)
      }
    },
    [isDropdownOpen]
  )

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [handleOutsideClick])

  const handleLogout = () => {
    const token = localStorage.getItem("token")

    fetch("https://parkspotter-backened.onrender.com/accounts/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("user_id")
        navigate("/login")
        toast.success("Log out successful")
      })
      .catch((error) => {
        toast.error("Error logging out")
        console.error("Error logging out:", error)
      })
  }

  return (
    <NavbarContainer>
      <Logo to={"/home"}>ParkSpotter</Logo>
      <ProfileContainer>
        <ProfileButton id="profile-dropdown" onClick={toggleDropdown}>
          <ProfileImage
            src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=sph"
            alt="Profile"
          />
        </ProfileButton>
        {isDropdownOpen && (
          <ProfileDropdown>
            <DropdownItem to={"/profile"}>Profile</DropdownItem>
            <DropdownItem to={"/history"}>History</DropdownItem>
            <LogoutItem onClick={handleLogout}>Logout</LogoutItem>
          </ProfileDropdown>
        )}
      </ProfileContainer>
    </NavbarContainer>
  )
}

export default Header
