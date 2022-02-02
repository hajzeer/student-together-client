/** @format */

import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { url } from "../utils/utils";

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
  cursor: pointer;
`;

const UnivParagraph = styled.p`
  font-size: 15px;
  padding: 0;
  margin: 0;
`;
const DescriptionParagraph = styled.p`
  width: 100%;
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

const EditButton = styled.button`
  display: ${(props) => (props.visible ? `none` : `block`)};

  margin: 0 0 0 70px;
  background: none;
  outline: none;
  border: none;
  transition: all 0.3s ease-in-out;
  &:active {
    transform: scale(0.8);
  }
`;

const TrashButton = styled.button`
  width: 35px;
  height: 35px;
  padding: 0;
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

const InnerContainer = styled.form`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextAreaStyled = styled.textarea`
  width: 80%;
  height: 80px;

  padding: 10px 15px;

  border-radius: 25px;
  background: transparent;
  resize: none;

  font-size: 15px;
`;

const CommonButton = styled.button`
  width: 120px;
  height: 30px;
  background: #fff;
  position: relative;

  border-radius: 15px;
  border: 4px solid #828282;
  overflow: hidden;
  color: #828282;
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
    background: #a2a2a2;
    transition: all 0.3s ease-in-out;
    z-index: 1;
  }
  &:hover::after {
    transform: translateX(-100%);
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const GetAllPosts = ({ items, handleChange }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isID, setIsID] = useState("");
  const [isDescription, setIsDesciption] = useState("");

  const router = useRouter();

  if (typeof window !== "undefined") {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
  }

  const handleClick = (e) => {
    setIsEdit(true);
    setIsID(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const description = isDescription;
      fetch(url + `/posts/${isID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ description }),
      }).then((response) => response.json());
      setIsDesciption("");
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    try {
      fetch(url + `/posts/${isID}`, { method: "DELETE" }).then((response) =>
        response.json()
      );
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setIsDesciption("");
  };

  return (
    <>
      {items.map(
        ({ description, _id, createdAt, universityOfCreator, userId }) => {
          return (
            <Container key={_id}>
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
                <EditButton
                  onClick={() => handleClick(_id)}
                  visible={
                    userId !== user.username || (isEdit && isID === _id)
                      ? true
                      : false
                  }>
                  <ImageStyle src='/pencil.png' width={30} height={30} />
                </EditButton>
              </ProfileSection>
              {isEdit && isID === _id ? (
                <InnerContainer onSubmit={handleSubmit}>
                  <TextAreaStyled
                    type='text'
                    value={isDescription}
                    placeholder='Change description'
                    onChange={(e) => setIsDesciption(e.target.value)}
                  />
                  <ButtonContainer>
                    <CommonButton type='submit' onClick={handleChange}>
                      submit
                    </CommonButton>
                    <CommonButton type='button' onClick={handleCancel}>
                      cancel
                    </CommonButton>
                    <TrashButton
                      type='button'
                      onClick={() => {
                        handleDelete();
                        handleChange();
                      }}>
                      <ImageStyle src='/trash.png' width={35} height={35} />
                    </TrashButton>
                  </ButtonContainer>
                </InnerContainer>
              ) : (
                <DescriptionParagraph>{description}</DescriptionParagraph>
              )}

              <DateParagraph>
                {new Date(createdAt).toDateString()}{" "}
                {(new Date(createdAt).getHours() < 10 ? "0" : "") +
                  new Date(createdAt).getHours()}
                :
                {(new Date(createdAt).getMinutes() < 10 ? "0" : "") +
                  new Date(createdAt).getMinutes()}
              </DateParagraph>
            </Container>
          );
        }
      )}
    </>
  );
};

export default GetAllPosts;
