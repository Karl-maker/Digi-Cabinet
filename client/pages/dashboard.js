import React from "react";
import Head from "next/head";
import withPrivateRoute from "../utils/private/withPrivateRoute";

function Dashboard({ user }) {
  return (
    <div>
      <Head>
        <title>Digi Cabinet | Dashboard</title>
      </Head>
      <h1>{user.email}</h1>
    </div>
  );
}

Dashboard.getInitialProps = async (props) => {
  return { user: props.auth.user };
};

export default withPrivateRoute(Dashboard);
