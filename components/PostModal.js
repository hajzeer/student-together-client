/** @format */
import { useState, useContext } from "react";
import styled from "styled-components";
import { url } from "../utils/utils";

const Container = styled.form`
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 400px;

  margin: 15px 0;
  padding: 10px 15px;

  border-radius: 25px;
  background: #e0e0e0;
  resize: auto;

  font-size: 20px;
`;

const PostButton = styled.button`
  width: 140px;
  height: 30px;
  background: #fff;
  position: relative;

  border-radius: 25px;
  border: 4px solid #83e494;
  overflow: hidden;
  color: #83e494;
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
    background: #3dbe4a;
    transition: all 0.3s ease-in-out;
    z-index: 1;
  }
  &:hover::after {
    transform: translateX(-100%);
  }
`;

const PostModal = ({ visible }) => {
  const [description, setDescription] = useState([]);

  if (typeof window !== "undefined") {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const userId = user._id;
    const universityOfCreator = user.university;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch(url + `/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ description, userId, universityOfCreator }),
      }).then((response) => response.json());
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container onClick={handleSubmit} visibility={visible}>
      <TextAreaStyled
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What's up?"
      />
      <PostButton type='submit' />
    </Container>
  );
};

export default PostModal;
