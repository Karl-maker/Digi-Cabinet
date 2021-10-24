const getConfig = () => {
  const variables = {
    api: {
      BASE_URL: process.env.API_URL || "http://localhost:8000",
    },

    environment: {
      NODE_ENV: process.env.NODE_ENV || "development",
    },

    server: {
      PROTOCOL: process.env.CLIENT_PROTOCOL || "http",
      HOST: process.env.CLIENT_HOST || "localhost",
      PORT: process.env.CLIENT_PORT || 3000,
    },

    default: {
      LOGO: process.env.LOGO || "/container/default/logo/logo.png",
    },
  };

  return variables;
};

export default getConfig;
