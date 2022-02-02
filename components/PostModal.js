/** @format */
import { useState, useContext } from "react";
import styled from "styled-components";
import { url } from "../utils/utils";
import { useRouter } from "next/router";

const Container = styled.form`
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  background: linear-gradient(
    0deg,
    rgba(189, 255, 201, 1) 0%,
    rgba(131, 228, 148, 1) 100%
  );
  z-index: 99;

  transform: ${(props) =>
    props.visibility ? `translateY(0)` : `translateY(100%)`};
  transition: all 0.3s ease-out;
`;

const TextAreaStyled = styled.textarea`
  width: 80%;
  height: 250px;
  margin: 15px 0;
  padding: 10px 15px;
  border: ${(props) =>
    props.fail ? "2px solid #FF0000" : "1px solid #b2b2b2"};
  border-radius: 25px;
  background: #e0e0e0;
  resize: auto;

  font-size: 20px;

  &::placeholder {
    color: ${(props) => (props.fail ? "#FF0000" : "#b2b2b2")};
  }
`;

const PostButton = styled.button`
  width: 140px;
  height: 30px;
  background: #fff;
  position: relative;

  border-radius: 25px;
  border: 4px solid #3dbe4a;
  overflow: hidden;
  color: #3dbe4a;
  font-weight: 800;
  font-size: 14px;
  text-align: center;
  margin: 5px 0;
  cursor: pointer;

  &::before {
    content: "POST";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    top: 0;
    left: 0;
    z-index: 2;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    top: 0;
    left: 100%;
    background: #d2d2d2;
    transition: all 0.3s ease-in-out;
    z-index: 1;
  }
  &:hover::after {
    transform: translateX(-100%);
  }
`;

const PostModal = ({ visible }) => {
  const [description, setDescription] = useState([]);
  const [isFailed, setIsFailed] = useState(false);

  const router = useRouter();

  if (typeof window !== "undefined") {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const userId = user._id;
    const universityOfCreator = user.university;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (description.length == 0) {
        setIsFailed(true);
      } else {
        fetch(url + `/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ description, userId, universityOfCreator }),
        }).then((response) => response.json());
        router.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container onSubmit={handleSubmit} visibility={visible}>
      <TextAreaStyled
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={
          !isFailed
            ? "What's up?"
            : "Text is too short or too long (1:1000 charakters)"
        }
        fail={isFailed}
      />
      <PostButton type='submit' />
    </Container>
  );
};

export default PostModal;
