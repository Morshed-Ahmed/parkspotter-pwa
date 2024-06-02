import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  min-height: 100vh;

  font-family: "San Francisco", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 15px;
  }
`

const ProfileTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const CircularImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  margin: 20px auto;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ProfileField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
`

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: ${({ isEditing }) => (isEditing ? "1px solid #ccc" : "none")};
  border-radius: 8px;
  background-color: ${({ isEditing }) => (isEditing ? "#fff" : "#e9ecef")};
  transition: border-color 0.3s, background-color 0.3s;

  &:disabled {
    background-color: #e9ecef;
  }

  &:focus {
    border-color: ${({ isEditing }) => (isEditing ? "#007aff" : "none")};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${({ variant }) =>
    variant === "edit" &&
    `
    color: #fff;
    background-color: #007aff;

    &:hover {
      background-color: #005bb5;
    }
  `}

  ${({ variant }) =>
    variant === "cancel" &&
    `
    color: #007aff;
    background-color: #fff;
    border: 1px solid #007aff;

    &:hover {
      background-color: #f1f1f1;
    }
  `}

  ${({ variant }) =>
    variant === "save" &&
    `
    color: #fff;
    background-color: #34c759;

    &:hover {
      background-color: #28a745;
    }

    &:disabled {
      background-color: #c3e6cb;
      cursor: not-allowed;
    }
  `}
`

const ProfileFieldContainer = styled.div`
  margin-top: 20px;
`

const BackButton = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #007aff;
  margin-bottom: 20px;

  &:hover {
    color: #005bb5;
  }

  img {
    width: 20px;
    margin-right: 8px;
  }
`

const PersonalInformation = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    mobile_no: "",
    vehicle_brand: "",
    plate_number: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch(`https://parkspotter-backened.onrender.com/customer/customer-list/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const userData = data.find(
          (customer) => customer.customer_id.id === parseInt(user_id)
        )

        if (userData) {
          setFormValues({
            username: userData.customer_id.username || "",
            email: userData.customer_id.email || "",
            first_name: userData.customer_id.first_name || "",
            last_name: userData.customer_id.last_name || "",
            mobile_no: userData.mobile_no || "",
            vehicle_brand: userData.vehicle_brand || "",
            plate_number: userData.plate_number || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          })
        }
      })
  }, [user_id, token])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
  }

  const handleSaveClick = () => {
    const updatedProfile = {
      id: parseInt(user_id),
      customer_id: {
        id: parseInt(user_id),
        username: formValues.username,
        email: formValues.email,
        first_name: formValues.first_name,
        last_name: formValues.last_name,
      },
      mobile_no: formValues.mobile_no,
      vehicle_brand: formValues.vehicle_brand,
      plate_number: formValues.plate_number,
      joined_date: new Date().toISOString(),
    }

    fetch(
      `https://parkspotter-backened.onrender.com/customer/customer-list/${user_id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile updated:", data)
        setIsEditing(false)
      })
      .catch((error) => {
        console.error("Error updating profile:", error)
      })
  }

  return (
    <div style={{ padding: "15px" }}>
      <Container>
        <BackButton to={"/home"}>Go Back</BackButton>
        <ProfileTitle>Personal Information</ProfileTitle>
        <CircularImageContainer>
          <Image
            src={
              "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=sph"
            }
            alt="Profile"
          />
        </CircularImageContainer>
        <ProfileFieldContainer>
          <ProfileField>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              isEditing={isEditing}
            />
          </ProfileField>
          <ProfileField>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              isEditing={isEditing}
            />
          </ProfileField>
          <ProfileField>
            <Label>First Name</Label>
            <Input
              type="text"
              name="first_name"
              value={formValues.first_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              isEditing={isEditing}
            />
          </ProfileField>
          <ProfileField>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="last_name"
              value={formValues.last_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              isEditing={isEditing}
            />
          </ProfileField>
          <ProfileField>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="mobile_no"
              value={formValues.mobile_no}
              onChange={handleInputChange}
              disabled={!isEditing}
              isEditing={isEditing}
            />
          </ProfileField>
          <ProfileField>
            <Label>Vehicle Brand</Label>
            <Input
              type="text"
              name="vehicle_brand"
              value={formValues.vehicle_brand}
              onChange={handleInputChange}
              disabled={!isEditing}
              isEditing={isEditing}
            />
          </ProfileField>
          <ProfileField>
            <Label>Plate Number</Label>
            <Input
              type="text"
              name="plate_number"
              value={formValues.plate_number}
              onChange={handleInputChange}
              disabled={!isEditing}
              isEditing={isEditing}
            />
          </ProfileField>

          {isEditing && (
            <>
              <ProfileField>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formValues.currentPassword}
                  onChange={handleInputChange}
                  isEditing={isEditing}
                />
              </ProfileField>
              <ProfileField>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formValues.newPassword}
                  onChange={handleInputChange}
                  isEditing={isEditing}
                />
              </ProfileField>
              <ProfileField>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Retype Password"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                  isEditing={isEditing}
                />
              </ProfileField>
            </>
          )}
          <ButtonContainer>
            {isEditing ? (
              <>
                <Button variant="cancel" onClick={handleCancelClick}>
                  Cancel
                </Button>
                <Button
                  variant="save"
                  onClick={handleSaveClick}
                  disabled={!formValues.username || !formValues.email}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="edit" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}
          </ButtonContainer>
        </ProfileFieldContainer>
      </Container>
    </div>
  )
}

export default PersonalInformation
