/** @format */

import { useState, useEffect } from "react";
import styled from "styled-components";
import LayoutDashboard from "../layout/layoutDashboard";
import Image from "next/image";
import { useRouter } from "next/router";

import GetAllPosts from "../components/GetAllPosts";
import { url } from "../utils/utils";
import Loading from "../components/Loading";
import { byDate } from "../functions/helperFuncs";

const Container = styled.section`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const ImageStyle = styled(Image)`
  z-index: 0;
`;

const Profile = () => {
  const [isPost, setIsPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(!isLoading), setIsPost(data);
    }
  };

  const handleClick = () => {
    window.sessionStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutDashboard>
      {isLoading ? (
        <Container>
          <DataContainer>
            <LogoutButton onClick={handleClick}>
              {" "}
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
            <DescriptionParagraph>{user.description}</DescriptionParagraph>
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
          <GetAllPosts items={isPost} />
        </Container>
      ) : (
        <Loading />
      )}
    </LayoutDashboard>
  );
};
export default Profile;
