import React from "react";
import withPrivateRoute from "../components/private/withPrivateRoute";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

Dashboard.getInitialProps = async (props) => {
  console.info(props);
  return {};
};

export default withPrivateRoute(Dashboard);
