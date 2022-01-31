/** @format */

import styled, { createGlobalStyle } from "styled-components";
import Head from "next/head";

const GlobalStyle = createGlobalStyle`
body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Nunito", sans-serif;
    background: linear-gradient(
    0deg,
    rgba(189, 255, 201, 1) 0%,
    rgba(131, 228, 148, 1) 100%
  );
}
`;

const Container = styled.section`
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <section>
      <Head>
        <title>Students together</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Nunito:wght@300;500;700;900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <GlobalStyle />
      <Container>{children}</Container>
    </section>
  );
};

export default Layout;
