/** @format */

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Hero from "../components/heroImage";
import Layout from "../layout/layout";
import { SessionContext } from "../context/sessionContext";
import { url } from "../utils/utils";

const Container = styled.section`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  box-sizing: border-box;
`;

const InputContainer = styled.form`
  width: auto;
  height: auto;
  padding: 150px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const LogInButton = styled.button`
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

const SignInButton = styled.button`
  width: 140px;
  height: 30px;
  align-self: flex-start;
  background: #fff;

  border-radius: 25px;
  border: 4px solid #83e494;

  color: #83e494;
  font-weight: 900;
  font-size: 14px;
  text-align: center;
  margin: 5px 0;
  cursor: pointer;
`;

const Home = () => {
  const router = useRouter();
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  const { setUser } = useContext(SessionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch(url + `/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == data.user) {
            setMail("");
            setPassword("");
            setFailed(true);
          } else {
            setUser(data.message);
            router.push("/dashboard");
          }
        });

      setMail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Container>
        <Hero image='/heroImage.jpg'>
          Students <br /> Together
        </Hero>
        <InputContainer onSubmit={handleSubmit}>
          <InputStyle
            type='email'
            name='email'
            value={email}
            onChange={(e) => setMail(e.target.value)}
            placeholder='email address'
            fail={failed}
          />
          <InputStyle
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            fail={failed}
          />
          <ButtonContainer>
            <LogInButton type='submit'>Login</LogInButton>
            <Link href='/register'>
              <SignInButton>Sign up</SignInButton>
            </Link>
          </ButtonContainer>
        </InputContainer>
      </Container>
    </Layout>
  );
};
export default Home;
