/** @format */

import styled from "styled-components";
import Image from "next/image";

const Container = styled.section`
  position: absolute;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: -2;
`;

const ImageStyled = styled(Image)`
  width: 100%;
  height: 100vh;
  object-fit: cover;

  &::after {
    content: "";
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100vh;
  }
`;

const HelperDiv = styled.div`
  position: absolute;
  align-self: flex-start;
  justify-self: flex-start;
  margin: 0;
  padding: 0;
  top: 0;

  z-index: 2;

  width: 100%;
  height: 40%;
  background: linear-gradient(
    0deg,
    rgba(189, 255, 201, 1) 0%,
    rgba(131, 228, 148, 1) 100%
  );
  clip-path: polygon(0 0, 0% 100%, 100% 0);
`;

const Subject = styled.h1`
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 2;
  font-size: 30px;
  text-transform: uppercase;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
  color: #fff;
`;

const Hero = ({ image, children }) => {
  return (
    <Container>
      <ImageStyled src={image} layout='fill' quality={100} />
      <HelperDiv />
      <Subject>{children}</Subject>
    </Container>
  );
};

export default Hero;
