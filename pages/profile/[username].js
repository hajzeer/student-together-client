/** @format */

import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { url } from "../../utils/utils";
import { byDate } from "../../functions/helperFuncs";
import LayoutDashboard from "../../layout/layoutDashboard";
import Loading from "../../components/Loading";
import GetAllPosts from "../../components/GetAllPosts";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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

const Profiles = ({ items }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPost, setIsPost] = useState([]);

  const getData = async () => {
    const response = await fetch(url + `/posts/profile/${items.username}`);
    const data = await response.json();

    if (items && data) {
      data.forEach((post) => {
        post.userId = items.username;
      });
      data.sort(byDate);
      setIsLoading(!isLoading), setIsPost(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutDashboard>
      {isLoading ? (
        <Container>
          <DataContainer>
            <ProfileImg></ProfileImg>
            <NameStyledParagraph>
              {items.firstName} {items.lastName}
            </NameStyledParagraph>
            <InnerDataContainer>
              <UserNameParagraph>@{items.username}</UserNameParagraph>
              <CityParagraph>{items.city}</CityParagraph>
            </InnerDataContainer>
            <DescriptionParagraph>{items.description}</DescriptionParagraph>
            <SchoolContainer>
              <ImageStyle src='/school_1.png' width={30} height={30} />
              <CommonParagraph>{items.university}</CommonParagraph>
            </SchoolContainer>
            <SchoolContainer>
              <ImageStyle src='/school_2.png' width={30} height={30} />
              <CommonParagraph>
                {items.speciality}, term: {items.term}
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
export async function getStaticPaths() {
  // Call an external API endpoint to get users
  const res = await fetch(url + `/user/profile/`);
  const items = await res.json();
  // Get the paths we want to pre-render based on users
  const paths = items.map((item) => ({
    params: { username: item.username },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(url + `/user/profile/${params.username}`);
  const items = await res.json();

  return {
    props: {
      items,
    },
  };
}

export default Profiles;
