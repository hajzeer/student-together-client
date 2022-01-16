/** @format */

import { useState } from "react";
import Layout from "../layout/layout";
import Hero from "../components/heroImage";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.section`
  width: 100%;
  height: 100vh;
`;
const FormConainer = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelStyled = styled.label`
  text-transform: uppercase;
  font-weight: 700;
`;

const FirstPage = styled.div`
  width: 100%;
  padding: 100px 0 0 0;

  display: ${(props) => (props.visible ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SecondPage = styled.div`
  width: 100%;
  height: 100vh;

  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputStyle = styled.input`
  font-family: "Oswald", sans-serif;
  width: 250px;
  height: 25px;
  padding: 5px 20px;
  margin: 5px 0;
  border-radius: 25px;
  border: ${(props) =>
    props.fail ? "2px solid #FF0000" : "1px solid #b2b2b2"};
  font-size: 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  &::placeholder {
    font-family: "Oswald", sans-serif;
    color: ${(props) => (props.fail ? " #FF0000" : " #b2b2b2")};
  }
  &:focus {
    border: 3px solid #83e494;
    outline: none;
  }
`;

const RegisterButton = styled.button`
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
    content: "";
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

const Register = () => {
  const [isVisible, setIsVisible] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [term, setTerm] = useState("");
  const [degreeOfStudy, setDegreeOfStudy] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch(process.env.URL + `/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          city,
          university,
          speciality,
          term,
          degreeOfStudy,
          email,
          password,
          password_confirmation,
        }),
      }).then((response) => response.json(), router.push("/"));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Layout>
      <Container>
        <Hero image='/heroImage.jpg'>register</Hero>
        <FormConainer onSubmit={handleSubmit}>
          <FirstPage visible={isVisible}>
            <LabelStyled>username</LabelStyled>
            <InputStyle
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <LabelStyled>First Name</LabelStyled>
            <InputStyle
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <LabelStyled>Last Name</LabelStyled>
            <InputStyle
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <LabelStyled>Your city</LabelStyled>
            <InputStyle
              type='text'
              name='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <LabelStyled>University</LabelStyled>
            <InputStyle
              type='text'
              name='university'
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
            <LabelStyled>speciality</LabelStyled>
            <InputStyle
              type='text'
              name='speciality'
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
            />
            <LabelStyled>term</LabelStyled>
            <InputStyle
              type='text'
              name='term'
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <LabelStyled>degree of study</LabelStyled>
            <InputStyle
              type='text'
              name='degreeOfStudy'
              value={degreeOfStudy}
              onChange={(e) => setDegreeOfStudy(e.target.value)}
            />
            <RegisterButton
              type='button'
              visible={isVisible}
              onClick={() => setIsVisible(!isVisible)}>
              Next
            </RegisterButton>
          </FirstPage>
          <SecondPage visible={isVisible}>
            <LabelStyled>e-mail</LabelStyled>
            <InputStyle
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LabelStyled>password</LabelStyled>
            <InputStyle
              type='password'
              name='passwordConfirmation'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LabelStyled>confirm password</LabelStyled>
            <InputStyle
              type='password'
              name='password'
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <RegisterButton type='submit' visible={isVisible}>
              Sign up
            </RegisterButton>
          </SecondPage>
        </FormConainer>
      </Container>
    </Layout>
  );
};
export default Register;
