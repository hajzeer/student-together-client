/** @format */

import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  background: linear-gradient(
    0deg,
    rgba(189, 255, 201, 1) 0%,
    rgba(131, 228, 148, 1) 100%
  );
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <i className='gg-loadbar-alt'></i>
    </LoadingContainer>
  );
};
export default Loading;
