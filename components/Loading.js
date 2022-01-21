/** @format */

import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`;

const Loading = () => {
  return (
    <Container>
      <i className='gg-loadbar-alt'></i>
    </Container>
  );
};
export default Loading;
