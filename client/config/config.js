const getConfig = () => {
  const variables = {
    api: {
      BASE_URL: process.env.API_URL || "http://localhost:8000",
    },
  };

  return { ...variables };
};

export default getConfig;
