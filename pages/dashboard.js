/** @format */
import { useState, useEffect } from "react";
import GetAllPosts from "../components/GetAllPosts";
import styled from "styled-components";
import LayoutDashboard from "../layout/layoutDashboard";
import { idChanger } from "../functions/idChanger";
import { url } from "../utils/utils";
import Loading from "../components/Loading";

const Container = styled.section`
  width: 100%;
  margin: 0;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Dashboard = () => {
  const [isPost, setIsPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const [responsePost, responseUser] = await Promise.all([
      fetch(url + `/posts`),
      fetch(url + `/user/profile`),
    ]);
    const dataPost = await responsePost.json();
    const dataUser = await responseUser.json();
    idChanger(dataPost, dataUser);
    setIsPost(dataPost), setIsLoading(!isLoading);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutDashboard>
      <Container>
        {isLoading ? <GetAllPosts items={isPost} /> : <Loading />}
      </Container>
    </LayoutDashboard>
  );
};
export default Dashboard;
