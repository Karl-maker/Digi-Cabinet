import config from "../config/config";
const variables = config();
const API_URL = variables.api.BASE_URL;
const accesstoken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjIzNmU0NDViOGFjZGJkMmUzMjFiYiIsImlhdCI6MTYzNDYxMTczNCwiZXhwIjoxNjM1MjExNzM0LCJhdWQiOlsiRGlnaS1DYWJpbmV0Il0sImlzcyI6IlNvZnR3YXJlIEVuZ2luZWVycyBVbml0ZWQiLCJzdWIiOiJrYXJsc29tZXRoaW5nekBob3RtYWlsLmNvbSJ9.qemK_LX2QPyFhrGHjpjm9uZJOopZaXc7jq5AAfyYCcOP44KTr-kx6_CdWscAaYKKlRrziExh9H9KZ2q5LPkX50VQysMWj9oLCbfPMgPtHlecau9w0IQrTyQ9ZcPDT903aF0EoZ2iXwVU8MR_9oGVse6ZbwEPe7BVnbqRYPSe3sevKnwAb7QBRYpm7X0bNr347BQ6DxU0r8tJvu6WfXGqC8GsLfQyd6LGvpslIwmR61phU9HyKvHoi7duqguD2Wh9e8YxBJcx2qi4Rp-iud1XMEjaVK6lbVgI-W79cmMiIwM-G1vBQ0qeHyi_HpFKVA2VuBv6jr1iHbu6GZpGZ7y1VQ"; //JSON.parse(token);

async function fetchAPI(url, { method, body, header }) {
  const response = await fetch(`${API_URL}/${url}`, {
    method: method,
    headers: new Headers(
      {
        Authorization: `Bearer ${accesstoken}`,
      },
      { ...header }
    ),
    body: body,
  });

  const res = response.json();

  return res;
}

export { fetchAPI };
