import React, { useCallback, useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import toast from "react-hot-toast"
import { ReactComponent as LogoSvg } from "../../../Assets/Logo/ParkSpotterLogoBlack.svg"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: perspective(1000px) rotateY(-10deg);
  }
  to {
    opacity: 1;
    transform: perspective(1000px) rotateY(0deg);
  }
`

const NavbarContainer = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
`

const StyledLogo = styled(LogoSvg)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
`

const LogoText = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease-in-out;

  @media (min-width: 600px) {
    font-size: 24px;
  }
`

const BurgerMenu = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  z-index: 1100;
  div {
    width: 100%;
    height: 4px;
    background-color: #333;
    border-radius: 2px;
  }
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const ProfileDropdown = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: #fff;
  color: #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
  z-index: 1000;
  width: 180px;
  padding: 10px;
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (min-width: 600px) {
    width: 220px;
  }
`

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  flex-direction: column;
`

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`

const ProfileDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ProfileName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`

const ProfileEmail = styled.div`
  font-size: 12px;
  color: #666;
`

const DropdownItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #00cc99;
  }

  @media (min-width: 600px) {
    padding: 12px 16px;
  }
`

const LogoutItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #ff4d4d;
  }

  @media (min-width: 600px) {
    padding: 12px 16px;
  }
`

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [profileImage, setProfileImage] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleOutsideClick = useCallback(
    (event) => {
      if (
        isDropdownOpen &&
        !event.target.closest("#profile-dropdown") &&
        !event.target.closest(".burger-menu")
      ) {
        setIsDropdownOpen(false)
      }
    },
    [isDropdownOpen]
  )

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [handleOutsideClick])

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const user_id = localStorage.getItem("user_id")
      const token = localStorage.getItem("token")
      try {
        const response = await fetch(
          `https://parkspotter-backened.onrender.com/customer/customer-list/${user_id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await response.json()
        setProfileImage(
          data.profile_image_url ||
            "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=sph"
        )
        setUserName(data.customer_id.username || "")
        setUserEmail(data.customer_id.email || "")
      } catch (error) {
        console.error("Error fetching profile details:", error)
      }
    }

    fetchProfileDetails()
  }, [])

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
      <LogoContainer to="/home">
        <StyledLogo />
        <LogoText to="/home">ParkSpotter</LogoText>
      </LogoContainer>
      <ProfileContainer>
        <BurgerMenu className="burger-menu" onClick={toggleDropdown}>
          <div></div>
          <div></div>
          <div></div>
        </BurgerMenu>
        {isDropdownOpen && (
          <ProfileDropdown id="profile-dropdown">
            <ProfileInfo>
              <ProfileImage src={profileImage} alt="Profile" />
              <ProfileDetails>
                <ProfileName>{userName}</ProfileName>
                <ProfileEmail>{userEmail}</ProfileEmail>
              </ProfileDetails>
            </ProfileInfo>
            <DropdownItem to="/profile">Profile</DropdownItem>
            <DropdownItem to="/history">History</DropdownItem>
            <LogoutItem onClick={handleLogout}>Logout</LogoutItem>
          </ProfileDropdown>
        )}
      </ProfileContainer>
    </NavbarContainer>
  )
}

export default Header
