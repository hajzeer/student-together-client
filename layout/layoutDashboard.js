/** @format */

import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import PostModal from "../components/PostModal";

const GlobalStyle = createGlobalStyle`
body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;


    font-family: "Nunito", sans-serif;
}
`;

const Container = styled.section`
  width: 100%;
  height: auto;
  background: linear-gradient(
    0deg,
    rgba(189, 255, 201, 1) 0%,
    rgba(131, 228, 148, 1) 100%
  );
`;

const LayoutDashboard = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    if (isVisible === false) {
      setIsVisible(true);
    } else setIsVisible(false);
  };
  return (
    <Container visible={isVisible}>
      <Head>
        <title>Students together</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Nunito:wght@300;500;700;900&display=swap'
          rel='stylesheet'
        />
        <link href='https://css.gg/loadbar-alt.css' rel='stylesheet' />
      </Head>
      <GlobalStyle />
      <Header />
      <PostModal visible={isVisible} />
      <Container>{children}</Container>
      <Footer visible={handleClick} crossAnimation={isVisible} />
    </Container>
  );
};

export default LayoutDashboard;
