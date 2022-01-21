/** @format */

import { useState } from "react";
import Layout from "../layout/layout";
import Hero from "../components/heroImage";
import styled from "styled-components";
import { useRouter } from "next/router";
import { url } from "../utils/utils";

const Container = styled.section`
  width: 100%;
  height: 100vh;
`;
const FormConainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelStyled = styled.label`
  text-transform: uppercase;
  font-weight: 700;
`;

const FirstPage = styled.div.attrs((props) => ({
  className: props.className,
}))`
  display: none;

  &.active {
    width: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const SecondPage = styled.div.attrs((props) => ({
  className: props.className,
}))`
  display: none;

  &.active {
    width: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const ThirdPage = styled.div.attrs((props) => ({
  className: props.className,
}))`
  display: none;

  &.active {
    width: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const InputStyle = styled.input`
  font-family: "Oswald", sans-serif;
  width: 250px;
  height: 25px;
  padding: 5px 20px;
  margin: 5px 0;
  border-radius: 25px;
  border: 1px solid #b2b2b2;
  font-size: 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  &::placeholder {
    font-family: "Oswald", sans-serif;
    color: 1px solid #b2b2b2;
  }
  &:focus {
    border: 3px solid #83e494;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const BackButton = styled.button`
  width: 140px;
  height: 30px;
  margin: 5px 0;
  align-self: flex-start;
  background: #83e494;

  border-radius: 25px;
  border: 4px solid #83e494;
  color: #fff;
  font-weight: 900;
  font-size: 14px;
  text-align: center;
  margin: 5px 0;
  cursor: pointer;
`;

const Register = () => {
  const [isVisible, setIsVisible] = useState(0);
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
      fetch(url + `/user/signup`, {
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
          <FirstPage className={isVisible === 0 ? "active" : "unactive"}>
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
            <RegisterButton type='button' onClick={() => setIsVisible(1)}>
              Next
            </RegisterButton>
          </FirstPage>
          <SecondPage className={isVisible === 1 ? "active" : "unactive"}>
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
            <ButtonContainer>
              <BackButton type='button' onClick={() => setIsVisible(0)}>
                Back
              </BackButton>
              <RegisterButton type='button' onClick={() => setIsVisible(2)}>
                Next
              </RegisterButton>
            </ButtonContainer>
          </SecondPage>
          <ThirdPage className={isVisible === 2 ? "active" : "unactive"}>
            <LabelStyled>username</LabelStyled>
            <InputStyle
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <ButtonContainer>
              <BackButton type='button' onClick={() => setIsVisible(1)}>
                Back
              </BackButton>
              <RegisterButton type='submit'>Sign up</RegisterButton>
            </ButtonContainer>
          </ThirdPage>
        </FormConainer>
      </Container>
    </Layout>
  );
};
export default Register;
