/** @format */

import styled from "styled-components";
import { url } from "../../utils/utils";
import LayoutDashboard from "../../layout/layoutDashboard";

const Profiles = ({ items }) => {
  return <LayoutDashboard>hello world</LayoutDashboard>;
};
export async function getStaticPaths() {
  // Call an external API endpoint to get users
  const res = await fetch(`http://localhost:5000/api/user/profile/`);
  const items = await res.json();
  // Get the paths we want to pre-render based on users
  const paths = items.map((item) => ({
    params: { username: item.username },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://localhost:5000/api/user/profile/${params.username}`
  );
  const items = await res.json();

  return {
    props: {
      items,
    },
  };
}

export default Profiles;
