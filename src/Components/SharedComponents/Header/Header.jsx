import React, { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
`;

const Logo = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;

  @media (min-width: 600px) {
    font-size: 20px;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;

  @media (min-width: 600px) {
    font-size: 18px;
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  color: #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  z-index: 1000;
  width: 150px;

  @media (min-width: 600px) {
    width: 200px;
  }
`;

const DropdownItem = styled(NavLink)`
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  &:hover {
    background-color: #f1f1f1;
  }

  @media (min-width: 600px) {
    padding: 10px 20px;
  }
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;

  @media (min-width: 600px) {
    width: 35px;
    height: 35px;
  }
`;

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = useCallback(
    (event) => {
      if (isDropdownOpen && !event.target.closest("#profile-dropdown")) {
        setIsDropdownOpen(false);
      }
    },
    [isDropdownOpen]
  );

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <NavbarContainer>
      <Logo to={"/home"}>ParkSpotter</Logo>
      <ProfileContainer>
        <ProfileButton id="profile-dropdown" onClick={toggleDropdown}>
          <ProfileImage src="https://via.placeholder.com/30" alt="Profile" />
          Profile
        </ProfileButton>
        {isDropdownOpen && (
          <ProfileDropdown>
            <DropdownItem to={"/profile"}>Profile</DropdownItem>
            <DropdownItem to={"/history"}>History</DropdownItem>
            <DropdownItem as="div">Logout</DropdownItem>
          </ProfileDropdown>
        )}
      </ProfileContainer>
    </NavbarContainer>
  );
};

export default Header;
