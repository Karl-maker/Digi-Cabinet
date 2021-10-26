import config from "../config/config";
const variables = config();
const API_URL = variables.api.BASE_URL;

const isLoggedIn = async () => {
  //var token = sessionStorage.getItem("access_token");
  var res;
  var accesstoken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjIzNmU0NDViOGFjZGJkMmUzMjFiYiIsImlhdCI6MTYzNTIxNTQ1MSwiZXhwIjoxNjM1ODE1NDUxLCJhdWQiOlsiRGlnaS1DYWJpbmV0Il0sImlzcyI6IlNvZnR3YXJlIEVuZ2luZWVycyBVbml0ZWQiLCJzdWIiOiJrYXJsc29tZXRoaW5nekBob3RtYWlsLmNvbSJ9.WVSBWgeuMG_y3KpC_2DDw8wD3O7C_FIkN8YflsSI0kdTR92z7C5v7dgdfcrXjlfbtBU5EH6FNG9e-ZaJlsgDeJQ2xPJHgE-ua-7OV0J5HGlHMs65hdJRZaB3w4wAeTOHfzjOk9hpXnt_c4gEOaIk3xnlQl0fL96ict7nYsMi6Zf4J1H8v4_ac86HGNFnPFOm_qQ5RC53hGNKUPDhkD5Z4zVtX1rIMjBPF_B-g24ReTlXNWBHQUXR_BCU8cXxf98NasIsb5RvX-ecgZYwfqKkIN5wlJVesF-bsqHZ6VKvoC6e5nMcczfqdEM9N00sHED-u4z6kohMRocq9oFQe4GYxg"; //JSON.parse(token);

  //Structure

  try {
    res = await fetch(`${API_URL}/api/auth/current-user`, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      }),
    });

    if ((await res.status) !== 200) {
      throw new Error("No User");
    }
  } catch (err) {
    throw new Error("Unexpected Issue");
  }

  return await res.json();
};

export { isLoggedIn };
