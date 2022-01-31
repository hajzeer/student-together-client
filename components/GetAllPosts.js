/** @format */

import styled from "styled-components";
import Link from "next/link";

const Container = styled.section`
  width: 80%;
  height: auto;
  font-family: "Nunito", sans-serif;
  border: 2px solid #b2b2b2;
  border-radius: 25px;
  margin: 5px 0;
  padding: 30px;
  background: #e0e0e0;
`;

const AuthorParagraph = styled.p`
  font-size: 20px;
  padding: 0;
  margin: 0;
`;

const UnivParagraph = styled.p`
  font-size: 15px;
  padding: 0;
  margin: 0;
`;
const DescriptionParagraph = styled.p`
  font-size: 22px;
`;
const DateParagraph = styled.p`
  font-size: 14px;
  color: #454545;
  padding: 0;
  margin: 0;
`;

const ProfileDiv = styled.section`
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #000;
`;

const ProfileSection = styled.section`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileSectionInner = styled.div`
  margin: 0 0 0 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const GetAllPosts = ({ items }) => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
  }
  return (
    <>
      {items.map(
        ({ description, id, updatedAt, universityOfCreator, userId }) => {
          return (
            <Container key={id}>
              <ProfileSection>
                <ProfileDiv></ProfileDiv>
                <ProfileSectionInner>
                  <Link
                    href={
                      userId !== user.username
                        ? `/profile/${userId}`
                        : `/profile`
                    }>
                    <AuthorParagraph>@{userId}</AuthorParagraph>
                  </Link>
                  <UnivParagraph>{universityOfCreator}</UnivParagraph>
                </ProfileSectionInner>
              </ProfileSection>
              <DescriptionParagraph>{description}</DescriptionParagraph>
              <DateParagraph>
                {new Date(updatedAt).toDateString()}{" "}
                {(new Date(updatedAt).getHours() < 10 ? "0" : "") +
                  new Date(updatedAt).getHours()}
                :
                {(new Date(updatedAt).getMinutes() < 10 ? "0" : "") +
                  new Date(updatedAt).getMinutes()}
              </DateParagraph>
            </Container>
          );
        }
      )}
    </>
  );
};

export default GetAllPosts;
