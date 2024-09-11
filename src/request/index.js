// lib
import { baseUrl } from "../lib/my-utils";

// refresh-token
export async function refreshToken(token) {
  const res = await fetch(baseUrl + "/auth/refresh-token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ refresh_token: token }),
  });

  if (res.status === 200 || res.status === 201) return await res.json();
  if (res.status === 403) throw new Error(403);
}

// admin post
export async function postData(data) {
  const res = await fetch(baseUrl + "/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 400)
    throw new Error("Username or password is not correct");
  if (res.status === 200 || res.status === 201) return await res.json();
  else throw new Error("Something went wrong");
}

// flowers
export async function getFlowers(token) {
  const res = await fetch(baseUrl + "/flowers", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 403) throw new Error(403);
  if (res.status === 200 || res.status === 201) return await res.json();
  else throw new Error("Something went wrong");
}
