import React from "react";
import withPrivateRoute from "../components/private/withPrivateRoute";
import { fetchAPI } from "../api/connect";

const Dashboard = ({ user }) => {
  return <div>{user.email}</div>;
};

Dashboard.getInitialProps = async (props) => {
  return { user: props.auth.user };
};

export default withPrivateRoute(Dashboard);
