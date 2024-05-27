import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 50%;
  margin: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ProfileTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: 12px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const CircularImageContainer = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  margin: auto;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  width: 400px;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  &:disabled {
    background-color: #e9ecef;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const EditButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #c3e6cb;
    cursor: not-allowed;
  }
`;

export const ProfileFieldContainer = styled.div`
  margin-top: 12px;
`;
export const BackButton = styled(NavLink)`
  cursor: pointer;
  display: inline;

  img {
    width: 20px;
  }
  &:hover img {
    background: #ddd;
    color: white;
    border-radius: 7px;
  }
`;

const PersonalInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
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
  });

  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

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
        );

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
          });
        }
      });
  }, [user_id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

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
    };

    fetch(`https://parkspotter-backened.onrender.com/customer/customer-list/${user_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile updated:", data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div style={{ padding: "15px" }}>
      <Container>
        <BackButton to={"/home"}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
            alt="Back"
          />
        </BackButton>
        <ProfileTitle>Personal Information</ProfileTitle>

        <CircularImageContainer>
          <Image
            src={
              "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=sph"
            }
            alt={"Profile image"}
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
            />
          </ProfileField>

          {isEditing && (
            <>
              <ProfileField>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formValues.currentPassword}
                  onChange={handleInputChange}
                />
              </ProfileField>
              <ProfileField>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formValues.newPassword}
                  onChange={handleInputChange}
                />
              </ProfileField>
              <ProfileField>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Retype Password"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
              </ProfileField>
            </>
          )}
          <ButtonContainer>
            {isEditing ? (
              <>
                <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                <SaveButton onClick={handleSaveClick}>Save Changes</SaveButton>
              </>
            ) : (
              <EditButton onClick={handleEditClick}>Edit Profile</EditButton>
            )}
          </ButtonContainer>
        </ProfileFieldContainer>
      </Container>
    </div>
  );
};

export default PersonalInformation;
