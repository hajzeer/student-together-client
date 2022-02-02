/** @format */

import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import LayoutDashboard from "../layout/layoutDashboard";
import Image from "next/image";
import { useRouter } from "next/router";

import GetAllPosts from "../components/GetAllPosts";
import { url } from "../utils/utils";
import Loading from "../components/Loading";
import { byDate } from "../functions/helperFuncs";
import { SessionContext } from "../context/sessionContext";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background: linear-gradient(
    0deg,
    rgba(189, 255, 201, 1) 0%,
    rgba(131, 228, 148, 1) 100%
  );
`;

const DataContainer = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const InnerDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const InnerContainer = styled.form`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 80px;
  height: 80px;
  margin: 0;

  border-radius: 50%;
  background: #000;
  border: none;

  margin: 0 0 0 20px;
`;

const NameStyledParagraph = styled.p`
  margin: 0 0 0 20px;

  padding: 0;
  font-size: 20px;
  font-weight: 700;
`;
const CommonParagraph = styled.p`
  margin: 0 0 0 5px;
`;

const UserNameParagraph = styled.p`
  margin: 0 0 0 20px;
`;

const CityParagraph = styled.p`
  margin: 0 0 0 20px;
  justify-self: space-around;
`;
const DescriptionParagraph = styled.p`
  margin: 20px;
`;

const SchoolContainer = styled.div`
  margin: 0 0 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 100px;
  right: 10px;
  background: none;
  outline: none;
  border: none;
  transition: all 0.3s ease-in-out;
  &:active {
    transform: scale(0.8);
  }
`;
const EditButton = styled.button`
  display: ${(props) => (props.visible ? `none` : `block`)};

  background: none;
  outline: none;
  border: none;
  transition: all 0.3s ease-in-out;
  &:active {
    transform: scale(0.8);
  }
`;

const ImageStyle = styled(Image)`
  z-index: 0;
`;

const TextAreaStyled = styled.textarea`
  width: 80%;
  height: 80px;

  padding: 10px 15px;

  border-radius: 25px;
  background: transparent;
  resize: auto;

  font-size: 15px;
`;

const CommonButton = styled.button`
  width: 140px;
  height: 30px;
  background: #fff;
  position: relative;

  border-radius: 15px;
  border: 4px solid #3dbe4a;
  overflow: hidden;
  color: #3dbe4a;
  font-weight: 800;
  font-size: 14px;
  text-align: center;
  margin: 5px 0;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    top: 0;
    left: 0;
    z-index: 2;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    top: 0;
    left: 100%;
    background: #3dbe4a;
    transition: all 0.3s ease-in-out;
    z-index: 1;
  }
  &:hover::after {
    transform: translateX(-100%);
  }
`;

const Profile = () => {
  const [isPost, setIsPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [description, setDescription] = useState([]);

  const { setUser } = useContext(SessionContext);

  const router = useRouter();

  if (typeof window !== "undefined") {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
  }

  const getData = async () => {
    const response = await fetch(url + `/posts/profile/${user.username}`);
    const data = await response.json();

    if (user && data) {
      data.forEach((post) => {
        post.userId = user.username;
      });
      data.sort(byDate);
      setIsLoading(true), setIsPost(data);
    }
  };

  const logOutClick = () => {
    window.sessionStorage.clear();
    router.push("/");
  };

  const editClick = () => {
    setIsEdit(!isEdit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch(url + `/user/profile/${user.username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ description }),
      }).then((response) => response.json());
      const newUser = user;
      newUser.description = description;
      setUser(newUser);
      setIsEdit(!isEdit);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchAgain = () => {
    setTimeout(() => {
      getData();
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutDashboard>
      {isLoading ? (
        <Container>
          <DataContainer>
            <LogoutButton onClick={logOutClick}>
              <ImageStyle src='/power.png' width={40} height={40} />
            </LogoutButton>

            <ProfileImg></ProfileImg>
            <NameStyledParagraph>
              {user.firstName} {user.lastName}
            </NameStyledParagraph>
            <InnerDataContainer>
              <UserNameParagraph>@{user.username}</UserNameParagraph>
              <CityParagraph>{user.city}</CityParagraph>
            </InnerDataContainer>
            {isEdit ? (
              <InnerContainer onSubmit={handleSubmit}>
                <TextAreaStyled
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Change description'
                />
                <ButtonContainer>
                  <CommonButton type='submit'>submit</CommonButton>
                  <CommonButton onClick={editClick}>cancel</CommonButton>
                </ButtonContainer>
              </InnerContainer>
            ) : (
              <InnerDataContainer>
                <DescriptionParagraph>{user.description}</DescriptionParagraph>
                <EditButton visible={isEdit} onClick={editClick}>
                  <ImageStyle src='/pencil.png' width={30} height={30} />
                </EditButton>
              </InnerDataContainer>
            )}
            <SchoolContainer>
              <ImageStyle src='/school_1.png' width={30} height={30} />
              <CommonParagraph>{user.university}</CommonParagraph>
            </SchoolContainer>
            <SchoolContainer>
              <ImageStyle src='/school_2.png' width={30} height={30} />
              <CommonParagraph>
                {user.speciality}, term: {user.term}
              </CommonParagraph>
            </SchoolContainer>
          </DataContainer>
          <GetAllPosts items={isPost} handleChange={handleFetchAgain} />
        </Container>
      ) : (
        <Loading />
      )}
    </LayoutDashboard>
  );
};
export default Profile;
