// import React, { useState } from "react";
// import styled from "styled-components";

// const ProfileContainer = styled.div`
//   padding: 20px;
//   max-width: 800px;
//   margin: 0 auto;
//   background-color: #f9f9f9;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const ProfilePicture = styled.div`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background-color: #ccc;
//   background-image: url("https://via.placeholder.com/100"); // Replace with actual image URL
//   background-size: cover;
//   background-position: center;
//   margin-bottom: 20px;
// `;

// const ProfileField = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-bottom: 10px;
//   width: 300px;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   color: #666;
//   margin-bottom: 5px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   background-color: #f5f5f5;
//   &:disabled {
//     background-color: #e9ecef;
//   }
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const EditButton = styled.button`
//   padding: 10px 20px;
//   font-size: 16px;
//   color: #fff;
//   background-color: #007bff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const CancelButton = styled.button`
//   padding: 10px 20px;
//   font-size: 16px;
//   color: #007bff;
//   background-color: #fff;
//   border: 1px solid #007bff;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #e9ecef;
//   }
// `;

// const SaveButton = styled.button`
//   padding: 10px 20px;
//   font-size: 16px;
//   color: #fff;
//   background-color: #28a745;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #218838;
//   }
//   &:disabled {
//     background-color: #c3e6cb;
//     cursor: not-allowed;
//   }
// `;

// const PersonalInformation = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formValues, setFormValues] = useState({
//     fullName: "Md. Morshed Ahmed",
//     email: "morshed.dv@gmail.com",
//     phone: "+8801934981700",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//   };

//   const handleSaveClick = () => {
//     // Save changes logic here
//     setIsEditing(false);
//   };

//   return (
//     <ProfileContainer>
//       <ProfilePicture />
//       <ProfileField>
//         <Label>Full name</Label>
//         <Input
//           type="text"
//           name="fullName"
//           value={formValues.fullName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//         />
//       </ProfileField>
//       <ProfileField>
//         <Label>Email Address</Label>
//         <Input
//           type="email"
//           name="email"
//           value={formValues.email}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//         />
//       </ProfileField>
//       <ProfileField>
//         <Label>Phone</Label>
//         <Input
//           type="tel"
//           name="phone"
//           value={formValues.phone}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//         />
//       </ProfileField>
//       {isEditing && (
//         <>
//           <ProfileField>
//             <Label>Password</Label>
//             <Input
//               type="password"
//               name="currentPassword"
//               placeholder="Current Password"
//               value={formValues.currentPassword}
//               onChange={handleInputChange}
//             />
//           </ProfileField>
//           <ProfileField>
//             <Input
//               type="password"
//               name="newPassword"
//               placeholder="New Password"
//               value={formValues.newPassword}
//               onChange={handleInputChange}
//             />
//           </ProfileField>
//           <ProfileField>
//             <Input
//               type="password"
//               name="confirmPassword"
//               placeholder="Retype Password"
//               value={formValues.confirmPassword}
//               onChange={handleInputChange}
//             />
//           </ProfileField>
//         </>
//       )}
//       <ButtonContainer>
//         {isEditing ? (
//           <>
//             <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
//             <SaveButton onClick={handleSaveClick}>Save Changes</SaveButton>
//           </>
//         ) : (
//           <EditButton onClick={handleEditClick}>Edit Profile</EditButton>
//         )}
//       </ButtonContainer>
//     </ProfileContainer>
//   );
// };

// export default PersonalInformation;

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
    fullName: "",
    email: "",
    mobile_no: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(
      `https://parkspotter-backened.onrender.com/accounts/profile/${user_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setFormValues({
          username: data.park_owner_id.username || "",
          email: data.park_owner_id.email || "",
          mobile_no: data.mobile_no || "",
          address: data.address || "",

          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      });
  }, [user_id]);

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
    fetch(
      `https://parkspotter-backened.onrender.com/accounts/profile/${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: formValues.username,
          email: formValues.email,
          mobile_no: formValues.mobile_no,
          address: formValues.address,

          password: formValues.newPassword,
        }),
      }
    )
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
            alt=""
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
            <Label>Address</Label>
            <Input
              type="tel"
              name="address"
              value={formValues.address}
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