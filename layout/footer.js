/** @format */

import styled from "styled-components";

const ButtonContainer = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #3dbe4a;
  border: none;
  z-index: 999;

  transition: all 0.3s ease-in-out;

  &:active {
    transform: scale(0.8);
  }
`;

const FooterSectionInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 4px;
    background: #fff;
    border-radius: 25px;
    left: 20%;
    top: 45%;
    transition: all 0.4s ease-out;
    transform: ${(props) =>
      props.visibility ? "rotate(135deg)" : "rotate(0deg)"};
  }

  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 4px;
    background: #fff;
    border-radius: 25px;
    left: 20%;
    top: 45%;
    transition: all 0.4s ease-out;
    transform: ${(props) =>
      props.visibility ? "rotate(45deg)" : "rotate(90deg)"};
  }
`;

const Footer = ({ visible, crossAnimation }) => {
  return (
    <ButtonContainer onClick={visible}>
      <FooterSectionInner visibility={crossAnimation}></FooterSectionInner>
    </ButtonContainer>
  );
};

export default Footer;
