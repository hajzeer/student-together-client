/** @format */

import styled from "styled-components";
import Link from "next/link";

const Container = styled.section`
  position: fixed;
  overflow: 20px;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;

  background: rgba(131, 228, 148, 1);
`;

const Subject = styled.h2`
  padding: 0;
  margin: 0;
  z-index: 2;
  font-size: 25px;
  text-transform: uppercase;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
  color: #fff;
`;

const ProfileButton = styled.button`
  bottom: 10px;
  right: 10px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #000;
  border: none;
`;
const Header = () => {
  return (
    <Container>
      <Link href='/profile'>
        <ProfileButton />
      </Link>
      <Link href='/dashboard'>
        <Subject>Students Together</Subject>
      </Link>
    </Container>
  );
};

export default Header;
